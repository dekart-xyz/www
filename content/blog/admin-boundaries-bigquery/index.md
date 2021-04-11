---
title: "Admin Boundaries in BigQuery Open Datasets"
description: "Fetch Countries, States, Zip codes and City Districts Geography from BigQuery Open Datasets"
lead: "Fetch Countries, States, Zip codes and City Districts Geography from BigQuery Open Datasets"
date: 2021-03-28T06:59:51Z
lastmod: 2021-03-28T06:59:51Z
draft: false
weight: 50
images: ["all-us-zipcodes-large.png"]
contributors: ["Vladi"]
---

{{< img src="all-us-zipcodes-large.png"  caption="All US Zip Codes Geometries Visualized with Dekart" class="wide" >}}


## When you need Admin Boundaries in BigQuery?

There are few reason why you need Admin Boundaries in your Data Analysis:

* Your data does not have explicit coordinates or geometries but has reference to Countries, States, Counties or Zip codes
* Admin Boundaries (like city boundary) presents a meaningful way to clip your data for analysis.
* You want to perform analysis per admin geography (like number of new COVID cases per state/ per capita)

There are platforms which allow you to enrich your data with Admin Geometries, but then you lose all power of filtering and aggregation with BigQuery SQL.

<blockquote class="blockquote">
<p class="mb-0">When your data is in BigQuery you need Admin Boundaries in BigQuery.</p>
</blockquote>

You always can acquire Admin Boundaries dataset and upload it to BigQuery. However, before doing it, check if it already exists for free in BigQuery Open Datasets.

## Admin Boundaries from OpenStreetMap dataset in BigQuery

Open Street Maps (OSM) did for cartography the same as Wikipedia did for encyclopedias. You may find data structure tricky, but with some effort you can extract extensive geometries sets.

Before I used Overpass Turbo with its quirky DSL to get subset OSM Data. But now (since 2020) every user of BigQuery can select (and join!) OpenStreetMap as one of Open Datasets.

These are few SQL examples of how you do it with tips and tricks:

### World Countries Borders

This example shows how to fetch country borders from <a href="https://wiki.openstreetmap.org/wiki/BigQuery_dataset" target="_blank">BigQuery hosted OSM dataset</a>

{{< img src="world-countries-borders.png"  caption="World Countries Borders example from OSM" report="03483cdc-9e29-4d79-804b-23bdd2fcd07a" >}}

```sql
SELECT
-- this one way to get a prop from nested struct
(
  SELECT value
  FROM UNNEST(all_tags)
  WHERE key = 'ISO3166-1'
) AS country_code,
-- getting int_name or name whatever comes first
ARRAY(
  SELECT value
  FROM UNNEST(all_tags)
  WHERE key IN('int_name', 'name')
  LIMIT 1
) [OFFSET(0)] AS name,
-- fixing cross antimeridian edges
ST_ASGEOJSON(
  -- simplifying geometry, full one >100Mb
  ST_SIMPLIFY(geometry, 1000)
) AS geometry
FROM
-- OSM dataset in bigquery public data
`bigquery-public-data.geo_openstreetmap.planet_features_multipolygons`
WHERE ('boundary', 'administrative') IN (
  SELECT (key, value)
  FROM UNNEST(all_tags)
)
AND ('admin_level', '2') IN (
  SELECT (key, value)
  FROM UNNEST(all_tags)
)
-- make sure name exists
AND 'name' IN (
  SELECT key
  FROM UNNEST(all_tags)
)
```
{{< try-query report="03483cdc-9e29-4d79-804b-23bdd2fcd07a" >}}

Explanations:
* all OSM geometries (multipolygons) are in `planet_features_multipolygons` table which is available for free for every user of BigQuery.
* to fetch specific geometries (country borders) we filter by tags stored in nested `all_tags` structure; specifically we filter by `boundary` and `admin_level` tags
* countries are big and raw geometries of borders are huge; we use BigQuery function `ST_SIMPLIFY` to simplify geometry to 1000m precision;
* to avoid artifacts when visualize with tools like Kepler.gl or other supporting only projected (flat-map) spatial reference system (SRS), we use `ST_ASGEOJSON` to achieve correct rendering of edges crossing antimeridian;

{{< img src="osm-geometry-cross-meridian-distortion.png"  caption="Edges cross anti-meridian distortion" >}}

### US States Borders

Using the same method you can go down to the state level. Here ia a query for the fifty states, the District of Columbia, and the five permanently inhabited territories of the United States.

