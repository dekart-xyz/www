---
title: "Build from Source"
description: "Build Dekart from Source"
date: 2021-02-22T08:24:45+01:00
lastmod: 2021-02-22T08:24:45+01:00
weight: 100
draft: false
images: []
aliases:
  - ../self-hosting/from-source/
menu:
  docs:
    parent: "contributing"
---

## Prerequisites

* Google Cloud Project
* BigQuery API Enabled
* Cloud Storage Bucket
* Service account credentials with access to all above
* Mapbox Token
* GitHub Account and [GitHub Token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token)

## Steps

1. Checkout [Dekart from GitHub](https://github.com/dekart-xyz/dekart); navigate to project directory;

2. Create `.npmrc` file in the project directory with the following content and your github token

```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
@dekart-xyz:registry=https://npm.pkg.github.com

```

This step is required because dekart is using github packages

3. Install frontend dependencies
```
npm install
```

4. Create and edit `.env`; see [environment variables](/docs/configuration/environment-variables/) for details


```
cp .env.example .env
```

5. Run Postgres DB locally

```
docker-compose  --env-file .env up
```

6. Run Server; you will need to install [godotenv](https://github.com/joho/godotenv) or handle environment variable otherwise

```
godotenv -f .env go run ./src/server/main.go
```

7. Run frontend

```
npm start
```

