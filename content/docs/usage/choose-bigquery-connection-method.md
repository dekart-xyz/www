---
title: "BigQuery Connection Guide"
description: "Choose BigQuery Connection Method"
date: 2025-01-01T07:48:05+01:00
lastmod: 2025-01-01T07:48:05+01:00
draft: false
menu:
  docs:
    parent: "usage"
images: []
---

Dekart offers two ways to connect to BigQuery:

1. **Google Account (OAuth Pass-Through)**
2. **Service Account Key (JSON)**

This page explains the permissions you need when using a Google account and how to obtain and secure a Service Account Key if that’s your preferred method.


## Which Permissions Are Required?

If you choose to connect with your **Google account**:

### BigQuery Permissions

You must have at following roles in the BigQuery project you want to query:
 -  `BigQuery Data Viewer`
 -   `BigQuery Data Viewer`
 -    `BigQuery Job User`
 -    `BigQuery Read Session User`
 -    `Storage Object User`

### GCP Project Access

  - Your Google account must be associated with the Google Cloud project that contains the datasets you want to query.
  - If you’re uncertain, check with your GCP admin or log in to the [Google Cloud Console](https://console.cloud.google.com/) to see if you have the necessary roles assigned.

### Why these permissions?

Dekart passes your short-lived OAuth token, stored in your browser, to BigQuery. This way you can implement user-level and dataset-level access controls and audit logs in BigQuery. Dekart never stores tokens or query results in its backend.



## How to Get a Service Account Key

For **Service Account JSON** connections, you’ll need a service account in your Google Cloud project:

1. **Create or Select a Service Account**
   - Go to the [Google Cloud Console → IAM & Admin → Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts).
   - If you already have a service account that has sufficient BigQuery roles (e.g., “BigQuery JobUser”), you can reuse it. Otherwise, create a new one.

2. **Assign BigQuery Roles**
   - Under “Permissions,” give the service account the roles it needs
     - `BigQuery Data Viewer`
     - `BigQuery Job User`
     - `BigQuery Read Session User`
     - `Storage Object User` (optionally for cache storage)


3. **Generate a Key File (JSON)**
   - From the Service Accounts list, click the account you want to use.
   - Select “Keys” → “Add Key” → “Create new key.”
   - Pick **JSON** as the key type, then click “Create.”
   - A JSON file will be downloaded to your computer—this is the file Dekart needs to connect.


## How Is the Key Secured?

When you upload your JSON key to Dekart:

- **Encryption at Rest**
  - Your key is encrypted using AES (Advanced Encryption Standard) in GCM (Galois/Counter Mode) and stored in the Dekart backend. Encryption keys are stored in Google Cloud KMS (Key Management Service).
  - You can review our implementation on [GitHub](https://github.com/dekart-xyz/dekart/blob/main/src/server/secrets/secrets.go)

- **Encryption in Transit**
  - Dekart uses HTTPS to encrypt data in transit between your browser and the Dekart backend.
  - Dekart additionally encrypts secrets in transit using temporary encryption keys.
  - You can review our implementation on [GitHub](https://github.com/dekart-xyz/dekart/blob/b093ff5e5f0a24ae4e13604253dfcc56f2465a0f/src/client/actions/connection.js#L211)
- **No Unnecessary Sharing**
  - Dekart never exposes your key in Dekart User Interface. Key can be updated or deleted by workspace admin only. It cannot be read or downloaded by anyone.

- **Revoking Access**
  - If you ever lose control of the key or need to discontinue its use, you can delete it from the GCP Console under “Service Accounts” → “Keys.” Once revoked, any existing connections relying on that key will cease to function, ensuring you maintain full control over who can query BigQuery.


## Still Have Questions?

We are happy to guide you through the process:

- Schedule a call with engineers via [Calendly](https://calendly.com/vladi-dekart/30min)
- Contact us in [Slack](https://slack.dekart.xyz/)
- Email us at [support@dekart.xyz](mailto:support@dekart.xyz)