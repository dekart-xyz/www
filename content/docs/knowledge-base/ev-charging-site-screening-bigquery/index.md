---
title: "EV charging site screening with BigQuery"
description: "A reproducible EV charging site-screening workflow using Overture Maps, NDW traffic, parking polygons, charger gaps, BigQuery SQL, and evidence maps."
lead: "Build a reviewable shortlist of retail and roadside EV charging candidates from open geospatial data."
date: 2026-09-15T00:00:00Z
lastmod: 2026-09-15T00:00:00Z
draft: false
weight: 28
toc: true
images: ["final-shortlist.png"]
contributors: ["Vladi"]
menu:
  docs:
    parent: "knowledge-base"
    name: "EV charging site screening"
---

This example screens retail and roadside locations in the Eindhoven–Tilburg–Breda corridor. It combines candidate places, parking polygons, road geometry, a traffic proxy, and existing 150 kW+ chargers in BigQuery.

The result is a desk-screening list for field investigation. It is not a site-viability or investment decision.

{{< img src="final-shortlist.png" caption="Fifteen distinct candidate sites, traffic proxy segments, qualifying parking areas, and 2 km exclusion zones around observed 150 kW+ chargers." >}}

{{< view-on-map report="30165f20-525b-4165-85ec-7febf482aa82" utm_content="ev-site-screening-final" label="Open the final interactive map and SQL" >}}

## Screening rules

The final query applies these rules:

| Input | Rule |
|---|---|
| Study area | Convex hull of Breda, Tilburg, and Eindhoven, buffered by 8 km and clipped to North Brabant |
| Candidate type | Grocery, large retail, or fuel/roadside |
| Traffic | Best traffic-proxy road segment within 500 m |
| Strong traffic | Top quartile of nearby proxy segments, 3,300 vehicles/hour in this snapshot |
| Parking | Largest parking polygon of at least 2,500 m² within 100 m |
| Charging gap | No observed charger rated 150 kW+ within 2 km |
| Deduplication | One candidate per parking polygon |
| Ranking | Traffic evidence tier, flow, then parking area |

The `5 km` and `3 km` charger exclusions returned no top-quartile candidates. At `2 km`, 16 candidate places passed the strong-traffic rule, but they occupied only five distinct parking areas. The final list therefore keeps those five Tier A sites and adds ten Tier B sites with traffic-proxy values to produce 15 distinct locations.

## Warehouse tables

All analysis tables are in the BigQuery `EU` location under `dekart-data-samples.demo_data_samples`.

| Table | Source | Prepared output |
|---|---|---:|
| `north_brabant_boundary` | Overture divisions | 1 exact province polygon |
| `overture_candidate_sites_north_brabant` | Overture Places | 3,539 candidate places |
| `overture_parking_areas_north_brabant` | Overture Base infrastructure | 25,108 parking polygons |
| `overture_major_roads_north_brabant` | Overture Transportation | 41,564 road segments, 6,534 km |
| `ndw_traffic_snapshot` | NDW current measurements and measurement sites | 20,532 directional observations nationwide |
| `north_brabant_traffic_proxy` | NDW snapshot joined to Overture roads | 2,737 estimated road segments, 1,480 km |
| `nextev_chargers` | NextEV map payload | 20,497 normalized European sites; 53 inside North Brabant |

## Source and preparation

### Boundary, places, parking, and roads

