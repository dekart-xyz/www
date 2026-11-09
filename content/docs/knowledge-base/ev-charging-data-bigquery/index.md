---
title: "German EV charging data in BigQuery"
description: "How to query public EV charging stations, charge points, occupancy history and prices for Germany in BigQuery: tables, definitions, data rules, tested SQL examples and maps."
lead: "Station locations, plug status history every 4 minutes, daily utilisation and prices for about 36,000 public charging stations in Germany, ready to query in BigQuery."
date: 2026-11-09T00:00:00Z
lastmod: 2026-11-09T00:00:00Z
draft: false
weight: 27
toc: true
images: ["hpc-size-utilisation.png"]
contributors: ["Vladi"]
menu:
  docs:
    parent: "knowledge-base"
    name: "EV charging data in BigQuery"
---

This page explains how to query the dataset correctly. It is written for analysts and for AI agents that write SQL against it. Every query and number on this page was run against the data on 9 November 2026.

{{< img src="hpc-size-utilisation.png" caption="High-power (150 kW+) charging stations in Germany, 5–8 November 2026. Size is the number of DC charge points, color is utilisation (dark purple low, yellow high). The SQL is under Maps below." >}}

## At a glance

| Item | Value |
|---|---|
| Location | BigQuery project `dekart-ev-public-data`, dataset `ev_charging_v1`, region `EU` |
| Country | Germany |
| Stations | 36,265 (35,931 with live status) |
| Charge points | 133,006 |
| Status history | Since 4 November 2026, 16:00 UTC |
| Status polling | Every 4 minutes (every 2 minutes until 7 November 2026, 06:16 UTC) |
| Update | Daily, in the early morning UTC, complete through the previous day |
| Main sources | MobiData BW (status, locations, prices), Mobilithek (Tesla prices), Bundesnetzagentur register |

## How to query

Run queries from your own Google Cloud project. Your project pays for the bytes each query reads; the dataset is small, and every example below reads under 200 MB.

Always use full table names, for example `` `dekart-ev-public-data.ev_charging_v1.stations` ``. In the BigQuery console, set the processing location to `EU` if it is not detected.

Access is granted per Google account or group. To request it, write to support@dekart.xyz.

## Tables

| Table | One row is | Use it for |
|---|---|---|
| `stations` | a charging site | where, who operates, how many plugs, maximum power |
| `charge_points` | one charge point (EVSE, a plug that charges one car at a time) | plug details, linking prices to stations |
| `station_hourly_occupancy` | a station in one UTC hour | time-of-day patterns |
| `station_daily_metrics` | a station on one local day (Europe/Berlin) | utilisation and sessions per day |
| `prices` | the price of one charge point over a time range | current prices and price history |
| `sources` | a data source | licence and the credit line to show |

Two more tables are used internally and may change: `data_coverage` (polling coverage per source and hour) and `register_charge_points` (the official Bundesnetzagentur register, not linked to stations row by row).

### How tables join

`charge_points.station_id` → `stations.station_id`

`station_hourly_occupancy.station_id` and `station_daily_metrics.station_id` → `stations.station_id`

`prices.charge_point_id` → `charge_points.charge_point_id`

### stations

| Column | Type | Meaning |
|---|---|---|
| `station_id` | STRING | Stable ID, `<country>:<source>:<location id>`, for example `DE:mobidata:310110` |
| `country_code` | STRING | `DE` |
| `operator` | STRING | Operator name as the source gives it; can be null |
| `operator_group` | STRING | Operator group, when known |
| `name`, `address`, `postal_code`, `city` | STRING | As published by the source |
| `latitude`, `longitude` | FLOAT64 | WGS84 |
| `geog` | GEOGRAPHY | Point, for spatial filters such as `ST_DWITHIN` |
| `charge_point_count` | INT64 | Charge points currently listed |
| `dc_charge_point_count` | INT64 | DC (fast) charge points currently listed |
| `max_power_kw` | FLOAT64 | Highest power of any charge point at the station |
| `has_live_status` | BOOL | The station reports plug status |
| `first_seen_at`, `last_seen_at` | TIMESTAMP | First and last time a source listed it |
| `source` | STRING | Source of the station record, see `sources` |

