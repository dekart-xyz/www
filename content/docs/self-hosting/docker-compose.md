---
title: "Docker Compose"
description: "Run Dekart locally with docker-compose"
date: 2021-02-22T08:24:45+01:00
lastmod: 2021-02-22T08:24:45+01:00
draft: false
toc: true
weight: 10
images: []
menu:
  docs:
    parent: "self-hosting"
---

{{< cta-banner template="deployment-templates" >}}

## AWS Athena

### Prerequisites

* AWS Account
* AWS Athena Workspace
* AWS S3 bucket
* PostgreSQL
* Service account credentials with access to all above
* Mapbox Token


### Steps

1. Copy [docker-compose.yaml](https://github.com/dekart-xyz/dekart/blob/main/install/docker-compose/docker-compose.yaml) file
2. Create `.env` file

```
DEKART_POSTGRES_PASSWORD=
DEKART_PROJECT_ID=
DEKART_CLOUD_STORAGE_BUCKET=
DEKART_MAPBOX_TOKEN=
DEKART_ATHENA_CATALOG=
DEKART_ATHENA_S3_OUTPUT_LOCATION=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
DEKART_CORS_ORIGIN=
```

3. Run

```
docker-compose  --env-file .env up dekart-athena
```

## BigQuery

### Prerequisites

* Google Cloud Project
* BigQuery API Enabled
* Cloud Storage Bucket
* Service account credentials with access to all above
* Mapbox Token


### Steps

1. Copy [docker-compose.yaml](https://github.com/dekart-xyz/dekart/blob/main/install/docker-compose/docker-compose.yaml) file
2. Create `.env` file

```
DEKART_POSTGRES_PASSWORD=
DEKART_PROJECT_ID=
DEKART_CLOUD_STORAGE_BUCKET=
DEKART_MAPBOX_TOKEN=
GOOGLE_APPLICATION_CREDENTIALS=
DEKART_CORS_ORIGIN=
```

3. Run

```
docker-compose  --env-file .env up dekart-bigquery
```
## Snowflake

### Prerequisites

* Snowflake Account and User
* Amazon S3 Bucket
* Mapbox Token


### Steps

1. Copy [docker-compose.yaml](https://github.com/dekart-xyz/dekart/blob/main/install/docker-compose/docker-compose.yaml) file
2. Create `.env` file

```
DEKART_POSTGRES_PASSWORD=
DEKART_PROJECT_ID=
DEKART_CLOUD_STORAGE_BUCKET=
DEKART_MAPBOX_TOKEN=
DEKART_SNOWFLAKE_ACCOUNT_ID=
DEKART_SNOWFLAKE_USER=
DEKART_SNOWFLAKE_PASSWORD=
DEKART_CORS_ORIGIN=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

3. Run

```
docker-compose  --env-file .env up dekart-snowflake
```
