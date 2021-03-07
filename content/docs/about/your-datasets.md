---
title: "Use with your Data"
description: "Using Dekart with your company internal/private datasets"
date: 2021-02-21T09:17:56+01:00
lastmod: 2021-02-21T09:17:56+01:00
draft: false
toc: false
images: []
menu:
  docs:
    parent: "about"

---

You can use Dekart with any dataset created in BigQuery you have access to.

For this you need:
 * [Deploy](/docs/self-hosting/app-engine/) Dekart (open-source, MIT) to your Google Account
 * Make sure service account used has the right [role to access BigQuery datasets](https://cloud.google.com/iam/docs/understanding-roles#bigquery-roles)
 * [Secure](https://cloud.google.com/iap/docs/app-engine-quickstart) your Dekart deployment with Google IAP and [configure](/docs/configuration/environment-variables/#user-management-with-google-iap)  user management

<a class="btn btn-primary" target="_blank" href="/docs/self-hosting/app-engine/" role="button">Deploy Dekart to Google App Engine</a>

