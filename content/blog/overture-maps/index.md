---
title: "Is Overture Maps a Game-Changer for Location Data?"
description: "Overture Maps' impact on geospatial analysis, its advantages over traditional options, and a practical guide for creating Kepler.gl maps using its dataset."
lead: "Overture Maps' impact on geospatial analysis, its advantages over traditional options, and a practical guide for creating Kepler.gl maps using its dataset."
date: 2021-03-28T06:59:51Z
lastmod: 2021-03-28T06:59:51Z
draft: false
weight: 50
images: ["1716710901364.jpeg"]
contributors: ["Vladi"]
---

{{< img src="1716710901364.jpeg"  caption="Switching from OSM to Overture Maps" class="wide" >}}

When was the last time a map dataset truly changed the way you work? For years, we relied on OpenStreetMap, but as I dug into Overture Maps, I found myself asking—could this be the game-changer we’ve been waiting for?

### Why Overture Maps Is a Crucial Tool

In mobility projects, having access to reliable and up-to-date maps within your data warehouse, like BigQuery, isn’t just a convenience—its a necessity. Map geometries drive everything from data visualization to filtering and aggregating critical information for operational planning.

**OpenStreetMap and Its Limitations**

In the past, the OpenStreetMap (OSM) project was the go-to resource. BigQuery, for example, offers a highly convenient OSM public dataset that many data professionals have relied on.

👉 [Check out a small collection of kepler.gl maps I built using BigQuery’s public OSM datasets and hosted on Dekart.](https://dekart.xyz/docs/about/kepler-gl-map-examples/)

But here’s the issue: Google abandoned the OSM public dataset, leaving it without updates for over two years. This has forced companies to take on the burden of maintaining their own exports, a costly and time-consuming process.

### Enter Overture Maps: Backed by Tech Giants

Recently, the Linux Foundation introduced Overture Maps, and this time, it’s backed by some heavy hitters—like Amazon, Meta, Microsoft, and TomTom. Unlike OSM, which relies on a global community of volunteers, Overture Maps benefits from the resources and data of the tech giants.

Even though Overture Maps pulls from various sources, OSM still plays a significant role, meaning much of the data remains licensed under ODbL v1.0.

### Now Available as a Public Dataset

Not long ago, Overture Maps became available as a free dataset on BigQuery and Snowflake. This opens up a world of possibilities:

👉 [Access the Overture Maps dataset here](https://overturemaps.org/overture-map-data-now-available-in-bigquery-and-snowflake/)

💙 The schema and completeness of the data have proven to be robust, making Overture Maps a great option to maintaining independent OSM exports. This shift can help organizations free up valuable resources for other tasks.

Here is a detailed SQL guide and a Kepler.gl map using Overture data. This guide will walk through each step, enabling anyone to leverage the full potential of this new dataset.

# Step-by-Step Guide: Mapping Nevada's Road Network with Overture Maps

This comprehensive guide will take you through the entire process, from querying the Overture Maps dataset in BigQuery to publishing your final Kepler.gl map on Dekart.

#### **Tools and Technologies Used**

- **Overture BigQuery public dataset**
- **BigQuery SQL GIS functions (`ST_WITHIN`)**
- **Dekart** for writing queries, generating, and publishing the Kepler.gl map

### **1️⃣ Get the Nevada State Boundary**

Start by querying the "division_area" table from Overture Maps. You’ll filter for `subtype=regions` and `region=US-NV` to extract the state boundary of Nevada.

### **2️⃣ Clip Roads Within the Boundary**

Next, query the "segment" table from Overture Maps. Perform a spatial join using the `ST_WITHIN` function to clip the roads that fall within the Nevada boundary.

### **3️⃣ Extract Maximum Speed Limit**

Finally, use the BigQuery `JSON_EXTRACT_SCALAR` function to extract the maximum speed limit from the "road" column, allowing you to classify roads based on speed.

### **Helpful Resources**

I found the [Overture schema reference](https://lnkd.in/e82aUstw) extremely useful throughout this process. It’s a great resource for understanding the structure of the dataset and making the most out of your queries.

The result of this process is a comprehensive Kepler.gl map published on Dekart, complete with the source SQL query. It’s a sizable file, around 60MB, but the detailed insights it offers are invaluable. 🗺️💾

👉 [Check out the final map here on Dekart](https://cloud.dekart.xyz/reports/15540f2b-2411-44a4-92b5-206a9bee5753/source)

I’m excited to see what geospatial projects can achieve with Overture Maps, and how it will transform the landscape of location data analysis.