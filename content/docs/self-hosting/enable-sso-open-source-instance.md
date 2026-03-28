---
title: "Enable SSO"
description: "Get a free SSO key and enable team login for your self-hosted Dekart instance."
date: 2026-03-26T07:00:00+01:00
lastmod: 2026-03-28T07:00:00+01:00
draft: false
toc: true
weight: 5
menu:
  docs:
    parent: "self-hosting"
---

## How SSO works in Dekart

Dekart runs in anonymous mode by default. To enable team login (Google OAuth, OIDC, AWS ALB, or Google IAP), your instance needs an SSO key set as `DEKART_LICENSE_KEY`.

Enter your work email and you will receive an SSO key with setup instructions.

{{< cta-banner
  header="Get your free SSO key"
  button_text="Get SSO Key"
  button_link="https://mailchi.mp/dekart/upgrade-to-sso?ref=docs-enable-sso"
>}}

## Add the key to your instance

Set the key as an environment variable:

```bash
DEKART_LICENSE_KEY=<your-sso-key>
```

If you run with Docker Compose:

```yaml
services:
  dekart:
    environment:
      - DEKART_LICENSE_KEY=${DEKART_LICENSE_KEY}
```

Without the key, SSO config will fail on startup with a clear error message.

## Choose your SSO method

After `DEKART_LICENSE_KEY` is set, pick the method that matches your environment.

### Google OAuth 2.0

Users sign in directly with Google OAuth.

[Google OAuth 2.0 configuration](/docs/configuration/environment-variables/#user-authorization-via-google-oauth-20-flow)

### Google IAP

Dekart is behind Google IAP and trusts IAP signed headers.

[Google IAP configuration](/docs/configuration/environment-variables/#user-authorization-via-google-iap)

### Amazon Load Balancer

ALB/Cognito forwards auth headers to Dekart.

[Amazon Load Balancer configuration](/docs/configuration/environment-variables/#user-authorization-via-amazon-load-balancer)
[Amazon Load Balancer Terraform example](/docs/self-hosting/aws-ecs-terraform/#cognito-authentication)

### OIDC reverse proxy

A trusted reverse proxy (oauth2-proxy, Keycloak, etc.) authenticates users and forwards JWT to Dekart.

[OIDC JWT header configuration](/docs/configuration/environment-variables/#user-authorization-via-oidc-jwt-header-reverse-proxy)
[Keycloak + Postgres + OIDC Setup](/docs/self-hosting/keycloak-reverse-proxy/)

## Validate

Before inviting your team, verify:

- `DEKART_LICENSE_KEY` is set in the running instance
- Your OIDC/JWKS/issuer/audience values match your identity provider
- Login flow reaches your IdP and returns to Dekart
- Users can access shared maps and team features after login
