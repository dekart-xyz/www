---
title: "Snowflake Kepler.gl Maps Examples"
description: "Collection of Kepler.gl maps examples created with Snowflake public dataset using SQL."
lead: ""
date: 2024-08-28T07:26:19+02:00
lastmod: 2024-09-23T07:26:19+02:00
draft: false
images: ["f392b7ab-b64a-43f3-b100-650eb7b8fdef.png"]
menu:
  docs:
    parent: "examples"
    name: "Snowflake Free Datasets"
weight: 999
toc: true
canonical: ""
---


Collection of kepler.gl maps created from Overture Data in Snowflake public dataset using SQL and Dekart.

## Overture Maps

### Nevada Roads by Speed and Class

{{< img src="f392b7ab-b64a-43f3-b100-650eb7b8fdef.png" cloud="f392b7ab-b64a-43f3-b100-650eb7b8fdef">}}

```sql
-- Step 1: Get the geometry of Nevada
WITH nevada_geometry AS (
  SELECT
    geometry
  FROM
    OVERTURE_MAPS__DIVISIONS.CARTO.DIVISION_AREA
  WHERE
    country = 'US'
    AND region = 'US-NV'
    AND subtype = 'region'
)

-- Step 2: Select roads within Nevada with non-empty speed limits
SELECT
  ST_ASWKT(s.geometry) AS geometry,
  s.class,
  s.SPEED_LIMITS:list[0].element.max_speed.value::STRING AS speed_limit
FROM
  OVERTURE_MAPS__TRANSPORTATION.CARTO.SEGMENT AS s,
  nevada_geometry AS ng
WHERE
  s.subtype = 'road'
  AND s.class NOT IN ('track', 'driveway', 'path', 'footway', 'sidewalk', 'pedestrian', 'cycleway', 'steps', 'crosswalk', 'bridleway', 'alley')
  AND ST_WITHIN(s.geometry, ng.geometry)
```
{{< try-query-cloud report="f392b7ab-b64a-43f3-b100-650eb7b8fdef" >}}


### UK EV charging stations density

UK highways colored by number of EV charging stations within 50 km

{{< img src="b33117ab-567d-4f86-877a-3dee828f8a81.png">}}

```sql
-- Step 1: Define the UK boundary as a geographic region
WITH uk_boundary AS (
    SELECT GEOMETRY
    FROM OVERTURE_MAPS__DIVISIONS.CARTO.DIVISION_AREA
    WHERE COUNTRY = 'GB'  -- Filter to select only the boundaries of the UK
    AND SUBTYPE = 'country'  -- Assuming 'SUBTYPE' helps filter specifically the outer boundary of the country
),

-- Step 2: Select major road segments (e.g., motorways, trunk roads) that intersect the UK boundary
road_segments AS (
    SELECT s.GEOMETRY, s.NAMES, s.ID  -- Select geometry, names, and unique road ID
    FROM OVERTURE_MAPS__TRANSPORTATION.CARTO.SEGMENT s, uk_boundary ub
    WHERE ST_INTERSECTS(ub.GEOMETRY, s.GEOMETRY)  -- Check if road segments intersect with the UK boundary
    AND s.CLASS IN ('motorway', 'trunk')  -- Filter to include only major roads like motorways and trunk roads
),

-- Step 3: Select EV charging stations that are contained within the UK boundary
charging_stations AS (
    SELECT p.GEOMETRY
    FROM OVERTURE_MAPS__PLACES.CARTO.PLACE p, uk_boundary ub
    WHERE ST_CONTAINS(ub.GEOMETRY, p.GEOMETRY)  -- Ensure the charging stations are within the UK boundary
    AND p.CATEGORIES::TEXT ILIKE '%charging%'  -- Filter places categorized as EV charging stations
),

-- Step 4: Count the number of charging stations within a 50 km radius of each road segment
charging_count AS (
    SELECT r.ID AS road_id,  -- Use road ID for grouping
           r.NAMES AS road_name,  -- Include the road name for context
           COUNT(cs.GEOMETRY) AS num_charging_stations  -- Count the number of charging stations near the road
    FROM road_segments r
    LEFT JOIN charging_stations cs
        ON ST_DISTANCE(r.GEOMETRY, cs.GEOMETRY) <= 50000  -- Check if charging stations are within 50 km of the road
    GROUP BY r.ID, r.NAMES  -- Group by road ID and name to aggregate the count of charging stations
)

-- Step 5: Return the final results, including road ID, name, geometry, and the number of nearby charging stations
SELECT r.ID, r.NAMES, ST_ASWKT(r.GEOMETRY) as GEOMETRY, cc.num_charging_stations
FROM road_segments r
JOIN charging_count cc
ON r.ID = cc.road_id;  -- Join with the previous result set to match road details with charging station counts
```
