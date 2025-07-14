---
title: "Wherebots SQL Tutorial"
description: "Learn how to use Dekart's Wherebots SQL to analyze and visualize geospatial data."
date: 2025-04-22T07:48:05+01:00
lastmod: 2025-04-22T07:48:05+01:00
draft: false
menu:
  docs:
    parent: "usage"
images: []
---

Already using Wherobots or writing geospatial SQL with Apache Sedona?
This video shows you how to plug your queries directly into Dekart and instantly visualize your results on shareable maps.

<p><iframe width="560" height="315" src="https://www.youtube.com/embed/RY9H76V_qVQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

<p><a class="btn btn-primary" target="_blank" href="https://cloud.dekart.xyz?ref=wherobots-tuttorial-top" role="button">Start free with Dekart + Wherobots</a></p>


## WHAT is this connector?

### What does the Dekart connector to Wherobots actually do?

The **Dekart connector** establishes a seamless bridge between your Wherobots data warehouse (powered by Apache Sedona) and the Dekart mapping interface. It allows you to run live Sedona SQL queries and display the results directly as interactive map layers, powered by Kepler.gl.

### How does it enhance my current Wherobots/Sedona workflow?

Instead of exporting data and building dashboards manually, you can now **visualize spatial query results instantly**, iterate faster on analysis, and maintain consistency using the live SQL-to-map pipeline. It turns your usual Wherobots → Sedona → export flow into Wherobots → SQL → Dekart → live map.

### Is this for visualization only, or can I interact with data too?

Primarily, it’s for **interactive visualization**, drop a SQL query into Dekart, view the map instantly, and share it with a link. You’re not just viewing static outputs; you can pan, zoom, filter, and overlay live layers from multiple queries or datasets.

## WHY should I care?

### I already use Wherobots or Apache Sedona, which benefits does Dekart add?

Dekart provides an **instant visual layer** directly over your spatial SQL results. It removes the friction of manual exports, dashboard setup, or Python/JS development. You get a polished, interactive map with zero extra steps.

### Why is this better than building custom dashboards or using other tools?

* **No coding required**, beyond the SQL.
* **Speed**: See map results in under a minute.
* **Flexibility**: Layer multiple queries, styling, CSV uploads, etc.
* **Open source & lightweight**: Built with React + Go, easier to deploy or tailor than enterprise GIS tools ([GitHub][1]).

### How fast can I go from query to map?

🎯 Typically under 5 minutes:

1. Connect to Wherobots
2. Paste/write your Sedona SQL
3. Click **Execute** → map appears instantly

That’s it, fast iteration, no waiting.

## HOW does it work?

### How do I connect Dekart to Wherobots?

* Use Dekart’s data source settings to **point to your Wherobots Cloud** (host, database, credentials)
* The connector implements websockets client for Wherobots SQL API
* Once connected, your can type Sedona SQL queries directly in Dekart’s SQL editor

### How do I control Dekart’s usage of Wherobots?

Costs only accrue when you run queries; no hidden charges from Dekart beyond the compute actually used in Wherobots.

### How are my credentials stored?

Dekart uses encryption key to to store credentials in internal database. Secrets are never exposed in the UI or logs.

### What data does Dekart store?
Dekart stores:
* Your Wherobots connection settings (encrypted)
* SQL queries you run
* Map styles and configurations
* Map metadata (like titles, descriptions)
* User preferences (like last used queries, map settings)

Dekart does not store data from Wherobots be default, and utilizes Wherobots persisted query results to load data for maps.

However when you publish maps, Dekart will store the map data in its internal bucket, so that it can be shared with other users.

## WHAT do I do next?

### How do I try this with my own data?

1. Sign up or log into Dekart.
2. Add a new data source: enter your **Wherobots connection info**.
3. Create a new “map” → paste your Sedona SQL → click **Execute**.
4. Voila, he map appears, ready to style and share.


### Is this open source? Can I contribute or extend it?

Yes! Dekart is open source under **AGPL‑3.0** ([GitHub][1]). You’re welcome to explore the code, self-host via Docker, file issues on GitHub, or suggest enhancements through Discussions .

### TL;DR Summary

| Feature             | What it means                                          |
| ------------------- | ------------------------------------------------------ |
| **Live SQL → Map**  | Run Sedona queries, instantly visualize in Dekart      |
| **Interactive**     | Pan, zoom, filter, layer CSV or additional queries     |
| **Quick setup**     | Connect, paste SQL, click ,  under 5 minutes to insight |
| **Open & flexible** | Self‑hostable, customizable, and community‑driven      |


**Ready to try it yourself?** Click **“Start free with Dekart + Wherobots”** above, connect your source, paste your SQL, and see your data come alive.

<p><a class="btn btn-primary" target="_blank" href="https://cloud.dekart.xyz?ref=wherobots-tuttorial-top" role="button">Start free with Dekart + Wherobots</a></p>


[1]: https://github.com/dekart-xyz/dekart? "dekart-xyz/dekart: Open-source backend for Kepler.gl - GitHub"
[2]: https://docs.wherobots.com/latest/tutorials/wherobotsdb/vector-data/vector-load/? "Load data from external storage - Wherobots Documentation"
[3]: https://wherobots.com/raster-data-analysis-spatial-sql-wherobots-apache-sedona/? "Raster Data Analysis With Spatial SQL And Apache Sedona"
[4]: https://dekart.xyz/docs/configuration/environment-variables/? "Environment Variables - Dekart"
[5]: https://wherobots.com/working-with-files-getting-started-with-wherobots-cloud-sedonadb-part-3/? "Working With Files – Getting Started With Wherobots Cloud Part 3"
