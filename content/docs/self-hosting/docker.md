---
title: "Docker"
description: "Run Dekart with docker run"
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

{{< cta-banner template="deployment-templates" >}}

This page documents `docker run` flows for self-hosted Dekart.

Use [Docker Compose](/docs/self-hosting/docker-compose/) if you want full multi-service setup examples.

## Requirements

- PostgreSQL for Dekart metadata (except SQLite mode)
- GCS cache backend for BigQuery setup
- S3 cache backend for Snowflake S3 setup
- Mapbox token
- Warehouse credentials

## BigQuery

Use this when BigQuery is the datasource and GCS is the cache backend.

```bash
docker run --rm -p 8080:8080 \
  -v /absolute/path/to/gcp-service-account.json:/run/secrets/gcp-service-account.json:ro \
  -e GOOGLE_APPLICATION_CREDENTIALS=/run/secrets/gcp-service-account.json \
  -e DEKART_POSTGRES_DB=dekart \
  -e DEKART_POSTGRES_USER=postgres \
  -e DEKART_POSTGRES_PASSWORD=dekart \
  -e DEKART_POSTGRES_PORT=5432 \
  -e DEKART_POSTGRES_HOST=host.docker.internal \
  -e DEKART_STORAGE=GCS \
  -e DEKART_DATASOURCE=BQ \
  -e DEKART_CLOUD_STORAGE_BUCKET=your-gcs-bucket \
  -e DEKART_BIGQUERY_PROJECT_ID=your-gcp-project-id \
  -e DEKART_BIGQUERY_MAX_BYTES_BILLED=53687091200 \
  -e DEKART_MAPBOX_TOKEN=your-mapbox-token \
  -e DEKART_CORS_ORIGIN=http://localhost:3000 \
  -e DEKART_ALLOW_FILE_UPLOAD=1 \
  dekartxyz/dekart:latest
```

## Google OAuth 2.0

Use this when users authenticate directly with Google OAuth in Dekart.
A valid `DEKART_LICENSE_KEY` is required when SSO is enabled.

```bash
docker run --rm -p 8080:8080 \
  -e DEKART_POSTGRES_DB=dekart \
  -e DEKART_POSTGRES_USER=postgres \
  -e DEKART_POSTGRES_PASSWORD=dekart \
  -e DEKART_POSTGRES_PORT=5432 \
  -e DEKART_POSTGRES_HOST=host.docker.internal \
  -e DEKART_STORAGE=USER \
  -e DEKART_DATASOURCE=USER \
  -e DEKART_REQUIRE_GOOGLE_OAUTH=1 \
  -e DEKART_GOOGLE_OAUTH_CLIENT_ID=your-google-oauth-client-id \
  -e DEKART_GOOGLE_OAUTH_SECRET=your-google-oauth-client-secret \
  -e DEKART_LICENSE_KEY=your-license-key \
  -e DEKART_MAPBOX_TOKEN=your-mapbox-token \
  -e DEKART_CORS_ORIGIN=http://localhost:3000 \
  -e DEKART_ALLOW_FILE_UPLOAD=1 \
  dekartxyz/dekart:latest
```

## Snowflake with S3 cache

Use this when Snowflake is the datasource and S3 is the cache backend.

```bash
docker run --rm -p 8080:8080 \
  -e DEKART_POSTGRES_DB=dekart \
  -e DEKART_POSTGRES_USER=postgres \
  -e DEKART_POSTGRES_PASSWORD=dekart \
  -e DEKART_POSTGRES_PORT=5432 \
  -e DEKART_POSTGRES_HOST=host.docker.internal \
  -e DEKART_STORAGE=S3 \
  -e DEKART_DATASOURCE=SNOWFLAKE \
  -e DEKART_CLOUD_STORAGE_BUCKET=your-s3-bucket \
  -e AWS_REGION=us-east-1 \
  -e AWS_ACCESS_KEY_ID=your-aws-access-key-id \
  -e AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key \
  -e DEKART_SNOWFLAKE_ACCOUNT_ID=your-snowflake-account-id \
  -e DEKART_SNOWFLAKE_USER=your-snowflake-user \
  -e DEKART_SNOWFLAKE_PASSWORD=your-snowflake-password \
  -e DEKART_MAPBOX_TOKEN=your-mapbox-token \
  -e DEKART_CORS_ORIGIN=http://localhost:3000 \
  -e DEKART_ALLOW_FILE_UPLOAD=1 \
  dekartxyz/dekart:latest
```

## Snowflake with SQLite backups

Use this for local/testing Snowflake runs without PostgreSQL.

```bash
docker run --rm -p 8080:8080 \
  -v "$PWD/data:/dekart/data" \
  -e DEKART_STORAGE=SNOWFLAKE \
  -e DEKART_DATASOURCE=SNOWFLAKE \
  -e DEKART_SNOWFLAKE_ACCOUNT_ID=your-snowflake-account-id \
  -e DEKART_SNOWFLAKE_USER=your-snowflake-user \
  -e DEKART_SNOWFLAKE_PASSWORD=your-snowflake-password \
  -e DEKART_SQLITE_DB_PATH=./data/dekart.db \
  -e DEKART_BACKUP_FREQUENCY_MIN=5 \
  -e DEKART_MAX_BACKUPS_AGE_DAYS=7 \
  -e DEKART_DEV_CLAIMS_EMAIL=you@example.com \
  -e DEKART_MAPBOX_TOKEN=your-mapbox-token \
  -e DEKART_CORS_ORIGIN=http://localhost:3000 \
  dekartxyz/dekart:latest
```

## OIDC reverse proxy setup

For OIDC proxy mode, run the multi-service stack from [Docker Compose](/docs/self-hosting/docker-compose/) and see [Keycloak OIDC reverse proxy](/docs/self-hosting/keycloak-reverse-proxy/) for details.