Overture data is available from the [`bigquery-public-data.overture_maps`](https://docs.overturemaps.org/getting-data/data-mirrors/bigquery/) public dataset. The workflow uses:

| Overture table | Use |
|---|---|
| `division_area` | Exact North Brabant boundary |
| `place` | Retail and roadside candidate points |
| `infrastructure` | Parking polygons and attributes |
| `segment` | Motorway through tertiary road geometry |

Every global Overture scan uses a bounding-box predicate before `ST_INTERSECTS`. This matters because the global tables are not partitioned for this area query.

Candidate places retain Overture ID, name, brand, category, address, confidence, and geometry. The extraction requires `confidence >= 0.75`, removes permanently closed places, and maps selected categories into five screening groups. The final screen uses only grocery, large retail, and fuel/roadside.

```sql
WITH area AS (
  SELECT geometry
  FROM `dekart-data-samples.demo_data_samples_us.north_brabant_boundary`
  WHERE id = '028768cc-c290-4ec0-9c3c-d6c208275987'
)
SELECT
  p.id AS overture_id,
  p.names.primary AS name,
  p.brand.names.primary AS brand,
  COALESCE(p.taxonomy.primary, p.categories.primary, p.basic_category) AS category,
  p.confidence,
  ST_X(p.geometry) AS longitude,
  ST_Y(p.geometry) AS latitude,
  p.geometry
FROM `bigquery-public-data.overture_maps.place` AS p
CROSS JOIN area AS a
WHERE p.bbox.xmax >= 4.190124034881592
  AND p.bbox.xmin <= 6.048120975494385
  AND p.bbox.ymax >= 51.220909118652344
  AND p.bbox.ymin <= 51.83075714111328
  AND ST_INTERSECTS(p.geometry, a.geometry)
  AND p.confidence >= 0.75
  AND COALESCE(p.operating_status, 'open') != 'permanently_closed';
```

Parking extraction keeps polygon and multipolygon features where `class = 'parking'`. It derives `parking_type`, `access`, `fee`, `capacity`, and `surface` from normalized columns or source tags, and calculates `area_m2` with `ST_AREA`.

Road extraction keeps `motorway`, `trunk`, `primary`, `secondary`, and `tertiary` segments. Each line is clipped to the province with `ST_INTERSECTION`; empty and zero-length results are removed.

The Overture BigQuery mirror is in the `US` multi-region while the NDW working dataset is in `EU`. The preparation pipeline therefore:

1. Materializes the small North Brabant slices in a US staging dataset.
2. Converts `GEOGRAPHY` to WKT with `ST_ASTEXT`.
3. Exports newline-delimited JSON.
4. Loads an EU staging table.
5. Reconstructs `GEOGRAPHY` with `ST_GEOGFROMTEXT`.
6. Verifies row counts, distinct IDs, geometry validity, and bounds in both regions.

{{< img src="candidate-sites-parking.png" caption="Candidate places and parking-area geometry around Eindhoven." >}}

[Open candidate sites and parking with SQL](https://cloud.dekart.xyz/reports/1c3d5f6a-3bcb-4d94-a007-d836e3eb2f6c/source?ref=kb-ev-site-screening)

{{< img src="parking-areas.png" caption="A close inspection of Overture parking polygons near the A58 at Breda." >}}

[Open the parking geometry map with SQL](https://cloud.dekart.xyz/reports/3b3b0da0-2dc9-4919-bfe0-d68b19267281/source?ref=kb-ev-site-screening)

### NDW traffic snapshot

[NDW](https://docs.ndw.nu/faq/avg/) publishes flow and speed measurements every minute from thousands of fixed locations. The demo joined the current measurement feed to the measurement-site package from the [NDW open-data portal](https://opendata.ndw.nu/).

Preparation steps:

1. Parse DATEX II measurements and measurement-site coordinates.
2. Sum all-vehicle flow across lanes for each directional measurement site.
3. Calculate a weighted average speed.
4. Preserve observation time, direction, road reference, coordinates, and native `GEOGRAPHY`.
5. Use the exact province polygon after the bounding-box filter.
6. Group technical feeds representing the same coordinate and direction before analysis.

The frozen snapshot contains 20,532 nationwide directional observations captured at approximately 09:07–09:08 on 14 September 2026. It is not AADT, typical traffic, or annual demand.

[Open the raw North Brabant traffic map with SQL](https://cloud.dekart.xyz/reports/09568a50-a6d4-45fa-8151-4a1f5f286af4/source?ref=kb-ev-site-screening)

### Traffic proxy on roads

The point measurements do not provide road-level coverage. The exploratory proxy first snaps each grouped sensor to the nearest Overture road within 150 m. It then finds up to three sensors on the same road class within 3 km of every road segment and calculates an inverse-distance-weighted estimate.

```sql
SUM(observed_flow_vph / (sensor_distance_m + 25.0))
  / SUM(1.0 / (sensor_distance_m + 25.0))
  AS estimated_snapshot_flow_vph
```

The `25 m` offset prevents a sensor at zero distance from dividing by zero. Confidence combines the number of contributing sensors with distance decay:

```sql
LEAST(
  1.0,
  (0.6 + 0.2 * (contributing_sensor_count - 1))
    * EXP(-nearest_sensor_distance_m / 3000.0)
) AS spatial_confidence
```

Every result retains `nearest_sensor_distance_m`, `contributing_sensor_count`, `spatial_confidence`, and a categorical quality label:

| Nearest sensor | Quality label |
|---:|---|
| Up to 50 m | Near observation |
| 50–500 m | Medium extrapolation |
| 500–3,000 m | Low extrapolation |

The output covers approximately 99% of motorway length, 46% of trunk roads, 7% of primary roads, and about 2% of secondary and tertiary roads. Missing proxy rows must remain missing; do not silently turn them into zero traffic.

{{< img src="traffic-proxy.png" caption="NDW snapshot values extrapolated onto nearby same-class Overture road segments. The map exposed the sharp loss of coverage away from motorways." >}}

[Open the traffic proxy and observations with SQL](https://cloud.dekart.xyz/reports/c7adb436-8402-4090-bf0f-58a750e688b5/source?ref=kb-ev-site-screening)

### Charger locations

The demo decoded the public [`nextev.app/map/chargers.json`](https://nextev.app/map/chargers.json) payload into typed columns for site ID, coordinates, operator, network, maximum power, stalls, availability, price, plugs, and source timestamp. It preserved each original array as JSON and created point `GEOGRAPHY` from longitude and latitude.

This is the weakest production input. The snapshot covers selected operators, has no stated reuse licence, and cannot prove that an apparent charger gap is real. The Netherlands now publishes official charging locations through [NDW DOT-NL](https://english.ndw.nu/dataportals/dot-nl), including GeoJSON and OCPI snapshots on the [NDW open-data portal](https://opendata.ndw.nu/). Replace NextEV with DOT-NL before operational use.

[Open the normalized NextEV map with SQL](https://cloud.dekart.xyz/reports/96e6b623-18a6-433d-a3d0-153bfaed36b7/source?ref=kb-ev-site-screening)

## Final screening SQL

The complete runnable seven-layer query is available in the [final map's SQL view](https://cloud.dekart.xyz/reports/30165f20-525b-4165-85ec-7febf482aa82/source?ref=kb-ev-site-screening). These selected fragments show its traffic, parking, charger, and eligibility logic. Comments mark the omitted columns and CTEs, so the excerpt below is not standalone SQL.

```sql
-- Selected from the full query linked above.
-- Earlier boundary, study-area, and sites CTEs are omitted.
traffic_join AS (
  SELECT
    s.overture_id,
    t.road_segment_id,
    t.estimated_snapshot_flow_vph,
    ST_DISTANCE(s.geometry, t.geometry) AS segment_distance_m
  FROM sites AS s
  JOIN `dekart-data-samples.demo_data_samples.north_brabant_traffic_proxy` AS t
    ON ST_DWITHIN(s.geometry, t.geometry, 500)
),
parking_best AS (
  SELECT
    s.overture_id,
    p.overture_id AS parking_id,
    p.area_m2 AS parking_area_m2,
    ST_DISTANCE(s.geometry, p.geometry) AS parking_distance_m
  FROM sites AS s
  JOIN `dekart-data-samples.demo_data_samples.overture_parking_areas_north_brabant` AS p
    ON ST_DWITHIN(s.geometry, p.geometry, 100)
  WHERE p.area_m2 >= 2500
  QUALIFY ROW_NUMBER() OVER (
    PARTITION BY s.overture_id
    ORDER BY p.area_m2 DESC, ST_DISTANCE(s.geometry, p.geometry)
  ) = 1
),
charger_near AS (
  SELECT
    s.overture_id,
    MIN(ST_DISTANCE(s.geometry, c.geography)) AS nearest_fast_charger_m
  FROM sites AS s
  JOIN `dekart-data-samples.demo_data_samples.nextev_chargers` AS c
    ON ST_DWITHIN(s.geometry, c.geography, 25000)
  WHERE c.max_power_kw >= 150
  GROUP BY s.overture_id
),

-- traffic_best and enriched CTEs are omitted. traffic_best selects the
-- highest-flow proxy segment per site as site_snapshot_flow_vph; enriched
-- combines it with parking_best and charger_near.
elig AS (
  SELECT *
  FROM enriched
  WHERE parking_id IS NOT NULL
    AND COALESCE(nearest_fast_charger_m, 1e9) >= 2000
    AND site_snapshot_flow_vph IS NOT NULL
)
```

Nearest-feature joins use `QUALIFY ROW_NUMBER()` to prevent many-to-many duplication. The shortlist also removes candidate POIs whose names identify the place itself as a charging site, then keeps one row per parking polygon:

```sql
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY parking_id
  ORDER BY
    site_snapshot_flow_vph DESC,
    CASE candidate_type
      WHEN 'Fuel / roadside' THEN 1
      WHEN 'Large retail' THEN 2
      ELSE 3
    END,
    confidence DESC
) = 1
```

The final map has seven evidence layers:

1. Fifteen distinct shortlisted sites.
2. All 35 candidates with parking, a traffic-proxy value, and no observed 150 kW+ charger within 2 km.
3. Observed 150 kW+ chargers with 2 km exclusion polygons.
4. Traffic-proxy road segments.
5. The 16 qualifying parking polygons.
6. The 1,107 km² study corridor.
7. Two candidate POIs excluded because they were charging sites.

## What the map review found

The map is part of validation, not only presentation.

- Four of the five Tier A sites inherit the same 3,300 vehicles/hour estimate with `Low extrapolation` confidence of approximately 0.22–0.32.
- Only the rank-one Tier A site has a top-quartile proxy value anchored by a sensor at zero distance.
- Ten of the 15 final sites are `Near observation` with spatial confidence `1.0`, including several Tier B sites with better evidence than the Tier A extrapolations.
- Candidate-place duplicates become obvious when several businesses share one parking polygon. Ranking places without parking-level deduplication would overstate the number of distinct sites.
- Charger-radius sensitivity is discontinuous: `3 km` yields no top-tier sites, while `2 km` yields 16 places concentrated in five parking areas.

For analyst review, keep `traffic_spatial_quality`, `traffic_spatial_confidence`, `traffic_sensor_distance_m`, `parking_id`, and `nearest_fast_charger_m` in every exported shortlist.

## Missing inputs for a real investment decision

Before fieldwork or investment approval, add:

- Typical weekday and seasonal traffic or AADT.
- Official DOT-NL charger coverage and a defined freshness SLA.
- Grid connection capacity, lead time, and reinforcement cost.
- Landowner, lease, and site-control information.
- Access, visibility, turning movements, and dwell-time evidence.
- Planning, environmental, and safety constraints.
- Verified usable bays rather than mapped parking area alone.

Treat Overture places as locations to inspect, parking polygons as physical context, the traffic surface as an explicitly uncertain proxy, and the final score as a review queue rather than ground truth.
