---
title: "Compare BigQuery and Snowflake performance on GIS queries."
description: "Compare BigQuery and Snowflake on GIS query performance. Explore execution times, costs, and efficiency in a Geometry-in-Polygon use case with real-world data from Overture Maps"
lead: "Geometry-in-Polygon Query."
date: 2024-12-03T05:59:51Z
lastmod: 2024-12-03T05:59:51Z
draft: false
weight: 50
images: ["dekart-map.png"]
contributors: ["Vladi"]
---

This is the first in a series of posts comparing BigQuery and Snowflake on GIS query performance. We’ll examine execution times, data scanned, and cost. This test focuses on a **Geometry-in-Polygon query** using constant geometry—a simple GIS use case.

## Setup

- BigQuery (price $5/Tb data processes)
- Snowflake (XS warehouse, $2.60/credit)
- Free Overture Maps Dataset available on both platforms from same provider
- Dekart to validate visually results

## Get all the roads in Berlin – constant geometry

I started from one most common scenario – geometry in polygons. Practical example: Get all the roads in Berlin. SQL function used ST_CONTAINS. Performance of this query would depend on scaling, clustering and partitioning of both databases.

Let’s start from simple case when geometry is constant in query.

{{< img src="dekart-map.png" cloud="e7884281-a440-458f-8d2a-5e6e60322c47" >}}

```sql
-- BigQuery
SELECT id, geometry, class, subtype
FROM `bigquery-public-data.overture_maps.segment`
WHERE subtype = 'road'
  AND class IN ('primary', 'secondary', 'tertiary')
  AND ST_CONTAINS(ST_GEOGFROMTEXT('MULTIPOLYGON(((...)))'), geometry);

```

```sql
-- Snowflake
SELECT id, geometry, class, subtype
FROM OVERTURE_MAPS__TRANSPORTATION.CARTO.SEGMENT
WHERE subtype = 'road'
  AND class IN ('primary', 'secondary', 'tertiary')
  AND ST_CONTAINS(
    ST_GEOGRAPHYFROMWKT('MULTIPOLYGON(((...)))'),
    geometry
  );
```

{{< try-query-cloud report="e7884281-a440-458f-8d2a-5e6e60322c47" >}}

### Result

<table class="table">
<thead>
<tr>
<th>Database</th>
<th>Duration</th>
<th>Bytes Scanned</th>
<th>Cost</th>
</tr>
</thead>
<tbody>
<tr>
<td>BigQuery</td>
<td>1s</td>
<td>516.05 MB</td>
<td>$0.002515</td>
</tr>
<tr>
<td>Snowflake</td>
<td>1m 17s</td>
<td>63.61GB</td>
<td>$0.0556</td>
</tr>
</tbody>
</table>

### Query plans

{{< img src="query-plans.png" >}}

## Key insights

- BigQuery reads only a small portion of the table, leveraging clustering and geospatial partitioning effectively.
- Snowflake reads ~80% of the table, with 89% of query time spent on Remote Disk I/O.

In this test, BigQuery is much faster and cheaper than Snowflake.

## Feature Gap

### Snowflake Search Optimization

In theory, the Snowflake search optimization service should improve the performance of queries with predicates that use geospatial functions with GEOGRAPHY objects. This feature requires Enterprise Edition according to the documentation. It has also required to be applied to the column.

I, tried to verify if feature is configured on dataset:

```sql
DESCRIBE SEARCH OPTIMIZATION ON OVERTURE_MAPS__TRANSPORTATION.CARTO.SEGMENT;
-- empty result
```

However, when I leave only ST_CONTAINS in the filter, Snowflake scans only 60% of the table, and I keep seeing Search Optimization Access node in the query planner.

*Update 2024–12–08*: After reaching out to the Snowflake dev team over LinkedIn, they confirmed that Snowflake Search Optimization was not applied in my query because of Enterprise Account limitations on a dataset publisher side.

This means that at my moment none can have search optimization for GIS queries on the official Overture Maps dataset in Snowflake.

### Bigger warehouse size

Will execution time become better with a bigger warehouse size on Snowflake? With 89% of the query time being Remote Disk I/O, it probably will not improve more than 10%.

## What is next?

While this difference between BigQuery and Snowflake seems astonishing, in the next post we will look at more realistic examples where geometry is not constant and comparison between databases is closer.

This article will be updated with feedback and links to other tests.