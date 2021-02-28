---
title: "Playground"
description: "Quick Start with Playground"
date: 2021-02-21T09:17:56+01:00
lastmod: 2021-02-21T09:17:56+01:00
draft: false
toc: false
images: []
menu:
  docs:
    parent: "about"

---

You can try Dekart on <a target="_blank" href="https://play.dekart.xyz">play.dekart.xyz</a> (requires Gmail Account) with one of many public datasets available on BigQuery.

<a class="btn btn-primary" target="_blank" href="https://console.cloud.google.com/marketplace/browse?filter=solution-type:dataset" role="button">Discover Public Data Sets</a>

<p><a target="_blank" href="https://www.reddit.com/r/bigquery/wiki/datasets" role="button">Even more datasets</a></p>


## Quick Start
<p align="center"><img src="/images/screencast.gif" width="100%"/></p>

1. Go to <a target="_blank" href="https://play.dekart.xyz">play.dekart.xyz</a>


2. Authorize with Gmail Account. Dekart Playground access only your email to store Maps you created on Playground. Emails are not used for any marketing purposes. You are not charge for anything.


3. Click Create Report

<p align="center"><img src="/images/quick-start-1.png" width="100%"/></p>

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

<p align="center"><img src="/images/quick-start-2.png" width="100%"/></p>

6. Style a map (see [Kepler Docs](https://docs.kepler.gl/docs/user-guides) for details)

<p align="center"><img src="/images/quick-start-3.png" width="100%"/></p>

7. Now you can save and share you beautiful Map!

<a class="btn btn-primary" target="_blank" href="https://play.dekart.xyz/" role="button">Go to play.dekart.xyz</a>
