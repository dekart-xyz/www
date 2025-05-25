---
title: "BigQuery Overture Maps Examples"
description: "Collection of kepler.gl maps created from Overture Data in BigQuery public dataset using SQL and Dekart."
lead: ""
date: 2024-08-28T07:26:19+02:00
lastmod: 2024-09-23T07:26:19+02:00
draft: false
images: ["77dc6f7f-c91c-4099-8dc3-8f043d46cdfb.png"]
menu:
  docs:
    parent: "examples"
    name: "BigQuery Overture Maps"
weight: 999
toc: true
canonical: ""
---


Collection of kepler.gl maps created from Overture Data in BigQuery public dataset using BigQuery SQL and Dekart. Each example includes a SQL query and a visualized map.

<div class="gpt" >
  <p>All examples are created with <b>Overture Maps GPT</b></p><p><a href="https://chatgpt.com/g/g-onSLtzQQB-overture-maps-gpt?ref=gpt-link" class="btn btn-outline-primary" target="_blank">Get it Free</a></p>
</div>

## Segment

The Overture Maps `segment` table represents paths, roads, and transportation segments, storing their geospatial data as LineStrings along with attributes like class, surface, speed limits, and access restrictions​.


### Nevada Roads by Speed and Class
{{< img src="77dc6f7f-c91c-4099-8dc3-8f043d46cdfb.png" cloud="77dc6f7f-c91c-4099-8dc3-8f043d46cdfb" >}}

```sql
-- Step 1: Get the geometry of Nevada
WITH nevada_geometry AS (
  SELECT
    geometry
  FROM
    `bigquery-public-data.overture_maps.division_area`
  WHERE
    country = 'US'
    AND region = 'US-NV'
    AND subtype = 'region'
)

-- Step 2: Select roads within Nevada
SELECT
  s.geometry,
  s.class,
  s.road,
  SAFE_CAST(JSON_EXTRACT_SCALAR(s.road, '$.restrictions.speed_limits[0].max_speed.value') AS INT64) AS speed_limit
FROM
  `bigquery-public-data.overture_maps.segment` AS s,
  nevada_geometry AS ng
WHERE
  s.subtype = 'road'
  and class not in ('track', 'driveway', 'path', 'footway', 'sidewalk', 'pedestrian', 'cycleway', 'steps', 'crosswalk', 'bridleway', 'alley')
  AND ST_WITHIN(s.geometry, ng.geometry)

```
{{< try-query-cloud report="77dc6f7f-c91c-4099-8dc3-8f043d46cdfb" >}}

### Berlin Roads
{{< img src="410b857a-aad1-4f05-8ddd-551d0f0fe650.png" cloud="410b857a-aad1-4f05-8ddd-551d0f0fe650" >}}

```sql
WITH berlin_boundary AS (
    SELECT geometry
    FROM `bigquery-public-data.overture_maps.division_area`
    WHERE LOWER(names.primary) = "berlin"
    AND country = "DE"
)
SELECT s.id, s.geometry, s.class, s.subtype
FROM `bigquery-public-data.overture_maps.segment` s
JOIN berlin_boundary b
ON ST_CONTAINS(b.geometry, s.geometry)  -- Spatial filter for roads inside Berlin boundary
WHERE s.subtype = 'road'
AND s.class IN ('primary', 'secondary', 'tertiary');

```
{{< try-query-cloud report="410b857a-aad1-4f05-8ddd-551d0f0fe650" >}}

### Nevada highways and main roads
{{< img src="db0e26c2-00b0-4f6b-8f21-a26ab312f9e1.png" cloud="db0e26c2-00b0-4f6b-8f21-a26ab312f9e1" >}}

```sql
-- Step 1: Get the simplified geometry of Nevada
WITH nevada_geometry AS (
  SELECT
    ST_SIMPLIFY(geometry, 0.01) AS geometry
  FROM
    OVERTURE_MAPS__DIVISIONS.CARTO.DIVISION_AREA
  WHERE
    country = 'US'
    AND region = 'US-NV'
    AND subtype = 'region'
)

-- Step 2: Select main roads and highways within simplified Nevada geometry and convert geometry to WKT
SELECT
  ST_ASWKT(s.geometry) AS geo,
  s.class
FROM
  OVERTURE_MAPS__TRANSPORTATION.CARTO.SEGMENT AS s
  JOIN nevada_geometry AS ng ON ST_WITHIN(s.geometry, ng.geometry)
WHERE
  s.subtype = 'road'
  AND s.class IN ('primary', 'secondary', 'tertiary', 'trunk', 'motorway')

```
{{< try-query-cloud report="db0e26c2-00b0-4f6b-8f21-a26ab312f9e1" >}}

