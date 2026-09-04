---
title: "Claude Can Now Analyze Your Fleet Data and Create Maps"
url: "/blog/fleet-analytics-with-claude/"
description: "Turn Claude into a fleet analyst with the GeoSQL skill. Claude analyzed 592,555 trips across 832 stations, computed net flow, and built the rebalancing map."
lead: "Turn Claude into a fleet analyst with the GeoSQL skill."
date: 2026-09-04T00:00:00Z
lastmod: 2026-09-04T00:00:00Z
draft: false
weight: 1
contributors: ["Vladi"]
images: ["fleet-analytics-with-claude.png"]
---

<video autoplay loop muted playsinline preload="metadata" style="width: 100%; max-width: 100%; height: auto; border-radius: 6px; margin: 1.5rem 0;">
  <source src="claude-fleet-analytics-screencast.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Fleet manager job is hard. You must be product, data analyst, scientist and procurement specialist at the same time.

Fleet dashboards lag behind real cases on the ground. I often see fleet managers doing their own math in spreadsheets 🤯

Being able to use Claude for ad-hoc fleet analytics may save your day!

But Claude alone, even with access to a semantic layer, cannot do fleet analytics, for the same reason a human can't do it by looking at a table with coordinates.

I'm using Dekart and the [GeoSQL](https://github.com/dekart-xyz/geosql?ref=blog-fleet-analytics-with-claude-intro) skill for Claude, that solves it by adding a "map harness" to the agent. Instead of "SQL and Pray", Claude loops on SQL → Map until it achieves plausible results 🧠

## The map

{{< img src="rebalancing-routes-3d.jpg" caption="Recommended rebalancing plan: short hops from the surplus ring into the downtown deficit core." class="wide" cloud="f101ede7-04cd-4843-a615-8f62083f3035" >}}

In this map I connected my data warehouse account to Dekart and installed the GeoSQL skill, then asked Claude "where to move bikes before the evening peak".

Claude analyzed 592,555 trips / 832 stations, detected evening peak hours (16:00–19:00) and computed net flow: 336 stations drain, 447 accumulate. Then it created a recommended rebalancing plan and built the map 🤩

Best part, the map is always up to date, connected to my data, I can use it again and share with a team! Dekart is open-source, supports BigQuery, Snowflake and Postgres, can run locally or self-hosted.

## Map in the loop

GeoSQL is not just a markdown file. It's a map-in-the-loop Claude harness, running inside Docker.

GeoSQL's main goal: turn Claude into a competent fleet analyst that frees your time from routine and ad-hoc requests. It removes the main blocker, Claude hallucinations on geospatial, by adding a map-in-the-loop flow.

{{< img src="geosql-map-in-the-loop.png" caption="Claude writes the SQL, Dekart runs it and renders the map, and Claude sees the map." class="wide" >}}

It has three components:

* GeoSQL Skill: markdown files.
* Dekart CLI: interface for Claude to query your geospatial database and render the map.
* Dekart: the Docker application based on KeplerGL, with connectors to PostGIS, BigQuery, and other GIS SQL databases.

To install it you need Python + run one command:

```bash
pip install geosql && geosql
```

Learn more on GitHub: [https://github.com/dekart-xyz/geosql](https://github.com/dekart-xyz/geosql)
