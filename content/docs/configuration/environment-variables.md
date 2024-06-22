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

## Main configuration

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_MAPBOX_TOKEN`      | <a href="https://docs.mapbox.com/help/how-mapbox-works/access-tokens/">Mapbox Token</a> to show a map|
| `DEKART_POSTGRES_DB`      | Database name. Dekart needs Postgres Database to store query meta information. <br> *Example*: `dekart`|
| `DEKART_POSTGRES_HOST`      | *Example*: `localhost`|
| `DEKART_POSTGRES_PORT`      | *Example*: `5432`|
| `DEKART_POSTGRES_USER`      | *Example*: `postgres`|
| `DEKART_POSTGRES_PASSWORD`      | *Example*: `******`|
|`DEKART_PORT`| *Example*: `8080`|
|`DEKART_POSTGRES_URL` <br><small class="badge badge-info">version &gt;= 0.13</small> | Alternatively to specify `DEKART_POSTGRES_DB`, `DEKART_POSTGRES_HOST`, `DEKART_POSTGRES_PORT`, `DEKART_POSTGRES_USER`, `DEKART_POSTGRES_PASSWORD`, configure PostgreSQL by passing the connection string. If both specified `DEKART_POSTGRES_URL` is used. <br/> *Example*: `postgres://user:pass@hostname:5432/dekart?sslmode=verify-full`|
|`DEKART_DATASOURCE=BQ` <br><small class="badge badge-info">version &gt;= 0.8</small> | Which datasource to use: <br>Values<ul><li>`BQ` BigQuery, default</li><li>`ATHENA` AWS Athena</li><li>`SNOWFLAKE` Snowflake <small class="badge badge-info">version &gt;= 0.12</small></li><li>`PG` Postgres <small class="badge badge-info">version &gt;= 0.16</small></li></ul>|
| `DEKART_STORAGE=GCS` <br><small class="badge badge-info">version &gt;= 0.8</small> | Which storage backend to use for storing queries and query results <br>Values<ul><li>`GCS` Google Cloud Storage, default, works only with BigQuery data source</li><li>`S3` AWS S3, works with BigQuery and AWS Athena</li></ul>|
| `DEKART_CLOUD_STORAGE_BUCKET`      | Google Cloud Storage or AWS S3 bucket name where Dekart Query results will be stored. <br> *Example*: `dekart-bucket` <br><br>  If value is empty, users will be able to define storage bucket via UI. Supported datasource `DEKART_DATASOURCE`: <ul><li>`BQ` BigQuery from <small class="badge badge-info">version &gt;= 0.15</small></li></ul>|
| `DEKART_CORS_ORIGIN=` <br/><small class="badge badge-info">version &gt;= 0.10</small> | CORS Origin to be allowed by Dekart backend and set in `Access-Control-Allow-Origin` header. If not set or set incorrectly, warning will appear in logs. If set incorrectly. <br> *Example*: `https://dekart.example.com` |


## AWS

Dekart support started AWS SDK environment variables. Required to query AWS Athena and use AWS S3.

| Name        | Description           |
| ------------- | ------------- |
|`AWS_REGION`<br/><small class="badge badge-info">version &gt;= 0.8</small> | The AWS SDK compatible environment variable that specifies the AWS Region to send the request to  |
|`AWS_ACCESS_KEY_ID` <br/><small class="badge badge-info">version &gt;= 0.8</small>| Specifies an AWS access key associated with an IAM user or role. |
|`AWS_SECRET_ACCESS_KEY` <br/><small class="badge badge-info">version &gt;= 0.8</small>| Specifies the secret key associated with the access key. This is essentially the "password" for the access key. |

