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

- Docker
- PostgreSQL (metadata storage)
- Mapbox token
- Credentials for your selected datasource/auth setup

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

### Google OAuth configuration

Use this when users authenticate directly with Google OAuth in Dekart.  
A valid `DEKART_LICENSE_KEY` is required when SSO is enabled.

[Get required SSO key](/docs/self-hosting/enable-sso-open-source-instance/?ref=sso-key)

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

## Snowflake

Use this when Snowflake is the datasource.

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

### S3 cache and AWS SSO configuration

Use this when Snowflake query results are cached in S3 and auth is delegated via AWS OIDC headers from your load balancer.

[Get required SSO key](/docs/self-hosting/enable-sso-open-source-instance/?ref=sso-key)

```bash
docker run --rm -p 8080:8080 \
  -e DEKART_POSTGRES_DB=dekart \
  -e DEKART_POSTGRES_USER=postgres \
  -e DEKART_POSTGRES_PASSWORD=dekart \
  -e DEKART_POSTGRES_PORT=5432 \
  -e DEKART_POSTGRES_HOST=host.docker.internal \
  -e DEKART_STORAGE=S3 \
  -e DEKART_DATASOURCE=SNOWFLAKE \
  -e DEKART_REQUIRE_AMAZON_OIDC=1 \
  -e DEKART_LICENSE_KEY=your-license-key \
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

## Postgres

Use this when Postgres is the datasource and Dekart stores replayable query state in Postgres (`DEKART_STORAGE=PG`).

```bash
docker run --rm -p 8080:8080 \
  -e DEKART_POSTGRES_DB=dekart \
  -e DEKART_POSTGRES_USER=postgres \
  -e DEKART_POSTGRES_PASSWORD=dekart \
  -e DEKART_POSTGRES_PORT=5432 \
  -e DEKART_POSTGRES_HOST=host.docker.internal \
  -e DEKART_STORAGE=PG \
  -e DEKART_DATASOURCE=PG \
  -e DEKART_POSTGRES_DATASOURCE_CONNECTION=postgres://postgres:dekart@host.docker.internal:5432/dekart_geo?sslmode=disable \
  -e DEKART_MAPBOX_TOKEN=your-mapbox-token \
  -e DEKART_CORS_ORIGIN=http://localhost:3000 \
  -e DEKART_ALLOW_FILE_UPLOAD=0 \
  dekartxyz/dekart:latest
```

### OIDC configuration

Use this when authentication is handled by a trusted reverse proxy forwarding OIDC JWT headers.

[Get required SSO key](/docs/self-hosting/enable-sso-open-source-instance/?ref=sso-key)

```bash
docker run --rm -p 8080:8080 \
  -e DEKART_POSTGRES_DB=dekart \
  -e DEKART_POSTGRES_USER=postgres \
  -e DEKART_POSTGRES_PASSWORD=dekart \
  -e DEKART_POSTGRES_PORT=5432 \
  -e DEKART_POSTGRES_HOST=host.docker.internal \
  -e DEKART_STORAGE=PG \
  -e DEKART_DATASOURCE=PG \
  -e DEKART_POSTGRES_DATASOURCE_CONNECTION=postgres://postgres:dekart@host.docker.internal:5432/dekart_geo?sslmode=disable \
  -e DEKART_REQUIRE_OIDC=1 \
  -e DEKART_OIDC_JWKS_URL=https://idp.example.com/realms/dekart/protocol/openid-connect/certs \
  -e DEKART_OIDC_ISSUER=https://idp.example.com/realms/dekart \
  -e DEKART_OIDC_AUDIENCE=oauth2-proxy \
  -e DEKART_LICENSE_KEY=your-license-key \
  -e DEKART_MAPBOX_TOKEN=your-mapbox-token \
  -e DEKART_CORS_ORIGIN=http://localhost:3000 \
  dekartxyz/dekart:latest
```

For full proxy wiring details, see [Keycloak OIDC reverse proxy](/docs/self-hosting/keycloak-reverse-proxy/).
