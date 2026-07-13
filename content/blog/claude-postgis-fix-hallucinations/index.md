---
title: "Claude + PostGIS: How to Fix Hallucinations"
url: "/blog/claude-postgis-fix-hallucinations/"
description: "Claude hallucinates on PostGIS because it works blind. Here is how to give it an agent loop with the open-source GeoSQL skill: run spatial SQL, see the map, and self-correct. Local, no SaaS."
lead: "Go from one-off prompts to an agent loop, with the map in the middle."
date: 2026-07-10T00:00:00Z
lastmod: 2026-07-10T00:00:00Z
draft: false
weight: 1
contributors: ["Vladi"]
images: ["claude-postgis-agent-loop.jpg"]
---

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin: 1.5rem 0;">
  <iframe src="https://www.youtube.com/embed/JCOhkE0rPWA" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Claude + PostGIS: I was doing it wrong"></iframe>
</div>

I realized I used Claude with PostGIS wrong all the time. Usually I would just paste the database schema into Claude, ask a question, get the SQL, copy it into QGIS, run it, and see an error or wrong coverage. Then I would iterate a lot. And because LLMs hallucinate on geospatial, you do many reps.

All of this happens because Claude is working blind. It only sees the returned rows, never the map, so it has no feedback loop. What if Claude could run the SQL, see the map itself, and then iterate? Pretty much an agent loop for geospatial.

So I built an open-source Claude skill that does exactly that. It's called GeoSQL.

{{< github-cta repo="dekart-xyz/geosql" ref="blog-claude-postgis-fix-hallucinations-intro" >}}

It does two things:

* Claude runs SQL directly on your PostGIS
* Claude renders the result as a real map

To make it work, GeoSQL uses another open-source project called Dekart. It's a single Docker container that enables SQL to map workflows. It has an MCP to run the query, and a snapshot feature so the agent can see the map. Dekart uses Kepler.gl to render, and the agent can create a Kepler.gl config to style the map.

{{< github-cta repo="dekart-xyz/dekart" ref="blog-claude-postgis-fix-hallucinations-dekart" >}}

Together they create an agent loop. Claude runs the SQL, sees the actual map, judges it, and corrects the SQL itself, until the map is right, instead of you doing it in QGIS.

<blockquote class="blockquote">
<p class="mb-0">Instead of SQL and pray, Claude loops from SQL to map until it achieves plausible results.</p>
</blockquote>

## How to set up

I'm using Claude Code. I use both the Claude Code CLI and the desktop app. I'm on the Claude Pro $20 subscription, and it's usually enough for my daily map analytics needs.

Install GeoSQL:

```bash
pip install geosql && geosql
```

Run Dekart. Here I just run it locally, but you can also self-host it. It has multiple options to persist its state and supports many [SSO options](/self-hosted/):

```bash
docker run -p 8080:8080 dekartxyz/dekart
```

Set up the Dekart CLI:

```bash
pip install dekart && dekart init
```

I run `dekart init` and tell it to use my local Dekart instance. I authorize a token so the Dekart CLI can connect securely.

Add the PostGIS connection.

Then set up a local snapshot. That's exactly what we need, so Claude can verify the map.

Everything except the LLM runs on my local. No accounts, no SaaS.

## Map example

<video autoplay loop muted playsinline preload="metadata" style="width: 100%; max-width: 100%; height: auto; border-radius: 6px; margin: 1.5rem 0;">
  <source src="claude-postgis-screencast.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

I ask Claude to analyze road safety from my PostGIS database. I don't provide any schema, schema discovery is already a workflow inside the GeoSQL skill.

### The magic moment: Claude fixes its own map

Claude runs the GeoSQL workflow, finds the Dekart CLI, the PostGIS connector, and the dataset. It aggregates the crashes on H3, then starts to build a map.

Then the agent validates the map snapshot and realizes the config is wrong. It found a problem with the H3 hashes, and it fixes itself.

**What Claude did without me:**

* Discovered the PostGIS connector and dataset, no schema pasted
* Aggregated the crash data on H3
* Caught its own wrong H3 hashes by looking at the map, not the rows
* Rewrote the SQL and re-rendered until the map was right

That is the agent loop working: see the map, catch the error, correct.

### Getting to a real hot spot analysis

The first map did not give me a clear insight. What I actually needed was true hot spot analytics: where severe incidents cluster together more than random chance would predict. So I typed one prompt:

```text
Find locations with statistically significant amount of incidents where road traffic actions needs to be taken.
```

Claude correctly decided to run a Gi* (Getis-Ord) analysis, aggregated to 200m H3 hexagons, and inspected the map again.

{{< img src="gi-star-hotspots.jpg" caption="Statistically significant crash hot spots (Getis-Ord Gi*) on H3, computed in PostGIS SQL." >}}

### Highlighting the streets that need attention

Hexagons are hard to act on. I wanted the actual streets, so I followed up:

```text
Now add road network to this map and highlight streets that needs attention.
```

Claude joined a second `streets` table from my PostGIS, checked the rendered map, decided the styling needed changing, and re-styled it. Then it read the map to document which street corridors require attention.

{{< img src="streets-attention.jpg" caption="Streets needing attention around the Brooklyn Navy Yard, colored by Gi* confidence." >}}

### The result: a map I can send to a customer

And here is the final map, which I export as a single HTML file and send over email.

{{< img src="nyc-hotspots-map.jpg" caption="The final NYC crash hot-spot map, exportable to a single HTML file or a shareable link." >}}

## Summary

* In about ten minutes, Claude ran a multi-step hot spot analysis on my PostGIS data, found the insight, and built a map that supports it.
* It used the map multiple times to correct itself, that is the agent loop in action.
* I can review the final SQL in Dekart, and share the map as HTML or a link.

An agent loop like this moves you much further forward than a blind agent.

If you want the same demo broken down into just two prompts, see [Hotspot Analysis on PostGIS with Claude](/blog/hotspot-analysis-postgis-claude/). For a different dataset, see [Site Selection with Claude and Google Places](/blog/site-selection-with-claude-and-google-places/).

---

<div class="text-center py-3">
  <p class="lead">Give Claude an agent loop on your PostGIS</p>
  <a class="btn btn-primary btn-lg" href="https://github.com/dekart-xyz/geosql?ref=blog-claude-postgis-fix-hallucinations-cta" role="button">Get GeoSQL</a>
</div>
