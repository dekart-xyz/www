---
title: "Claude Code vs Aino: a geospatial agent test"
url: "/blog/claude-code-vs-aino-geospatial-agent/"
description: "I gave Claude Code a top GIS agent's prompt and an open-source GeoSQL skill. It queried Overture data on BigQuery and Snowflake, mapped it, and self-corrected."
lead: "Same prompt, one of the best GIS agents vs Claude plus an open-source GeoSQL skill on free Overture data."
date: 2026-06-06T00:00:00Z
lastmod: 2026-06-06T00:00:00Z
weight: 1
contributors: ["Vladi"]
images: ["claude-vs-aino-map.png"]
---

{{< img-simple src="claude-vs-aino.gif" caption="Same prompt as a dedicated GIS agent's demo. Claude Code with the GeoSQL skill queries Overture data on BigQuery and renders the map in Dekart." >}}

Ten months ago, Alex published a demo of the Aino agent creating a map. So I wondered if Claude could do the same now. Turns out it can do more.

## What is Aino

Aino is a geospatial AI agent. You ask a question in plain English and it builds a map: it picks the data, runs the analysis, and visualizes the result. No SQL, no GIS software.

## Same prompt, two agents

I took the exact prompt from Aino's demo and gave it to Claude Code: "Show buildings with low accessibility to elementary schools in Ottawa." It is a classic GIS task: find the homes a city underserves.

In Alex's demo, the agent fetches the data, but a human does the final styling. In my run, Claude did both, then improved its own reasoning by seeing the result.

{{< img src="claude-vs-aino-map.png" caption="<a href=\"https://cloud.dekart.xyz/reports/0c3404cb-dfd6-4fa6-82df-cab3b6fa2f43/source?ref=dekart-xyz-view-map\">Dekart map of Ottawa buildings more than 1.6 km from the nearest elementary school</a>, colored by distance." cloud="0c3404cb-dfd6-4fa6-82df-cab3b6fa2f43" class="wide" >}}

## What is GeoSQL

[GeoSQL](https://github.com/dekart-xyz/geosql?ref=blog-claude-vs-aino-inline) is an open-source skill that gives Claude the SQL-first geospatial steps: schema discovery, query validation, and rendering the result on a map.

Without a map, an agent writes the SQL and prays the result is right. With the map in the loop, it sees the output and fixes its own query. On a [separate eval](/blog/how-to-evaluate-claude-skill-output-quality-for-prompt-to-sql-scenarios/), that one change took a geospatial skill from 2 of 8 correct to 8 of 8.

### The query it wrote

```sql
WITH area AS (
  SELECT geometry
  FROM `bigquery-public-data.overture_maps.division_area`
  WHERE names.primary = 'Ottawa'
  LIMIT 1
),
schools AS (
  SELECT ST_UNION_AGG(p.geometry) AS g
  FROM `bigquery-public-data.overture_maps.place` p
  CROSS JOIN area a
  WHERE p.categories.primary = 'elementary_school'
    AND ST_INTERSECTS(p.geometry, a.geometry)
    -- bbox prefilter keeps the scan cheap
    AND p.bbox.xmin <= -75.246 AND p.bbox.xmax >= -76.355
    AND p.bbox.ymin <= 45.537  AND p.bbox.ymax >= 44.961
)
SELECT
  b.id,
  ST_CENTROID(b.geometry) AS geometry,
  ST_DISTANCE(b.geometry, s.g) AS dist_m
FROM `bigquery-public-data.overture_maps.building` b
CROSS JOIN schools s
CROSS JOIN area a
WHERE ST_INTERSECTS(b.geometry, a.geometry)
  AND ST_DISTANCE(b.geometry, s.g) > 1600;  -- more than 1.6 km from any school
```

About 5.5 GB scanned on a dry run, well under budget. Then Claude listed its own caveats before drawing anything: Overture can miss newer or French-board schools, straight-line distance ignores rivers and highways, and "Ottawa" here is the county, so most low-access buildings are rural. It rendered 55,922 of them, shown on the map above.

## Where the data comes from

The data is free. [Overture Maps](/blog/why-we-stopped-using-openstreetmap-and-switched-to-overture-maps-on-bigquery-and-snowflake/) publishes open building, place, and [administrative boundary](/blog/admin-boundaries-in-bigquery-public-datasets/) datasets, hosted on BigQuery and Snowflake. Claude, with GeoSQL, queries them through the `bq` and `snow` CLIs. Your data stays in your warehouse. The model only sees the scoped result it asked for.

## One prompt box to rule them all

I chose Aino because their agent is one of the best. There are others: [CARTO](/carto/), Felt. But I never believed in a future where every SaaS ships its own prompt box. I believe in one prompt box to rule them all.

If you already do geospatial with PostGIS, BigQuery, or Snowflake and you use Claude:

```bash
pip install geosql
```

{{< github-cta repo="dekart-xyz/geosql" ref="blog-claude-vs-aino-bottom" >}}
