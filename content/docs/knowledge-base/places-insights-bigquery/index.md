---
title: "Use Google Places Insights in BigQuery"
description: "How to set up Google Places Insights in BigQuery, query it safely with aggregation threshold rules, pick H3 levels, and render an actual street-level map."
lead: "Query Google Maps Places data in BigQuery, aggregate it safely, and render the result as a map."
date: 2026-06-23T00:00:00Z
lastmod: 2026-06-23T00:00:00Z
draft: false
weight: 25
toc: true
images: ["places-insights-bigquery-h3-streets.png"]
contributors: ["Vladi"]
menu:
  docs:
    parent: "knowledge-base"
    name: "Places Insights in BigQuery"
---

Google Places Insights makes Google Maps Places data queryable in BigQuery. You can use SQL to analyze restaurants, shops, services, ratings, opening hours, accessibility attributes, and other POI attributes without building your own Places ETL pipeline.

The important difference from a normal POI table: Places Insights is designed for aggregated analysis. You should expect privacy and aggregation rules, especially when you try to map small areas.

## Getting started

### Main links

- [Places Insights overview](https://developers.google.com/maps/documentation/placesinsights/overview)
- [Set up Places Insights](https://developers.google.com/maps/documentation/placesinsights/cloud-setup)
- [About Places Insights data and queries](https://developers.google.com/maps/documentation/placesinsights/about-data)
- [BigQuery analysis rules](https://docs.cloud.google.com/bigquery/docs/analysis-rules)
- [Google Maps Platform announcement: Places Insights in BigQuery GA](https://mapsplatform.google.com/resources/blog/places-insights-in-bigquery-is-now-generally-available/)

### What you can do with it

Places Insights is useful when you need aggregate location intelligence, not raw POI scraping.

Good use cases:

- Count nearby competitors around a proposed store.
- Compare commercial density by neighborhood.
- Find streets or H3 cells with high restaurant review volume.
- Join POI density with your own stores, catchments, parcels, or mobility data.
- Build dashboards for site selection, market planning, and local performance analysis.

Bad fit:

- You need a complete row-level export of all places.
- You need exact low counts like 0, 1, 2, 3, or 4 from a direct SQL query.
- You need to bypass Google Maps Platform terms for individual place data.

For low or zero counts, read Google's distinction between direct queries and Places Count function queries in [About Places Insights data and queries](https://developers.google.com/maps/documentation/placesinsights/about-data).

### Setup

Before you can query the data, Google says you must request access to Places Insights and have a Google Cloud account. After onboarding, you subscribe to a Places Insights dataset listing for the target country or city.

High-level flow:

- Request access through [Google Maps Platform Places Insights](https://developers.google.com/maps/documentation/placesinsights/cloud-setup).
- Open the Places Insights dataset listing for your target geography.
- Subscribe to the listing in the Google Cloud console.
- Grant access to the BigQuery users, groups, or service accounts that will query the dataset.
- Query the subscribed dataset from BigQuery, Dekart, dbt, notebooks, or any BigQuery client.

After subscription, you should see one or more datasets in BigQuery. Exact dataset names depend on the listing and your project. In the examples below, replace:

`YOUR_PROJECT.YOUR_DATASET.places_sample`

with your Places Insights table or view.

## Querying Places Insights

### Common mistakes

If you query Places Insights like a normal table, BigQuery can reject the query.

This kind of query is the wrong mental model:

```sql
SELECT id, display_name, point, rating
FROM `YOUR_PROJECT.YOUR_DATASET.places_sample`
WHERE primary_type = 'restaurant'
LIMIT 100;
```

Direct Places Insights queries enforce an aggregation threshold. Google documents that direct queries return a result only when the query aggregates at least 5 Places. BigQuery analysis-rule docs explain the same pattern: rows that do not meet the threshold are omitted.

Use `SELECT WITH AGGREGATION_THRESHOLD` and aggregate.

```sql
SELECT WITH AGGREGATION_THRESHOLD
  primary_type,
  COUNT(*) AS place_count,
  AVG(rating) AS avg_rating,
  SUM(CAST(user_rating_count AS FLOAT64)) AS total_user_rating_count
FROM `YOUR_PROJECT.YOUR_DATASET.places_sample`
WHERE primary_type IN ('restaurant', 'cafe', 'bar', 'bakery')
  AND rating IS NOT NULL
  AND user_rating_count IS NOT NULL
GROUP BY primary_type
ORDER BY total_user_rating_count DESC;
```

### What the aggregation rule means in practice

The rule changes how you design geospatial queries.

- A group with fewer than 5 Places can be omitted.
- A small H3 cell can disappear even if it contains one real restaurant.
- A short street segment can disappear even if the full street has many restaurants.
- `LIMIT 1000` does not force 1000 rows. It only limits rows that survived the threshold.
- Direct row-level place extraction is not the intended use case.

This is why fine-grained geometry joins are tricky. A small polygon, parcel, trade area, or short road segment can have only 1 to 4 matching places. BigQuery can omit those rows, even when the broader neighborhood is commercially important.

## H3 aggregation

### Use H3 before enrichment

For maps, a better pattern is:

`Places -> H3 aggregate -> enrichment geometry`

H3 gives you stable spatial buckets that can pass the aggregation threshold before you join to other geometry. That geometry could be your own stores, catchments, delivery zones, census areas, parcels, neighborhoods, or public reference data such as Overture Maps roads.

Common enrichment joins:

| Join pattern | When to use it | Risk |
|---|---|---|
| Geometry centroid H3 equals place H3 | Fast, simple, coarse maps | Drops features when cells get small |
| H3 polygon intersects target geometry | Better for lines and irregular polygons | A target feature inherits metrics from nearby places in the same cell |
| Target geometry contains H3 centroid | Good for administrative areas or catchments | Can miss edge cells |

For the Berlin street-enrichment example below, the centroid join was too strict. The corrected query uses H3 polygon boundaries and `ST_INTERSECTS`.

### H3 resolution test query

Use this query before building a map. It shows how many H3 cells survive the aggregation threshold at each resolution, and how many Places remain represented.

```sql
WITH h3_metrics AS (
  SELECT WITH AGGREGATION_THRESHOLD
    res,
    `carto-os.carto.H3_FROMGEOGPOINT`(point, res) AS h3,
    COUNT(*) AS place_count,
    SUM(CAST(user_rating_count AS FLOAT64)) AS total_user_rating_count
  FROM `YOUR_PROJECT.YOUR_DATASET.places_sample`
  CROSS JOIN UNNEST([8, 9, 10, 11, 12]) AS res
  WHERE primary_type IN (
    'restaurant',
    'cafe',
    'bar',
    'bakery',
    'fast_food_restaurant',
    'meal_takeaway',
    'meal_delivery'
  )
    AND point IS NOT NULL
    AND rating IS NOT NULL
    AND user_rating_count IS NOT NULL
  GROUP BY res, h3
)
SELECT
  res,
  COUNT(*) AS returned_h3_cells,
  SUM(place_count) AS represented_places,
  SUM(total_user_rating_count) AS represented_rating_count,
  MIN(place_count) AS min_places_per_cell,
  MAX(place_count) AS max_places_per_cell,
  AVG(place_count) AS avg_places_per_cell,
  AVG(ST_AREA(`carto-os.carto.H3_BOUNDARY`(h3))) AS avg_cell_area_m2,
  SQRT(AVG(ST_AREA(`carto-os.carto.H3_BOUNDARY`(h3)))) AS approx_cell_width_m
FROM h3_metrics
GROUP BY res
ORDER BY res;
```

If the finest resolutions return only a few cells, they are technically valid but probably not useful for a city-scale map.

### Map-ready H3 cell query

Once you pick a resolution, return one row per H3 cell with a `geometry` column. Dekart, Kepler.gl, and most map tools can render this directly as polygons.

```sql
WITH h3_metrics AS (
  SELECT WITH AGGREGATION_THRESHOLD
    `carto-os.carto.H3_FROMGEOGPOINT`(point, 10) AS h3,
    COUNT(*) AS place_count,
    SUM(CAST(user_rating_count AS FLOAT64)) AS total_user_rating_count,
    AVG(rating) AS avg_rating,
    SUM(rating * CAST(user_rating_count AS FLOAT64))
      / NULLIF(SUM(CAST(user_rating_count AS FLOAT64)), 0) AS weighted_avg_rating
  FROM `YOUR_PROJECT.YOUR_DATASET.places_sample`
  WHERE primary_type IN (
    'restaurant',
    'cafe',
    'bar',
    'bakery',
    'fast_food_restaurant',
    'meal_takeaway',
    'meal_delivery'
  )
    AND point IS NOT NULL
    AND rating IS NOT NULL
    AND user_rating_count IS NOT NULL
  GROUP BY h3
)
SELECT
  h3,
  `carto-os.carto.H3_BOUNDARY`(h3) AS geometry,
  CAST(place_count AS FLOAT64) AS place_count,
  total_user_rating_count,
  avg_rating,
  weighted_avg_rating,
  ST_AREA(`carto-os.carto.H3_BOUNDARY`(h3)) AS h3_cell_area_m2
FROM h3_metrics
ORDER BY total_user_rating_count DESC;
```

Use this H3-only result when you want the cleanest density map. Join to enrichment geometry only when you need the output attached to another business object, such as stores, districts, or streets.

### Picking an H3 level

The smallest H3 level is not automatically the best level.

In a Berlin food and drink sample, direct H3 aggregation returned cells down to H3 r15. But r15 represented only a few tiny cells, not a useful city map.

Observed approximate cell widths around Berlin:

| H3 resolution | Approx cell width | Direct H3 cells returned | Represented places |
|---:|---:|---:|---:|
| 8 | 810 m | 438 | 12,243 |
| 9 | 306 m | 763 | 9,884 |
| 10 | 116 m | 667 | 4,895 |
| 11 | 44 m | 148 | 865 |
| 12 | 17 m | 18 | 104 |
| 13 | 6 m | 5 | 32 |
| 14 | 2 m | 4 | 24 |
| 15 | 1 m | 4 | 24 |

For the street-enrichment map, H3 r10 was the smallest useful level in this example.

Street-enrichment coverage using H3 polygon intersection:

| H3 resolution | Street segment matches | Street names |
|---:|---:|---:|
| 9 | 12,504 | 2,424 |
| 10 | 3,050 | 750 |
| 11 | 188 | 104 |
| 12 | 5 | 2 |
| 13 | 2 | 1 |

Rule of thumb:

- Start at r9 for city-wide exploration.
- Try r10 when you need more local detail and enough density exists.
- Use r11 only for very dense areas.
- Avoid r12+ for city-scale Places maps unless you intentionally want a sparse map of only the densest micro-clusters.

## Complete Example

### Berlin food ratings on Overture streets

This enrichment example colors Overture street segments by the total Google Places review count from intersecting H3 r10 cells. The same pattern can enrich other geometry tables. It includes restaurants, cafes, bars, bakeries, fast food, takeaway, and delivery places.

{{< img src="places-insights-bigquery-h3-streets.png" cloud="5613be52-41ee-47db-adb8-905b04caf0d3" caption="Berlin food and drink Places Insights aggregated to H3 r10, joined to Overture street geometries, and colored by total user rating count." >}}

The map uses H3 r10 because it preserved useful coverage for this line-geometry enrichment while staying more granular than r9. Around Berlin, r10 cells are about 116 m by square-root area.

### SQL

Replace `YOUR_PROJECT.YOUR_DATASET.places_sample` with your subscribed Places Insights table or view.

This query uses CARTO's public BigQuery H3 UDFs:

`carto-os.carto.H3_FROMGEOGPOINT`

`carto-os.carto.H3_BOUNDARY`

```sql
WITH area AS (
  -- Resolve the target geography once.
  -- Keep the exact boundary geometry for the final ST_INTERSECTS filter.
  SELECT geometry
  FROM `bigquery-public-data.overture_maps.division_area`
  WHERE country = 'DE'
    AND region = 'DE-BE'
    AND names.primary = 'Berlin'
    AND subtype = 'region'
    AND class = 'land'
  LIMIT 1
),
h3_places AS (
  -- Places Insights must be queried as an aggregate.
  -- Groups with fewer than the configured threshold are omitted.
  SELECT WITH AGGREGATION_THRESHOLD
    -- H3 r10 is the analysis grain for this example.
    `carto-os.carto.H3_FROMGEOGPOINT`(point, 10) AS h3,

    -- Volume metrics.
    COUNT(*) AS place_count,
    SUM(CAST(user_rating_count AS FLOAT64)) AS total_user_rating_count,

    -- Keep sums so later rollups across multiple H3 cells stay correct.
    SUM(rating) AS rating_sum,
    SUM(rating * CAST(user_rating_count AS FLOAT64)) AS weighted_rating_sum,

    -- Category mix inside each H3 cell.
    COUNTIF(primary_type = 'restaurant') AS restaurant_count,
    COUNTIF(primary_type = 'cafe') AS cafe_count,
    COUNTIF(primary_type = 'bar') AS bar_count,
    COUNTIF(primary_type = 'bakery') AS bakery_count,
    COUNTIF(primary_type = 'fast_food_restaurant') AS fast_food_count,
    COUNTIF(primary_type IN ('meal_takeaway', 'meal_delivery')) AS takeaway_delivery_count,

    -- Useful for documenting the effective cell size in the output.
    AVG(ST_AREA(`carto-os.carto.H3_BOUNDARY`(
      `carto-os.carto.H3_FROMGEOGPOINT`(point, 10)
    ))) AS h3_cell_area_m2
  FROM `YOUR_PROJECT.YOUR_DATASET.places_sample`
  WHERE primary_type IN (
    -- Food and drink place types. Adjust this list for your analysis.
    'restaurant',
    'cafe',
    'bar',
    'bakery',
    'fast_food_restaurant',
    'meal_takeaway',
    'meal_delivery'
  )
    AND point IS NOT NULL
    AND rating IS NOT NULL
    AND user_rating_count IS NOT NULL
  GROUP BY h3
),
h3_cells AS (
  -- Convert each surviving H3 bucket into a polygon.
  -- This lets us enrich any target geometry with ST_INTERSECTS.
  SELECT
    *,
    `carto-os.carto.H3_BOUNDARY`(h3) AS h3_geometry
  FROM h3_places
),
segments AS (
  -- Example enrichment geometry: named Overture road segments in Berlin.
  -- You can replace this CTE with stores, catchments, districts, parcels, etc.
  SELECT
    s.id AS segment_id,
    s.names.primary AS street_name,
    s.class,
    s.subclass,
    s.geometry
  FROM `bigquery-public-data.overture_maps.segment` s
  CROSS JOIN area a
  WHERE s.subtype = 'road'
    -- Keep human-readable street-like classes, excluding service roads.
    AND s.class IN (
      'motorway',
      'trunk',
      'primary',
      'secondary',
      'tertiary',
      'residential',
      'living_street',
      'unclassified'
    )
    AND s.names.primary IS NOT NULL
    AND s.names.primary != ''

    -- Cheap bbox overlap gate before the expensive geography predicate.
    -- Use overlap, not containment, so crossing features are not dropped.
    AND s.bbox.xmax >= 13.08834457397461
    AND s.bbox.xmin <= 13.761162757873535
    AND s.bbox.ymax >= 52.33823776245117
    AND s.bbox.ymin <= 52.67551040649414

    -- Exact Berlin boundary filter after bbox pruning.
    AND ST_INTERSECTS(s.geometry, a.geometry)
),
joined AS (
  -- Enrich target geometry with every H3 cell it intersects.
  -- This is safer than matching only the target geometry centroid to one H3 cell.
  SELECT
    s.segment_id,
    s.street_name,
    s.class,
    s.subclass,
    s.geometry,
    h.h3,
    h.place_count,
    h.total_user_rating_count,
    h.rating_sum,
    h.weighted_rating_sum,
    h.restaurant_count,
    h.cafe_count,
    h.bar_count,
    h.bakery_count,
    h.fast_food_count,
    h.takeaway_delivery_count,
    h.h3_cell_area_m2
  FROM segments s
  JOIN h3_cells h
    ON ST_INTERSECTS(s.geometry, h.h3_geometry)
),
segment_metrics AS (
  -- Collapse back to one row per target feature.
  -- If a feature crosses multiple H3 cells, sum the H3 metrics.
  SELECT
    segment_id,
    ANY_VALUE(street_name) AS street_name,
    ANY_VALUE(class) AS class,
    ANY_VALUE(subclass) AS subclass,
    ANY_VALUE(geometry) AS geometry,
    COUNT(DISTINCT h3) AS h3_cell_count,
    SUM(place_count) AS h3_place_count,
    SUM(total_user_rating_count) AS total_user_rating_count,

    -- Recompute averages from sums, not by averaging cell-level averages.
    SUM(rating_sum) / NULLIF(SUM(place_count), 0) AS avg_rating,
    SUM(weighted_rating_sum) / NULLIF(SUM(total_user_rating_count), 0) AS weighted_avg_rating,
    SUM(total_user_rating_count) / NULLIF(SUM(place_count), 0) AS avg_user_rating_count,

    SUM(restaurant_count) AS restaurant_count,
    SUM(cafe_count) AS cafe_count,
    SUM(bar_count) AS bar_count,
    SUM(bakery_count) AS bakery_count,
    SUM(fast_food_count) AS fast_food_count,
    SUM(takeaway_delivery_count) AS takeaway_delivery_count,
    AVG(h3_cell_area_m2) AS h3_cell_area_m2
  FROM joined
  GROUP BY segment_id
)
SELECT
  -- Final map layer: one row per enriched geometry.
  segment_id,
  street_name,
  class,
  subclass,
  geometry AS geometry,
  CAST(h3_cell_count AS FLOAT64) AS h3_cell_count,
  CAST(h3_place_count AS FLOAT64) AS h3_place_count,
  total_user_rating_count,
  avg_user_rating_count,
  avg_rating,
  weighted_avg_rating,
  CAST(restaurant_count AS FLOAT64) AS restaurant_count,
  CAST(cafe_count AS FLOAT64) AS cafe_count,
  CAST(bar_count AS FLOAT64) AS bar_count,
  CAST(bakery_count AS FLOAT64) AS bakery_count,
  CAST(fast_food_count AS FLOAT64) AS fast_food_count,
  CAST(takeaway_delivery_count AS FLOAT64) AS takeaway_delivery_count,
  h3_cell_area_m2,
  SQRT(h3_cell_area_m2) AS approx_h3_cell_width_m,
  ST_LENGTH(geometry) AS street_length_m
FROM segment_metrics
ORDER BY total_user_rating_count DESC, street_name
LIMIT 10000;
```

### Why the query is written this way

`SELECT WITH AGGREGATION_THRESHOLD` appears in the `h3_places` CTE because the Places table is protected by an aggregation threshold rule. The query aggregates first, then joins those aggregate H3 cells to an enrichment geometry table. In this example, that table is Overture Maps street geometries.

The Overture `bbox` filter is there for cost control. The public Overture segment table is global. For city-scale work, use a hardcoded bounding box before `ST_INTERSECTS`.

`ST_INTERSECTS(s.geometry, h.h3_geometry)` is used instead of a centroid join. For line geometries and irregular polygons, centroid joins become brittle when H3 cells get small.

The final result is one row per enrichment feature. In this example, that means one row per street segment. If a segment intersects multiple H3 cells, the query sums those H3 metrics for that segment.

## Limitations and troubleshooting

### Limitations

This is still aggregated data. Do not read the output as exact "these specific restaurants belong to this exact enrichment feature" attribution.

Important caveats:

- Nearby enrichment features can inherit the same H3-cell metrics.
- H3 cells at r10 are still neighborhood-scale cells, not parcel boundaries.
- Low-density areas disappear when they do not pass the Places aggregation threshold.
- The query excludes places without `rating` or `user_rating_count`.
- The query excludes unnamed Overture roads and service roads.
- Overture street geometries are segmented, so a long street appears as multiple map features.
- Dataset access and permitted usage depend on your Google Maps Platform agreement.

For exact low-count behavior, use the official Places Count functions described in Google's docs. Direct SQL against the Places Insights data is best for aggregate metrics, joins, and map layers where low-count suppression is acceptable.

### Troubleshooting

**The query says I must use aggregation threshold.**

Add `SELECT WITH AGGREGATION_THRESHOLD` to the query block that reads Places Insights directly, and make sure you are aggregating.

**My H3 map is nearly empty.**

Lower the H3 resolution. Try r9 or r10 for city-scale analysis. In the Berlin example, r11 was already too sparse for a useful street map.

**My enrichment map misses known commercial areas or streets.**

Do not group directly by tiny target geometries. Aggregate Places to H3 first, then join H3 polygons to the geometry you want to enrich.

**Many places snap to unnamed service roads.**

Avoid nearest-road snapping for this use case, or exclude service roads and use H3-to-street intersection instead.

**The query scans too much Overture data.**

Use the bbox overlap pattern before `ST_INTERSECTS`, as shown in the SQL. Bbox containment is wrong for features that cross the boundary; use overlap.

## See also

- [Choose a BigQuery connection method in Dekart](/docs/usage/choose-bigquery-connection-method/)
- [Overture Maps examples in BigQuery](/docs/about/overture-maps-examples/)
- [ST_ASWKT in BigQuery: 3 working examples](/docs/knowledge-base/st-aswkt-bigquery/)
- [Get Overture Maps in Snowflake from the Marketplace](/docs/knowledge-base/overture-maps-snowflake-marketplace/)
