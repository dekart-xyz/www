---
title: "Dekart Cloud"
description: "Secure, worry-free Dekart instance at the cost of self-hosting on AWS or Google Cloud."
draft: false
images: ["cloud-large.png", "cloud-prices-2.png"]
type: "html-content"
---

<article class="pb-5">
  <div class="pb-3 text-center">
    <h1 class="cloud-title">Introducing Dekart Cloud.</h1>
    <p class="lead">
      Secure, worry-free Dekart instance at the cost of hosting it yourself on AWS or Google Cloud.
    </p>
  </div>
  <a class="cloud-prices plausible-event-name--cloud plausible-event-name--cloud-page-image" href="http://cloud.dekart.xyz">
    <div style="background-image: url(./cloud-prices-2.png);">
    </div>
  </a>
  <div class="text-center pt-5">
    <a class="btn btn-primary btn-lg plausible-event-name--cloud plausible-event-name--cloud-page-button" href="http://cloud.dekart.xyz" role="button">Create workspace</a>
  </div>
  <div>
    <div class="text-center d-flex flex-column align-items-center">
      <h2>Your Data Stays Yours.</h2>
      <p class="lead">To make your legal and cybersecurity teams happy,<br/><mark>we do not store or cache your credentials and query results in our backend.</mark></p>
    </div>
    <div class="d-flex flex-column align-items-center">
      <div class="col-xl-10">
        <h5>Passthrough Authentication</h3>
        <p>We don't need your service account key. Short-lived Google OAuth token is passed from your
          browser to Google APIs. Token renews every time you reload the page. You have full control over your data access. Dekart implementation is
          transparent and <a target="_blank" href="https://github.com/dekart-xyz/dekart">open-source</a>.</p>
      </div>
      <div class="col-xl-10">
        <h5>No User Data Storage</h3>
        <p>Query results are stored on Google Cloud Storage bucket provided by you. You control region and retention. Your users data is never stored on our premise.</p>
      </div>
      <div class="col-xl-10">
        <h5>Compliance Friendly</h5>
        <p>We comply with <a href="https://cloud.google.com/terms/services">Google API Services User Data
            Policy</a> and verified by Google's Trust & Safety team. Nobody at Dekart can access your BigQuery datasets. Data from your BigQuery datasets is never stored outside of your premise to minimize the impact on your compliance posture.</p>
      </div>
    </div>
  </div>
  <div class="text-center">
    <h2>Not sure yet?</h2>
    <p class="lead">Join <a target="_blank" href="https://slack.dekart.xyz/">Slack Community</a> and hear from existing users and Dekart open-source maintainers.</p>
  </div>
</article>