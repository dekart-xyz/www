---
title: "BigQuery Playground"
description: "Dekart BigQuery Playground: Create data-driven geospatial visualizations from BigQuery Public Datasets"
date: 2021-02-21T09:17:56+01:00
lastmod: 2021-02-21T09:17:56+01:00
draft: false
toc: false
images: []
menu:
  docs:
    parent: "about"

---

Create Kepler.gl Maps with [BigQuery Public Datasets](/docs/about/kepler-gl-map-examples/) in seconds using SQL.

<mark>Premium alternative to BigQuery GeoViz.</mark>

<p><a class="btn btn-primary" target="_blank" href="https://cloud.dekart.xyz/?ref=create-workspace-playground" role="button">Create Workspace</a></p>


## Quick Start

<p><iframe width="560" height="315" src="https://www.youtube.com/embed/qwOqLm3i7Ik" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>


1. Go to <a target="_blank" href="https://cloud.dekart.xyz/workspace">cloud.dekart.xyz</a>


2. Authorize with Google Account.

3. Create free workspace

4. Create BigQuery connection.

5. Grant access to BigQuery. Passthrough authentication is used, no tokens are stored on our side. No data is copied or stored.

6. Select BigQuery Project ID.

7. Type example query (uses Chicago Crime Data)

```SQL
SELECT
    primary_type,
    district,
    latitude,
    longitude,
    date
from `bigquery-public-data.chicago_crime.crime`
WHERE  Rand() < 5 / 100.0
```

8. Run query (click Execute button)

{{< img src="quick-start-2.png"  alt="Report Edit" >}}

9. Style a map (see [Kepler Docs](https://docs.kepler.gl/docs/user-guides) for details)

{{< img src="quick-start-3.png" alt="Style Visualization" >}}

10. Now you can save and share you beautiful Map!

<p><a class="btn btn-primary" target="_blank" href="https://cloud.dekart.xyz/?ref=create-workspace-playground" role="button">Create Workspace</a></p>
