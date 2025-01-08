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
<td>[outdated] Snowflake</td>
<td>1m 17s</td>
<td>63.61GB</td>
<td>$0.0556</td>
</tr>
<tr>
<td>Snowflake with Search Optimization</td>
<td>3.9s</td>
<td>364MB</td>
<td>$0.002527</td>
</tr>
</tbody>
</table>

#### *Update 2024–12–08*

After reaching out to the Snowflake dev team over LinkedIn, they confirmed that Snowflake Search Optimization was not applied in my query because of Enterprise Account limitations on a dataset publisher side.

This means that at the moment, no one can have search optimization for GIS queries on the official Overture Maps dataset in Snowflake.

#### *Update 2025–01–08*

After reading this article, Snowflake team made Search Optimization available for all users on the Overture Maps dataset.

Updates results added to the table.


### Query plans

{{< img src="query-plans.png" >}}

## Key insights

- BigQuery reads only a small portion of the table, leveraging clustering and geospatial partitioning effectively.
- Without Search Optimization Snowflake scans the whole table
- With Search Optimization, Snowflake is as efficient as BigQuery.

In this test, after Snowflake Search Optimization was applied, the performance of both platforms was similar.

## What’s next?

Check the next post where we compare platform in more realistic examples where geometry is not constant.

→ [Compare and optimize BigQuery and Snowflake performance on GIS queries. Part 2](http://localhost:1313/blog/compare-and-optimize-bigquery-and-snowflake-performance-on-gis-queries.-part-2./)