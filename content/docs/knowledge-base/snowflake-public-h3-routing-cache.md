---
title: "Snowflake Public H3 Routing Cache"
description: "Copy-paste SQL examples for public H3 routing cache datasets in Snowflake."
lead: "Use public H3 routing caches in Snowflake with ready-to-map SQL."
date: 2026-06-11T00:00:00Z
lastmod: 2026-06-11T00:00:00Z
draft: false
weight: 35
toc: true
images: []
contributors: ["Vladi"]
menu:
  docs:
    parent: "knowledge-base"
    name: "Snowflake Public H3 Routing Cache"
---

## How to use these examples

Install a public H3 routing cache from Snowflake Marketplace, then paste the matching SQL example into a Snowflake worksheet.

The examples use `SCHEMA.TABLE` names, not `DATABASE.SCHEMA.TABLE` names. Snowflake Marketplace consumers choose their own database name when installing a listing.

## UK H3 Travel Matrix

The UK H3 Travel Matrix is an origin-destination routing cache for travel analysis in the United Kingdom. Each row represents travel between one origin H3 cell and one destination H3 cell.

The matrix was computed by Snowflake from heavy ground-vehicle routing, not simple straight-line distance or normal passenger-car estimates. Generating country-wide time-distance matrices requires substantial routing compute. This public cache makes the result available for analysis without running the full routing job yourself.

Snowflake's routing examples show how routing workloads can run inside Snowflake with Snowpark Container Services, including directions, optimization, isochrones, and time-distance matrices. See [Build Routing Solution in Snowflake with Snowflake CoCo](https://www.snowflake.com/en/developers/guides/oss-install-openrouteservice-native-app/) and the [Snowflake Labs route optimization simulator](https://github.com/Snowflake-Labs/sfguide-create-a-route-optimisation-and-vehicle-route-plan-simulator).

Main table:

```text
FLEET_ANALYTICS.UK_H3_TRAVEL_MATRIX
```

Columns:

| Column | Type | Description |
|---|---|---|
| `ORIGIN_H3` | `VARCHAR` | Origin H3 cell. |
| `DEST_H3` | `VARCHAR` | Destination H3 cell. |
| `TRAVEL_TIME_SECONDS` | `FLOAT` | Estimated travel time in seconds. |
| `TRAVEL_DISTANCE_METERS` | `FLOAT` | Estimated travel distance in meters. |
| `CALCULATED_AT` | `TIMESTAMP` | Timestamp when the route metric was calculated. |

## Map travel times from London

This query maps travel time from one London H3 cell to reachable UK destination cells.

```sql
-- London H3 cell:
-- SELECT H3_POINT_TO_CELL_STRING(TO_GEOGRAPHY('POINT(-0.1218076741 51.492116613)'), 7);

SELECT
  dest_h3,
  ROUND(travel_time_seconds / 3600.0, 1) AS travel_hours,
  ROUND(travel_distance_meters / 1000.0, 1) AS travel_km,
  ST_X(H3_CELL_TO_POINT(dest_h3)) AS longitude,
  ST_Y(H3_CELL_TO_POINT(dest_h3)) AS latitude
FROM FLEET_ANALYTICS.UK_H3_TRAVEL_MATRIX
WHERE origin_h3 = '87194ad14ffffff'
  AND travel_time_seconds IS NOT NULL;
```

Use `longitude` and `latitude` as point columns in a map. Color by `travel_hours` to see travel time from London.

## Germany H3 Travel Matrix

The Germany H3 Travel Matrix is an origin-destination routing cache for travel analysis in Germany.

Main table:

```text
FLEET_ANALYTICS.GERMANY_H3_TRAVEL_MATRIX
```

Helper views:

```text
FLEET_ANALYTICS.GERMANY_H3_BERLIN_ROUTING_TIME_SAMPLE
FLEET_ANALYTICS.GERMANY_H3_TRAVEL_MATRIX_METADATA
```

The Germany table currently contains `3,180,149,440` loaded origin-destination rows from `223` Parquet shards. Two source shards were excluded because the available local files were corrupted and unreadable: `data_0_0_12.snappy.parquet` and `data_0_0_27.snappy.parquet`. The metadata view exposes these excluded file names and their `23,760,896` source-metadata rows.

## Map travel times from Berlin

This query maps travel time from one Berlin H3 cell to reachable Germany destination cells.

```sql
-- Berlin H3 cell:
-- SELECT H3_POINT_TO_CELL_STRING(TO_GEOGRAPHY('POINT(13.4050 52.5200)'), 7);

SELECT
  dest_h3,
  ROUND(travel_time_seconds / 3600.0, 1) AS travel_hours,
  ROUND(travel_distance_meters / 1000.0, 1) AS travel_km,
  ST_X(H3_CELL_TO_POINT(dest_h3)) AS longitude,
  ST_Y(H3_CELL_TO_POINT(dest_h3)) AS latitude
FROM FLEET_ANALYTICS.GERMANY_H3_TRAVEL_MATRIX
WHERE origin_h3 = '871f1d4d6ffffff'
  AND travel_time_seconds IS NOT NULL;
```

Use `longitude` and `latitude` as point columns in a map. Color by `travel_hours` to see travel time from Berlin.

## Choosing another origin

Snowflake's H3 functions can convert a longitude/latitude point into an H3 cell:

```sql
SELECT H3_POINT_TO_CELL_STRING(TO_GEOGRAPHY('POINT(-0.1218076741 51.492116613)'), 7);
```

For repeated queries, calculate the H3 cell once and paste the literal value into the `WHERE origin_h3 = ...` filter. This helps Snowflake prune the table efficiently.

## Query patterns

Travel time from one origin to all reachable destinations:

```sql
SELECT *
FROM FLEET_ANALYTICS.UK_H3_TRAVEL_MATRIX
WHERE origin_h3 = '87194ad14ffffff'
  AND travel_time_seconds IS NOT NULL;
```

Travel time to one destination from many origins:

```sql
SELECT
  origin_h3,
  ROUND(travel_time_seconds / 3600.0, 1) AS travel_hours,
  ST_X(H3_CELL_TO_POINT(origin_h3)) AS longitude,
  ST_Y(H3_CELL_TO_POINT(origin_h3)) AS latitude
FROM FLEET_ANALYTICS.UK_H3_TRAVEL_MATRIX
WHERE dest_h3 = '87194ad14ffffff'
  AND travel_time_seconds IS NOT NULL;
```

## Performance notes

The UK H3 Travel Matrix table is clustered by `ORIGIN_H3`, so origin-based lookups are the fastest path. Prefer a literal H3 value in filters instead of calculating it inline for every query.

The Germany H3 Travel Matrix table is also clustered by `ORIGIN_H3`. In a benchmark on an X-Small warehouse, the Berlin query returned `74,796` rows in about five seconds after clustering.

For exploratory maps, start with one origin or one destination cell. Full-table scans over all origin-destination pairs can be expensive.

## See also

- [Snowflake H3 function reference](https://docs.snowflake.com/en/sql-reference/functions/h3_point_to_cell_string)
- [Snowflake Kepler.gl map examples](/docs/about/snowflake-kepler-gl-examples/)
