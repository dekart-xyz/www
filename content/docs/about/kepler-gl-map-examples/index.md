---
title: "BigQuery Kepler.gl Maps Examples"
description: "Kepler.gl maps examples created on Dekart with public BigQuery datasets, Overture Data, and OpenStreetMap data"
date: 2024-05-21T07:13:05+02:00
lastmod: 2024-11-09T07:13:05+02:00
images: []
menu:
  docs:
    parent: "examples"
    name: "BigQuery Public Datasets"
weight: 999
toc: true
canonical: ""
---

Dekart allows user create and share Kepler.gl maps from private and public BigQuery datasets, using SQL. It works particularly well with BigQuery GIS functions.

## Population density

Visualize population density anywhere in the world and at any level of detail

### EU Population Density

  {{< img src="a70515ee-ecbb-4aac-8ce1-cf508483e2dc.png" cloud="a70515ee-ecbb-4aac-8ce1-cf508483e2dc" >}}

  ```sql
-- CTE for retrieving the latest population data for each geo_id in specified countries
WITH latest_population AS (
  SELECT
    geo_id,
    MAX(last_updated) AS last_updated  -- Finds the most recent update date for each geo_id
  FROM
    `bigquery-public-data.worldpop.population_grid_1km` AS pop
  WHERE
    alpha_3_code IN ('CYP', 'CZE', 'DNK', 'EST', 'FIN', 'FRA', 'DEU', 'GRC', 'HUN', 'IRL', 'ITA', 'LVA', 'LTU', 'LUX', 'MLT', 'NLD', 'POL', 'PRT', 'ROU', 'SVK', 'SVN', 'ESP', 'SWE', 'AUT', 'BEL', 'BGR', 'HRV', 'NOR') -- Filters for a list of European countries
  GROUP BY
    geo_id
),

-- CTE to join the latest population data with the population grid
current_population AS (
  SELECT
    pop.geo_id,
    pop.population,
    pop.geog
  FROM
    `bigquery-public-data.worldpop.population_grid_1km` AS pop
  JOIN
    latest_population
    ON pop.geo_id = latest_population.geo_id
    AND pop.last_updated = latest_population.last_updated -- Joins on the most recent data point
),

-- CTE to create H3 indices for each geographic location at resolution 7
h3_indices AS (
  SELECT
    p.population,
    h3
  FROM
    current_population AS p
  CROSS JOIN
    UNNEST(bqcarto.h3.ST_ASH3_POLYFILL(p.geog, 7)) as h3 -- Uses the H3 polyfill to convert geographies to H3 indices
)

-- Main SELECT statement to sum population by H3 index
SELECT
    h3,
    SUM(population) AS population -- Aggregates population by H3 index
FROM
    h3_indices
GROUP BY
    h3;
  ```

{{< try-query-cloud report="a70515ee-ecbb-4aac-8ce1-cf508483e2dc" >}}


### Population over 10k in EU

{{< img src="b099fbd3-d0ae-4636-aa44-217c0bac53f6.png" cloud="b099fbd3-d0ae-4636-aa44-217c0bac53f6" >}}

```sql
with latest as (
SELECT
    max(last_updated) as last_updated,
    geo_id
FROM
    `bigquery-public-data.worldpop.population_grid_1km` AS pop
WHERE
    alpha_3_code in ('CYP', 'CZE', 'DNK', 'EST', 'FIN', 'FRA', 'DEU', 'GRC', 'HUN', 'IRL', 'ITA', 'LVA', 'LTU', 'LUX', 'MLT', 'NLD', 'POL', 'PRT', 'ROU', 'SVK', 'SVN', 'ESP', 'SWE', 'AUT', 'BEL', 'BGR', 'HRV')
    and population >10000
group by geo_id
)

SELECT
population,
geog,
pop.last_updated,
from
    `bigquery-public-data.worldpop.population_grid_1km` as pop,
    latest
WHERE
    latest.last_updated = pop.last_updated
    and pop.geo_id = latest.geo_id
```

{{< try-query-cloud report="b099fbd3-d0ae-4636-aa44-217c0bac53f6" >}}

### Berlin Population Density

{{< img src="f4c55a02-88a1-4a38-a8ab-48a6237dfee9.png" cloud="f4c55a02-88a1-4a38-a8ab-48a6237dfee9" >}}

