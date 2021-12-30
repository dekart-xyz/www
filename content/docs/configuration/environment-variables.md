---
title: "Environment Variables"
description: "Environment Variables"
date: 2021-02-22T07:48:05+01:00
lastmod: 2021-02-22T07:48:05+01:00
draft: false
menu:
  docs:
    parent: "configuration"
images: []
---

Dekart deployment requires:

* access to BigQuery API
* Cloud Storage bucket where query results are stored
* Postgres DB (like Cloud SQL) to store metadata
* Mapbox token to load the map

Optionally, secure deployment with Google IAP. You have 2 options:
* Just configure Google IAP (for example for [App Engine](/docs/self-hosting/app-engine/) deployment)
* Additionally [enable user authentication with Google IAP](#user-management-with-google-iap) to isolate user permissions


## Main configuration

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_BIGQUERY_PROJECT_ID`      | Unique identifier for your Google Cloud project with BigQuery API Enabled. <br> *Example*: `my-project`|
| `DEKART_BIGQUERY_MAX_BYTES_BILLED` <small class="badge badge-info">version &gt;= 0.7</small>    | Sets `maximumBytesBilled` in BigQuery Job Configuration to implement  <a href="https://cloud.google.com/bigquery/docs/best-practices-costs#limit_query_costs_by_restricting_the_number_of_bytes_billed">Best Practices for Controlling Query Cost</a>.<br> If not set warning message will appear in logs.|
| `DEKART_CLOUD_STORAGE_BUCKET`      | <a href="https://cloud.google.com/storage">Google Cloud Storage</a> bucket name where Dekart Query results will be stored. <br> *Example*: `dekart-bucket`|
| `DEKART_MAPBOX_TOKEN`      | <a href="https://docs.mapbox.com/help/how-mapbox-works/access-tokens/">Mapbox Token</a> to show a map|
| `DEKART_POSTGRES_DB`      | Database name. Dekart needs Postgres Database to store query meta information. <br> *Example*: `dekart`|
| `DEKART_POSTGRES_HOST`      | *Example*: `localhost`|
| `DEKART_POSTGRES_PORT`      | *Example*: `5432`|
| `DEKART_POSTGRES_USER`      | *Example*: `postgres`|
| `DEKART_POSTGRES_PASSWORD`      | *Example*: `******`|
|`DEKART_PORT`| *Example*: `8080`|
|`GOOGLE_APPLICATION_CREDENTIALS`| Credentials for <a href="https://cloud.google.com/docs/authentication/getting-started">Google Cloud API</a> <br> *Example*: `/.../service-account-123456.json`|

## User management with Google IAP

Dekart can read <a target="_blank" href="https://cloud.google.com/iap/docs/signed-headers-howto">claims provided by Google IAP</a> and implement following policies:

* User can list and edit only their own reports
* Users have read-only access to other users reports

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_REQUIRE_IAP`      |  Enables validation Google IAP JWT. Required users to be authenticated. ENables user management policies. <br> *Example value*: `1`|
| `DEKART_IAP_JWT_AUD`      |  Signed Header JWT Audience (`aud`). You can get the values for the aud string mentioned above by accessing the Cloud Console, or you can use the gcloud command-line tool. [See details](https://cloud.google.com/iap/docs/signed-headers-howto#verifying_the_jwt_payload).  <br> *Example value*: `/projects/PROJECT_NUMBER/apps/PROJECT_ID`|

## User Experience

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_UX_HOMEPAGE` |  Change URL linked from Dekart logo<br> *Default value*: `/`|
| `DEKART_UX_DATA_DOCUMENTATION` |  Allows provide URL to dataset documentation. It will appear in Dekart UI.<br> *Example value*: `https://my.company/dataset/schema.html`|
| `DEKART_HTML_CUSTOM_CODE`      |  Allows to add custom HTML code to `<head>`. Can be used for adding trackers. |

## Development specific

Do not change for production

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_LOG_DEBUG`      |  Set Dekart log level to debug <br> *Example value*: `1`|
| `DEKART_LOG_PRETTY`      |  Print pretty colorful logs in console. By default Dekart formats logs as JSON <br> *Example value*: `1`|
| `DEKART_STATIC_FILES`      |  *Example value*: `./build`|