A station is one site: locations from the same source and operator at exactly the same coordinates are one station. A station ID never changes. If a location later moves to new coordinates while others stay, the moved group gets a new ID: the original ID plus `:` and a 64-character code.

### charge_points

| Column | Type | Meaning |
|---|---|---|
| `charge_point_id` | STRING | Normalised EVSE ID (for example `DEEBWE9053721`), else `<country>:<source>:<id>` |
| `evse_id` | STRING | EVSE ID as published |
| `station_id` | STRING | Station it belongs to |
| `is_dc` | BOOL | DC (fast) charging |
| `max_power_kw` | FLOAT64 | Maximum power |
| `connector_types` | STRING | Comma-separated OCPI names, for example `IEC_62196_T2_COMBO` (CCS) |
| `has_live_status` | BOOL | Reports status |
| `first_seen_at`, `last_seen_at` | TIMESTAMP | First and last time listed |
| `source` | STRING | Source |

Charge points are never deleted. One that is no longer listed keeps its row, and `last_seen_at` shows when it was last listed (3,328 rows on 9 November).

### station_hourly_occupancy and station_daily_metrics

| Column | Type | Meaning |
|---|---|---|
| `station_id` | STRING | Station |
| `hour_utc` (hourly) | TIMESTAMP | Start of the UTC hour |
| `local_date` (daily) | DATE | Day in Europe/Berlin time |
| `charge_points_known` (hourly) | INT64 | Charge points with a status in that hour |
| `occupied_minutes` | FLOAT64 | Minutes in status CHARGING, BLOCKED or RESERVED, summed over all charge points |
| `charging_minutes` | FLOAT64 | Minutes in status CHARGING only |
| `available_minutes` | FLOAT64 | Minutes free to use |
| `out_of_service_minutes` | FLOAT64 | Minutes out of order or inoperative |
| `unknown_minutes` | FLOAT64 | Minutes with no reliable status (see below) |
| `status_changes` (hourly) | INT64 | Status changes reported |
| `utilisation` (daily) | FLOAT64 | `occupied ÷ (occupied + available)` |
| `estimated_sessions` | INT64 | Changes into CHARGING; an estimate, not a count of real sessions |

Minutes are summed over charge points, so a station with 4 charge points has up to 240 minutes per hour. Per station and hour, occupied + available + out of service + unknown = `charge_points_known` × 60.

To sum utilisation over several days or stations, add the minutes first and divide once. Do not average the daily `utilisation` values.

### prices

| Column | Type | Meaning |
|---|---|---|
| `charge_point_id` | STRING | Charge point |
| `valid_from`, `valid_to` | TIMESTAMP | Time range the price applied; `valid_to` is null while it still applies |
| `price_eur_per_kwh_incl_vat` | FLOAT64 | Energy price, EUR per kWh, VAT included |
| `price_eur_per_minute` | FLOAT64 | Time price, EUR per minute, VAT included |
| `session_fee_eur` | FLOAT64 | Fixed fee per session |
| `start_time`, `end_time` | TIME | Local time of day the price applies; null means all day |
| `day_of_week` | STRING | Days it applies, for example `MONDAY,TUESDAY`; null means every day |
| `min_duration_minutes`, `max_duration_minutes` | FLOAT64 | Session length the price applies to; null means any length |
| `source` | STRING | Source of the price |
| `elements_json` | STRING | The original price conditions as published |
| `last_confirmed_at` | TIMESTAMP | Last time a source sent this price |

One charge point can have several rows that apply at the same time, for example an energy price plus a per-minute fee after 120 minutes. A new row starts only when the price really changes.

### sources

`source`, `country_code`, `licence`, `attribution_text`, `redistribution_allowed`, `url`. Show the `attribution_text` of every source you use. Sources under CC BY 4.0 (Eco-Movement, EnBW AG, Bundesnetzagentur) must be credited.

