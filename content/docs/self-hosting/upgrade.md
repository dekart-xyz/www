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
Before you begin: it is always recommended to backup your postgres database before upgrading Dekart. On the first run Dekart applies migrations to database and you won't be able to downgrade.
</div></p>

For all Docker based deployments, update docker tag, for example:

`dekartxyz/dekart:0.10` -> `dekartxyz/dekart:0.11`

Configure `DEKART_CORS_ORIGIN` environment variable to ensure security of your instance and prevent warnings in logs.

Then redeploy application

## Migration instructions

There is no breaking configuration changes in version `0.11`