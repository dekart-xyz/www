---
title: "Security Considerations"
description: "Why Dekart Cloud is Secure"
date: 2021-02-22T07:48:05+01:00
lastmod: 2021-02-22T07:48:05+01:00
draft: false
menu:
  docs:
    parent: "usage"
images: []
canonical: "/docs/usage/cloud-security-faq/"
---

<p class="lead text-left"><a href="/">Dekart Cloud</a> is designed to make your cybersecurity and legal teams happy. We achieve it by never storing tokens, and query results in Dekart Cloud backend.</p>

<!-- * **Passthrough Authentication**: Short-lived Google OAuth token is passed from your browser to Google APIs and never stored on Dekart Cloud backend.

* **No User Data Storage**: Query results are stored on Google Cloud Storage bucket provided by you.

* **Compliance Friendly**: We comply with [Google API Services User Data Policy](https://cloud.google.com/terms/services) and verified by Google's Trust & Safety team. -->

### What permissions am I granting to Dekart, and why are they necessary?

You are granting Dekart the following scopes:
 * `https://www.googleapis.com/auth/bigquery` this scope grants Dekart the ability to manage user data in Google BigQuery, encompassing actions like running queries, managing datasets, and configuring settings.
 * `https://www.googleapis.com/auth/devstorage.read_write` this scope allows Dekart to read and write user data in Google Cloud Storage, enabling it to manage files and potentially other data storage elements.

These permissions are necessary for Dekart to run queries and store results in your Google Cloud Storage bucket.

### How will my data be used and protected?

SQL queries and their results are stored in Google Cloud Storage bucket *provided by you!* We never store tokens or query results in the Dekart Cloud backend. Nobody at Dekart can access your BigQuery data or Google Cloud Storage bucket.

### Can I revoke Dekart's access if I change my mind?

Yes, you can revoke Dekart's access to your Google Cloud resources by signing out of Dekart Cloud. This will remove Dekart's access to your Google Cloud resources and prevent Dekart from running queries or storing results in your Google Cloud Storage bucket.

### Does Dekart comply with data protection regulations?

We are committed to upholding the principles of GDPR and ensuring that your data rights are respected. We also comply with [Google API Services User Data Policy](https://cloud.google.com/terms/services) and verified by Google's Trust & Safety team.

### What support is available if I have issues or questions about data access?

If you have any questions or issues about data access, please contact us via email at [support@dekart.xyz](mailto:support@dekart.xyz) or via [Slack](https://slack.dekart.xyz/).