### Germany & France Road Networks
{{< img src="a4e308a3-b2e8-4183-bfd6-b68866209f50.png" cloud="a4e308a3-b2e8-4183-bfd6-b68866209f50" >}}

```sql
WITH country_boundaries AS (
    -- Define the boundaries for Germany and France
    SELECT geometry, country
    FROM `bigquery-public-data.overture_maps.division_area`
    WHERE country IN ("DE", "FR")
    AND subtype = "country"  -- Ensure we're selecting the entire country boundaries
),
filtered_roads AS (
    -- Filter the roads inside the Germany and France boundaries that are accessible to cars, including main roads but excluding highways
    SELECT s.id, s.geometry, s.class, s.subtype, b.country,
           ST_LENGTH(s.geometry) / 1000 AS road_length_km  -- Convert road length to kilometers
    FROM `bigquery-public-data.overture_maps.segment` s
    JOIN country_boundaries b
    ON ST_CONTAINS(b.geometry, s.geometry)  -- Spatial filter for roads inside Germany and France boundaries
    WHERE s.subtype = 'road'
    AND s.class IN ('primary', 'secondary', 'tertiary')  -- Main roads for traffic, excluding highways
),
hexagonized_roads AS (
    -- Assign each road segment to an H3 hexagon at level 7
    SELECT
        id,
        country,
        `bqcarto.h3.ST_ASH3`(ST_CENTROID(s.geometry), 7) AS h3_hexagon,  -- H3 hexagon for each road segment at level 5
        road_length_km  -- Use the length in kilometers
    FROM filtered_roads s
)
-- Aggregate the total length of roads for each hexagon and country
SELECT country, h3_hexagon, SUM(road_length_km) AS total_road_length_km
FROM hexagonized_roads
GROUP BY country, h3_hexagon
ORDER BY total_road_length_km DESC;

  ```
{{< try-query-cloud report="a4e308a3-b2e8-4183-bfd6-b68866209f50" >}}

### Road density US
{{< img src="eb5b25bf-4c62-44bc-9e69-f0257134e3f8.png" cloud="eb5b25bf-4c62-44bc-9e69-f0257134e3f8" >}}

```sql
WITH country_boundaries AS (
    -- Define the boundaries for the US
    SELECT geometry, country
    FROM `bigquery-public-data.overture_maps.division_area`
    WHERE country = "US"
    AND subtype = "country"  -- Ensure we're selecting the entire country boundaries
),
filtered_roads AS (
    -- Filter the roads inside the US boundaries that are accessible to cars, including main roads but excluding highways
    SELECT s.id, s.geometry, s.class, s.subtype, b.country,
           ST_LENGTH(s.geometry) / 1000 AS road_length_km  -- Convert road length to kilometers
    FROM `bigquery-public-data.overture_maps.segment` s
    JOIN country_boundaries b
    ON ST_CONTAINS(b.geometry, s.geometry)  -- Spatial filter for roads inside US boundaries
    WHERE s.subtype = 'road'
    AND s.class IN ('primary', 'secondary', 'tertiary')  -- Main roads for traffic, excluding highways
),
hexagonized_roads AS (
    -- Assign each road segment to an H3 hexagon at level 6
    SELECT
        id,
        country,
        `bqcarto.h3.ST_ASH3`(ST_CENTROID(s.geometry), 6) AS h3_hexagon,  -- H3 hexagon for each road segment at level 5
        road_length_km  -- Use the length in kilometers
    FROM filtered_roads s
)
-- Aggregate the total length of roads for each hexagon and country
SELECT country, h3_hexagon, SUM(road_length_km) AS total_road_length_km
FROM hexagonized_roads
GROUP BY country, h3_hexagon
ORDER BY total_road_length_km DESC;
```

{{< try-query-cloud report="eb5b25bf-4c62-44bc-9e69-f0257134e3f8" >}}

### Joining GPS probes with road geometry

{{< img src="8693cbeb-8369-4f38-91a4-5638589998e5.png" cloud="8693cbeb-8369-4f38-91a4-5638589998e5" >}}

