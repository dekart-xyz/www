---
title: "Build from Source"
description: "Build Dekart from Source"
date: 2021-02-22T08:24:45+01:00
lastmod: 2021-02-22T08:24:45+01:00
weight: 100
draft: false
images: []
canonical: /docs/contributing/building-from-source/
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

2. Get your

3. Create `.npmrc` file in the project directory with the following content and your github token

```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
@dekart-xyz:registry=https://npm.pkg.github.com

```

This step is required because dekart is using github packages

4. Install frontend dependencies
```
npm install
```

5. Create and edit `.env`; see [environment variables](/docs/installation/environment-variables/) for details


```
cp .env.example .env
```

6. Run Postgres DB locally

```
make docker-compose-up
```

7. Run Server

```
make run-dev-server
```

8. Run frontend

```
npm start
```

