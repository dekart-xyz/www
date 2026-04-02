---
title: "Docker Compose"
description: "Run Dekart with full Docker Compose configurations"
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

This page documents `docker compose` flows for self-hosted Dekart.

## Requirements

- Docker Compose
- PostgreSQL (metadata storage)
- Mapbox token
- Credentials for your selected datasource/auth setup

## BigQuery

Use this setup when your warehouse is BigQuery and cache storage is Google Cloud Storage.
It runs Dekart with PostgreSQL metadata storage and a mounted GCP service account JSON file.
Best fit for GCP-native teams.

```yaml
services:
  db:
    image: postgres:16
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: "dekart"
      POSTGRES_USER: "postgres"
      POSTGRES_PASSWORD: "dekart"

  dekart-bigquery:
    image: dekartxyz/dekart:latest
    restart: unless-stopped
    depends_on:
      - db
    ports:
      - "8080:8080"
    volumes:
      - ./gcp-service-account.json:/run/secrets/gcp-service-account.json:ro
    environment:
      DEKART_POSTGRES_DB: "dekart"
      DEKART_POSTGRES_USER: "postgres"
      DEKART_POSTGRES_PASSWORD: "dekart"
      DEKART_POSTGRES_PORT: "5432"
      DEKART_POSTGRES_HOST: "db"
      DEKART_CLOUD_STORAGE_BUCKET: "your-gcs-bucket"
      DEKART_BIGQUERY_PROJECT_ID: "your-gcp-project-id"
      DEKART_BIGQUERY_MAX_BYTES_BILLED: "53687091200"
      DEKART_MAPBOX_TOKEN: "your-mapbox-token"
      GOOGLE_APPLICATION_CREDENTIALS: "/run/secrets/gcp-service-account.json"
      DEKART_CORS_ORIGIN: "http://localhost:3000"
      DEKART_ALLOW_FILE_UPLOAD: "1"
      DEKART_STORAGE: "GCS"
      DEKART_DATASOURCE: "BQ"
```

### Google OAuth configuration

Use this setup when users should sign in directly with Google OAuth in Dekart.
Requires Google OAuth client credentials and a valid Dekart license key.

[Get required SSO key](/docs/self-hosting/enable-sso-open-source-instance/?ref=sso-key)

```yaml
services:
  db:
    image: postgres:16
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: "dekart"
      POSTGRES_USER: "postgres"
      POSTGRES_PASSWORD: "dekart"

  dekart-googleoauth:
    image: dekartxyz/dekart:latest
    restart: unless-stopped
    depends_on:
      - db
    ports:
      - "8080:8080"
    environment:
      DEKART_POSTGRES_DB: "dekart"
      DEKART_POSTGRES_USER: "postgres"
      DEKART_POSTGRES_PASSWORD: "dekart"
      DEKART_POSTGRES_PORT: "5432"
      DEKART_POSTGRES_HOST: "db"
      DEKART_MAPBOX_TOKEN: "your-mapbox-token"
      DEKART_CORS_ORIGIN: "http://localhost:3000"
      DEKART_ALLOW_FILE_UPLOAD: "1"
      DEKART_STORAGE: "USER"
      DEKART_DATASOURCE: "USER"
      DEKART_REQUIRE_GOOGLE_OAUTH: "1"
      DEKART_GOOGLE_OAUTH_CLIENT_ID: "your-google-oauth-client-id"
      DEKART_GOOGLE_OAUTH_SECRET: "your-google-oauth-client-secret"
      DEKART_LICENSE_KEY: "your-license-key"
```

## Snowflake

Use this setup when Snowflake is the datasource and S3 is used for query result cache.
This is the most common production-style Snowflake configuration with PostgreSQL metadata.
SSO is optional in this setup.

```yaml
services:
  db:
    image: postgres:16
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: "dekart"
      POSTGRES_USER: "postgres"
      POSTGRES_PASSWORD: "dekart"

  dekart-snowflake-s3:
    image: dekartxyz/dekart:latest
    restart: unless-stopped
    depends_on:
      - db
    ports:
      - "8080:8080"
    environment:
      DEKART_POSTGRES_DB: "dekart"
      DEKART_POSTGRES_USER: "postgres"
      DEKART_POSTGRES_PASSWORD: "dekart"
      DEKART_POSTGRES_PORT: "5432"
      DEKART_POSTGRES_HOST: "db"
      DEKART_MAPBOX_TOKEN: "your-mapbox-token"
      DEKART_CORS_ORIGIN: "http://localhost:3000"
      DEKART_ALLOW_FILE_UPLOAD: "1"
      DEKART_STORAGE: "S3"
      DEKART_DATASOURCE: "SNOWFLAKE"
      DEKART_CLOUD_STORAGE_BUCKET: "your-s3-bucket"
      AWS_REGION: "us-east-1"
      AWS_ACCESS_KEY_ID: "your-aws-access-key-id"
      AWS_SECRET_ACCESS_KEY: "your-aws-secret-access-key"
      DEKART_SNOWFLAKE_ACCOUNT_ID: "your-snowflake-account-id"
      DEKART_SNOWFLAKE_USER: "your-snowflake-user"
      DEKART_SNOWFLAKE_PASSWORD: "your-snowflake-password"
      DEKART_REQUIRE_AMAZON_OIDC: "0"
```

