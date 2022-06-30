---
title: "Use with Your Data"
description: "Using Dekart with your team/company internal/private datasets"
date: 2021-02-21T09:17:56+01:00
lastmod: 2021-02-21T09:17:56+01:00
draft: false
toc: false
images: []
menu:
  docs:
    parent: "about"

---

With Dekart you can query and visualize private datasets using BigQuery and AWS Athena. For this you can self-host Dekart instance (open-source, MIT License [GitHub](https://github.com/dekart-xyz/dekart)) on your Google Cloud or AWS account:
* [Running Dekart on Google App Engine](/docs/self-hosting/app-engine)
* Running Dekart on AWS (documentation coming soon)
* [Running Dekart with Docker](/docs/self-hosting/docker)

To secure your Dekart instance, you can:

* Configure <a href="https://cloud.google.com/iap/docs/app-engine-quickstart">Google IAP</a> for your deployment
* Optionally, [configure Dekart to Authorize users](/docs/configuration/environment-variables/#user-management-with-google-iap) with Google IAP

