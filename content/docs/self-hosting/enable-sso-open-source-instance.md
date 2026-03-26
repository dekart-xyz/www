---
title: "Enable SSO"
description: "Start with a license key, then choose the right SSO configuration for your Dekart self-hosted setup."
date: 2026-03-26T07:00:00+01:00
lastmod: 2026-03-26T07:00:00+01:00
draft: false
toc: true
weight: 5
menu:
  docs:
    parent: "self-hosting"
---

Use this page as the starting point for enabling SSO in a self-hosted Dekart instance.

{{< cta-banner
  header="Premium users have SSO enabled by default."
  button_text="View Plans"
  button_link="/self-hosted/"
  style="premium"
>}}

## Add license key first

* SSO requires a valid license key in your runtime config.
* No license key yet? Request one here: [request SSO license key](https://mailchi.mp/dekart/upgrade-to-sso)


Set:

```bash
DEKART_LICENSE_KEY=<your-license-key>
```

If you run with Docker Compose:

```yaml
services:
  dekart:
    environment:
      - DEKART_LICENSE_KEY=${DEKART_LICENSE_KEY}
```

Without a license key, SSO/auth config will fail on startup.

## Choose your SSO configuration

After `DEKART_LICENSE_KEY` is set, choose the first configuration in this priority order that matches your environment.

### User authorization via Google OAuth 2.0 flow

Use this when users sign in directly with Google OAuth and you want Google user credentials flow.

[Google OAuth 2.0 configuration](/docs/configuration/environment-variables/#-user-authorization-via-google-oauth-20-flow)

### User authorization via Google IAP

Use this when Dekart is behind Google IAP and you want to trust IAP signed headers.

[Google IAP configuration](/docs/configuration/environment-variables/#-user-authorization-via-google-iap)

### User authorization via Amazon Load Balancer

Use this when ALB/Cognito (or ALB-authenticated flow) forwards auth headers to Dekart.

[Amazon Load Balancer configuration](/docs/configuration/environment-variables/#-user-authorization-via-amazon-load-balancer)
[Amazon Load Balancer Terraform example](/docs/self-hosting/aws-ecs-terraform/#cognito-authentication)

### User authorization via OIDC JWT header (reverse proxy)

Use this when a trusted reverse proxy (for example oauth2-proxy + Keycloak) authenticates users and forwards JWT to Dekart.

[OIDC JWT header configuration](/docs/configuration/environment-variables/#-user-authorization-via-oidc-jwt-header-reverse-proxy)
[Keycloak + Postgres + OIDC Setup](/docs/self-hosting/keycloak-reverse-proxy/)

## Validate

Before inviting users, verify:

- `DEKART_LICENSE_KEY` is present in the running instance.
- Your OIDC/JWKS/issuer/audience values match your IdP.
- Login flow reaches your IdP and returns to Dekart.
- Users can access shared/team features after login.
