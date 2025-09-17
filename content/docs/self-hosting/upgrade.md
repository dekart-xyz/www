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

{{< cta-banner template="deployment-templates" >}}

## Before you begin

* Back up your Postgres database before upgrading Dekart. On the first run, Dekart applies migrations to the database and you won't be able to downgrade.

* Do not skip version when upgrading. For example, never go from `0.17 → 0.19`



## Migration instructions

Update the docker tag.

**`dekartxyz/dekart:0.18` -> `dekartxyz/dekart:0.19`**

You must now explicitly set both `DEKART_STORAGE` and `DEKART_DATASOURCE`.
Dekart 0.19 will refuse to start if these two variables are not set.

**`dekartxyz/dekart:0.17` -> `dekartxyz/dekart:0.18`**

**Note:** when authentication enabled, all current users and maps will be migrated to "Default" workspace. You can manage and rename via UX afterwards.
To fine-tune workspace permissions and default roles, we’ve added following configuration variables

- **`DEKART_ALLOW_WORKSPACE_CREATION`**
  - When set to `true`, users can create new workspaces. Set to `false` new users will be automatically added to Default workspace.

- **`DEKART_DEFAULT_WORKSPACE_ADMIN`**
  - Email that designates a default admin for Default workspace. When not provided all new users will be Admin. When provided all users will be viewers, unless specified differently with `DEKART_DEFAULT_WORKSPACE_ROLE`

- **`DEKART_DEFAULT_WORKSPACE_ROLE`**
  - Role assigned by default to new users (e.g., `viewer`, `editor`, `admin`). Requires `DEKART_DEFAULT_WORKSPACE_ADMIN` to be specified


**`dekartxyz/dekart:0.16` -> `dekartxyz/dekart:0.17`**
No breaking changes, just update the docker tag. New Postgres migrations will be applied on the first run.

Note, after update private reports will not be available to other users. You need to give access explicitly in new Share dialog.

**`dekartxyz/dekart:0.15` -> `dekartxyz/dekart:0.16`**
No breaking changes, just update the docker tag. New Postgres migrations will be applied on the first run.

**`dekartxyz/dekart:0.14` -> `dekartxyz/dekart:0.15`**
No breaking changes, just update the docker tag. New Postgres migrations will be applied on the first run.

**`dekartxyz/dekart:0.13` -> `dekartxyz/dekart:0.14`**

No breaking changes, just update the docker tag. New Postgres migrations will be applied on the first run.

**`dekartxyz/dekart:0.12` -> `dekartxyz/dekart:0.13`**

No breaking changes, just update the docker tag.

**`dekartxyz/dekart:0.11` -> `dekartxyz/dekart:0.12`**

Configure `DEKART_CORS_ORIGIN` environment variable to ensure the security of your instance and prevent warnings in logs.

Then redeploy application
