---
title: "Upgrade to new version"
description: "How to upgrade and migration notes"
date: 2021-02-22T08:24:45+01:00
lastmod: 2021-02-22T08:24:45+01:00
weight: 10
draft: false
toc: false
images: []
menu:
  docs:
    parent: "self-hosting"
---

<p><div class="alert alert-primary" role="alert">
Before you begin: it is always recommended to back up your Postgres database before upgrading Dekart. On the first run, Dekart applies migrations to the database and you won't be able to downgrade.
</div></p>

For all Docker-based deployments, update the docker tag, for example `dekartxyz/`dekart:0.13` -> `dekartxyz/dekart:0.14`

## Migration instructions

**`dekartxyz/dekart:0.13` -> `dekartxyz/dekart:0.14`**

No breaking changes, just update the docker tag. New Postgres migrations will be applied on the first run.

**`dekartxyz/dekart:0.12` -> `dekartxyz/dekart:0.13`**

No breaking changes, just update the docker tag.

**`dekartxyz/dekart:0.11` -> `dekartxyz/dekart:0.12`**

Configure `DEKART_CORS_ORIGIN` environment variable to ensure the security of your instance and prevent warnings in logs.

Then redeploy application