## How status becomes minutes

Each charge point's status is read every 4 minutes. The time between two status changes counts toward that status. A status is counted as unknown, never as available, when:

- the source's feed failed or its data was more than 15 minutes old;
- a poll was missed (a gap of more than 7 minutes) and the charge point changed status during the gap;
- the source reported the status UNKNOWN.

## Rules for reliable results

Check unknown minutes. Unknown share varies by source and day; on 6 November it was 0.1% for EnBW and 87% for Inergia. Leave out stations whose unknown share is high, for example over 20%.

Leave out stations that never change status. A charge point stuck in one status reports 100% utilisation with no sessions. Requiring a few `estimated_sessions` over the period removes them.

Utilisation ignores out-of-service and unknown minutes. A station that was occupied for one hour and out of service for the rest of the week reports 100%.

Start from 5 November. Status history starts on 4 November at 16:00 UTC, so 4 November is a partial day with high unknown minutes.

Compare across 7 November with care. Polling changed from every 2 to every 4 minutes on 7 November at 06:16 UTC. Four-minute polling misses about 5% of short status changes, so `estimated_sessions` is a few percent lower afterwards; charging minutes change by less than 0.1%.

Use `local_date` for days and convert `hour_utc` for hours. Daily tables use German local days. For local hours, use `DATETIME(hour_utc, 'Europe/Berlin')`.

Filter `charge_point_count > 0` for occupancy and maps. 333 stations exist only to carry Tesla prices from Mobilithek and have no charge points.

Filter coordinates to Germany for maps. 9 stations have coordinates outside Germany because of source errors: `latitude BETWEEN 47.2 AND 55.1 AND longitude BETWEEN 5.8 AND 15.1`.

Pick price rows explicitly. For a single current energy price, use rows with `valid_to IS NULL`, a non-null `price_eur_per_kwh_incl_vat`, and no time-of-day or session-length condition. About 1,500 charge points still have more than one such row; take the lowest.

## Example queries

### Fast chargers near a place

DC stations of 150 kW or more within 5 km of Stuttgart main station:

```sql
SELECT
  station_id,
  operator,
  name,
  address,
  dc_charge_point_count,
  max_power_kw,
  ROUND(ST_DISTANCE(geog, ST_GEOGPOINT(9.1817, 48.7838)) / 1000, 1) AS distance_km
FROM `dekart-ev-public-data.ev_charging_v1.stations`
WHERE ST_DWITHIN(geog, ST_GEOGPOINT(9.1817, 48.7838), 5000)  -- 5 km around Stuttgart Hauptbahnhof
  AND max_power_kw >= 150
ORDER BY distance_km
LIMIT 10
```

| station_id | operator | address | dc_charge_point_count | max_power_kw | distance_km |
|---|---|---|---:|---:|---:|
| DE:mobidata:310110 | ENBW | Keplerstraße 7 | 12 | 300 | 0.5 |
| DE:mobidata:309053 | ENBW | Am Neckartor 2 | 2 | 300 | 0.7 |
| DE:mobidata:310068 | ENBW | Rotebühlstr. 30 | 12 | 300 | 1.4 |

### Busiest fast-charging stations last week

```sql
SELECT
  s.station_id,
  s.operator,
  s.city,
  s.dc_charge_point_count,
  ROUND(SAFE_DIVIDE(SUM(d.occupied_minutes), SUM(d.occupied_minutes + d.available_minutes)), 3) AS utilisation,
  SUM(d.estimated_sessions) AS estimated_sessions,
  ROUND(SAFE_DIVIDE(SUM(d.unknown_minutes),
    SUM(d.occupied_minutes + d.available_minutes + d.out_of_service_minutes + d.unknown_minutes)), 3) AS unknown_share
FROM `dekart-ev-public-data.ev_charging_v1.station_daily_metrics` AS d
JOIN `dekart-ev-public-data.ev_charging_v1.stations` AS s USING (station_id)
WHERE d.local_date BETWEEN DATE_SUB(CURRENT_DATE('Europe/Berlin'), INTERVAL 7 DAY)
                       AND DATE_SUB(CURRENT_DATE('Europe/Berlin'), INTERVAL 1 DAY)
  AND s.dc_charge_point_count >= 4
GROUP BY 1, 2, 3, 4
HAVING unknown_share < 0.2   -- skip stations whose status was mostly unknown
   AND estimated_sessions >= 7  -- skip plugs stuck in one status all week
ORDER BY utilisation DESC
LIMIT 10
```

