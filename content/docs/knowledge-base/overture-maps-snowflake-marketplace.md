---
title: "Get Overture Maps in Snowflake from the Marketplace"
description: "Step-by-step: install free Overture Maps shares (Places, Buildings, Transportation, Divisions, Addresses, Base) from the Snowflake Marketplace via CARTO."
lead: "Install free Overture Maps shares from the Snowflake Marketplace in under five minutes."
date: 2026-05-01T00:00:00Z
lastmod: 2026-05-01T00:00:00Z
draft: false
weight: 30
toc: true
images: []
contributors: ["Vladi"]
menu:
  docs:
    parent: "knowledge-base"
    name: "Overture Maps in Snowflake"
---

## What you get

Overture Maps is published on the Snowflake Marketplace by **CARTO** as free, read-only data shares. No ETL, no storage cost. You only pay for the compute you run against the data.

The data is split into one listing per Overture theme:

| Listing | Contents |
|---|---|
| `CARTO: Overture Maps - Addresses` | postal addresses |
| `CARTO: Overture Maps - Base` | land, water, land cover, infrastructure |
| `CARTO: Overture Maps - Buildings` | building footprints |
| `CARTO: Overture Maps - Divisions` | countries, regions, localities, boundaries |
| `CARTO: Overture Maps - Places` | POIs |
| `CARTO: Overture Maps - Transportation` | roads, segments, connectors |

CARTO refreshes each share on every Overture release.

## Step 1: Open Snowflake Marketplace

In Snowsight, go to **Data Products → Marketplace**, or open it directly:

[Search Marketplace for "Overture Maps"](https://app.snowflake.com/marketplace/data-products/search?search=overture%20maps)

## Step 2: Pick the listings you need

You can install all six or only the themes you use. Common starting set:

- **Divisions** (needed to resolve city/country boundaries)
- **Transportation** (roads, segments)
- **Places** (POIs)

Direct links:

- [Overture Maps - Places](https://app.snowflake.com/marketplace/listing/GZT0Z4CM1E9KR/carto-overture-maps-places)
- [Overture Maps - Addresses](https://app.snowflake.com/marketplace/listing/GZT0Z4CM1E9NQ)

## Step 3: Get the share

On each listing page, click **Get**. Snowflake will prompt for:

1. **Database name.** Keep the default (`OVERTURE_MAPS__PLACES`, `OVERTURE_MAPS__TRANSPORTATION`, etc.) so the SQL examples below work as-is.
2. **Roles** that should have access. Add `PUBLIC` if you want it queryable by everyone in your account.

Click **Get** again. The share appears as a database in your account within seconds.

## Step 4: Verify the install

Run this in a Snowflake worksheet:

```sql
SHOW DATABASES LIKE 'OVERTURE_MAPS__%';
```

You should see one row per installed theme.

## Step 5: First query

Find Berlin in the divisions share:

```sql
SELECT subtype, class, names:primary::string AS name, country, region
FROM overture_maps__divisions.carto.division_area
WHERE country = 'DE' AND region = 'DE-BE'
  AND subtype = 'region' AND class = 'land';
```

Pull all roads in Berlin from the transportation share:

```sql
WITH berlin AS (
  SELECT geometry
  FROM overture_maps__divisions.carto.division_area
  WHERE country = 'DE' AND region = 'DE-BE'
    AND subtype = 'region' AND class = 'land'
)
SELECT s.id, s.class, s.geometry
FROM overture_maps__transportation.carto.segment s
CROSS JOIN berlin b
WHERE s.subtype = 'road'
  AND s.bbox:xmax::float >= 13.08834457397461
  AND s.bbox:xmin::float <= 13.761162757873535
  AND s.bbox:ymax::float >= 52.33823776245117
  AND s.bbox:ymin::float <= 52.67551040649414
  AND ST_INTERSECTS(s.geometry, b.geometry)
LIMIT 1000;
```

The bbox pre-filter is not optional. Without it, every query scans the global segment table.

## Schema notes

- All themes use schema `CARTO`. Examples: `OVERTURE_MAPS__TRANSPORTATION.CARTO.SEGMENT`, `OVERTURE_MAPS__DIVISIONS.CARTO.DIVISION_AREA`.
- `geometry` is `GEOGRAPHY`.
- `bbox`, `names`, `speed_limits`, and most struct fields are `VARIANT`. Access with `:` and cast: `s.bbox:xmin::float`, `names:primary::string`, `s.speed_limits[0]:max_speed:value::int`.

## Cost

The data is free. You pay only Snowflake compute. The bbox + `ST_INTERSECTS` pattern keeps city-scale queries cheap; country-scale queries can scan tens of GB, so always filter.

## Troubleshooting

- **`SHOW DATABASES LIKE 'OVERTURE_MAPS__%'` returns nothing.** The share is not installed for the current account. Re-run Step 3.
- **Permission denied on the database.** Grant the share's role to your user, or add `PUBLIC` during install.
- **Stale data.** Listings auto-refresh on each Overture release. Check the share description in the listing for the current version.
- **Other issues.** CARTO support: `support@carto.com`.

## See also

- [Why we switched from OpenStreetMap to Overture Maps on BigQuery and Snowflake](/blog/why-we-stopped-using-openstreetmap-and-switched-to-overture-maps/)
- [Overture Maps examples in BigQuery](/docs/about/overture-maps-examples/)
- [Overture Maps Snowflake docs (official)](https://docs.overturemaps.org/getting-data/data-mirrors/snowflake/)
