---
title: "Introduction"
description: "Introduction to Dekart"
date: 2021-02-21T09:17:56+01:00
lastmod: 2021-02-21T09:17:56+01:00
draft: false
toc: false
images: []
menu:
  docs:
    parent: "about"
    weight: -1

---

To analyze private datasets you can self-host the Dekart instance (open-source, MIT License) on your Google Cloud, AWS account or own server.

## Requirements

* Postgres DB (like Amazon RDS or Google Cloud SQL) to store metadata
* Mapbox token to load the map
* Amazon S3 bucket or Google Cloud Storage bucket to store query cache
* Amazon Athena, Google BigQuery or Snowflake data source
* Environment to run docker container (for example, Google App Engine, Amazon ECS)
* Optionally, Google IAP or Amazon Cognito to secure deployment


## Secure your Dekart instance with SSO

* **AWS**: [configure authorization with Amazon Cognito](/docs/configuration/environment-variables/#user-authorization-via-amazon-load-balancer)
* **Google Cloud**: [configure authorization with Google IAP](/docs/configuration/environment-variables/#user-authorization-via-google-iap)