| station_id | operator | city | dc_charge_point_count | utilisation | estimated_sessions |
|---|---|---|---:|---:|---:|
| DE:mobidata:323680 | Shell Recharge | Arnsberg | 4 | 0.673 | 43 |
| DE:mobidata:325833 | Shell Recharge | Monheim | 4 | 0.634 | 42 |
| DE:mobidata:343070 | Fastned | Bühl | 12 | 0.594 | 251 |

Without the two `HAVING` conditions, the top 10 are all stations at 100% utilisation with zero sessions.

### Utilisation by hour of day

```sql
SELECT
  EXTRACT(HOUR FROM DATETIME(h.hour_utc, 'Europe/Berlin')) AS local_hour,
  ROUND(SAFE_DIVIDE(SUM(h.occupied_minutes), SUM(h.occupied_minutes + h.available_minutes)), 3) AS utilisation,
  SUM(h.estimated_sessions) AS estimated_sessions
FROM `dekart-ev-public-data.ev_charging_v1.station_hourly_occupancy` AS h
JOIN `dekart-ev-public-data.ev_charging_v1.stations` AS s USING (station_id)
WHERE h.hour_utc >= TIMESTAMP_SUB(TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), DAY), INTERVAL 7 DAY)
  AND s.dc_charge_point_count > 0
GROUP BY local_hour
ORDER BY local_hour
```

For stations with DC charging, utilisation was lowest at 03:00 (3.4%) and highest at 12:00 (21.6%) local time.

### Current energy price by operator

```sql
WITH current_energy_price AS (
  -- Open price rows (valid_to IS NULL) without time-of-day or duration conditions.
  -- A few charge points have more than one such row; keep the lowest.
  SELECT charge_point_id, MIN(price_eur_per_kwh_incl_vat) AS price_eur_per_kwh
  FROM `dekart-ev-public-data.ev_charging_v1.prices`
  WHERE valid_to IS NULL
    AND price_eur_per_kwh_incl_vat IS NOT NULL
    AND start_time IS NULL
    AND min_duration_minutes IS NULL
    AND max_duration_minutes IS NULL
  GROUP BY charge_point_id
)
SELECT
  s.operator,
  COUNT(*) AS dc_charge_points_priced,
  ROUND(APPROX_QUANTILES(p.price_eur_per_kwh, 2)[OFFSET(1)], 2) AS median_eur_per_kwh
FROM current_energy_price AS p
JOIN `dekart-ev-public-data.ev_charging_v1.charge_points` AS c USING (charge_point_id)
JOIN `dekart-ev-public-data.ev_charging_v1.stations` AS s USING (station_id)
WHERE c.is_dc
GROUP BY s.operator
HAVING dc_charge_points_priced >= 200
ORDER BY dc_charge_points_priced DESC
LIMIT 10
```

| operator | dc_charge_points_priced | median_eur_per_kwh |
|---|---:|---:|
| ENBW | 9,834 | 0.79 |
| Aral pulse | 4,168 | 0.96 |
| Tesla, Inc. | 4,027 | 0.53 |
| Shell Recharge | 2,512 | 0.79 |
| Allego | 2,104 | 0.76 |
| IONITY | 1,620 | 0.72 |

### Data quality per source and day

