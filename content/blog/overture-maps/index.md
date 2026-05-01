---
title: "Why We Stopped using OpenStreetMap and switched to Overture Maps on BigQuery and Snowflake"
description: "The OSM BigQuery Public Dataset is two years stale. Query fresh Overture Maps in BigQuery and Snowflake with copy-paste SQL."
lead: "The OSM BigQuery Dataset is two years stale. Query fresh Overture Maps in BigQuery and Snowflake with copy-paste SQL."
date: 2024-06-28T06:59:51Z
lastmod: 2024-06-28T06:59:51Z
draft: false
weight: 1
images: ["1716710901364.jpeg"]
contributors: ["Vladi"]
---

{{< img src="1716710901364.jpeg"  caption="Switching from OSM to Overture Maps" class="wide" >}}

### The Problem with the OpenStreetMap BigQuery Public Dataset

For years, the **OpenStreetMap BigQuery Public Dataset** was our default for spatial data in **BigQuery**. Then it stopped getting updates. The **OSM BigQuery Public Dataset hasn’t been refreshed in two years**, which means every team using it has to maintain its own OSM export pipeline.

Loading multi-gigabyte OSM files just to end up with stale data is not a workflow. We needed something current and queryable in place.

### Why We Switched to Overture Maps

### 1. **Faster Queries with BigQuery and Snowflake Integration**

**Overture Maps** is available natively on **BigQuery** and **Snowflake** ([install guide for Snowflake](/docs/knowledge-base/overture-maps-snowflake-marketplace/)). No GeoParquet downloads, no 200GB local files, no ETL. You query the maps where your data already lives.

That makes **geospatial SQL queries** run in seconds and removes the biggest performance bottleneck in our old setup.

Filter roads in Nevada by class and speed limit, directly on Overture.

**BigQuery SQL:**

```sql
WITH nevada_geometry AS (
  SELECT geometry
  FROM `bigquery-public-data.overture_maps.division_area`
  WHERE country = 'US' AND region = 'US-NV'
    AND subtype = 'region' AND class = 'land'
)
SELECT s.geometry,
       s.class,
       s.speed_limits.list[SAFE_OFFSET(0)].element.max_speed.value AS speed_limit
FROM `bigquery-public-data.overture_maps.segment` AS s, nevada_geometry AS ng
WHERE s.subtype = 'road'
  AND ST_INTERSECTS(s.geometry, ng.geometry);
```

{{< view-on-map report="5c3340e7-b476-4a62-9ad7-21288e20d6ac" >}}

**Snowflake SQL** (Overture Maps Marketplace shares):

```sql
WITH nevada_geometry AS (
  SELECT geometry
  FROM overture_maps__divisions.carto.division_area
  WHERE country = 'US' AND region = 'US-NV'
    AND subtype = 'region' AND class = 'land'
)
SELECT s.geometry,
       s.class,
       TRY_CAST(s.speed_limits[0]:max_speed:value::string AS INTEGER) AS speed_limit
FROM overture_maps__transportation.carto.segment AS s
CROSS JOIN nevada_geometry AS ng
WHERE s.subtype = 'road'
  AND ST_INTERSECTS(s.geometry, ng.geometry);
```

Runs directly on the Overture dataset. No extracts, no preprocessing.

### 2. **Seamless Data Integration via SQL Joins**

Because Overture Maps lives in BigQuery and Snowflake, you can **join your own tables** against it with plain SQL. Sales, fleet, logistics, GPS pings, all of it stays in your warehouse and meets the map data there.

Join a company’s GPS data with Overture roads to analyze fleet routes in Berlin.

**BigQuery SQL:**

```sql
WITH berlin_boundary AS (
  SELECT geometry
  FROM `bigquery-public-data.overture_maps.division_area`
  WHERE LOWER(names.primary) = "berlin"
)
SELECT s.id, s.geometry, gps_data.lat, gps_data.lon
FROM `bigquery-public-data.overture_maps.segment` s
JOIN your_company.gps_data gps_data
ON ST_CONTAINS(berlin_boundary.geometry, ST_GEOGPOINT(gps_data.lon, gps_data.lat))
WHERE s.subtype = 'road';
```

**Snowflake SQL:**

```sql
WITH berlin_boundary AS (
  SELECT geometry
  FROM overture_maps__divisions.carto.division_area
  WHERE country = 'DE' AND region = 'DE-BE'
    AND subtype = 'region' AND class = 'land'
    AND LOWER(names:primary::string) = 'berlin'
)
SELECT s.id, s.geometry, gps_data.lat, gps_data.lon
FROM overture_maps__transportation.carto.segment s
CROSS JOIN berlin_boundary b
JOIN your_company.gps_data gps_data
  ON ST_CONTAINS(b.geometry, ST_MAKEPOINT(gps_data.lon, gps_data.lat))
WHERE s.subtype = 'road';
```

### 3. **Creating Maps Directly from SQL Queries**

With Overture in the warehouse, you can **build interactive maps straight from a SQL query**. No exports, no GIS tool in the middle. Run the query, see the map, iterate.

That works well for routing, traffic analysis, city boundaries, land use, and anything else where the answer is on a map.

→ [Examples for BigQuery](/docs/about/overture-maps-examples/)

→ [Examples for Snowflake](/docs/knowledge-base/overture-maps-snowflake-marketplace/)

