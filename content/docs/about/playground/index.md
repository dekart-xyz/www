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

Try Dekart in <a target="_blank" href="https://cloud.dekart.xyz/playground">Playground Mode</a> with one of many <a target="_blank" href="https://console.cloud.google.com/marketplace/browse?filter=solution-type:dataset" role="button">Public Datasets</a> available on BigQuery.

<a class="btn btn-primary" target="_blank" href="https://cloud.dekart.xyz/playground" role="button">Go to BigQuery Playground</a>

## Quick Start

{{< img-simple src="screencast.gif" alt="Screencast" >}}

1. Go to <a target="_blank" href="https://cloud.dekart.xyz/playground">cloud.dekart.xyz/playground</a>


2. Authorize with Gmail Account. Dekart Playground access only your email to store Maps you created on Playground. Emails are not used for any marketing purposes. You are not charge for anything.


3. Click Create Report

{{< img src="quick-start-1.png" alt="Create Report" >}}

4. Type example query (uses [Chicago Crime Data](https://console.cloud.google.com/marketplace/product/city-of-chicago-public-data/chicago-crime?project=dekart-playground&folder=&organizationId=))

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

5. Run query (click Execute button)

{{< img src="quick-start-2.png"  alt="Report Edit" >}}

6. Style a map (see [Kepler Docs](https://docs.kepler.gl/docs/user-guides) for details)

{{< img src="quick-start-3.png" alt="Style Visualization" >}}

7. Now you can save and share you beautiful Map!

<a class="btn btn-primary" target="_blank" href="https://cloud.dekart.xyz/playground" role="button">Go to BigQuery Playground</a>
