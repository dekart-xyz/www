---
title: "Why We Stopped using OpenStreetMap and switched to Overture Maps"
description: "Faster Queries, Seamless Integration, and Real-Time Mapping with Overturen Maps"
lead: "Faster Queries, Seamless Integration, and Real-Time Mapping with Overturen Maps"
date: 2024-06-28T06:59:51Z
lastmod: 2024-06-28T06:59:51Z
draft: false
weight: 50
images: ["1716710901364.jpeg"]
contributors: ["Vladi"]
---

{{< img src="1716710901364.jpeg"  caption="Switching from OSM to Overture Maps" class="wide" >}}

We didn’t want to talk about Overture Maps until we tested it ourselves. Now we have, and here's why it became the clear choice for our geospatial data needs, especially in mobility projects.

### The Problem with OpenStreetMap (OSM)

For years, **OpenStreetMap (OSM)** was the go-to for spatial data in tools like **BigQuery**. It was reliable enough—until it wasn’t. The **OSM dataset hasn’t been updated in two years**, forcing companies to maintain their own exports and creating unnecessary overhead.

If you’ve used OSM, you know how cumbersome it can be to load massive map files, only to end up with stale data. That was the turning point for us. We needed something faster and more reliable.

### Why We Switched to Overture Maps

Here’s why we decided to make the move from OSM to **Overture Maps**, and why you might want to do the same:

### 1. **Faster Queries with BigQuery and Snowflake Integration**

With **Overture Maps** available natively on **BigQuery** and **Snowflake**, you no longer have to deal with loading and managing massive datasets manually. Instead of pulling large GeoParquet files (which can hit 200GB or more), you can now query maps directly from the cloud using SQL.

The integration with BigQuery and Snowflake allows us to run **geospatial SQL queries in seconds**. There’s no need to download or store local files, which eliminates a huge performance bottleneck. This means faster insights, quicker iteration, and overall more efficient workflows.

**Example**: Let’s say you need to filter roads within Nevada based on speed limits and road classes. With Overture Maps and BigQuery, you can run this query directly in SQL:

```sql
WITH nevada_geometry AS (
  SELECT geometry
  FROM `bigquery-public-data.overture_maps.division_area`
  WHERE country = 'US' AND region = 'US-NV'
)
SELECT s.geometry, s.class, SAFE_CAST(JSON_EXTRACT_SCALAR(s.road, '$.restrictions.speed_limits[0].max_speed.value') AS INT64) AS speed_limit
FROM `bigquery-public-data.overture_maps.segment` AS s, nevada_geometry AS ng
WHERE ST_WITHIN(s.geometry, ng.geometry);

```

This SQL runs directly on the Overture dataset, no extra steps needed.

### 2. **Seamless Data Integration via SQL Joins**

One of the biggest advantages of Overture Maps is the ability to **join your existing data** with the Overture Maps dataset through SQL queries. This means you can bring your internal data—whether it’s sales, fleet movements, or logistics—and combine it with high-quality map data without exporting, converting, or transforming files.

For instance, if you're working on fleet management and want to overlay your GPS data onto road networks, you can easily do this with a SQL `JOIN`. The ability to mix public and private data seamlessly makes Overture an incredibly powerful tool for analysis and visualization.

**Example**: Here’s a query that combines a company’s own GPS data with Overture’s road network to analyze fleet routes within Berlin:

```sql
WITH berlin_boundary AS (
  SELECT geometry
  FROM `bigquery-public-data.overture_maps.division_area`
  WHERE LOWER(names.primary) = "berlin"
)
SELECT s.id, s.geometry, gps_data.lat, gps_data.lon
FROM `bigquery-public-data.overture_maps.segment` s
JOIN your_company.gps_data gps_data
ON ST_CONTAINS(berlin_boundary.geometry, ST_GEOGPOINT(gps_data.lon, gps_data.lat))
WHERE s.subtype = 'road';

```

### 3. **Creating Maps Directly from SQL Queries**

One of the most powerful features of Overture Maps is the ability to **create maps directly from SQL queries**. Instead of relying on separate mapping tools or having to export data into visualization software, you can generate interactive maps straight from SQL results.

This enables **real-time mapping** without extra data transformations. You query your data and get a visual representation immediately. This is incredibly useful for things like planning routes, analyzing traffic patterns, or visualizing areas of interest such as city boundaries or land use.

We’ve put together a [collection of SQL queries and interactive maps](https://dekart.xyz/docs/about/overture-maps-examples) that show exactly how this works. From road networks in Berlin to land use in London, these examples highlight how you can create detailed maps using only SQL.

---

### Key Takeaways

**Why did we stop using OpenStreetMap and switch to Overture Maps?**

1. **Speed**: Querying maps directly in BigQuery and Snowflake is far faster than loading static files.
2. **Flexibility**: You can join your internal data with Overture’s high-quality map data using SQL, without the need for data exports or transformations.
3. **Efficiency**: You can generate maps directly from SQL queries, making your workflows faster and more integrated.

---

### Ready to Switch?

By embracing **Overture Maps**, you can future-proof your data strategy, reduce the time spent on manual data management, and enable faster decision-making. Don’t let stale OSM data hold you back—make the switch today and explore how **Overture Maps** can streamline your geospatial projects.

Check out more [interactive map examples and SQL queries](https://dekart.xyz/docs/about/overture-maps-examples) to see how you can put Overture Maps to work.