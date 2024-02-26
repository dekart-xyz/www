---
title: "Use with Your Data"
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

To analyze private datasets with Dekart, you have 2 options:

* **Dekart Cloud**: we host and manage Dekart instance for you (BigQuery only). Free for personal use. Requires Google Cloud access (BigQuery and Google Cloud Storage). [Try it free](/cloud).
* **Self-hosted**: you self-host the Dekart instance (open-source, MIT License) on your Google Cloud, AWS account or your server. [Documentation](/docs/).



## Requirements

**Dekart Cloud**

* Google Cloud project with BigQuery and Google Cloud Storage enabled
* Google Cloud Storage bucket to store query cache

**Self-hosted**

* Postgres DB (like Amazon RDS or Google Cloud SQL) to store metadata
* Mapbox token to load the map
* Amazon S3 bucket or Google Cloud Storage bucket to store query cache
* Amazon Athena, Google BigQuery or Snowflake data source
* Environment to run docker container (for example, Google App Engine, Amazon ECS)

Secure self-hosted instance with SSO:

* AWS: [configure authorization with Amazon Cognito](/docs/configuration/environment-variables/#user-authorization-via-amazon-load-balancer)
* Google Cloud: [configure authorization with Google IAP](/docs/configuration/environment-variables/#user-authorization-via-google-iap)

