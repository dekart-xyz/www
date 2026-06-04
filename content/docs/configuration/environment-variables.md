---
title: "Environment Variables"
description: "Environment Variables"
date: 2021-02-22T07:48:05+01:00
lastmod: 2021-02-22T07:48:05+01:00
draft: false
menu:
  docs:
    parent: "self-hosting"
images: []
---

## Main configuration

Dekart runs with zero configuration: by default it uses a built-in SQLite metadata database, local file storage, and file upload, so you can create a map immediately. Override the variables below to point Dekart at your datasource and storage. See [Metadata storage](#metadata-storage) for persistence and backups, [Authentication](#authentication) for SSO, and [Data source connectors](#data-source-connectors) for warehouse settings.

| Name        | Description           |
| ------------- | ------------- |
|`DEKART_DATASOURCE=USER` | Which datasource to use: <br>Values<ul><li>`BQ` BigQuery</li><li>`ATHENA` AWS Athena</li><li>`SNOWFLAKE` Snowflake</li><li>`PG` Postgres <small class="badge badge-info">version &gt;= 0.18</small></li><li>`USER` Users can configure connections in UX <small class="badge badge-info">version &gt;=0.17.2</small></li><li>`CH` ClickHouse <small class="badge badge-info">version &gt;= 0.18</small></li></ul>Default: `USER` <small class="badge badge-info">version &gt;= 0.23</small>.|

### Storage

`DEKART_STORAGE` selects the backend for query results. When it is `S3` or `GCS`, the bucket set in `DEKART_CLOUD_STORAGE_BUCKET` is used for three things:

- **Query result cache** — query results are stored so reports reload without re-running the query.
- **File uploads** — uploaded CSV and GeoJSON files, when file upload is enabled.
- **SQLite metadata backups** — periodic backups of the SQLite metadata database <small class="badge badge-info">version &gt;= 0.23</small>.

Provide credentials for the matching provider (`GOOGLE_APPLICATION_CREDENTIALS` for GCS, `AWS_*` for S3); the same credentials are used by the matching data source connector (Google Cloud for BigQuery, AWS for Athena).

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_STORAGE=USER` | Which storage backend to use for storing queries and query results <br>Values<ul><li>`GCS` Google Cloud Storage, works only with BigQuery data source</li><li>`S3` AWS S3, works with BigQuery and AWS Athena</li><li>`SNOWFLAKE` Queries will be cached in Snowflake query result cache. Works only with Snowflake data source. <small class="badge badge-info">version &gt;= 0.17</small></li><li>`USER` Users can configure connections in UX <small class="badge badge-info">version &gt;=0.18</small></li><li>`PG` Query replay storage backed by Postgres (works with Postgres data source only). <small class="badge badge-info">version &gt;=0.21</small></li></ul>Default: `USER` <small class="badge badge-info">version &gt;= 0.23</small>.|
| `DEKART_CLOUD_STORAGE_BUCKET`      | Google Cloud Storage or AWS S3 bucket name used by Dekart (see the list above for what it stores). <br> *Example*: `dekart-bucket` <br><br>If value is empty, users can define the storage bucket via UI. Supported datasource `DEKART_DATASOURCE`: <ul><li>`BQ` BigQuery</li></ul>|
|`GOOGLE_APPLICATION_CREDENTIALS`| For `DEKART_STORAGE=GCS` (and BigQuery). Credentials for <a href="https://cloud.google.com/docs/authentication/getting-started">Google Cloud API</a> <br> *Example*: `/.../service-account-123456.json`|
|`AWS_REGION` | For `DEKART_STORAGE=S3` (and AWS Athena). The AWS SDK compatible environment variable that specifies the AWS Region to send the request to  |
|`AWS_ACCESS_KEY_ID`| Specifies an AWS access key associated with an IAM user or role. |
|`AWS_SECRET_ACCESS_KEY`| Specifies the secret key associated with the access key. This is essentially the "password" for the access key. |

## Metadata storage

By default Dekart stores query metadata in a built-in SQLite database and uploaded files on the local filesystem under `/dekart/data`. Persist `/dekart/data` so metadata and uploaded files survive container replacement.

### SQLite and backups

<small class="badge badge-info">version &gt;= 0.23</small>

SQLite backups can be stored in Amazon S3 or Google Cloud Storage by setting `DEKART_STORAGE=S3` or `DEKART_STORAGE=GCS` together with `DEKART_CLOUD_STORAGE_BUCKET`.

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_SQLITE_DB_PATH` <br/><small class="badge badge-info">version &gt;=0.17.2</small> | Path to the SQLite metadata database. Defaults to `/dekart/data/dekart.db`. <br> *Example*: `./dekart.db` |
| `DEKART_LOCAL_FILES_ROOT` <br/><small class="badge badge-info">version &gt;= 0.23</small> | Local directory for uploaded files when using local file storage. Default is `/dekart/data/files`. <br> *Example*: `/dekart/data/files` |
| `DEKART_BACKUP_FREQUENCY_MIN` <br/><small class="badge badge-info">version &gt;= 0.23</small> | How often, in minutes, the SQLite database is backed up to object storage. Default is `5`. <br> *Example*: `5` |
| `DEKART_MAX_BACKUPS_AGE_DAYS` <br/><small class="badge badge-info">version &gt;= 0.23</small> | How many days SQLite backups are retained in object storage before older backups are pruned. Default is `7`. <br> *Example*: `7` |

### Postgres metadata backend

[This feature requires an SSO key](/docs/self-hosting/enable-sso-open-source-instance/)

Instead of SQLite, Dekart can store query metadata in a Postgres database. Do not confuse this with using [Postgres as a data source](#postgres). Starting with version 0.23 the Postgres metadata backend requires a valid `DEKART_LICENSE_KEY`. [Get a key for free here](/docs/self-hosting/enable-sso-open-source-instance/?ref=sso-key). Dekart selects the Postgres metadata backend automatically when any of the `DEKART_POSTGRES_*` variables below are set.

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_LICENSE_KEY` | License key required to use the Postgres metadata backend and to enable SSO. [Get a key for free here](/docs/self-hosting/enable-sso-open-source-instance/?ref=sso-key). |
| `DEKART_POSTGRES_URL` | Postgres metadata connection string. If set, it takes precedence over the structured `DEKART_POSTGRES_*` variables below. <br/> *Example*: `postgres://user:pass@hostname:5432/dekart?sslmode=verify-full`|
| `DEKART_POSTGRES_DB`      | Metadata database name. <br> *Example*: `dekart`|
| `DEKART_POSTGRES_HOST`      | *Example*: `localhost`|
| `DEKART_POSTGRES_PORT`      | *Example*: `5432`|
| `DEKART_POSTGRES_USER`      | *Example*: `postgres`|
| `DEKART_POSTGRES_PASSWORD`      | *Example*: `******`|

### Data encryption

<small class="badge badge-info">version &gt;=0.18</small>

Dekart supports data encryption at rest for storing credentials. Required for configuring Snowflake and BigQuery JSON Key via UX. To enable data encryption, set the following environment variables:

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_DATA_ENCRYPTION_KEY`      | Google Secret Manager key to encrypt sensitive data. <br> *Example*: `projects/121212121212/secrets/dekart-data-encoding-key/versions/1`|

Steps to generate and set the key:

1. Generate a secure 256-bit key:
   ```bash
   openssl rand -base64 32
   ```
   This produces a base64-encoded, 32-byte key.
2. Add the key to Google Secret Manager.
3. Set the environment variable:
   ```bash
   DEKART_DATA_ENCRYPTION_KEY=projects/121212121212/secrets/dekart-data-encoding-key/versions/1
   ```

## Authentication

Dekart can delegate user authentication to an identity provider. The modes below are mutually exclusive. Each requires an SSO key.

### Google OAuth 2.0

[This feature requires an SSO key](/docs/self-hosting/enable-sso-open-source-instance/)

The most common option. Dekart can authorize users via Google OAuth 2.0 and use users' credentials to access BigQuery and Cloud Storage. When this option is enabled, Dekart does not require a service account and `GOOGLE_APPLICATION_CREDENTIALS` to be set. The user token is retrieved from Google OAuth 2.0 flow and stored only in the browser memory. When the page is refreshed, the token is retrieved again. The user's short-lived token is then passed via the Authorization header to the Dekart backend to access BigQuery and Cloud Storage.

No token is stored in the Dekart backend, database, or logs.

Each user needs to have access to BigQuery and Cloud Storage with the following permissions:

- BigQuery Data Viewer
- BigQuery Job User
- BigQuery Read Session User
- Storage Object User

This option is only supported for BigQuery and Cloud Storage. It is not supported for AWS and Snowflake data sources.

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_REQUIRE_GOOGLE_OAUTH` |  Enables Google OAuth 2.0 flow. Requires users to be authenticated. <br> *Example value*: `1`|
| `DEKART_GOOGLE_OAUTH_CLIENT_ID`|  Google OAuth 2.0 Client ID. <br> *Example value*: `1234567890-abcde.apps.googleusercontent.com`|
| `DEKART_GOOGLE_OAUTH_SECRET`|  Google OAuth 2.0 Client Secret. <br> *Example value*: `******`|

Creating Google OAuth 2.0 Client ID and Client Secret:

1. Configure [OAuth Consent Screen](https://console.cloud.google.com/apis/credentials/consent) in your Google Cloud Project
2. Create [OAuth 2.0 Client ID](https://console.cloud.google.com/apis/credentials) with `Web application` type
3. Add `https://your-dekart-url.com/api/v1/authenticate` to `Authorized redirect URIs`

### OIDC JWT header (reverse proxy)

[This feature requires an SSO key](/docs/self-hosting/enable-sso-open-source-instance/)

Dekart can validate JWT tokens forwarded by a trusted reverse proxy (for example oauth2-proxy + Keycloak) and authorize users by `email` claim.

This mode expects JWT in `X-Forwarded-Access-Token` and is intended for deployments where login/session are handled outside Dekart.

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_REQUIRE_OIDC` <br/><small class="badge badge-info">version &gt;=0.21</small> | Enables OIDC JWT header auth. Mutually exclusive with `DEKART_REQUIRE_GOOGLE_OAUTH`, `DEKART_REQUIRE_IAP`, `DEKART_REQUIRE_AMAZON_OIDC`, and `DEKART_REQUIRE_SNOWFLAKE_CONTEXT`. <br> *Example value*: `1` |
| `DEKART_OIDC_JWKS_URL` <br/><small class="badge badge-info">version &gt;=0.21</small> | JWKS endpoint used to verify JWT signatures. Required when `DEKART_REQUIRE_OIDC=1`. <br> *Example value*: `https://idp.example.com/realms/dekart/protocol/openid-connect/certs` |
| `DEKART_OIDC_ISSUER` <br/><small class="badge badge-info">version &gt;=0.21</small> | Expected `iss` claim. Recommended. <br> *Example value*: `https://idp.example.com/realms/dekart` |
| `DEKART_OIDC_AUDIENCE` <br/><small class="badge badge-info">version &gt;=0.21</small> | Expected `aud` claim. Optional. <br> *Example value*: `oauth2-proxy` |

Keycloak reverse proxy setup example: [Keycloak OIDC Reverse Proxy](/docs/self-hosting/keycloak-reverse-proxy/)

### Google IAP

[This feature requires an SSO key](/docs/self-hosting/enable-sso-open-source-instance/)

Dekart can read <a target="_blank" href="https://cloud.google.com/iap/docs/signed-headers-howto">claims provided by Google IAP</a> and authorize users to:

- list and edit only their own reports
- read-only access to other users reports

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_REQUIRE_IAP`     |  Enables validation Google IAP JWT. Required users to be authenticated. ENables user management policies. <br> *Example value*: `1`|
| `DEKART_IAP_JWT_AUD`     |  Signed Header JWT Audience (`aud`). You can get the values for the aud string mentioned above by accessing the Cloud Console, or you can use the gcloud command-line tool. [See details](https://cloud.google.com/iap/docs/signed-headers-howto#verifying_the_jwt_payload).  <br> *Example value*: `/projects/PROJECT_NUMBER/apps/PROJECT_ID`|

### Amazon Load Balancer (ALB)

[This feature requires an SSO key](/docs/self-hosting/enable-sso-open-source-instance/)

Dekart can read <a target="_blank" href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html">claims provided by Amazon Load Balancer</a> and authorize users to:

- list and edit only their reports
- read-only access to other user's reports

[Amazon Load Balancer configuration example with Terraform](/docs/self-hosting/aws-ecs-terraform/#cognito-authentication)

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_REQUIRE_AMAZON_OIDC`     |  Enables users authorization. Requires users to be authenticated and `x-amzn-oidc-data` to be passed from Load Balancer. Requires `AWS_REGION`. <br> *Example value*: `1`|

### Device auth tokens (CLI)

Dekart can issue workspace-scoped device tokens for CLI and automation use.

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_DEVICE_AUTH_PRIVATE_KEY` <br/><small class="badge badge-info">version &gt;= 0.23</small> | Base64-encoded PEM RSA private key used to sign device auth JWTs. |
| `DEKART_DEVICE_AUTH_PUBLIC_KEY` <br/><small class="badge badge-info">version &gt;= 0.23</small> | Base64-encoded PEM RSA public key used to validate device auth JWTs. |
| `DEKART_DEVICE_AUTH_TOKEN_TTL_HOURS` <br/><small class="badge badge-info">version &gt;= 0.23</small> | Device token expiration time in hours. <br> *Example value*: `720` |

## Data source connectors

Settings for the warehouse selected with `DEKART_DATASOURCE`. Cloud credentials live under [Main configuration](#main-configuration).

### BigQuery

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_BIGQUERY_PROJECT_ID`      | Unique identifier for your Google Cloud project with BigQuery API Enabled. <br> *Example*: `my-project` <br> If value is empty, users will be able to define project ID via UI.|
| `DEKART_BIGQUERY_MAX_BYTES_BILLED`    | Sets `maximumBytesBilled` in BigQuery Job Configuration to implement  <a href="https://cloud.google.com/bigquery/docs/best-practices-costs#limit_query_costs_by_restricting_the_number_of_bytes_billed">Best Practices for Controlling Query Cost</a>.<br> If not set warning message will appear in logs.|
| `DEKART_GCP_EXTRA_OAUTH_SCOPES` <br/>OAuth token support from <small class="badge badge-info">version &gt;= 0.18</small>    | Set additional scopes for the GCP OAuth token when connecting to BigQuery.<br> The value is interpreted as a comma-delimited list.<br> E.g., in order to query a BigQuery table backed by a Google Sheet in Google Drive, the value needs to be set to `https://www.googleapis.com/auth/drive`. |

### Snowflake

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_SNOWFLAKE_ACCOUNT_ID`     | <a target="_blank" href="https://docs.snowflake.com/en/user-guide/admin-account-identifier#using-an-account-name-as-an-identifier">Snowflake Account Identifier</a>  <br> *Example*: `orgname-account_name`|
| `DEKART_SNOWFLAKE_USER`     | Snowflake user with default warehouse configured  <br> *Example*: `example_user`|
| `DEKART_SNOWFLAKE_PASSWORD`     | Snowflake user password  <br> *Example*: `******`|
| `DEKART_SNOWFLAKE_PRIVATE_KEY` <br/><small class="badge badge-info">version &gt;= 0.18.4</small>     | The private key required for authenticating with Snowflake using the JWT (JSON Web Token) authentication method. This key must be in PKCS#8 format and base64-encoded.  <br> *Example*: `MIIEv...`|
| `DEKART_SNOWFLAKE_STAGE` <br/><small class="badge badge-info">version &gt;=0.17.2</small> <br/><small class="badge badge-info">version &gt;= 0.18.1</small>    | Persist Dekart application state on Snowflake stage. Work with `DEKART_SQLITE_DB_PATH`  <br> *Example*: `app_public.app_state_stage`|
| `DEKART_REQUIRE_SNOWFLAKE_CONTEXT=` <br/><small class="badge badge-info">version &gt;=0.17.2</small> <br/><small class="badge badge-info">version &gt;= 0.18.1</small>     | Authorize user using `Sf-Context-Current-User` header. Used in Snowpark environment. <br> *Example*: `1`|

#### Key-pair authentication

Configure `DEKART_SNOWFLAKE_PRIVATE_KEY` to authenticate with Snowflake using the JWT method.

1. **Generate a key pair.** Create a private key in PKCS#8 format and extract the public key:
   ```bash
   openssl genrsa 2048 | openssl pkcs8 -topk8 -inform PEM -out rsa_key.p8 -nocrypt
   openssl rsa -in rsa_key.p8 -pubout -out rsa_key.pub
   ```
2. **Assign the public key to a Snowflake user:**
   ```sql
   ALTER USER example_user SET RSA_PUBLIC_KEY='MIIBIj...';
   ```
3. **Set the environment variable.** Base64-encode the private key without the `-----BEGIN PRIVATE KEY-----` / `-----END PRIVATE KEY-----` markers and without newlines:
   ```bash
   cat rsa_key.p8 | sed '/-----BEGIN PRIVATE KEY-----/d' | sed '/-----END PRIVATE KEY-----/d' | tr -d '\n'
   ```

### Postgres

Postgres can be used as a data source for Dekart. Do not confuse with the [Postgres metadata backend](#postgres-metadata-backend), which is used to store query meta information.

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_POSTGRES_DATASOURCE_CONNECTION`     | Postgres DB to be used as data source  <br> *Example*: `postgres://user:password@host:port/db`|

### ClickHouse

<small class="badge badge-info">version &gt;= 0.18</small>

ClickHouse can be used as a data source for Dekart.

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_CLICKHOUSE_DATA_CONNECTION`  <br/><small class="badge badge-info">version &gt;= 0.18</small>     | ClickHouse connection string in DSN format. <br> *Example*: `clickhouse://user:password@host:port/database`|
| `DEKART_CLICKHOUSE_S3_OUTPUT_LOCATION` <br/><small class="badge badge-info">version &gt;= 0.18</small> | S3 bucket path where query results are stored. <br> *Example*: `bucket-name/optional-prefix`|

### AWS Athena

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_ATHENA_CATALOG` | Data source (group of databases) for AWS Athena to reference when executing queries. Default value is usually `AwsDataCatalog`. <br> *Example*: `my-athena-catalog`|
| `DEKART_ATHENA_S3_OUTPUT_LOCATION`     | Amazon S3 query result location required by Athena SDK. This is different from  `DEKART_CLOUD_STORAGE_BUCKET`. First query results are stored in `DEKART_ATHENA_S3_OUTPUT_LOCATION` and then copied to `DEKART_CLOUD_STORAGE_BUCKET`.  <br> *Example*: `athena-results`|
| `DEKART_ATHENA_WORKGROUP` | AWS Athena workgroup to use when executing Athena queries. If not specified, the default `primary` workgroup will be used. <br> *Example*: `my-athena-workgroup`|

## Workspaces and users

Dekart supports multiple workspaces. Each workspace can have its own set of reports, queries, and users. By default, all users are added to the `Default` workspace. To configure workspace management, set the following environment variables:

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_ALLOW_WORKSPACE_CREATION` <br/><small class="badge badge-info">version &gt;=0.18</small>     |  When set to `1`, users can create new workspaces. Set to empty, new users will be automatically added to the `Default` workspace. <br> *Example value*: `1`|
| `DEKART_DEFAULT_WORKSPACE_ADMIN` <br/><small class="badge badge-info">version &gt;=0.18</small>   |  Email that designates a default admin for the `Default` workspace. When not provided, all new users will be Admin. When provided, all users will be viewers, unless specified differently with `DEKART_DEFAULT_WORKSPACE_ROLE`. <br> *Example value*: `admin@email.com`
| `DEKART_DEFAULT_WORKSPACE_ROLE` <br/><small class="badge badge-info">version &gt;=0.18</small>    |  Role assigned by default to new users (e.g., `viewer`, `editor`, `admin`). Requires `DEKART_DEFAULT_WORKSPACE_ADMIN` to be specified. <br> *Example value*: `viewer`|

## User experience

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_UX_HOMEPAGE` |  Change URL linked from Dekart logo<br> *Default value*: `/`|
| `DEKART_UX_DATA_DOCUMENTATION` |  Allows provide URL to dataset documentation. It will appear in Dekart UI.<br> *Example value*: `https://my.company/dataset/schema.html`|
| `DEKART_HTML_CUSTOM_CODE`      |  Allows to add custom HTML code to `<head>`. Can be used for adding trackers. |
| `DEKART_DISABLE_USAGE_STATS` | By default, Dekart appends certain information to the referrer of external links. This information includes the version number, the SHA256 hash of the hostname, the name of the data source, and the total number of reports, queries, files, and authors. No other information is collected. The source code for this implementation can be found [here](https://github.com/dekart-xyz/dekart/blob/main/src/client/lib/ref.js#L25). This behavior can be turned off by setting this variable to `1`.|
| `DEKART_UX_ACCESS_ERROR_INFO_HTML` | Allows to provide custom HTML code to be shown on the access error page. |
| `DEKART_UX_NOT_FOUND_ERROR_INFO_HTML` | Allows to provide custom HTML code to be shown on the not found error page. |
| `DEKART_UX_SAMPLE_QUERY_SQL` | Allows to provide a sample SQL query to be shown in the query editor. |

## Optional features

### Mapbox base map

Dekart renders maps on a free MapLibre/Carto base map style by default, so no token is required to create a map. Set a Mapbox token to enable Mapbox base map styles and static map thumbnail previews.

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_MAPBOX_TOKEN`      | Optional. <a href="https://docs.mapbox.com/help/how-mapbox-works/access-tokens/">Mapbox Token</a> that enables Mapbox base map styles and static map thumbnail previews. Not required for the default MapLibre/Carto base map.|

### File upload

Dekart supports file upload. Since version 0.23 file upload is enabled by default (`DEKART_ALLOW_FILE_UPLOAD=1`). Uploaded files are stored alongside query results: on the local filesystem with the default SQLite setup, or in AWS S3 or Google Cloud Storage when object storage is configured. The recommended max file size is 100MB.

File upload is not supported with `DEKART_STORAGE=PG`; when `DEKART_STORAGE=PG` Dekart disables file upload automatically and logs a warning at startup <small class="badge badge-info">version &gt;= 0.23</small>.

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_ALLOW_FILE_UPLOAD` | Enable file upload. Enabled by default since <small class="badge badge-info">version &gt;= 0.23</small>. Auto-disabled when `DEKART_STORAGE=PG`. <br> *Example value*: `1`|
| `DEKART_MAX_FILE_UPLOAD_SIZE` <br/><small class="badge badge-info">version &gt;= 0.22</small> | Maximum upload size in bytes. If not set, default is `1073741824` (1 GiB). Invalid value will fail Dekart startup. <br> *Example value*: `104857600` (100 MB) |

### Report snapshots (Browserless)

Snapshot rendering uses Browserless. If `DEKART_BROWSERLESS_TOKEN` is empty, snapshot feature is disabled.

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_BROWSERLESS_URL` <br/><small class="badge badge-info">version &gt;= 0.23</small> | Browserless screenshot endpoint used by backend snapshot renderer. <br> *Example value*: `http://browserless:3000/screenshot` |
| `DEKART_BROWSERLESS_TOKEN` <br/><small class="badge badge-info">version &gt;= 0.23</small> | Browserless auth token used by snapshot renderer. Required to enable snapshot feature. |
| `DEKART_BROWSERLESS_TIMEOUT_MS` <br/><small class="badge badge-info">version &gt;= 0.23</small> | Browserless timeout in milliseconds (container/runtime level). <br> *Example value*: `240000` |
| `DEKART_SNAPSHOT_TIMEOUT_SECONDS` <br/><small class="badge badge-info">version &gt;= 0.23</small> | Per-snapshot render timeout in seconds enforced by Dekart backend. <br> *Example value*: `60` |
| `DEKART_SNAPSHOT_TOKEN_TTL_MINUTES` <br/><small class="badge badge-info">version &gt;= 0.23</small> | One-time snapshot URL token TTL in minutes. <br> *Example value*: `3` |

### Email notifications

Dekart can send workspace invite and report access emails via [Resend](https://resend.com/).  
If required variables are not set, notifications are disabled.

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_RESEND_API_KEY` <br/><small class="badge badge-info">version &gt;= 0.22</small> | Resend API key used to send notification emails. <br> *Example value*: `re_xxxxxxxxxxxxx` |
| `DEKART_RESEND_FROM_EMAIL` <br/><small class="badge badge-info">version &gt;= 0.22</small> | Sender address used in outgoing notification emails. <br> *Example value*: `Dekart &lt;no-reply@yourdomain.com&gt;` |

Note: Email notifications also require `DEKART_APP_URL` to build invite/report links included in emails.

## Advanced configuration

Rarely changed. Adjust only when you have a specific reason, such as a reverse proxy or gateway with strict timeouts.

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_CORS_ORIGIN=` | CORS Origin to be allowed by Dekart backend and set in `Access-Control-Allow-Origin` header. If not set or set incorrectly, warning will appear in logs. <br> *Example*: `https://dekart.example.com` |
| `DEKART_STREAM_TIMEOUT` <br/><small class="badge badge-info">version &gt;= 0.18</small> | Timeout in seconds for streaming backend updates. Default value is 50 seconds. Useful when your Gateway has a shorter timeout and you see Gateway Timeout errors. <br> *Example*: `50`|
| `DEKART_HTTP_WRITE_TIMEOUT_SECONDS` <br/><small class="badge badge-info">version &gt;= 0.23</small> | HTTP server write timeout in seconds. Useful for long-running snapshot responses so backend can return a proper error payload instead of socket timeout. <br> *Example*: `65`|

## Development specific

Do not change for production

| Name        | Description           |
| ------------- | ------------- |
| `DEKART_PORT`      |  Port the Dekart server binds to inside the container. Defaults to `8080`; map it to a host port with `docker run -p`. <br> *Example*: `8080`|
| `DEKART_LOG_DEBUG`      |  Set Dekart log level to debug <br> *Example value*: `1`|
| `DEKART_LOG_PRETTY`      |  Print pretty colorful logs in console. By default Dekart formats logs as JSON <br> *Example value*: `1`|
| `DEKART_STATIC_FILES`      |  *Example value*: `./build`|
| `DEKART_DEV_QUERY_CACHE_DEADLINE` <br/><small class="badge badge-info">version &gt;= 0.18</small> | Set the cache deadline for queries in development mode. This is useful when debug BigQuery or Snowflake cache expiration <br> *Example*: `1m`|
