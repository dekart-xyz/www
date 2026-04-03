---
title: "How to Evaluate Claude Skill Output Quality for Prompt-to-SQL Scenarios"
description: "Implementing the Agent Skills eval spec for a prompt-to-SQL Skill: same-session grading, domain-knowledge assertions, and the eval runner architecture."
lead: "We built a Claude Code Skill that generates geospatial SQL for BigQuery. It kept producing correct-looking queries with wrong results. Here's how we built evals that catch these failures."
date: 2026-04-03T00:00:00Z
lastmod: 2026-04-03T00:00:00Z
draft: false
weight: 1
images: ["eval-results.png"]
contributors: ["Vladi"]
---

{{< img src="eval-results.png" caption="Eval runner output: 1/1 assertions passed for Paris boundaries" class="wide" >}}

## The problem

We have a Claude Code Skill that generates BigQuery SQL for Overture Maps geospatial data. Users ask things like "give me London boundaries" and the Skill guides Claude through schema discovery, area resolution, bbox filtering, and validation.

Across four test sessions with the same Skill instructions, we hit four different bugs. Each produced valid SQL that ran without errors but returned wrong results:

- **Bbox filter direction.** Containment instead of overlap. Zero rows.
- **Coordinate truncation.** `2.2241089344024658` became `2.224`. Missed features at city edges.
- **Python validation.** Claude validated with a Python script instead of `SELECT COUNT(*)`. Fragile.
- **Missing boroughs.** Only 31 of 33 London boroughs included. No error, just wrong data.

We patched the SKILL.md after each failure. That doesn't scale. We needed automated evals.

## The Agent Skills eval spec