```sql
SELECT
  d.local_date,
  s.source,
  ROUND(SAFE_DIVIDE(SUM(d.unknown_minutes),
    SUM(d.occupied_minutes + d.available_minutes + d.out_of_service_minutes + d.unknown_minutes)), 3) AS unknown_share
FROM `dekart-ev-public-data.ev_charging_v1.station_daily_metrics` AS d
JOIN `dekart-ev-public-data.ev_charging_v1.stations` AS s USING (station_id)
WHERE d.local_date >= DATE_SUB(CURRENT_DATE('Europe/Berlin'), INTERVAL 7 DAY)
GROUP BY 1, 2
ORDER BY 1, 2
```

Run this before comparing operators or days.

### Credit lines

```sql
SELECT source, licence, attribution_text, url
FROM `dekart-ev-public-data.ev_charging_v1.sources`
ORDER BY source
```

## Maps

Each map below is one query. Its result has one row per station (a `geometry` point) or per H3 cell (an `h3` index), so any map tool that reads BigQuery GEOGRAPHY or H3 can draw it. The images were made with [Dekart](/). The dates are fixed to 5–8 November 2026 so the maps can be repeated; change them for newer data.

### High-power chargers: size and utilisation

{{< img src="hpc-size-utilisation.png" caption="Stations with at least one charge point of 150 kW or more. Size: DC charge points. Color: utilisation." >}}

Size by `dc_charge_point_count`, color by `utilisation`.

```sql
-- High-power (150 kW+) stations: size = number of DC charge points, color = utilisation, 5-8 Nov 2026
SELECT
  s.station_id,
  s.operator,
  s.name,
  s.city,
  s.dc_charge_point_count,
  s.max_power_kw,
  ROUND(SAFE_DIVIDE(SUM(d.occupied_minutes), SUM(d.occupied_minutes + d.available_minutes)), 3) AS utilisation,
  SUM(d.estimated_sessions) AS estimated_sessions,
  ANY_VALUE(s.geog) AS geometry
FROM `dekart-ev-public-data.ev_charging_v1.station_daily_metrics` AS d
JOIN `dekart-ev-public-data.ev_charging_v1.stations` AS s USING (station_id)
WHERE d.local_date BETWEEN '2026-11-05' AND '2026-11-08'
  AND s.max_power_kw >= 150
GROUP BY 1, 2, 3, 4, 5, 6
HAVING SAFE_DIVIDE(SUM(d.unknown_minutes),
         SUM(d.occupied_minutes + d.available_minutes + d.out_of_service_minutes + d.unknown_minutes)) < 0.2
   AND estimated_sessions >= 4
```

### My site versus the networks nearby

{{< img src="my-site-vs-nearby.png" caption="An EnBW site in central Stuttgart (yellow) and the 11 other fast-charging sites within 3 km (blue). Size: utilisation." >}}

Color by `role`, size by `utilisation`. Change the `station_id` in the first step to your own site.

```sql
-- One site and every fast-charging station within 3 km, with utilisation (5-8 Nov 2026) and current price.
-- Replace the station_id with your own site.
WITH my_site AS (
  SELECT station_id AS my_station_id, geog
  FROM `dekart-ev-public-data.ev_charging_v1.stations`
  WHERE station_id = 'DE:mobidata:310110'  -- EnBW, Keplerstraße 7, Stuttgart
),
nearby AS (
  SELECT s.*, mine.my_station_id
  FROM `dekart-ev-public-data.ev_charging_v1.stations` AS s, my_site AS mine
  WHERE TRUE
    AND ST_DWITHIN(s.geog, mine.geog, 3000)
    AND s.dc_charge_point_count > 0
),
usage AS (
  SELECT
    station_id,
    ROUND(SAFE_DIVIDE(SUM(occupied_minutes), SUM(occupied_minutes + available_minutes)), 3) AS utilisation,
    SUM(estimated_sessions) AS estimated_sessions
  FROM `dekart-ev-public-data.ev_charging_v1.station_daily_metrics`
  WHERE local_date BETWEEN '2026-11-05' AND '2026-11-08'
    AND station_id IN (SELECT station_id FROM nearby)
  GROUP BY station_id
),
price AS (
  SELECT c.station_id, MIN(p.price_eur_per_kwh_incl_vat) AS dc_price_eur_per_kwh
  FROM `dekart-ev-public-data.ev_charging_v1.prices` AS p
  JOIN `dekart-ev-public-data.ev_charging_v1.charge_points` AS c USING (charge_point_id)
  WHERE p.valid_to IS NULL AND c.is_dc
    AND p.price_eur_per_kwh_incl_vat IS NOT NULL
    AND p.start_time IS NULL AND p.min_duration_minutes IS NULL AND p.max_duration_minutes IS NULL
    AND c.station_id IN (SELECT station_id FROM nearby)
  GROUP BY c.station_id
)
SELECT
  IF(n.station_id = n.my_station_id, 'My site', 'Nearby network') AS role,
  n.station_id,
  n.operator,
  n.name,
  n.dc_charge_point_count,
  n.max_power_kw,
  u.utilisation,
  u.estimated_sessions,
  p.dc_price_eur_per_kwh,
  n.geog AS geometry
FROM nearby AS n
LEFT JOIN usage AS u USING (station_id)
LEFT JOIN price AS p USING (station_id)
ORDER BY role, u.utilisation DESC
```