{{< img src="us-borders-osm-bigquery.png"  caption="US States Borders including DC and territories" report="a12bd8b7-8b48-48a3-b8dc-48edbbef29ec" >}}

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
{{< try-query report="a12bd8b7-8b48-48a3-b8dc-48edbbef29ec" >}}

Explanations:

* everything's from query above
* filtering for `admin_level=4` and country code prefixed with `US`

### Berlin City Districts

Can you go beyond state level? Absolutely, you can get city borders and even city district borders. And not just in the US. For this example I fetched city districts for Berlin, Germany.

{{< img src="germany-berlin-city-districts.png" report="2eb93751-368b-4ee0-9933-91bbcb5a433b"  caption="US States Borders including DC and territories." >}}


```sql
SELECT
-- getting name from nested all_tags
(
  SELECT value
  FROM UNNEST(all_tags)
  WHERE key = 'name'
  LIMIT 1
) AS name,
-- getting original geometry, no simplification needed
geometry
FROM `bigquery-public-data.geo_openstreetmap.planet_features_multipolygons` AS features
WHERE
-- getting data from particular import of German Borders
(
  'source',
  'http://wiki.openstreetmap.org/wiki/Import/Catalogue/Kreisgrenzen_Deutschland_2005'
) IN (
  SELECT (key, value)
  FROM UNNEST(all_tags)
)
-- only Berlin has boundaries at this level
AND ('admin_level', '9') IN (
  SELECT (key, value)
  FROM UNNEST(all_tags)
)
```
{{< try-query report="2eb93751-368b-4ee0-9933-91bbcb5a433b" >}}


So how does one know what tags to filter for? I start by googling something like `OSM Berlin Mitte` (one of districts) and finding something [like this](https://www.openstreetmap.org/relation/16566) on the OSM web site. Then play with SQL on [Dekart Playground](/docs/about/playground/) until I find the right filtering options.

**Please Note:**
* Admin Boundaries and maps are subject of regulation in many countries (like showing disputed borders)
* data in OSM is not necessarily up-to-date and correctly representing borders according to your country law



## More Admin Geometries in BigQuery

OSM Dataset is not the only source of useful reference geometries. There are more like ZIP Codes or [Geoip](https://cloudplatform.googleblog.com/2014/03/geoip-geolocation-with-google-bigquery.html) datasets available.

### US ZIP Codes

Another common way to reference data is by ZIP codes. BigQuery Open Datasets has a table for it. In this example we fetch ZIP Codes around Seattle.

{{< img src="us-zip-codes-bigquery.png" report="5b8ace27-8f97-41d7-93c6-cf8369048dca"  caption="Fetching US ZIP codes geometries around Seattle" >}}

```sql
SELECT zipcode_geom
-- public dataset with US ZIP Codes
FROM `bigquery-public-data.utility_us.zipcode_area`
WHERE
ST_DWITHIN(
  -- creating point from ZIP Code area centroid
  ST_GeogPoint(longitude, latitude),
  -- Seattle
  ST_GeogPoint(-122.3321, 47.6062),
  -- 10km / 6.2 miles
  10000
)
```
{{< try-query report="5b8ace27-8f97-41d7-93c6-cf8369048dca" >}}

Explanations:

* main trick here is using `ST_DWITHIN` which checks distance between geometries
* `zipcode_area` table has precalculated centroid coordinates `longitude, latitude`; more precisely but much slower would be to use `ST_GEOGFROMTEXT(zipcode_geom)`

Of course you can fetch all geometries but mind the size when visualizing. This is Dekart [visualization of all US ZIP Codes (40Mb)](https://play.dekart.xyz/reports/3e012bad-751b-4740-b225-0d78fde7be30).

{{< img-simple src="zoom-in-us-zip-codes.gif"  caption="US ZIP codes geometries with Dekart" >}}

## Summary

* If your data is in BigQuery you need your reference geometries (like Admin Boundaries) in BigQuery to use the full power of BigQuery SQL (including GIS functions).
* You can get various useful Reference Geometries from BigQuery Public Datasets and join then with your private datasets for Analysis
* All examples have links to Dekart Playground where you can [query and visualize GIS data from any BigQuery Public dataset](/docs/about/playground/); Dekart is open-source GIS Visualization tool you can deploy to your cloud and [use with your data](http://localhost:1313/docs/about/your-datasets/).
