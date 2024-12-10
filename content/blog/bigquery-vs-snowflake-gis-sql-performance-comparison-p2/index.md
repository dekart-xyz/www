---
title: "Compare and optimize BigQuery and Snowflake performance on GIS queries. Part 2."
description: "Compare BigQuery and Snowflake on GIS query performance. Explore execution times, costs, and efficiency in a Geometry-in-Polygon use case with real-world data from Overture Maps"
lead: "Geometry-in-Polygon Query with dynamic geometry."
date: 2024-12-10T05:59:51Z
lastmod: 2024-12-10T05:59:51Z
draft: false
weight: 50
images: ["dekart-map.png"]
contributors: ["Vladi"]
---


This second post in the series compares performances of GIS queries between Snowflake. In a previous post, I [tested Geometry-in-Polygon Query with constant geometry](/blog/compare-bigquery-and-snowflake-performance-on-gis-queries./), showing that without Enterprise-only Snowflake Search Optimization, BigQuery significantly outperforms Snowflake due to spatial clustering.

However, how often do we see constant geometry in real-life pipelines? In my experience, geometry in most cases comes from another dataset.

## Get all the roads in Berlin – spatial join.

This practical example covers common geometry in polygons scenarios. But this time I query boundary geometry from one dataset and use it to filter data in the other dataset.

{{< img src="dekart-map.png" cloud="d1c4414b-fd81-4dba-bb06-4dfdd618c8e0" >}}

BigQuery SQL

```sql
WITH berlin_boundary AS (
    SELECT geometry
    FROM `bigquery-public-data.overture_maps.division_area`
    WHERE LOWER(names.primary) = 'berlin'
      AND country = 'DE'
)
SELECT s.id, s.geometry, s.class, s.subtype
FROM `bigquery-public-data.overture_maps.segment` s
JOIN berlin_boundary b
  ON ST_CONTAINS(b.geometry, s.geometry)
WHERE s.subtype = 'road'
  AND s.class IN ('primary', 'secondary', 'tertiary');
```

{{< try-query-cloud report="d1c4414b-fd81-4dba-bb06-4dfdd618c8e0" >}}

Snowflake SQL

```sql
WITH berlin_boundary AS (
    SELECT geometry
    FROM OVERTURE_MAPS__DIVISIONS.CARTO.DIVISION_AREA
    WHERE LOWER(names:primary) = 'berlin'
      AND country = 'DE'
)
SELECT s.id, s.geometry, s.class, s.subtype
FROM OVERTURE_MAPS__TRANSPORTATION.CARTO.SEGMENT s
JOIN berlin_boundary b
  ON ST_CONTAINS(b.geometry, s.geometry)
WHERE s.subtype = 'road'
  AND s.class IN ('primary', 'secondary', 'tertiary');
```

{{< try-query-cloud report="d1c4414b-fd81-4dba-bb06-4dfdd618c8e0" >}}

### First results

<table class="table">
<thead>
<tr>
<th>Query/db</th>
<th>Duration</th>
<th>Bytes Scanned</th>
<th>Cost</th>
</tr>
</thead>
<tbody>
<tr>
<td>BigQuery</td>
<td>3 seconds</td>
<td>86.81 GB</td>
<td>$0.424</td>
</tr>
<tr>
<td>Snowflake</td>
<td>1 minute 51 seconds</td>
<td>82.53GB</td>
<td>$0.080</td>
</tr>
</tbody>
</table>

### Query Plans

{{< img src="Snowflake-BigQuery-query-plans.png" >}}

## First observations

- Both BigQuery and Snowflake perform full-table scans.
- BigQuery, being highly parallel, completes query execution much faster, however at a higher cost.
- Snowflake takes  longer to complete but at a lower cost.

## Why does BigQuery perform a full scan?

In the previous example, with static geometry, BigQuery was pruning partitions very efficiently using spatial clustering. However, here, the planner decides to perform a join instead.

BigQuery commonly uses two joining types:

1. Broadcast join: Used when joining a large table to a small table. The small table is sent to each slot, processing the large table.
2. Hash join: Used when joining two large tables. BigQuery uses hash and shuffle operations to move matching keys to the same slot for a local join.

Given a small amount of data returned from the first query and a small amount of data shuffled (moved between nodes), BigQuery likely used broadcast join in this case. A small result of the first query is sent to each slot processing a large Segment table, leading to fast execution but a full table scan.

## Can we help BigQuery planner to avoid joining?

Yes, with some hints from the planner, I was able to avoid join and decrease Total Slot Time from 32 min 16 sec to 16 min 48 sec.