## AWS Athena

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_ATHENA_CATALOG` <br/><small class="badge badge-info">version &gt;= 0.8</small> | Data source (group of databases) for AWS Athena to reference when executing queries. Default value is usually `AwsDataCatalog`. <br> *Example*: `my-athena-catalog`|
`DEKART_ATHENA_S3_OUTPUT_LOCATION` and then copied to `DEKART_CLOUD_STORAGE_BUCKET`.  <br> *Example*: `athena-results`|
| `DEKART_ATHENA_S3_OUTPUT_LOCATION` <br/><small class="badge badge-info">version &gt;= 0.8</small>     | Amazon S3 query result location required by Athena SDK. This is different from  `DEKART_CLOUD_STORAGE_BUCKET`. First query results are stored in `DEKART_ATHENA_S3_OUTPUT_LOCATION` and then copied to `DEKART_CLOUD_STORAGE_BUCKET`.  <br> *Example*: `athena-results`|
| `DEKART_ATHENA_WORKGROUP` <br/><small class="badge badge-info">version &gt;= 0.13</small> | AWS Athena workgroup to use when executing Athena queries. If not specified, the default `primary` workgroup will be used. <br> *Example*: `my-athena-workgroup`|

## Google Cloud

Required to query BigQuery and use Cloud Storage

| Name        | Description           |
| ------------- | ------------- |
|`GOOGLE_APPLICATION_CREDENTIALS`| Credentials for <a href="https://cloud.google.com/docs/authentication/getting-started">Google Cloud API</a> <br> *Example*: `/.../service-account-123456.json`|

## BigQuery

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_BIGQUERY_PROJECT_ID`      | Unique identifier for your Google Cloud project with BigQuery API Enabled. <br> *Example*: `my-project` <br><br><small class="badge badge-info">version &gt;= 0.15</small> If value is empty, users will be able to define project ID via UI.|
| `DEKART_BIGQUERY_MAX_BYTES_BILLED` <br/><small class="badge badge-info">version &gt;= 0.7</small>    | Sets `maximumBytesBilled` in BigQuery Job Configuration to implement  <a href="https://cloud.google.com/bigquery/docs/best-practices-costs#limit_query_costs_by_restricting_the_number_of_bytes_billed">Best Practices for Controlling Query Cost</a>.<br> If not set warning message will appear in logs.|
| `DEKART_GCP_EXTRA_OAUTH_SCOPES` <br/><small class="badge badge-info">version &gt;= 0.14</small>    | Set additional scopes for the GCP OAuth token when connecting to BigQuery.<br> The value is interpreted as a comma-delimited list.<br> E.g., in order to query a BigQuery table backed by a Google Sheet in Google Drive, the value needs to be set to `https://www.googleapis.com/auth/drive`. |

## Snowflake

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_SNOWFLAKE_ACCOUNT_ID` <br/><small class="badge badge-info">version &gt;= 0.12</small>     | <a target="_blank" href="https://docs.snowflake.com/en/user-guide/admin-account-identifier#using-an-account-name-as-an-identifier">Snowflake Account Identifier</a>  <br> *Example*: `orgname-account_name`|
| `DEKART_SNOWFLAKE_USER` <br/><small class="badge badge-info">version &gt;= 0.12</small>     | Snowflake user with default warehouse configured  <br> *Example*: `example_user`|
| `DEKART_SNOWFLAKE_PASSWORD` <br/><small class="badge badge-info">version &gt;= 0.12</small>     | Snowflake user password  <br> *Example*: `******`|

## Postgres (as a data source)

Postgres can be used as a data source for Dekart. Do not confuse with Dekart's Postgres database, which is used to store query meta information.

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_POSTGRES_DATASOURCE_CONNECTION` <br/><small class="badge badge-info">version &gt;= 0.16</small>     | Postgres DB to be used as data source  <br> *Example*: `postgres://user:password@host:port/db`|


## File upload

Starting from version 0.10 Dekart supports file upload. File upload is disabled by default. Once uploaded files are stored in the same storage as query results. Both AWS S3 and Google Cloud Storage are supported. The recommended max file size is 100MB.

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_ALLOW_FILE_UPLOAD` <br/><small class="badge badge-info">version &gt;= 0.10</small> | Enable file upload <br> *Example value*: `1`|

## User authorization via Google OAuth 2.0 flow

Dekart can authorize users via Google OAuth 2.0 and use users' credentials to access BigQuery and Cloud Storage. When this option is enabled, Dekart does not require a service account and `GOOGLE_APPLICATION_CREDENTIALS` to be set. The user token is retrieved from Google OAuth 2.0 flow and stored in only in the browser memory. When the page is refreshed, the token is retrieved again. User short-lived token is then passed via Authorization header Dekart backend to access BigQuery and Cloud Storage.

No token is stored in the Dekart backend, database, or logs.

Each user needs to have access to BigQuery and Cloud Storage with following permissions:
* BigQuery Data Viewer
* BigQuery Job User
* BigQuery Read Session User
* Storage Object User


This option is only supported for BigQuery and Cloud Storage. It is not supported for AWS and Snowflake Data Sources.

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_REQUIRE_GOOGLE_OAUTH`  <br/><small class="badge badge-info">version &gt;= 0.15</small> |  Enables Google OAuth 2.0 flow. Requires users to be authenticated. <br> *Example value*: `1`|
| `DEKART_GOOGLE_OAUTH_CLIENT_ID`<br/><small class="badge badge-info">version &gt;= 0.15</small>|  Google OAuth 2.0 Client ID. <br> *Example value*: `1234567890-abcde.apps.googleusercontent.com`|
| `DEKART_GOOGLE_OAUTH_SECRET`<br/><small class="badge badge-info">version &gt;= 0.15</small>|  Google OAuth 2.0 Client Secret. <br> *Example value*: `******`|