| role | operator | dc_charge_point_count | utilisation | dc_price_eur_per_kwh |
|---|---|---:|---:|---:|
| My site | ENBW | 12 | 0.399 | 0.79 |
| Nearby network | ENBW | 12 | 0.397 | 0.79 |
| Nearby network | Stadtwerke Stuttgart GmbH | 8 | 0.305 | 0.59 |
| Nearby network | Lidl | 2 | 0.210 | 0.55 |
| Nearby network | JOLT Energy | 2 | 0.173 | 0.79 |

### Busy hours by station

{{< img src="busiest-hour.png" caption="Local hour with the highest utilisation at each fast-charging station. Blue: morning, yellow: midday, red: evening." >}}

Color by `busiest_hour`.

```sql
-- Busiest local hour of each fast-charging station, 5-8 Nov 2026
WITH by_hour AS (
  SELECT
    station_id,
    EXTRACT(HOUR FROM DATETIME(hour_utc, 'Europe/Berlin')) AS local_hour,
    SAFE_DIVIDE(SUM(occupied_minutes), SUM(occupied_minutes + available_minutes)) AS utilisation,
    SUM(estimated_sessions) AS estimated_sessions
  FROM `dekart-ev-public-data.ev_charging_v1.station_hourly_occupancy`
  WHERE hour_utc >= '2026-11-04 23:00:00' AND hour_utc < '2026-11-08 23:00:00'  -- 5-8 Nov, Berlin time
  GROUP BY 1, 2
)
SELECT
  s.station_id,
  s.operator,
  s.name,
  s.city,
  s.dc_charge_point_count,
  h.local_hour AS busiest_hour,
  ROUND(h.utilisation, 3) AS busiest_hour_utilisation,
  s.geog AS geometry
FROM by_hour AS h
JOIN `dekart-ev-public-data.ev_charging_v1.stations` AS s USING (station_id)
WHERE s.dc_charge_point_count > 0
QUALIFY SUM(h.estimated_sessions) OVER (PARTITION BY h.station_id) >= 8   -- at least 2 sessions a day
    AND ROW_NUMBER() OVER (PARTITION BY h.station_id ORDER BY h.utilisation DESC, h.estimated_sessions DESC) = 1
```

### Price map

{{< img src="dc-price-per-kwh.png" caption="Median current energy price of each station's DC charge points, EUR per kWh including VAT. Green is cheaper, red is more expensive." >}}

Color by `price_eur_per_kwh`. Stations with a median outside 0.10–1.50 EUR are left out to keep the color scale readable.

