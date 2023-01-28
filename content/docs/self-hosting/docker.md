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
    parent: "self-hosting"
---

## AWS Athena

### Prerequisites

* AWS Account
* AWS Athena Workspace
* AWS S3 bucket
* PostgreSQL
* Service account credentials with access to all above
* Mapbox Token

### Running docker

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
  dekartxyz/dekart:0.11
```


## BigQuery

### Prerequisites

* Google Cloud Project
* BigQuery API Enabled
* Cloud SQL DB (Postgres)
* Cloud Storage Bucket
* Service account credentials with access to all above
* Mapbox Token

### Running docker

```bash
	docker run -it --rm \
		-v ${GOOGLE_APPLICATION_CREDENTIALS}:${GOOGLE_APPLICATION_CREDENTIALS} \
		-e GOOGLE_APPLICATION_CREDENTIALS=${GOOGLE_APPLICATION_CREDENTIALS} \
		-e DEKART_POSTGRES_DB=${DEKART_POSTGRES_DB} \
		-e DEKART_POSTGRES_USER=${DEKART_POSTGRES_USER} \
		-e DEKART_POSTGRES_PASSWORD=${DEKART_POSTGRES_PASSWORD} \
		-e DEKART_POSTGRES_PORT=${DEKART_POSTGRES_PORT} \
		-e DEKART_POSTGRES_HOST=${DEKART_POSTGRES_HOST} \
		-e DEKART_CLOUD_STORAGE_BUCKET=${DEKART_CLOUD_STORAGE_BUCKET} \
		-e DEKART_BIGQUERY_PROJECT_ID=${DEKART_BIGQUERY_PROJECT_ID} \
		-e DEKART_BIGQUERY_MAX_BYTES_BILLED=53687091200 \
		-e DEKART_MAPBOX_TOKEN=${DEKART_MAPBOX_TOKEN} \
    -e DEKART_CORS_ORIGIN=${DEKART_CORS_ORIGIN} \
		-p 8080:8080 \
		dekartxyz/dekart:0.11
```

See details on [environment variables](/docs/configuration/environment-variables)

## Example

* Run with [Makefile](https://github.com/dekart-xyz/dekart/blob/main/install/docker/Makefile)