```sql
-- Step 1: Generate H3 indexes for road geometries
WITH brandenburg_gate AS (
  SELECT ST_GEOGPOINT(13.3777, 52.5163) AS location
),
road_segments AS (
  SELECT id, geometry
  FROM `bigquery-public-data.overture_maps.segment`
  WHERE ST_DISTANCE(geometry, (SELECT location FROM brandenburg_gate)) <= 10000
  AND subtype = 'road'
),
road_h3_cells AS (
  SELECT id AS road_id,
         geometry,  -- Include geometry in the result
         bqcarto.h3.ST_ASH3(ST_LINEINTERPOLATEPOINT(geometry, ratio), 12) AS h3_index
  FROM road_segments,
  UNNEST(GENERATE_ARRAY(0, 1, 0.01)) AS ratio -- Generate H3 for road geometries
),

-- Step 2: Generate H3 indexes for dekart-dev.strava.streams points
strava_h3_cells AS (
  SELECT bqcarto.h3.LONGLAT_ASH3(lng, lat, 12) AS h3_index, velocity_smooth
  FROM `dekart-dev.strava.streams`
  WHERE ST_DISTANCE(
    ST_GEOGPOINT(lng, lat), (SELECT location FROM brandenburg_gate)
  ) <= 10000
)

-- Step 3: Join road geometries with strava points based on H3 index
SELECT
  r.road_id,
  ANY_VALUE(r.geometry) AS geometry,  -- Use ANY_VALUE() to select a representative geometry
  COUNT(s.h3_index) AS num_strava_points,
  AVG(s.velocity_smooth) AS avg_velocity_smooth,
  MAX(s.velocity_smooth) AS max_velocity_smooth
FROM road_h3_cells r
LEFT JOIN strava_h3_cells s
ON r.h3_index = s.h3_index
GROUP BY r.road_id;

```
{{< try-query-cloud report="8693cbeb-8369-4f38-91a4-5638589998e5" >}}


## Division Area

The Overture Maps division_area table contains boundary polygons for administrative areas, such as cities, countries, and neighborhoods, along with related attributes like subtype, population, and country codes​.

### Berlin Boundary

{{< img src="5f7144cd-24f0-4698-ba7e-a63e872a4659.png" cloud="5f7144cd-24f0-4698-ba7e-a63e872a4659" >}}

```sql
  SELECT id, geometry, names, subtype, country, region
FROM `bigquery-public-data.overture_maps.division_area`
WHERE names.primary = 'Berlin'
AND country = 'DE'
```
{{< try-query-cloud report="5f7144cd-24f0-4698-ba7e-a63e872a4659" >}}

<!-- ffbe0a05-7794-465c-ab5b-de54d69cdb38 -->
### Regions and Cities in France

{{< img src="ffbe0a05-7794-465c-ab5b-de54d69cdb38.png" cloud="ffbe0a05-7794-465c-ab5b-de54d69cdb38" >}}

```sql
SELECT
  division_id,
  names.primary AS division_name,
  subtype,
  geometry
FROM
  `bigquery-public-data.overture_maps.division_area`
WHERE
  country = 'FR' -- ISO code for France
  AND subtype IN ('region', 'city') -- Filtering for regions and cities
ORDER BY
  subtype;
```
{{< try-query-cloud report="ffbe0a05-7794-465c-ab5b-de54d69cdb38" >}}

## Land Use

The Overture Maps `land_use` table represents different types of land use, such as residential, agricultural, industrial, and others, by storing their spatial data as polygons or multipolygons, along with attributes like subtype, class, surface, and names.

<!-- 34d0ba2c-0fd5-4323-a677-d5b05b65d86d -->

### Berlin Playgrounds

{{< img src="34d0ba2c-0fd5-4323-a677-d5b05b65d86d.png" cloud="34d0ba2c-0fd5-4323-a677-d5b05b65d86d" >}}

```sql
SELECT id, subtype, class, geometry, surface, level
FROM `bigquery-public-data.overture_maps.land_use`
WHERE ST_WITHIN(geometry, ST_GEOGFROMTEXT('POLYGON((13.08835 52.33826, 13.76116 52.33826, 13.76116 52.67551, 13.08835 52.67551, 13.08835 52.33826))'))
AND LOWER(class) = 'playground'
```
{{< try-query-cloud report="34d0ba2c-0fd5-4323-a677-d5b05b65d86d" >}}

### All parks in London

{{< img src="8cb1566f-0237-4d99-9cc4-bdd70859763a.png" cloud="8cb1566f-0237-4d99-9cc4-bdd70859763a" >}}