```sql
WITH current_energy_price AS (
  SELECT charge_point_id, MIN(price_eur_per_kwh_incl_vat) AS price_eur_per_kwh
  FROM `dekart-ev-public-data.ev_charging_v1.prices`
  WHERE valid_to IS NULL
    AND price_eur_per_kwh_incl_vat IS NOT NULL
    AND start_time IS NULL
    AND min_duration_minutes IS NULL
    AND max_duration_minutes IS NULL
  GROUP BY charge_point_id
)
SELECT
  s.station_id,
  s.operator,
  s.name,
  s.city,
  s.dc_charge_point_count,
  ROUND(APPROX_QUANTILES(p.price_eur_per_kwh, 2)[OFFSET(1)], 2) AS price_eur_per_kwh,
  ANY_VALUE(s.geog) AS geometry
FROM current_energy_price AS p
JOIN `dekart-ev-public-data.ev_charging_v1.charge_points` AS c USING (charge_point_id)
JOIN `dekart-ev-public-data.ev_charging_v1.stations` AS s USING (station_id)
WHERE c.is_dc
GROUP BY 1, 2, 3, 4, 5
HAVING price_eur_per_kwh BETWEEN 0.1 AND 1.5
```

### Demand versus supply by H3 cell

{{< img src="h3-demand-supply.png" caption="H3 cells (resolution 6, about 36 km²) with at least 10 charge points. Color: occupied hours per charge point per day, purple low, yellow high." >}}

Color by `occupied_hours_per_charge_point_per_day`; `sessions_per_charge_point_per_day` gives the same view in charging sessions. `jslibs.eu_h3.ST_H3` is a public H3 function for BigQuery's `EU` region.

```sql
-- Demand versus supply per H3 cell: occupied hours and sessions per charge point per day, 5-8 Nov 2026
WITH demand AS (
  SELECT
    station_id,
    SUM(occupied_minutes) / 60 AS occupied_hours,
    SUM(estimated_sessions) AS estimated_sessions
  FROM `dekart-ev-public-data.ev_charging_v1.station_daily_metrics`
  WHERE local_date BETWEEN '2026-11-05' AND '2026-11-08'  -- 4 days
  GROUP BY station_id
)
SELECT
  jslibs.eu_h3.ST_H3(s.geog, 6) AS h3,
  COUNT(*) AS stations,
  SUM(s.charge_point_count) AS charge_points,
  ROUND(SUM(d.occupied_hours) / 4 / SUM(s.charge_point_count), 2) AS occupied_hours_per_charge_point_per_day,
  ROUND(SUM(d.estimated_sessions) / 4 / SUM(s.charge_point_count), 2) AS sessions_per_charge_point_per_day
FROM `dekart-ev-public-data.ev_charging_v1.stations` AS s
JOIN demand AS d USING (station_id)
WHERE s.charge_point_count > 0
  AND s.latitude BETWEEN 47.2 AND 55.1 AND s.longitude BETWEEN 5.8 AND 15.1
GROUP BY h3
HAVING charge_points >= 10   -- skip cells with too few charge points to compare
```

## What will not change

The dataset name `ev_charging_v1` is a promise. Within v1, columns are only added, never renamed, retyped or removed, and new sources and countries only add rows. A change that would break a query goes to a new dataset, `ev_charging_v2`, and v1 stays available for 90 days after it.

If a daily update fails its checks, the previous day's data stays in place.

## Checklist for AI agents

- Use full table names `` `dekart-ev-public-data.ev_charging_v1.<table>` `` and region `EU`.
- Join hourly and daily tables to `stations` on `station_id`, and prices to `charge_points` on `charge_point_id`.
- Compute utilisation as `SUM(occupied_minutes) / SUM(occupied_minutes + available_minutes)`; never average ratios.
- Exclude stations with a high unknown share and stations with no `estimated_sessions` when ranking.
- Use `local_date` for days; convert `hour_utc` with `DATETIME(hour_utc, 'Europe/Berlin')` for local hours.
- Start time series on 5 November 2026; note the polling change on 7 November 2026.
- For current prices, filter `valid_to IS NULL` and the condition columns; expect several rows per charge point.
- Call `estimated_sessions` an estimate.
- Credit the sources listed in `sources`.
