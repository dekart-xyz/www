---
title: "Google Cloud Grant Scopes"
description: "What permissions am I granting to Dekart, and why are they necessary?"
date: 2021-02-22T07:48:05+01:00
lastmod: 2021-02-22T07:48:05+01:00
draft: false
menu:
  docs:
    parent: "usage"
images: []
---

<p class="lead text-left jumbotron p-5">Dekart has been verified by Google’s Trust & Safety Team to be Compliant with <a href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes">Google API Services User Data Policy</a> – a process <a href="https://developers.google.com/identity/protocols/oauth2/production-readiness/brand-verification">required</a> to approve our Google Authentication consent screen.</p>

## What permissions is Dekart requesting, and why are they necessary?

Dekart implements BigQuery passthrough authentication (OAuth 2.0 Token Pass-Through) and requests the following permissions:
 * `https://www.googleapis.com/auth/bigquery` this scope grants Dekart the ability to create BigQuery jobs and read query results.
 * `https://www.googleapis.com/auth/devstorage.read_write` this scope allows Dekart to store query result cache on your Google Cloud Storage bucket.

Received short-lived tokens are stored in your browser's local storage. Dekart never stores tokens or query results in its backend. You can revoke token anytime by signing out of Dekart Cloud.

You can analyze our codebase on [GitHub](https://github.com/dekart-xyz/dekart) or [Self-host](/self-hosted/) Dekart Cloud on your infrastructure.

## Why Dekart is using .xyz domain?

We chose `.xyz` domain as a reference to Cartesian (Descartes) coordinate system, where `x`, `y`, and `z` axes represent three dimensions. This domain is also used by organizations like Alphabet (Google’s parent company, hosted on abc.xyz) and others.

Dekart XYZ is registered in Germany (see Dekart in [Germany Companies Registry](https://www.unternehmensregister.de/ureg/index.html;jsessionid=DA70A83D7BC84B9E249AC040755AD5D9.web04-1)), see [Impressum](https://dekart.xyz/legal/notice/) for more details.

Dekart Cloud is hosted on Google Cloud Platform (GCP) in Frankfurt, Germany (europe-west3 region).

## Does Dekart store my data or access sensitive company information?

Dekart never stores tokens or query results in its backend. Query results are stored in your Google Cloud Storage bucket or in BigQuery temp result cache. Dekart Cloud backend stores BigQuery job IDs and query metadata, including query text, and map titles.

## Can anyone at Dekart access my BigQuery datasets or Google Cloud Storage?

No, nobody at Dekart can access your BigQuery datasets or Google Cloud Storage bucket. Short-lived tokens received from Google are stored in your browser's local storage and never stored on Dekart backend. Your BigQuery data is not stored or cached on Dekart backend.

## Does using Dekart add extra costs to my cloud services?

You are billed directly by Google Cloud for BigQuery queries you made via Dekart and storage costs for storing query results in your Google Cloud Storage bucket. You have full control over SQL queries and Dekart does not initiate any background jobs. There is no additional cost for using Dekart.

## Will Dekart impact the performance of my BigQuery queries?

Dekart does not modify or wrap your SQL queries and sends them as it is.

## What support is available if I encounter issues with Dekart?

If you have any questions or issues about Dekart Cloud, you can:

  * Schedule a call with us via [Calendly](https://calendly.com/vladi-dekart/30min)
  * Contact us in [Slack](https://slack.dekart.xyz/)
  * Email us at [support@dekart.xyz](mailto:support@dekart.xyz)

<!-- If you have any questions or issues about Dekart Cloud, please contact us via email at [support@dekart.xyz](mailto:support@dekart.xyz) or via [Slack](https://slack.dekart.xyz/). -->

## Read more

👉 [Dekart Cloud Privacy Policy](/legal/privacy/)
