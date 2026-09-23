---
title: "Dashboard Widgets and Charts in Dekart"
url: "/blog/open-source-carto-alternative-widgets/"
description: "Widgets and charts are live in Dekart Cloud. Filter 81,268 BigQuery rows in the browser with DuckDB, with no extra warehouse queries. Open your workspace and run a query."
lead: "Widgets and charts are live in your workspace: filter the map in the browser instead of re-querying the warehouse."
date: 2026-09-23T00:00:00Z
lastmod: 2026-09-23T00:00:00Z
draft: false
weight: 1
contributors: ["Vladi"]
images: ["widgets-charts-og.jpg"]
---

<video autoplay loop muted playsinline preload="metadata" style="width: 100%; max-width: 100%; height: auto; border-radius: 6px; margin: 1.5rem 0;">
  <source src="widgets-screencast.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Widgets and charts are live in Dekart Cloud. Your map is now a dashboard: row counts, category charts, histograms and filters next to the map, on the same query result.

Nothing to install or upgrade. Open a map, run a query, and the charts are there.

[Create a map in Dekart Cloud](https://cloud.dekart.xyz/workspace?ref=blog-widgets-create-map-top)

## What you get

* **Charts suggested from your query.** A row count, a category chart for your first text column, and a histogram for your first number, without configuring anything.
* **Filters that drive the map.** Click a category or brush a histogram, and the map, the counts and the other charts follow.
* **Charts that match the map.** A category chart uses the same colors as the layer it is colored by.
* **Your reader needs no SQL.** Share the link, they filter it themselves. The map stays connected to your database.

## Why it is fast, and cheaper

In most cloud tools each map and each chart is a separate warehouse query. Filter on a category, and that is the next roundtrip to BigQuery.

Dekart uses DuckDB and SQLRooms instead:

* You query BigQuery, Snowflake or Postgres once, and load the map.
* Every chart is aggregated in the browser with DuckDB.
* When you filter, there are no more queries.

<blockquote class="blockquote">
<p class="mb-0">You pay less for the data warehouse and get an instant experience.</p>
</blockquote>

In the video that is 81,268 Overture places from BigQuery, 254 categories, filtered down to 19,800 without a second query. Uploaded files work the same way.

Open the map from the video → [BigQuery places with widgets](https://cloud.dekart.xyz/reports/da0fc606-9921-4ca3-9b51-bb41e2693e58?ref=blog-widgets-bigquery-map)

## It works with your agent

Dekart runs with [GeoSQL](https://github.com/dekart-xyz/geosql?ref=blog-open-source-carto-alternative-widgets-geosql), the map-in-the-loop harness for Claude and Codex, so the agent can build the dashboard instead of you clicking it together. The prompt in the video:

```text
/geosql Add 3D H3 hexagons (res 9) on top: height by place count,
color by top category. Use DuckDB. Rewire chart. Name chart, layer.
```

Claude aggregated the 81,268 places into 2,053 H3 cells, added the 3D layer, rewired the charts to the new aggregation and named everything for sharing.

* [BigQuery, DuckDB and widgets: the 3D H3 map](https://cloud.dekart.xyz/reports/0bdb4e5e-6cd9-4570-bfc2-7e022a800b3f?ref=blog-widgets-h3-map)
* [How to update GeoSQL](https://github.com/dekart-xyz/geosql?ref=blog-widgets-geosql-upgrade#how-to-update)

Related reading:

* [Claude can now analyze your fleet data and create maps](/blog/fleet-analytics-with-claude/)
* [One Docker command to replace CARTO and Felt](/blog/one-docker-command-to-replace-carto-and-felt/)

Open your workspace and put the charts on your own data → [Create a map](https://cloud.dekart.xyz/workspace?ref=blog-widgets-create-map-cta)
