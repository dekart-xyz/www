---
title: "GeoSQL with Claude"
description: "Connect Claude to your Dekart Cloud workspace with the GeoSQL MCP server and skill, then ask for maps in plain language."
date: 2026-11-09T00:00:00+00:00
lastmod: 2026-11-09T00:00:00+00:00
draft: false
menu:
  docs:
    parent: "usage"
images: []
toc: true
---

GeoSQL lets Claude work with the data in your Dekart Cloud workspace: discover tables, write geospatial SQL, check the cost before running it, run it through your Dekart connections, and render the result as a Dekart map that it inspects and corrects itself.

Two pieces do this:

- The **GeoSQL MCP server** gives Claude the Dekart tools: list connections, create reports, run queries, render map snapshots. It runs at `https://geosql.dekart.xyz` and forwards every call to Dekart Cloud with your token.
- The **GeoSQL skill** teaches Claude the method: schema discovery first, bounding box plus `ST_INTERSECTS` for named areas, a dry-run cost gate on BigQuery, row count and area checks, map styling, and the rules of the Dekart tools.

Install both. The server without the skill answers questions but skips the checks; the skill without the server has no way to run SQL in your workspace.

## Before you start

- A Dekart Cloud workspace with at least one connection (BigQuery, Snowflake, Postgres or Wherobots) or uploaded files. DuckDB queries over uploaded files need no connection.
- Claude Desktop, or Claude Code in a terminal.

## Create an API token

Claude authenticates to your workspace with a token that you create and can revoke at any time.

1. Open your workspace in Dekart Cloud and go to **Workspace**, then the **API tokens** tab.
2. Click **Create token**, give it a name that says which client will use it, for example `Claude Desktop`, and confirm.
3. Copy the token. It is shown once.

Create one token per client, so you can revoke each one on its own. The token acts with your permissions: Claude can read what you can read and create reports where you can.

## Claude Desktop

### Install the GeoSQL extension

The extension connects Claude Desktop to the GeoSQL MCP server.

1. Download the extension: [geosql.mcpb](https://geosql.dekart.xyz/geosql.mcpb).
2. Open the downloaded file. Claude Desktop shows the extension and its two settings.
3. Leave **MCP Server URL** as `https://geosql.dekart.xyz/mcp`.
4. Paste the token into **Dekart token** and save.

Start a new chat and ask Claude which Dekart connections it sees. It should list the connections of your workspace.

### Install the GeoSQL skill

The skill is distributed as a Claude plugin from the GeoSQL repository.

1. In Claude Desktop open **Customize**, then **Plugins**.
2. Choose **Add**, then **Add marketplace**, and enter `dekart-xyz/geosql`.
3. Install the **GeoSQL** plugin from that marketplace.

Updates to the skill arrive through the marketplace; nothing else to maintain.

## Claude Code

### Add the MCP server

Run once in a terminal, pasting your token in place of the placeholder:

```bash
claude mcp add --transport http geosql https://geosql.dekart.xyz/mcp --header "Authorization: Bearer <your token>"
```

### Add the GeoSQL skill

```bash
claude plugin marketplace add dekart-xyz/geosql
```

```bash
claude plugin install geosql@geosql
```

### Without MCP: the dekart CLI

If you prefer a local command instead of the MCP server, install the skill and the `dekart` CLI with Python. `dekart init` opens Dekart Cloud in your browser to authorize the terminal; no token to paste.

```bash
pip install geosql && geosql
```

The skill detects which one is present. With the MCP server it calls the tools directly; otherwise it uses the CLI.

## Your first map

Start a prompt with `/geosql` and describe the question. For example:

```
/geosql Show EV charger density along major roads in Romania and render a map
```

Claude then works through the same steps every time:

1. Lists your Dekart connections and picks the one for the data.
2. Discovers the tables and columns it needs instead of guessing names.
3. Resolves the area from Overture Maps boundaries and writes the SQL with a bounding box and an exact spatial predicate.
4. Saves the query in a new Dekart report. On BigQuery the save is a dry run, and Claude rewrites the query if the estimated cost is too high.
5. Runs the query, checks row count and total area or length against what is plausible for the place.
6. Styles the map, renders a snapshot, looks at it, and fixes what the rows could not show: misplaced points, gaps, wrong joins.
7. Adds charts next to the map when your plan includes them.
8. Answers with the report link, the SQL, the cost, and what it checked.

Open the link to explore the map, share it with your workspace, or keep asking Claude to change it. Each report Claude creates is a normal Dekart report that you own.

## More prompts to try

Site selection:

```
/geosql Find the top 10 locations for a sporting goods store in Seattle based on POI co-location and distance to the nearest competitor. Create a map.
```

Real estate:

```
/geosql Show buildings with low school accessibility in Ottawa, render as a map
```

Your own data:

```
/geosql Which of our stores have the most competitors within 1 km? Use the stores table and Overture places. Map the top 20.
```

## Limits

- Query results come back to Claude as up to 1000 rows or 1 MB, enough to check the result. The full result lives in the report.
- Queries on uploaded files run in DuckDB and stop after 10 seconds by default; Claude can extend this to 120 seconds for a heavy query.
- Files uploaded by Claude are capped at 2 MB. Larger data belongs in a connection or uploaded in Dekart directly.
- A map snapshot renders within about a minute. If it times out, Claude points you to the interactive report.

## Revoking access

Delete the token in **Workspace**, **API tokens**. The next tool call from that client fails with "Create a new token in Dekart" and returns no data. Create a new token and paste it into the extension to reconnect.

## Troubleshooting

- **Claude says "Create a new token in Dekart"**: the token was revoked or expired. Create a new one and update the extension settings or the `claude mcp add` command.
- **Claude cannot find a connection for your warehouse**: add it in Dekart under **Connections**; Claude cannot create connections.
- **No Dekart tools in the chat**: check the extension is enabled in Claude Desktop settings, or run `claude mcp list` in Claude Code.
- **Claude runs SQL but never checks cost or the map**: the skill is missing. Install the plugin as described above.
