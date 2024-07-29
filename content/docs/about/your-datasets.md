---
title: "Query Private Datasets"
description: "Using Dekart with your team/company internal/private datasets"
date: 2021-02-21T09:17:56+01:00
lastmod: 2021-02-21T09:17:56+01:00
draft: false
toc: false
images: []
menu:
  docs:
    parent: "about"

---

Dekart offers 2 different options to work with private datasets:


<p class="lead text-left">✨<a href="/cloud"><b>Dekart Cloud</b></a>. We host and manage Dekart instance for you. Free for single person use. Subscription plan for teams at the cost of self-hosting.</p>

⚙️ [Configure access to private BigQuery datasets](https://cloud.dekart.xyz/)
⚙️ [Configure access to private Snowflake datasets](https://cloud.dekart.xyz/)

<hr/>

<p class="lead text-left"><b>🏰 Self-hosted</b>. You host the Dekart instance (open-source, MIT License) on your Google Cloud, AWS account or your server.

👉 [Documentation](/docs/).

<hr/>

## Requirements

✨**Dekart Cloud**:

* Google BigQuery or Snowflake data source

<p><small>⚙️ <a href="https://cloud.dekart.xyz">Configure</a></small></p>


🏰 **Self-hosted**

* Postgres DB (like Amazon RDS or Google Cloud SQL) to store metadata
* Mapbox token to load the map
* Amazon S3 bucket or Google Cloud Storage bucket to store query cache
* Amazon Athena, Google BigQuery or Snowflake data source
* Environment to run docker container (for example, Google App Engine, Amazon ECS)

Secure self-hosted instance with SSO:

* AWS: [configure authorization with Amazon Cognito](/docs/configuration/environment-variables/#user-authorization-via-amazon-load-balancer)
* Google Cloud: [configure authorization with Google IAP](/docs/configuration/environment-variables/#user-authorization-via-google-iap)