```sql
-- Common Table Expression (CTE) to define boundaries based on specific tags
WITH boundary AS (
  SELECT
    geometry
  FROM
    `bigquery-public-data.geo_openstreetmap.planet_features_multipolygons` AS features
  WHERE
    -- Filtering for features in Berlin, Germany using ISO3166-2 tags
    ('ISO3166-2', 'DE-BE') IN (
      SELECT (key, value)
      FROM UNNEST(all_tags)
    )
    AND
    -- Additional filtering for administrative level
    ('admin_level', '4') IN (
      SELECT (key, value)
      FROM UNNEST(all_tags)
    )
),

-- CTE to get the latest population data intersecting with the defined boundary
population_latest AS (
  SELECT
    geo_id,
    MAX(last_updated) AS last_updated
  FROM
    `bigquery-public-data.worldpop.population_grid_1km` AS pop,
    boundary
  WHERE
    -- Checking for intersections between population grid and boundary
    ST_INTERSECTS(geog, geometry)
  GROUP BY
    geo_id
)

-- Main SELECT to retrieve geographical data and population
SELECT
  geog,
  population
FROM
  `bigquery-public-data.worldpop.population_grid_1km` AS pop,
  population_latest
WHERE
  -- Joining on geo_id and last_updated to filter the latest data points
  population_latest.geo_id = pop.geo_id AND
  population_latest.last_updated = pop.last_updated;
```

  {{< try-query-cloud report="f4c55a02-88a1-4a38-a8ab-48a6237dfee9" >}}

## Overture Maps

Examples of Kepler.gl maps created using Overture Data in BigQuery, focusing on geospatial visualizations from the segment, division_area, land_use, and place tables.

👉 [Overture Map Example](/docs/about/overture-maps-examples/)

## OpenStreetMap

Examples of extracting and creating kepler.gl maps from OpenStreetMap data in BigQuery public dataset

### All German schools from OSM data

{{< img src="e539b5f6-cec2-45d5-97b3-d5bf541a9389.png" cloud="e539b5f6-cec2-45d5-97b3-d5bf541a9389" >}}

```sql
with country as (
SELECT
      ST_SIMPLIFY(geometry, 1000) as geometry
FROM
`bigquery-public-data.geo_openstreetmap.planet_features_multipolygons`
WHERE
    ('boundary', 'administrative') IN (
      SELECT (key, value)
      FROM UNNEST(all_tags)
    )
    AND ('admin_level', '2') IN (
      SELECT (key, value)
      FROM UNNEST(all_tags)
    )
    AND ('ISO3166-1', 'DE') IN (
      SELECT (key, value)
      FROM UNNEST(all_tags)
    )
), schools as (
SELECT
      geometry
FROM
`bigquery-public-data.geo_openstreetmap.planet_features_multipolygons`
WHERE
    ('amenity', 'school') IN (
      SELECT (key, value)
      FROM UNNEST(all_tags)
    )
)

select schools.geometry from schools join country on (ST_INTERSECTS(schools.geometry, country.geometry))
```

{{< try-query-cloud report="e539b5f6-cec2-45d5-97b3-d5bf541a9389" >}}

### All roads in Nevada excluding parking and service roads (26Mb)

{{< img src="556330cb-e7ba-4e34-89df-5644cd0ec8b2.png" cloud="556330cb-e7ba-4e34-89df-5644cd0ec8b2" >}}

```sql
-- Create a CTE (Common Table Expression) named 'boundary' to define the geographical boundaries for Nevada (US-NV)
WITH boundary AS (
    SELECT ST_SIMPLIFY(geometry, 1000) as geometry
    FROM `bigquery-public-data.geo_openstreetmap.planet_features_multipolygons`
    WHERE
        ('boundary', 'administrative') IN (  -- Select features marked as administrative boundaries
            SELECT (key, value)
            FROM UNNEST(all_tags)
        )
        AND ('ISO3166-2', 'US-NV') IN (  -- Focus on features tagged specifically for Nevada
            SELECT (key, value)
            FROM UNNEST(all_tags)
        )
    LIMIT 1  -- Ensure only one boundary is selected, assuming it's the outermost boundary of Nevada
)

SELECT
    ways.geometry as geom
FROM `bigquery-public-data.geo_openstreetmap.planet_ways` as ways, boundary
WHERE ST_Intersects(ways.geometry, boundary.geometry)
AND (
    SELECT value
    FROM UNNEST(ways.all_tags) as tag
    WHERE tag.key = 'highway'
) IN ('motorway', 'trunk', 'primary', 'secondary', 'tertiary', 'unclassified', 'residential')
AND NOT EXISTS (
    SELECT 1
    FROM UNNEST(ways.all_tags) as tag
    WHERE tag.key = 'service' AND tag.value IN ('parking_aisle', 'driveway', 'parking_lot', 'service')
)
```

