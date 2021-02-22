---
title: "Google App Engine"
description: ""
date: 2021-02-22T08:24:45+01:00
lastmod: 2021-02-22T08:24:45+01:00
draft: false
images: []
menu:
  docs:
    parent: "self-hosting"
---

## Prerequisites

* Google Cloud Project
* BigQuery API Enabled
* Mapbox Token

**In this guide you will create:**

* Cloud SQL DB
* Cloud Storage Bucket
* App Engine App (Flexible environment)
* Configure Access to specific Google Accounts with Google IAP

## Steps

1. Create db instance

```bash
gcloud sql instances create ${DB_INSTANCE_NAME} \
    --database-version=POSTGRES_12 \
    --tier=db-f1-micro\
    --region=europe-west1
```

2. Create database

```
gcloud sql databases create dekart --instance=${DB_INSTANCE_NAME}
```

3. Set password

```
gcloud sql users set-password postgres --instance=${DB_INSTANCE_NAME} --password=dekart
```

4. Create storage

```
gsutil mb -b on -l europe-west1 gs://${BUCKET}/
```

5. Create App Engine App

```
gcloud app create --region=europe-west
```

6. Create [Dockerfile](https://github.com/dekart-xyz/dekart/tree/main/install/app-engine/Dockerfile)

7. Create [app.yaml](https://github.com/dekart-xyz/dekart/tree/main/install/app-engine/app.example.yaml)


8. Deploy app

```
gcloud app deploy app.yaml
```

9. [Configure Google IAP](https://cloud.google.com/iap/docs/app-engine-quickstart) (works only with web console)


**All gcloud commands in [Makefile](https://github.com/dekart-xyz/dekart/tree/main/install/app-engine/Makefile)**

