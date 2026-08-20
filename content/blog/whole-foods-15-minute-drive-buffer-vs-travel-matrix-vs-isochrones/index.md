---
title: "Buffer, Travel Matrix, or Isochrones? Drive-time analysis in Snowflake."
url: "/blog/buffer-vs-travel-matrix-vs-isochrones/"
description: "The same 15-minute catchment question answered three ways in Snowflake: a straight-line buffer, a precomputed H3 travel matrix, and TravelTime isochrones. The answers were 21.8%, 48%, and 34.5%."
lead: "The same 15-minute catchment question answered three ways in Snowflake SQL."
date: 2026-08-18T00:00:00Z
lastmod: 2026-08-18T00:00:00Z
draft: false
weight: 1
contributors: ["Vladi"]
images: ["map-3-isochrones.png"]
---

I ran it three ways on the same Snowflake data: **what percentage of buildings in Orange County, California are beyond a 15-minute drive of any Whole Foods Market?**

## The straight-line buffer

Assume a drive speed, divide by a circuity factor, draw a circle. At 48 km/h and a factor of 1.3 that is 615 m/min, so 15 minutes is a **9.2 km radius**, then `ST_DISTANCE` to the nearest store.

Result: **21.8% outside**.

{{< img src="map-1-buffer.png" caption="Straight-line buffer. Green circles are the 9.2 km buffers; hexes are buildings outside them, colored by drive time and sized by building count." cloudsql="9c6b7004-6d4f-472f-9966-17ff73db65ba" >}}

## The precomputed H3 travel matrix

Real routing, precomputed into an origin-destination matrix on H3 cells. I used a California matrix of 2.2 billion rows at resolution 7.

Result: **around 48% outside**, range 44–57%.

The range is the catch, and it applies to any precomputed matrix. The table is a cross product of 34,929 origin cells and 65,128 destination cells, and neither set covers every cell. In Orange County only **5 of the 12 store cells** were origins, so most buildings got measured against 5 stores instead of 12. **Check cell coverage on both sides of the join before trusting a matrix.**

{{< img src="map-2-travel-matrix.png" caption="H3 travel matrix. The green reach is dissolved from H3 cells, so it follows the road network instead of a radius." cloudsql="3294b016-f844-4e35-aced-c2fe6b2f1012" >}}

→ [Snowflake on precomputing H3 travel-time matrices](https://www.snowflake.com/en/blog/engineering/routing-inside-snowflake-h3-travel-time-matrix0/)

## TravelTime isochrones

TravelTime publishes a native app on Snowflake Marketplace that calls their isochrone API from SQL, so you get true drive-time polygons without leaving the warehouse:

```sql
SELECT TO_GEOGRAPHY(t.GEOMETRY) AS g
FROM wf w,
     TABLE(TRAVELTIME.V2.TIME_MAP_FAST(
       w.lat, w.lon, 900, 'driving', 'many_to_one', 'weekday_morning', TRUE)) t
```

Twelve calls dissolved with `ST_UNION_AGG` into one reach polygon of 1,220 km². Inside and outside are decided per building against it, so the boundary is exact rather than snapped to a grid.

Result: **34.5% outside**.

{{< img src="map-3-isochrones.png" caption="TravelTime isochrones. Genuinely network shaped: freeway fingers, interior holes, and a detached lobe around the Los Angeles store." cloudsql="05996a3d-6c62-44f9-a1b0-023e62f2726d" >}}

→ [TravelTime on Snowflake Marketplace](https://app.snowflake.com/marketplace/providers/GZ2FSZKSSGG/TravelTime%20Technologies%20Ltd)

→ [TravelTime isochrone API docs](https://docs.traveltime.com/api/start/isochrones)

## How the three compare

| Method | Buildings beyond 15 min | Share |
|---|---|---|
| Straight-line buffer | 181,535 | **21.8%** |
| H3 travel matrix (precomputed routing) | ~398,000 | **~48%** |
| TravelTime isochrones | 286,678 | **34.5%** |

All of it runs on Overture Maps via Snowflake Marketplace: **831,475 buildings** in Orange County and **12 stores**.


## Run it yourself

All three maps were built by Claude with the GeoSQL skill and rendered in Dekart, both open source and running against your own warehouse.

```bash
pip install geosql && geosql
```

{{< github-cta repo="dekart-xyz/geosql" ref="blog-catchment-bottom" >}}