```sql
SELECT
    id,
    geometry,
    names.primary AS primary_name,
    subtype,
    country,
    region
FROM
    `bigquery-public-data.overture_maps.division_area`
WHERE
    names.primary = "London"
    AND country = 'GB'  -- ISO code for the United Kingdom
    AND subtype = 'locality';  -- Ensure we are selecting a city or locality
```
{{< try-query-cloud report="8cb1566f-0237-4d99-9cc4-bdd70859763a" >}}

### Ukraine Schools

{{< img src="f0941a67-350f-4a80-a9d0-27594f2f853d.png" cloud="f0941a67-350f-4a80-a9d0-27594f2f853d" >}}

```sql
WITH ukraine_boundary AS (
  SELECT geometry
  FROM `bigquery-public-data.overture_maps.division_area`
  WHERE LOWER(names.primary) = 'ukraine'
  AND subtype = 'country'
)

SELECT l.id, l.names.primary, l.geometry, l.subtype, l.class
FROM `bigquery-public-data.overture_maps.land_use` l, ukraine_boundary u
WHERE ST_WITHIN(l.geometry, u.geometry)
AND LOWER(l.subtype) = 'education'
AND LOWER(l.class) = 'school';
```
{{< try-query-cloud report="f0941a67-350f-4a80-a9d0-27594f2f853d" >}}

## Places

The `place` table in the Overture Maps dataset contains points of interest (POIs) such as businesses, amenities, and public facilities.


### London EV Charging Density

{{< img src="af836766-9ec4-40fc-afbe-fc6b32d6593b.png" cloud="af836766-9ec4-40fc-afbe-fc6b32d6593b" >}}

```sql
WITH london_boundary AS (
  SELECT geometry
  FROM `bigquery-public-data.overture_maps.division_area`
  WHERE LOWER(names.primary) = 'london'
  AND country = 'GB'
),
ev_charging_stations AS (
  SELECT
    p.geometry
  FROM
    `bigquery-public-data.overture_maps.place` AS p,
    london_boundary AS lb
  WHERE
    ST_WITHIN(p.geometry, lb.geometry)
    AND LOWER(p.categories.primary) LIKE '%charging%'
)
SELECT
  bqcarto.h3.ST_ASH3(ev.geometry, 6) AS h3_cell,
  COUNT(*) AS station_count
FROM
  ev_charging_stations ev
GROUP BY
  h3_cell;

```
{{< try-query-cloud report="af836766-9ec4-40fc-afbe-fc6b32d6593b" >}}

### Las Vegas EV Charging


{{< img src="72781fb6-8bc5-4c41-839f-66f5bcf7c122.png" cloud="72781fb6-8bc5-4c41-839f-66f5bcf7c122" >}}

```sql
  WITH las_vegas_boundary AS (
  SELECT geometry
  FROM `bigquery-public-data.overture_maps.division_area`
  WHERE names.primary = "Las Vegas"
  AND region = "US-NV"
  AND subtype = "locality"
)

SELECT p.id, p.geometry, p.names.primary AS station_name, p.addresses, p.websites, p.phones
FROM `bigquery-public-data.overture_maps.place` AS p, las_vegas_boundary AS lv
WHERE (p.categories.primary LIKE "%charging%" OR p.categories.primary LIKE "%ev%")
AND ST_WITHIN(p.geometry, lv.geometry)
```
{{< try-query-cloud report="72781fb6-8bc5-4c41-839f-66f5bcf7c122" >}}

### UK pubs density

{{< img src="3205a875-b5d7-4458-a0b9-74fdeb49a44b.png" cloud="3205a875-b5d7-4458-a0b9-74fdeb49a44b" >}}

```sql
WITH uk_boundary AS (
  SELECT geometry
  FROM `bigquery-public-data.overture_maps.division_area`
  WHERE LOWER(country) = 'gb' AND subtype = 'country' AND class = 'land'
),
pubs AS (
  SELECT p.id, p.geometry, p.names.primary
  FROM `bigquery-public-data.overture_maps.place` AS p, uk_boundary
  WHERE p.categories.primary = 'pub'
  AND ST_WITHIN(p.geometry, uk_boundary.geometry)
)
SELECT bqcarto.h3.ST_ASH3(p.geometry, 8) AS h3_index, COUNT(p.id) AS pub_count
FROM pubs AS p
GROUP BY h3_index
ORDER BY pub_count DESC
```
{{< try-query-cloud report="3205a875-b5d7-4458-a0b9-74fdeb49a44b" >}}
