---
title: "ST_ASWKT in BigQuery: 3 Working Examples"
description: "BigQuery has no ST_ASWKT. Use ST_ASTEXT to convert GEOGRAPHY to WKT. 3 SQL examples on Overture Maps roads, places, and boundaries."
lead: "3 SQL examples on Overture Maps roads, places, and boundaries."
date: 2026-04-17T05:00:00Z
lastmod: 2026-04-17T05:00:00Z
draft: false
weight: 20
toc: true
images: []
contributors: ["Vladi"]
menu:
  docs:
    parent: "knowledge-base"
    name: "ST_ASWKT in BigQuery"
---

## Short answer

BigQuery does not have `ST_ASWKT`. Use `ST_ASTEXT` to convert a `GEOGRAPHY` value to a WKT string.

| Engine | Function |
|---|---|
| BigQuery | `ST_ASTEXT(geography)` |
| Snowflake | `ST_ASWKT(geometry)` |
| PostGIS | `ST_AsText(geometry)` |

All three return the same WKT format (e.g. `POLYGON((...))`, `POINT(...)`).

## Why people search for "ST_ASWKT BigQuery"

Users coming from Snowflake or PostGIS expect `ST_ASWKT` to exist in BigQuery. It does not. The correct function is `ST_ASTEXT`, which takes a `GEOGRAPHY` and returns `STRING` in WKT format.

BigQuery also offers:

- `ST_ASBINARY(geography)` returns WKB bytes
- `ST_ASGEOJSON(geography)` returns GeoJSON string

## Example 1: Get WKT for Berlin boundary

Return the Berlin administrative boundary from Overture Maps as WKT.

```sql
SELECT
  names.primary AS city,
  ST_ASTEXT(geometry) AS geometry_wkt
FROM `bigquery-public-data.overture_maps.division_area`
WHERE country = 'DE'
  AND region = 'DE-BE'
  AND names.primary = 'Berlin'
  AND subtype = 'region'
  AND class = 'land';
```
{{< view-on-map report="fdd7806b-507c-4800-9d53-57313fdad208" >}}

Result is a single row with a long `POLYGON((...))` or `MULTIPOLYGON((...))` string you can paste into other tools.

## Example 2: Export Nevada highways as WKT

Useful when moving Overture geometries into PostGIS, QGIS, or any tool that reads WKT.

```sql
WITH nevada AS (
  SELECT geometry
  FROM `bigquery-public-data.overture_maps.division_area`
  WHERE country = 'US' AND region = 'US-NV' AND subtype = 'region'
)
SELECT
  s.id,
  s.class,
  ST_ASTEXT(s.geometry) AS wkt
FROM `bigquery-public-data.overture_maps.segment` s, nevada
WHERE s.subtype = 'road'
  AND s.class IN ('motorway', 'trunk', 'primary')
  AND ST_WITHIN(s.geometry, nevada.geometry);
```
{{< view-on-map report="b3c2a63d-d6eb-4a15-bcb2-325cdfd95e6c" >}}

## Example 3: WKT of EV charging stations in London

Places table from Overture Maps with point geometries.

```sql
WITH london AS (
  SELECT geometry
  FROM `bigquery-public-data.overture_maps.division_area`
  WHERE LOWER(names.primary) = 'london' AND country = 'GB'
)
SELECT
  p.names.primary AS station_name,
  ST_ASTEXT(p.geometry) AS point_wkt
FROM `bigquery-public-data.overture_maps.place` p, london
WHERE LOWER(p.categories.primary) LIKE '%charging%'
  AND ST_WITHIN(p.geometry, london.geometry);
```
{{< view-on-map report="b5551243-01f9-4e52-a0d5-f955a1d1430d" >}}

Each row returns a `POINT(lng lat)` string.

## Round-trip: parse WKT back into GEOGRAPHY

If you export to WKT and need to ingest it again, use `ST_GEOGFROMTEXT`:

```sql
SELECT ST_GEOGFROMTEXT('POINT(13.3777 52.5163)') AS brandenburg_gate;
```

See the full write-up: [ST_GEOGFROMTEXT polygon WKT examples](/docs/knowledge-base/st-geogfromtext-bigquery-polygon-wkt/).

## Common pitfalls

- `ST_ASTEXT` returns `STRING`, not `BYTES`. For WKB use `ST_ASBINARY`.
- BigQuery uses `GEOGRAPHY` (spherical, WGS84). WKT order is always `longitude latitude`.
- Very large polygons produce very large strings. Export in chunks or use GeoParquet for large transfers.
- `ST_ASTEXT(NULL)` returns `NULL`, not an empty string.

## See also

- [Overture Maps examples in BigQuery](/docs/about/overture-maps-examples/) - 15 ready-to-run queries with live maps.
- [ST_GEOGFROMTEXT polygon WKT examples](/docs/knowledge-base/st-geogfromtext-bigquery-polygon-wkt/)