{{< try-query-cloud report="556330cb-e7ba-4e34-89df-5644cd0ec8b2" >}}

### Every parking lot in Nevada from the OSM

{{< img src="b2f2e1b3-78ec-42d9-9cc6-c38a2a57f72e.png" cloud="b2f2e1b3-78ec-42d9-9cc6-c38a2a57f72e" >}}

```sql
-- Create a CTE (Common Table Expression) named 'boundary' to define the geographical boundaries for Nevada (US-NV)
WITH boundary AS (
    SELECT ST_SIMPLIFY(geometry, 1000) as geometry
    FROM `bigquery-public-data.geo_openstreetmap.planet_features_multipolygons`
    WHERE
        ('boundary', 'administrative') IN (  -- Select features marked as administrative boundaries
            SELECT (key, value)
            FROM UNNEST(all_tags)
        )
        AND ('ISO3166-2', 'US-NV') IN (  -- Focus on features tagged specifically for Nevada
            SELECT (key, value)
            FROM UNNEST(all_tags)
        )
    LIMIT 1  -- Ensure only one boundary is selected, assuming it's the outermost boundary of Nevada
)

-- Main query to select parking amenities that intersect with the Nevada boundary
SELECT
    osm.geometry,  -- Select geometry of each feature
    (
        SELECT value  -- Retrieve the 'access' attribute of the parking amenity
        FROM UNNEST(all_tags)
        WHERE key = 'access'
    ) AS access
FROM
    `bigquery-public-data.geo_openstreetmap.planet_features_multipolygons` osm, boundary  -- Join the main table with the boundary CTE
WHERE
    ST_INTERSECTS(osm.geometry, boundary.geometry)  -- Select only those features that intersect with the Nevada boundary
    AND ('amenity', 'parking') IN (  -- Focus on features tagged as parking amenities
        SELECT (key, value)
        FROM UNNEST(all_tags)
    )
```

{{< try-query-cloud report="b2f2e1b3-78ec-42d9-9cc6-c38a2a57f72e" >}}

### US States Borders

{{< img src="ec7f842a-73f3-4710-a5e8-a2e2d8f63c55.png" cloud="ec7f842a-73f3-4710-a5e8-a2e2d8f63c55" >}}

```sql
SELECT
    -- getting name from all_tags nested struct
    (
      SELECT value
      FROM UNNEST(all_tags)
      WHERE key = 'name'
    ) AS name,
    -- fixing edges crossing antimeridian
    ST_ASGEOJSON(
      -- simplifying geometry for smaller size
      ST_SIMPLIFY(geometry, 1000)
    ) AS geometry
FROM
`bigquery-public-data.geo_openstreetmap.planet_features_multipolygons`
WHERE
    -- filtering for administrative boundaries
    ('boundary', 'administrative') IN (
      SELECT (key, value)
      FROM UNNEST(all_tags)
    )
    -- getting admin_level=4
    AND ('admin_level', '4') IN (
      SELECT (key, value)
      FROM UNNEST(all_tags)
    )
    -- filtering for country code prefixed with US
    AND 'US' IN (
      SELECT SUBSTR(value, 0, 2)
      FROM UNNEST(all_tags)
      WHERE key = 'ISO3166-2'
    )
```

{{< try-query-cloud report="ec7f842a-73f3-4710-a5e8-a2e2d8f63c55" >}}

### Ukrainian Schools vs Russian Invasion

{{< img src="5825b784-cd3c-4030-b3c5-94a8f4dd47b0.png" cloud="5825b784-cd3c-4030-b3c5-94a8f4dd47b0" >}}

```sql
with country as (
SELECT
      ST_SIMPLIFY(geometry, 1000) as geometry
FROM
`bigquery-public-data.geo_openstreetmap.planet_features_multipolygons`
WHERE
    ('boundary', 'administrative') IN (
      SELECT (key, value)
      FROM UNNEST(all_tags)
    )
    AND ('admin_level', '2') IN (
      SELECT (key, value)
      FROM UNNEST(all_tags)
    )
    AND ('ISO3166-1', 'UA') IN (
      SELECT (key, value)
      FROM UNNEST(all_tags)
    )
), schools as (
SELECT
      geometry
FROM
`bigquery-public-data.geo_openstreetmap.planet_features_multipolygons`
WHERE
    ('amenity', 'school') IN (
      SELECT (key, value)
      FROM UNNEST(all_tags)
    )
)

select schools.geometry from schools join country on (ST_INTERSECTS(schools.geometry, country.geometry))
```