The [Agent Skills](https://agentskills.io) open standard defines an eval format. The key parts:

**`evals.json`** — test cases with prompts and assertions:

```json
{
  "skill_name": "my-skill",
  "evals": [
    {
      "id": 1,
      "prompt": "user message",
      "expected_output": "what success looks like",
      "assertions": ["verifiable statement about output"]
    }
  ]
}
```

**`grading.json`** — assertion results with evidence:

```json
{
  "assertion_results": [
    { "text": "assertion", "passed": true, "evidence": "quoted output" }
  ],
  "summary": { "passed": 3, "failed": 1, "total": 4, "pass_rate": 0.75 }
}
```

**`benchmark.json`** — aggregate pass rates, tokens, duration across cases.

The spec recommends: start with 2–3 test cases, vary prompts (casual vs. precise), add assertions after seeing first outputs, require concrete evidence for a pass.

## How we implemented it

### The eval definition

Our `evals.json`:

```json
{
  "skill_name": "giskill",
  "evals": [
    {
      "id": "london-boroughs",
      "prompt": "give me sql for london boundries",
      "assertions": [
        "Agent used bq with --maximum_bytes_billed set.",
        "Agent validated the query before presenting the final answer.",
        "Run query and ensure that the result is not empty.",
        "Calculate the area of returned geometries and check if the total area is ~1,577 sq km (+/- 2%)."
      ]
    },
    {
      "id": "paris-boundaries",
      "prompt": "give me sql for paris boundries",
      "assertions": [
        "Run query and ensure that the result is not empty and contains exactly 1 row."
      ]
    }
  ]
}
```

Note: prompts have typos on purpose. Real users don't type clean prompts.

The last London assertion is the most important. Greater London's area is ~1,577 km². If the generated SQL returns geometries that total 1,577 km² (±2%), then the bbox direction is correct, coordinates aren't truncated, all 33 boroughs are included, and geometries are valid. One number catches all four bugs.

### The runner: step by step

The runner (`evals/run.py`) does two Claude CLI calls per case.

**Step 1: Generation.** Send the prompt to Claude CLI in stream-json mode:

```python
def run_claude_stream(claude_bin, prompt, resume_session_id=""):
    cmd = [claude_bin, "-p", "--verbose",
           "--output-format", "stream-json",
           "--permission-mode", "bypassPermissions",
           "--allowedTools", "Bash(bq:*) Bash(gcloud:*)",
           prompt]
    if resume_session_id:
        cmd[1:1] = ["--resume", resume_session_id]

    proc = subprocess.run(cmd, capture_output=True, text=True)
    events = [json.loads(l) for l in proc.stdout.splitlines() if l.strip()]
    result_event = next(e for e in events if e.get("type") == "result")
    return events, result_event
```

`--allowedTools "Bash(bq:*) Bash(gcloud:*)"` restricts the agent to BigQuery and gcloud commands only. No filesystem, no pip installs.

The stream-json output captures everything: thinking blocks, tool calls with inputs, tool results, final answer. Saved as `events.ndjson`.

**Step 2: Same-session grading.** Resume the session with `--resume` and send the assertion prompt:

```python
# Generation
gen_events, gen_result = run_claude_stream(claude_bin, prompt)
session_id = gen_result["session_id"]

# Grading — same session
assertion_prompt = build_assertion_prompt(assertions)
grade_events, grade_result = run_claude_stream(
    claude_bin, assertion_prompt,
    resume_session_id=session_id
)
```

Same session means the grader sees everything the generator did. It can run new `bq` queries to check assertions. For the area check, it runs:

```sql
SELECT ROUND(ST_AREA(ST_UNION_AGG(geometry)) / 1e6, 2) AS total_area_sq_km
FROM (... the generated query ...)
```

The grading prompt:

```python
def build_assertion_prompt(assertions):
    return (
        "Validate these assertions for your previous answer.\n"
        "For EACH assertion, actively validate it. "
        "If validation requires data checks, run bq queries.\n"
        "Output ONLY valid JSON with assertion_results array.\n\n"
        f"Assertions:\n{json.dumps(assertions, indent=2)}\n"
    )
```

**Step 3: Save artifacts.** Per case:

```
evals/results/latest/london-boroughs/
├── output.md              # Generated answer
├── grading.json           # Assertion results + evidence
├── model_messages.json    # Compact thinking + tool calls
└── events.ndjson          # Full raw event stream
```

`model_messages.json` extracts a compact log from the event stream, every thinking step and tool call, stripped of verbose tool results:

```python
def extract_model_messages(events):
    messages = []
    for event in events:
        if event.get("type") != "assistant":
            continue
        content = event.get("message", {}).get("content", [])
        compact = []
        for block in content:
            if block.get("type") == "tool_use":
                compact.append({"type": "tool_use",
                    "name": block["name"], "input": block["input"]})
            elif block.get("type") in {"text", "thinking"}:
                compact.append({"type": block["type"],
                    "text": block.get("text", "")})
        messages.append({"role": "assistant", "content": compact})
    return messages
```

When an assertion fails, open `model_messages.json` to see exactly where the agent went wrong.

**Step 4: Aggregate benchmark.** Collect `grading.json` from all cases on disk, compute totals:

```python
case_summaries, total_passed, total_assertions = collect_benchmark_from_disk(out_dir)
benchmark = {
    "skill_name": skill_name,
    "cases": case_summaries,
    "summary": {
        "passed_assertions": total_passed,
        "total_assertions": total_assertions,
        "pass_rate": total_passed / total_assertions,
    },
}
```

### Running it

```bash
python3 evals/run.py                         # all cases
python3 evals/run.py --case london-boroughs  # single case
python3 evals/run.py --clean                 # wipe previous results first
```

Current results: 5/5 assertions passing across London and Paris.

## What makes this work for prompt-to-SQL

**Domain knowledge as assertions.** Process checks ("did it call INFORMATION_SCHEMA?") are brittle. They fail when the agent finds a valid alternative. Outcome checks ("is the total area 1,577 km²?") catch real bugs regardless of how the agent got there. Every analytics domain has equivalents: known totals, counts, ratios.

**Same-session grading.** The grader isn't reading text. It's running queries against the real database in the same session where the SQL was generated. Full context preserved.

**Event streams for debugging.** When an assertion fails, you don't guess why. The thinking blocks and tool calls show exactly what happened.

## Code

Open source: [github.com/dekart-xyz/gis-skill](https://github.com/dekart-xyz/gis-skill)

To visualize geospatial query results on a map: [dekart.xyz](https://dekart.xyz)
