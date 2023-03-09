---
title: "Docker"
description: "Running Dekart for BigQuery as in Docker"
date: 2021-02-22T08:24:45+01:00
lastmod: 2021-02-22T08:24:45+01:00
weight: 10
draft: false
toc: true
images: []
menu:
  docs:
    parent: "installation"
---

## Requirements

* Google Cloud Storage or AWS S3 bucket for storing cache
* PostgreSQL or similar (Cloud SQL, Amazon RDS, etc)
* Mapbox Token

## Supported data warehouses

* Amazon Athena
* Google BigQuery
* Snowflake


### Amazon Athena

```bash
docker run \
  -e AWS_REGION=${AWS_REGION} \
  -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
  -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
  -e DEKART_POSTGRES_DB=${DEKART_POSTGRES_DB} \
  -e DEKART_POSTGRES_USER=${DEKART_POSTGRES_USER} \
  -e DEKART_POSTGRES_PASSWORD=${DEKART_POSTGRES_PASSWORD} \
  -e DEKART_POSTGRES_PORT=${DEKART_POSTGRES_PORT} \
  -e DEKART_POSTGRES_HOST=host.docker.internal \
  -e DEKART_STORAGE=S3 \
  -e DEKART_DATASOURCE=ATHENA \
  -e DEKART_CLOUD_STORAGE_BUCKET=${DEKART_CLOUD_STORAGE_BUCKET} \
  -e DEKART_ATHENA_CATALOG=${DEKART_ATHENA_CATALOG} \
  -e DEKART_ATHENA_S3_OUTPUT_LOCATION=${DEKART_ATHENA_S3_OUTPUT_LOCATION} \
  -e DEKART_MAPBOX_TOKEN=${DEKART_MAPBOX_TOKEN} \
  -e DEKART_CORS_ORIGIN=${DEKART_CORS_ORIGIN} \
  -p 8080:8080 \
  dekartxyz/dekart:0.12
```

### Google BigQuery

```bash
docker run \
  -v ${GOOGLE_APPLICATION_CREDENTIALS}:${GOOGLE_APPLICATION_CREDENTIALS} \
  -e GOOGLE_APPLICATION_CREDENTIALS=${GOOGLE_APPLICATION_CREDENTIALS} \
  -e DEKART_POSTGRES_DB=${DEKART_POSTGRES_DB} \
  -e DEKART_POSTGRES_USER=${DEKART_POSTGRES_USER} \
  -e DEKART_POSTGRES_PASSWORD=${DEKART_POSTGRES_PASSWORD} \
  -e DEKART_POSTGRES_PORT=${DEKART_POSTGRES_PORT} \
  -e DEKART_POSTGRES_HOST=${DEKART_POSTGRES_HOST} \
  -e DEKART_STORAGE=GCS \
  -e DEKART_DATASOURCE=BQ \
  -e DEKART_CLOUD_STORAGE_BUCKET=${DEKART_CLOUD_STORAGE_BUCKET} \
  -e DEKART_BIGQUERY_PROJECT_ID=${DEKART_BIGQUERY_PROJECT_ID} \
  -e DEKART_MAPBOX_TOKEN=${DEKART_MAPBOX_TOKEN} \
  -e DEKART_CORS_ORIGIN=${DEKART_CORS_ORIGIN} \
  -p 8080:8080 \
  dekartxyz/dekart:0.12
```

### Snowflake

```bash
docker run -it --rm \
  -e AWS_REGION=${AWS_REGION} \
  -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
  -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
  -e DEKART_POSTGRES_DB=${DEKART_POSTGRES_DB} \
  -e DEKART_POSTGRES_USER=${DEKART_POSTGRES_USER} \
  -e DEKART_POSTGRES_PASSWORD=${DEKART_POSTGRES_PASSWORD} \
  -e DEKART_POSTGRES_PORT=${DEKART_POSTGRES_PORT} \
  -e DEKART_POSTGRES_HOST=host.docker.internal \
  -e DEKART_STORAGE=S3 \
  -e DEKART_DATASOURCE=SNOWFLAKE \
  -e DEKART_SNOWFLAKE_ACCOUNT_ID=${DEKART_SNOWFLAKE_ACCOUNT_ID} \
  -e DEKART_SNOWFLAKE_USER=${DEKART_SNOWFLAKE_USER} \
  -e DEKART_SNOWFLAKE_PASSWORD=${DEKART_SNOWFLAKE_PASSWORD} \
  -e DEKART_CLOUD_STORAGE_BUCKET=${DEKART_CLOUD_STORAGE_BUCKET} \
  -e DEKART_MAPBOX_TOKEN=${DEKART_MAPBOX_TOKEN} \
  -e DEKART_CORS_ORIGIN=${DEKART_CORS_ORIGIN} \
  -p 8080:8080 \
  dekartxyz/dekart:0.12
```


## Example

* Run with [Makefile](https://github.com/dekart-xyz/dekart/blob/main/install/docker/Makefile)
* See details on [environment variables](/docs/installation/environment-variables)