{{< try-query-cloud report="5825b784-cd3c-4030-b3c5-94a8f4dd47b0" >}}

### Admin Boundaries

👉 [Admin Boundaries in BigQuery Public Datasets](https://dekart.xyz/blog/admin-boundaries-in-bigquery-public-datasets/)

## Geospatial analytics

Perform geospatial analytics with Spatial SQL and Kepler.gl

### Locate empty building plots

{{< img src="aeefb6e0-d83a-489a-b371-50b306535e2d.png" cloud="aeefb6e0-d83a-489a-b371-50b306535e2d" >}}

```sql
WITH BoundingPolygon AS (
  SELECT ST_GEOGFROMTEXT('POLYGON ((19.011407561798503 47.45616485157483, 19.011407561798503 47.34036843210035, 19.20169809527555 47.34036843210035, 19.20169809527555 47.45616485157483, 19.011407561798503 47.45616485157483))') AS polygon
),
landuse_areas AS (
  SELECT
    geometry AS landuse_geometry,
    (
      SELECT value
      FROM UNNEST(all_tags)
      WHERE key = 'landuse'
    ) AS landuse_type
  FROM
    `bigquery-public-data.geo_openstreetmap.planet_features_multipolygons`,
    BoundingPolygon
  WHERE
    EXISTS (
      SELECT 1
      FROM UNNEST(all_tags) AS tag
      WHERE tag.key = 'landuse'
    )
    AND ST_WITHIN(geometry, polygon)
),
buildings AS (
  SELECT
    geometry AS building_geometry
  FROM
    `bigquery-public-data.geo_openstreetmap.planet_features`,
    BoundingPolygon
  WHERE
    'building' IN (SELECT key FROM UNNEST(all_tags))
    AND ST_WITHIN(geometry, polygon)
)

SELECT
  landuse.landuse_geometry,
  landuse.landuse_type
FROM
  landuse_areas landuse
LEFT JOIN
  buildings ON ST_INTERSECTS(landuse.landuse_geometry, buildings.building_geometry)
WHERE
  buildings.building_geometry IS NULL
```

{{< try-query-cloud report="aeefb6e0-d83a-489a-b371-50b306535e2d" >}}

## Kepler.gl maps with large datasets

Benchmarking Kepler.gl with large datasets

### All (400k) Toronto Buildings (100Mb)

{{< img src="8f2da1e3-9769-4654-abb8-983afd2a2795.png" cloud="8f2da1e3-9769-4654-abb8-983afd2a2795" >}}

```
WITH bounding_area as (SELECT geometry from `bigquery-public-data.geo_openstreetmap.planet_features`
        WHERE feature_type="multipolygons"
           AND ('name:en', 'Toronto') in (SELECT (key, value) from unnest(all_tags))
          AND ('boundary', 'administrative') in (SELECT (key, value) from unnest(all_tags))
          AND ('admin_level', '6') in (SELECT (key, value) from unnest(all_tags))
     )
SELECT planet_features.geometry
  FROM `bigquery-public-data.geo_openstreetmap.planet_features` planet_features, bounding_area
   WHERE 'building' IN (SELECT key FROM UNNEST(all_tags)) -- Select features with 'building=*' tag
   AND ST_DWithin(bounding_area.geometry, planet_features.geometry, 0)  -- Filter only features within bounding_area
```

{{< try-query-cloud report="8f2da1e3-9769-4654-abb8-983afd2a2795" >}}

### 1M points (30Mb)

{{< img src="f63fb537-800e-48f6-8c18-8d542a0fed30.png" cloud="f63fb537-800e-48f6-8c18-8d542a0fed30" >}}

```sql
SELECT
    district,
    latitude,
    longitude
from `bigquery-public-data.chicago_crime.crime`
WHERE  Rand() < 13 / 100.0
```
{{< try-query-cloud report="f63fb537-800e-48f6-8c18-8d542a0fed30" >}}

### All ramps in Illinois

{{< img src="b818f41a-5bd2-4b3b-87b8-4797a390a2a6.png" cloud="b818f41a-5bd2-4b3b-87b8-4797a390a2a6" >}}

```sql
SELECT * FROM `bigquery-public-data.geo_us_roads.all_roads_17` where mtfcc_feature_class_code = 'S1630'
```

{{< try-query-cloud report="b818f41a-5bd2-4b3b-87b8-4797a390a2a6" >}}