### S3 cache and AWS SSO configuration

Use this setup when Snowflake query results are cached in S3 and auth is delegated via AWS OIDC headers from your load balancer.

[Get required SSO key](/docs/self-hosting/enable-sso-open-source-instance/?ref=sso-key)

```yaml
services:
  db:
    image: postgres:16
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: "dekart"
      POSTGRES_USER: "postgres"
      POSTGRES_PASSWORD: "dekart"

  dekart-snowflake-s3:
    image: dekartxyz/dekart:latest
    restart: unless-stopped
    depends_on:
      - db
    ports:
      - "8080:8080"
    environment:
      DEKART_POSTGRES_DB: "dekart"
      DEKART_POSTGRES_USER: "postgres"
      DEKART_POSTGRES_PASSWORD: "dekart"
      DEKART_POSTGRES_PORT: "5432"
      DEKART_POSTGRES_HOST: "db"
      DEKART_MAPBOX_TOKEN: "your-mapbox-token"
      DEKART_CORS_ORIGIN: "http://localhost:3000"
      DEKART_ALLOW_FILE_UPLOAD: "1"
      DEKART_STORAGE: "S3"
      DEKART_DATASOURCE: "SNOWFLAKE"
      DEKART_CLOUD_STORAGE_BUCKET: "your-s3-bucket"
      AWS_REGION: "us-east-1"
      AWS_ACCESS_KEY_ID: "your-aws-access-key-id"
      AWS_SECRET_ACCESS_KEY: "your-aws-secret-access-key"
      DEKART_SNOWFLAKE_ACCOUNT_ID: "your-snowflake-account-id"
      DEKART_SNOWFLAKE_USER: "your-snowflake-user"
      DEKART_SNOWFLAKE_PASSWORD: "your-snowflake-password"
      DEKART_REQUIRE_AMAZON_OIDC: "1"
      DEKART_LICENSE_KEY: "your-license-key"
```

## Postgres

Use this setup when Postgres is both the metadata database and the datasource.

```yaml
services:
  db:
    image: postgres:16
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: "dekart"
      POSTGRES_USER: "postgres"
      POSTGRES_PASSWORD: "dekart"

  dekart-postgres:
    image: dekartxyz/dekart:latest
    restart: unless-stopped
    depends_on:
      - db
    ports:
      - "8080:8080"
    environment:
      DEKART_POSTGRES_DB: "dekart"
      DEKART_POSTGRES_USER: "postgres"
      DEKART_POSTGRES_PASSWORD: "dekart"
      DEKART_POSTGRES_PORT: "5432"
      DEKART_POSTGRES_HOST: "db"
      DEKART_STORAGE: "PG"
      DEKART_DATASOURCE: "PG"
      DEKART_POSTGRES_DATASOURCE_CONNECTION: "postgres://postgres:dekart@db:5432/dekart_geo?sslmode=disable"
      DEKART_MAPBOX_TOKEN: "your-mapbox-token"
      DEKART_CORS_ORIGIN: "http://localhost:3000"
      DEKART_ALLOW_FILE_UPLOAD: "0"
```

### OIDC configuration

Use this setup when authentication is handled by a trusted reverse proxy that forwards OIDC JWT to Dekart.
It includes Keycloak and oauth2-proxy for end-to-end local SSO testing.
This setup requires a valid Dekart license key.

[Get required SSO key](/docs/self-hosting/enable-sso-open-source-instance/?ref=sso-key)