Creating Google OAuth 2.0 Client ID and Client Secret:

1. Configure [OAuth Consent Screen](https://console.cloud.google.com/apis/credentials/consent) in your Google Cloud Project
2. Create [OAuth 2.0 Client ID](https://console.cloud.google.com/apis/credentials) with `Web application` type
3. Add `https://your-dekart-url.com/api/v1/authenticate` to `Authorized redirect URIs`

## User authorization via Google IAP

Dekart can read <a target="_blank" href="https://cloud.google.com/iap/docs/signed-headers-howto">claims provided by Google IAP</a> and authorize users to:

* list and edit only their own reports
* read-only access to other users reports

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_REQUIRE_IAP`      |  Enables validation Google IAP JWT. Required users to be authenticated. ENables user management policies. <br> *Example value*: `1`|
| `DEKART_IAP_JWT_AUD`      |  Signed Header JWT Audience (`aud`). You can get the values for the aud string mentioned above by accessing the Cloud Console, or you can use the gcloud command-line tool. [See details](https://cloud.google.com/iap/docs/signed-headers-howto#verifying_the_jwt_payload).  <br> *Example value*: `/projects/PROJECT_NUMBER/apps/PROJECT_ID`|

## User authorization via Amazon Load Balancer

Dekart can read <a target="_blank" href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html">claims provided by Amazon Load Balancer</a> and authorize users to:

* list and edit only their reports
* read-only access to other user's reports

[Amazon Load Balancer configuration example with Terraform](/docs/self-hosting/aws-ecs-terraform/#cognito-authentication)

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_REQUIRE_AMAZON_OIDC`      |  Enables users authorization. Requires users to be authenticated and `x-amzn-oidc-data` to be passed from Load Balancer. Requires `AWS_REGION`. <br> *Example value*: `1`|



## User Experience

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_UX_HOMEPAGE` |  Change URL linked from Dekart logo<br> *Default value*: `/`|
| `DEKART_UX_DATA_DOCUMENTATION` |  Allows provide URL to dataset documentation. It will appear in Dekart UI.<br> *Example value*: `https://my.company/dataset/schema.html`|
| `DEKART_HTML_CUSTOM_CODE`      |  Allows to add custom HTML code to `<head>`. Can be used for adding trackers. |
| `DEKART_DISABLE_USAGE_STATS` <br><small class="badge badge-info">version &gt;= 0.11</small> | By default, Dekart appends certain information to the referrer of external links. This information includes the version number, the SHA256 hash of the hostname, the name of the data source, and the total number of reports, queries, files, and authors. No other information is collected. The source code for this implementation can be found [here](https://github.com/dekart-xyz/dekart/blob/main/src/client/lib/ref.js#L25). This behavior can be turned off by setting this variable to `1`.|
| `DEKART_UX_ACCESS_ERROR_INFO_HTML` <br><small class="badge badge-info">version &gt;= 0.16</small> | Allows to provide custom HTML code to be shown on the access error page. |
| `DEKART_UX_NOT_FOUND_ERROR_INFO_HTML` <br><small class="badge badge-info">version &gt;= 0.16</small> | Allows to provide custom HTML code to be shown on the not found error page. |
| `DEKART_UX_SAMPLE_QUERY_SQL` <br><small class="badge badge-info">version &gt;= 0.16</small> | Allows to provide a sample SQL query to be shown in the query editor. |

## Development specific

Do not change for production

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_LOG_DEBUG`      |  Set Dekart log level to debug <br> *Example value*: `1`|
| `DEKART_LOG_PRETTY`      |  Print pretty colorful logs in console. By default Dekart formats logs as JSON <br> *Example value*: `1`|
| `DEKART_STATIC_FILES`      |  *Example value*: `./build`|