Here I’m trying to give the planner all the hints.

```sql
WITH berlin_boundary AS (
    SELECT geometry
    FROM `bigquery-public-data.overture_maps.division_area`
    WHERE LOWER(names.primary) = 'berlin'
      AND country = 'DE'
    LIMIT 1
)
SELECT s.id, s.geometry, s.class, s.subtype
FROM `bigquery-public-data.overture_maps.segment` s
WHERE s.subtype = 'road'
  AND s.class IN ('primary', 'secondary', 'tertiary')
  AND ST_CONTAINS((select geometry from berlin_boundary limit 1), s.geometry)
```

{{< try-query-cloud report="d1c4414b-fd81-4dba-bb06-4dfdd618c8e0" >}}

And indeed, no join in this case

{{< img src="bigQuery-plan.png" >}}

However, the query performs a full scan anyway. It looks like BigQuery did not utilize spatial clustering in this case. I did not find a way to make this query cheaper.

I’m aware about [Michael Entin post how to split it to run cheap](https://mentin.medium.com/divide-the-query-to-improve-cost-and-performance-df310a502a07). But I think in real-life scenarios with queries having many CTEs performing this SQL optimization, it will be too hard.

## Can we help Snowflake planner to avoid expensive joins?

Yes. In the first query, while filtering applied before GeoJoin, it did not reduce the number of records and apparently GeoJoin was performed against the full dataset, also spilling 11Gb on the disc.

Let’s try now to give the planner some hints:

```sql
WITH berlin_boundary AS (
    SELECT geometry
    FROM OVERTURE_MAPS__DIVISIONS.CARTO.DIVISION_AREA
    WHERE LOWER(names:primary) = 'berlin'
      AND country = 'DE'
    LIMIT 1
)
SELECT s.id, s.geometry, s.class, s.subtype
FROM OVERTURE_MAPS__TRANSPORTATION.CARTO.SEGMENT s
WHERE s.subtype = 'road'
  AND s.class IN ('primary', 'secondary', 'tertiary')
  AND ST_CONTAINS((SELECT geometry from berlin_boundary), s.geometry)
```

{{< try-query-cloud report="d1c4414b-fd81-4dba-bb06-4dfdd618c8e0" >}}

Query plan looks very different.

{{< img src="snowflake-query-plan.png" >}}

Now Snowflake seems to apply filters more effectively and reduce the amount of table scans to 63.61GB and reduce execution time.

## Can we get execution faster with a larger Snowflake warehouse?

Yes, with a Medium (4x cost of XS) warehouse size, we were able to reduce query execution time to 20s. While the query runs faster, it’s not 4x faster, so the cost is also higher.

## Final results

<table class="table">
<thead>
<tr>
<th>Query/db</th>
<th>Duration</th>
<th>Bites Scanned</th>
<th>Cost</th>
</tr>
</thead>
<tbody>
<tr>
<td>BigQuery</td>
<td>3 seconds</td>
<td>86.81 GB</td>
<td>$0.424</td>
</tr>
<tr>
<td>BigQuery optimized SQL</td>
<td>2 seconds</td>
<td>86.81 GB</td>
<td>$0.424</td>
</tr>
<tr>
<td>Snowflake</td>
<td>1 minute 51 seconds</td>
<td>82.53GB</td>
<td>$0.080</td>
</tr>
<tr>
<td>Snowflake optimized SQL</td>
<td>59s</td>
<td>765.81MB + 63.61GB</td>
<td>$0.043</td>
</tr>
<tr>
<td>Snowflake optimized SQL and Medium data warehouse size</td>
<td>20s</td>
<td>765.81MB + 63.61GB</td>
<td>$0.05777</td>
</tr>
</tbody>
</table>

# Key Insights

- BigQuery can skip spatial clustering in complex scenarios, leading to costly full table scans.
- BigQuery is impressively fast, but bytes scanned couldn’t be reduced without splitting query; slot time was halved with query optimization.
- Snowflake without hints scanned the entire dataset; optimized query cut time and data processed by 50%.
- Snowflake’s XS warehouse is cost-efficient but slower; larger warehouses trade cost for speed.

Short summary – BigQuery is 10x faster, and Snowflake is 10x cheaper.

## What is next?

In my next article, I’ll test Nearest Neighbor Search and Buffer Analysis, diving deeper into GIS performance on BigQuery and Snowflake.

Until then, explore my curated collection of SQL examples for creating maps with free public datasets on both platforms.

👉 [Find the examples here](/docs/about/overture-maps-examples/)