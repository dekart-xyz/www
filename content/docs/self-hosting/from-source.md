---
title: "Build from Source"
description: "Build Dekart from Source"
date: 2021-02-22T08:24:45+01:00
lastmod: 2021-02-22T08:24:45+01:00
weight: 100
draft: false
images: []
menu:
  docs:
    parent: "self-hosting"
---

## Prerequisites

* Google Cloud Project
* BigQuery API Enabled
* Cloud Storage Bucket
* Service account credentials with access to all above
* Mapbox Token

## Steps

1. Checkout [Dekart from GitHub](https://github.com/dekart-xyz/dekart); navigate to project directory;

2. Install frontend dependencies
```
npm install
```

1. Create and edit `.env`; see [environment variables](/docs/configuration/environment-variables/) for details


```
cp .env.example .env
```

4. Run Postgres DB locally

```
docker-compose  --env-file .env up
```

5. Run Server; you will need to install [godotenv](https://github.com/joho/godotenv) or handle environment variable otherwise

```
godotenv -f .env go run ./src/server/main.go
```

6. Run frontend

```
npm start
```

