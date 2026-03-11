---
title: "Keycloak + Postgres + OIDC Setup"
description: "Copy-paste setup guide for Dekart Premium v0.21 with Keycloak reverse proxy and Postgres-only storage"
date: 2025-03-11T10:30:00+01:00
lastmod: 2025-03-11T10:30:00+01:00
draft: false
menu:
  docs:
    parent: "self-hosting"
---

{{< cta-banner template="premium" >}}

This page documents the recommended Premium `v0.21+` setup pattern when:

- authentication is handled by Keycloak behind a reverse proxy
- data source is Postgres
- query result storage is Postgres replay mode (`DEKART_STORAGE=PG`)

## Overall setup model

### OIDC authentication model

- Keycloak (or another OIDC provider) handles login and session.
- Reverse proxy forwards JWT to Dekart in `X-Forwarded-Access-Token`.
- Dekart validates JWT against JWKS and authorizes by `email` claim.

Required env:

```bash
DEKART_REQUIRE_OIDC=1
DEKART_OIDC_JWKS_URL=<jwks_uri>
DEKART_OIDC_ISSUER=<issuer>
DEKART_OIDC_AUDIENCE=<client_id_or_expected_aud>
```

### Postgres datasource model

Use Postgres as the query engine:

```bash
DEKART_DATASOURCE=PG
DEKART_POSTGRES_DATASOURCE_CONNECTION=postgres://<user>:<pass>@<host>:5432/<db>?sslmode=disable
```

### Postgres roles: metadata DB vs datasource DB

Dekart uses Postgres in two different roles:

1. Metadata database (always required):
   - stores Dekart app state (reports, queries, users, workspaces, permissions)
   - configured by `DEKART_POSTGRES_HOST`, `DEKART_POSTGRES_PORT`, `DEKART_POSTGRES_DB`, `DEKART_POSTGRES_USER`, `DEKART_POSTGRES_PASSWORD`

2. Datasource database (when `DEKART_DATASOURCE=PG`):
   - stores your business/geospatial tables queried by users
   - configured by `DEKART_POSTGRES_DATASOURCE_CONNECTION`

These can be:

- the same Postgres instance (different databases/schemas recommended), or
- different Postgres instances (common for stricter isolation).

### Postgres storage model (`DEKART_STORAGE=PG`)

Use replay-based storage in Postgres (no object bucket path):

```bash
DEKART_STORAGE=PG
DEKART_ALLOW_FILE_UPLOAD=
DEKART_CLOUD_STORAGE_BUCKET=
```

Notes:

- `DEKART_STORAGE=PG` and file upload are incompatible.
- Public publishing is not supported in this mode.

## Example

Example values:

- Keycloak public URL: `https://auth.example.com/realms/dekart`
- Internal Keycloak URL from Dekart/proxy network: `http://keycloak:8080/realms/dekart`
- Dekart public URL behind proxy: `https://dekart.example.com`
- Postgres host: `postgres.internal`

### Dekart env snippet

```yaml
environment:
  DEKART_PORT: "8080"
  DEKART_MAPBOX_TOKEN: "${DEKART_MAPBOX_TOKEN}"
  DEKART_POSTGRES_HOST: "${DEKART_POSTGRES_HOST}"
  DEKART_POSTGRES_PORT: "${DEKART_POSTGRES_PORT}"
  DEKART_POSTGRES_DB: "${DEKART_POSTGRES_DB}"
  DEKART_POSTGRES_USER: "${DEKART_POSTGRES_USER}"
  DEKART_POSTGRES_PASSWORD: "${DEKART_POSTGRES_PASSWORD}"

  DEKART_DATASOURCE: "PG"
  DEKART_POSTGRES_DATASOURCE_CONNECTION: "postgres://app_user:app_password@postgres.internal:5432/app_geo?sslmode=require"

  DEKART_STORAGE: "PG"

  DEKART_REQUIRE_OIDC: "1"
  DEKART_OIDC_JWKS_URL: "http://keycloak:8080/realms/dekart/protocol/openid-connect/certs"
  DEKART_OIDC_ISSUER: "https://auth.example.com/realms/dekart"
  DEKART_OIDC_AUDIENCE: "oauth2-proxy"

  DEKART_CORS_ORIGIN: "https://dekart.example.com"
```

### oauth2-proxy env snippet

```yaml
environment:
  OAUTH2_PROXY_PROVIDER: "keycloak-oidc"
  OAUTH2_PROXY_OIDC_ISSUER_URL: "https://auth.example.com/realms/dekart"
  OAUTH2_PROXY_CLIENT_ID: "oauth2-proxy"
  OAUTH2_PROXY_CLIENT_SECRET: "${OAUTH2_PROXY_CLIENT_SECRET}"
  OAUTH2_PROXY_REDIRECT_URL: "https://dekart.example.com/oauth2/callback"
  OAUTH2_PROXY_UPSTREAMS: "http://dekart:8080"
  OAUTH2_PROXY_PASS_ACCESS_TOKEN: "true"
  OAUTH2_PROXY_REVERSE_PROXY: "true"
  OAUTH2_PROXY_EMAIL_DOMAINS: "*"
```

### Keycloak client settings snippet

Configure OIDC client (for example `oauth2-proxy`) with:

- Redirect URI: `https://dekart.example.com/oauth2/callback`
- Web origin: `https://dekart.example.com`
- Audience includes `oauth2-proxy` (must match `DEKART_OIDC_AUDIENCE`)
- Token includes `email` claim

## Operational notes

- Dekart expects JWT in `X-Forwarded-Access-Token`.
- Proxy must overwrite/strip inbound auth headers before forwarding.
- `DEKART_REQUIRE_OIDC` is mutually exclusive with Google OAuth, IAP, Amazon OIDC, and Snowflake context auth modes.
- With `DEKART_STORAGE=PG`, keep `DEKART_ALLOW_FILE_UPLOAD` and `DEKART_CLOUD_STORAGE_BUCKET` unset.

If you need a local test stack, see the Dekart repository compose profile examples.
