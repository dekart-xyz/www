---
title: "Docker"
description: "Running Dekart as in Docker"
date: 2021-02-22T08:24:45+01:00
lastmod: 2021-02-22T08:24:45+01:00
weight: 10
draft: false
images: []
menu:
  docs:
    parent: "self-hosting"
---

## Prerequisites

* Google Cloud Project
* BigQuery API Enabled
* Cloud SQL DB (Postgres)
* Cloud Storage Bucket
* Service account credentials with access to all above
* Mapbox Token

## Running docker

```bash
docker run \
  -v ${GOOGLE_APPLICATION_CREDENTIALS}:${GOOGLE_APPLICATION_CREDENTIALS} \
  -e GOOGLE_APPLICATION_CREDENTIALS=${GOOGLE_APPLICATION_CREDENTIALS} \
  -e DEKART_POSTGRES_DB=${DEKART_POSTGRES_DB} \
  -e DEKART_POSTGRES_USER=${DEKART_POSTGRES_USER} \
  -e DEKART_POSTGRES_PASSWORD=${DEKART_POSTGRES_PASSWORD} \
  -e DEKART_POSTGRES_PORT=${DEKART_POSTGRES_PORT} \
  -e DEKART_POSTGRES_HOST=${DEKART_POSTGRES_HOST} \
  -e DEKART_CLOUD_STORAGE_BUCKET=${DEKART_CLOUD_STORAGE_BUCKET} \
  -e DEKART_BIGQUERY_PROJECT_ID=${DEKART_BIGQUERY_PROJECT_ID} \
  -e DEKART_MAPBOX_TOKEN=${DEKART_MAPBOX_TOKEN} \
  -p 8080:8080 \
  dekartxyz/dekart:0.2
```

See details on [environment variables](/docs/configuration/environment-variables)

## Example

* Run with [Makefile](https://github.com/dekart-xyz/dekart/blob/main/install/docker/Makefile)
