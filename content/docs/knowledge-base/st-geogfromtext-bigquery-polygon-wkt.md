---
title: "ST_GEOGFROMTEXT in BigQuery: 4 SQL Examples"
description: "Parse polygon WKT with ST_GEOGFROMTEXT in BigQuery. 4 SQL examples using Overture Maps roads, places, and boundaries."
lead: "4 SQL examples using Overture Maps roads, places, and boundaries."
date: 2026-04-17T05:00:00Z
lastmod: 2026-04-17T05:00:00Z
draft: false
weight: 30
toc: true
images: []
contributors: ["Vladi"]
menu:
  docs:
    parent: "knowledge-base"
    name: "ST_GEOGFROMTEXT in BigQuery"
---

## Short answer

`ST_GEOGFROMTEXT(wkt_string)` parses a WKT string into a BigQuery `GEOGRAPHY`. It accepts `POINT`, `LINESTRING`, `POLYGON`, `MULTIPOLYGON`, and other standard WKT types.

```sql
SELECT ST_GEOGFROMTEXT('POLYGON((13.08 52.33, 13.76 52.33, 13.76 52.67, 13.08 52.67, 13.08 52.33))') AS berlin_bbox;
```

Coordinate order is always `longitude latitude`. Polygons must close (first point equals last point).

## Signature

```sql
ST_GEOGFROMTEXT(wkt STRING [, oriented BOOL])
```

- `wkt`: a valid WKT string.
- `oriented` (optional): if `TRUE`, respects ring orientation for polygons that span more than a hemisphere. Default `FALSE` assumes the smaller side.

## Example 1: Filter Overture roads by a bounding polygon

Define a bounding polygon around Berlin, then pull all primary roads from Overture Maps inside it.

```sql
WITH bbox AS (
  SELECT ST_GEOGFROMTEXT(
    'POLYGON((13.08835 52.33826, 13.76116 52.33826, 13.76116 52.67551, 13.08835 52.67551, 13.08835 52.33826))'
  ) AS geometry
)
SELECT s.id, s.class, s.geometry
FROM `bigquery-public-data.overture_maps.segment` s, bbox
WHERE s.subtype = 'road'
  AND s.class IN ('primary', 'secondary', 'tertiary')
  AND ST_WITHIN(s.geometry, bbox.geometry);
```
{{< view-on-map report="c9ed55a8-1101-48fe-bc28-d46f2fac36e7" >}}

Use this pattern when you have a manual area of interest and do not want to join to `division_area`.

## Example 2: Playgrounds inside a custom polygon

The Overture `land_use` table with a WKT filter.

```sql
SELECT id, class, surface, geometry
FROM `bigquery-public-data.overture_maps.land_use`
WHERE ST_WITHIN(
    geometry,
    ST_GEOGFROMTEXT('POLYGON((13.08835 52.33826, 13.76116 52.33826, 13.76116 52.67551, 13.08835 52.67551, 13.08835 52.33826))')
  )
  AND LOWER(class) = 'playground';
```
{{< view-on-map report="bae91ef4-2649-4349-af61-f7e94caf9e39" >}}

## Example 3: MULTIPOLYGON for two cities at once

WKT supports `MULTIPOLYGON` for disjoint areas.

```sql
SELECT p.names.primary AS station_name, p.geometry
FROM `bigquery-public-data.overture_maps.place` p
WHERE LOWER(p.categories.primary) LIKE '%charging%'
  AND ST_WITHIN(
    p.geometry,
    ST_GEOGFROMTEXT('MULTIPOLYGON(((13.09 52.34, 13.76 52.34, 13.76 52.67, 13.09 52.67, 13.09 52.34)),((-0.51 51.28, 0.33 51.28, 0.33 51.69, -0.51 51.69, -0.51 51.28)))')
  );
```
{{< view-on-map report="0059d3ac-a29c-4c9a-af44-f9cd6f38543e" >}}

Returns EV charging stations in both Berlin and London in a single query.

Inlining `ST_GEOGFROMTEXT` directly inside `ST_WITHIN` lets BigQuery push the spatial predicate down and use geometry clustering on the `place` table. Wrapping the WKT in a CTE and cross-joining forces a full table scan.

## Example 4: Build polygon from coordinates inline

Useful when coordinates come from a parameter or upstream CTE.

```sql
WITH corners AS (
  SELECT 13.08835 AS min_lng, 52.33826 AS min_lat,
         13.76116 AS max_lng, 52.67551 AS max_lat
)
SELECT ST_GEOGFROMTEXT(
  FORMAT(
    'POLYGON((%f %f, %f %f, %f %f, %f %f, %f %f))',
    min_lng, min_lat,
    max_lng, min_lat,
    max_lng, max_lat,
    min_lng, max_lat,
    min_lng, min_lat
  )
) AS bbox
FROM corners;
```
{{< view-on-map report="118b6243-3a3f-458a-a58f-e0056b52a4bf" >}}

## Common pitfalls

- **Coordinate order is `longitude latitude`**, not `lat lng`. Everything "upside-down" usually means swapped coordinates.
- **Polygons must close**. The first and last point must match exactly.
- **No self-intersections**. Invalid polygons raise a runtime error. Validate with `ST_ISVALID` in PostGIS before export, or simplify with `ST_SIMPLIFY`.
- **Large WKT strings** (>1 MB) can exceed row size limits. Use `ST_GEOGFROMGEOJSON` or load as a table instead.
- **Antimeridian crossing**: when a polygon is larger than a hemisphere (rare), pass `oriented => TRUE`.

## Alternatives

| Need | Function |
|---|---|
| Parse GeoJSON | `ST_GEOGFROMGEOJSON(json_string)` |
| Parse WKB bytes | `ST_GEOGFROMWKB(bytes)` |
| Build a point fast | `ST_GEOGPOINT(lng, lat)` |
| Export back to WKT | [`ST_ASTEXT(geometry)`](/docs/knowledge-base/st-aswkt-bigquery/) |

## See also

- [Overture Maps examples in BigQuery](/docs/about/overture-maps-examples/) - 15 ready-to-run queries with live maps.
- [ST_ASWKT in BigQuery (use ST_ASTEXT)](/docs/knowledge-base/st-aswkt-bigquery/)
