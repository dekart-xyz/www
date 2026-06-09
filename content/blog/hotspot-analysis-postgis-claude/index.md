---
title: "Hotspot Analysis on PostGIS with Claude, in Two Prompts"
url: "/blog/hotspot-analysis-postgis-claude/"
description: "Two prompts in plain English produced a Gi*-scored hotspot map from PostGIS. The open-source GeoSQL skill loops Claude on SQL to map until it stops hallucinating."
lead: "An open-source skill that turns Claude into a self-correcting GIS analyst on PostGIS."
date: 2026-06-09T00:00:00Z
lastmod: 2026-06-09T00:00:00Z
weight: 1
contributors: ["Vladi"]
images: ["claude-postgis-hero.png"]
---

{{< img src="claude-postgis-hero.png" caption="Claude querying PostGIS through the GeoSQL skill, with Dekart rendering the map." class="wide" >}}

Claude can now query your PostGIS and create maps.

No SaaS, no accounts. Open-source. Localhost or self-hosted.

## What this is

Dekart is an open-source backend for Kepler.gl with connectors to PostGIS, BigQuery, and Snowflake. GeoSQL is a Claude skill that lets the agent run spatial SQL through Dekart and look at the resulting maps. All of it runs on [localhost or self-hosted](/self-hosted/).

## Why agents hallucinate on geospatial

Most GIS folks are already using Claude for writing GIS SQL.

But on geospatial, LLMs suffer from lots of hallucination, forcing you to iterate between Claude and QGIS.

An LLM has no way to know the polygon it just selected is actually Manhattan and not just one neighborhood. It cannot do mental math on geometry. You catch the error by looking at a map. The agent does not.

GeoSQL, the skill for Claude, solves it by adding a map harness to the agent.

Instead of "SQL and Pray", Claude loops on SQL to map until it achieves plausible results. I wrote up [how to measure whether the loop actually works](/blog/how-to-evaluate-claude-skill-output-quality-for-prompt-to-sql-scenarios/) separately.

## The NYC road-safety demo

<video autoplay loop muted playsinline preload="metadata" style="width: 100%; max-width: 100%; height: auto; border-radius: 6px; margin: 1.5rem 0;">
  <source src="claude-postgis-demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

In the video, Claude is doing road-safety hotspot analysis in NYC: finds statistically significant hotspots with severity-weighted hex bins and Gi* scoring, then maps the hotspot zones and road segments needing attention.

The two prompts I typed:

```
Find locations with statistically significant amount of incidents where road traffic actions needs to be taken.

Now add road network to this map and highlight streets that needs attention.
```

No "Gi*". No "hex bins". No "severity weighting". Those came from Claude.

Everything except the LLM is running on my local. No accounts, no SaaS.

The result is an interactive map exported as a single HTML file I can send to a customer over email.

## What you can extend

Best part: combine it with your own Skills, docs, and data.

Claude performs GIS analysis exactly with your method, still building maps and correcting itself.

## Run it yourself

Three commands:

```bash
# 1 Install the Claude skill
pip install geosql && geosql

# 2 Optional, run Dekart server locally
docker run -p 8080:8080 dekartxyz/dekart

# 3 Configure Claude / Dekart / PostGIS connection (this is where the video starts)
pip install dekart && dekart init
```

GeoSQL works with PostGIS, BigQuery, and Snowflake today. Dekart is built as the open-source [CARTO and Felt alternative](/carto/) for spatial SQL workflows, and if you have evaluated CARTO before that page covers the trade-offs.


{{< github-cta ref="blog-hotspot-analysis-postgis-claude-bottom" >}}
