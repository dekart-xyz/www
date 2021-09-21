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

You can try Dekart on <a target="_blank" href="https://play.dekart.xyz">play.dekart.xyz</a> (requires Gmail Account) with one of many Public Datasets available on BigQuery.

<a class="btn btn-primary" target="_blank" href="https://play.dekart.xyz/" role="button">Go to BigQuery Playground</a>



<p><a target="_blank" href="https://console.cloud.google.com/marketplace/browse?filter=solution-type:dataset" role="button">BigQuery Public Datasets</a> and <a target="_blank" href="https://www.reddit.com/r/bigquery/wiki/datasets" role="button">Even More Datasets</a></p>


## Quick Start

{{< img-simple src="screencast.gif" alt="Screencast" >}}

1. Go to <a target="_blank" href="https://play.dekart.xyz">play.dekart.xyz</a>


2. Authorize with Gmail Account. Dekart Playground access only your email to store Maps you created on Playground. Emails are not used for any marketing purposes. You are not charge for anything.


3. Click Create Report

{{< img src="quick-start-1.png" alt="Create Report" >}}

1. Type example query (uses [Chicago Crime Data](https://console.cloud.google.com/marketplace/product/city-of-chicago-public-data/chicago-crime?project=dekart-playground&folder=&organizationId=))

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

1. Style a map (see [Kepler Docs](https://docs.kepler.gl/docs/user-guides) for details)

{{< img src="quick-start-3.png" alt="Style Visualization" >}}

1. Now you can save and share you beautiful Map!

<a class="btn btn-primary" target="_blank" href="https://play.dekart.xyz/" role="button">Go to BigQuery Playground</a>

[How to use with Your Private Datasets](/docs/about/your-datasets/)