```yaml
services:
  db:
    image: postgres:16
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: "dekart"
      POSTGRES_USER: "postgres"
      POSTGRES_PASSWORD: "dekart"
    volumes:
      - ../docker/postgres/oidc-init.sql:/docker-entrypoint-initdb.d/10-oidc-init.sql:ro
      - ../docker/postgres/denmark-pois.csv:/docker-entrypoint-initdb.d/denmark-pois.csv:ro

  adminer:
    image: adminer
    restart: unless-stopped
    ports:
      - "8081:8080"

  keycloak:
    image: quay.io/keycloak/keycloak:24.0
    command: ["start-dev", "--import-realm"]
    restart: unless-stopped
    environment:
      KEYCLOAK_ADMIN: "admin"
      KEYCLOAK_ADMIN_PASSWORD: "admin"
      KC_DB: "dev-mem"
      TMPDIR: "/opt/keycloak/data/tmp"
      JAVA_OPTS_APPEND: "-Djava.io.tmpdir=/opt/keycloak/data/tmp -Dvertx.cacheDirBase=/opt/keycloak/data/tmp/vertx-cache"
    ports:
      - "8082:8080"
    volumes:
      - ../docker/keycloak/dekart-realm.json:/opt/keycloak/data/import/dekart-realm.json:ro
    tmpfs:
      - /opt/keycloak/data/tmp:size=256m,mode=1777

  dekart-oidc:
    image: dekartxyz/dekart:latest
    restart: unless-stopped
    depends_on:
      - db
      - keycloak
    ports:
      - "8080:8080"
    extra_hosts:
      - "host.docker.internal:host-gateway"
    environment:
      DEKART_POSTGRES_DB: "dekart"
      DEKART_POSTGRES_USER: "postgres"
      DEKART_POSTGRES_PASSWORD: "dekart"
      DEKART_POSTGRES_PORT: "5432"
      DEKART_POSTGRES_HOST: "db"
      DEKART_MAPBOX_TOKEN: "your-mapbox-token"
      DEKART_CORS_ORIGIN: "http://localhost:4180"
      DEKART_ALLOW_FILE_UPLOAD: "1"
      DEKART_STORAGE: "PG"
      DEKART_DATASOURCE: "PG"
      DEKART_POSTGRES_DATASOURCE_CONNECTION: "postgres://postgres:dekart@db:5432/dekart_geo?sslmode=disable"
      DEKART_REQUIRE_OIDC: "1"
      DEKART_OIDC_JWKS_URL: "http://host.docker.internal:8082/realms/dekart/protocol/openid-connect/certs"
      DEKART_OIDC_ISSUER: "http://host.docker.internal:8082/realms/dekart"
      DEKART_OIDC_AUDIENCE: "oauth2-proxy"
      DEKART_LICENSE_KEY: "your-license-key"

  oauth2-proxy:
    image: quay.io/oauth2-proxy/oauth2-proxy:v7.8.1
    restart: unless-stopped
    depends_on:
      - keycloak
      - dekart-oidc
    ports:
      - "4180:4180"
    environment:
      OAUTH2_PROXY_PROVIDER: "keycloak-oidc"
      OAUTH2_PROXY_OIDC_ISSUER_URL: "http://localhost:8082/realms/dekart"
      OAUTH2_PROXY_SKIP_OIDC_DISCOVERY: "true"
      OAUTH2_PROXY_LOGIN_URL: "http://localhost:8082/realms/dekart/protocol/openid-connect/auth"
      OAUTH2_PROXY_REDEEM_URL: "http://keycloak:8080/realms/dekart/protocol/openid-connect/token"
      OAUTH2_PROXY_PROFILE_URL: "http://keycloak:8080/realms/dekart/protocol/openid-connect/userinfo"
      OAUTH2_PROXY_OIDC_JWKS_URL: "http://keycloak:8080/realms/dekart/protocol/openid-connect/certs"
      OAUTH2_PROXY_SKIP_CLAIMS_FROM_PROFILE_URL: "true"
      OAUTH2_PROXY_CLIENT_ID: "oauth2-proxy"
      OAUTH2_PROXY_CLIENT_SECRET: "oauth2-proxy-secret"
      OAUTH2_PROXY_COOKIE_SECRET: "MDEyMzQ1Njc4OWFiY2RlZjAxMjM0NTY3ODlhYmNkZWY="
      OAUTH2_PROXY_EMAIL_DOMAINS: "*"
      OAUTH2_PROXY_HTTP_ADDRESS: "0.0.0.0:4180"
      OAUTH2_PROXY_UPSTREAMS: "http://dekart-oidc:8080"
      OAUTH2_PROXY_REDIRECT_URL: "http://localhost:4180/oauth2/callback"
      OAUTH2_PROXY_COOKIE_SECURE: "false"
      OAUTH2_PROXY_REVERSE_PROXY: "true"
      OAUTH2_PROXY_PASS_ACCESS_TOKEN: "true"
      OAUTH2_PROXY_SKIP_PROVIDER_BUTTON: "true"
```

OIDC setup details:
[Keycloak OIDC reverse proxy](/docs/self-hosting/keycloak-reverse-proxy/)
