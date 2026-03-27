---
title: "CARTO Review: What 14 Data Teams Actually Think"
description: "I reached out to 89 CARTO users on LinkedIn and got honest feedback from 14. What works, where teams struggle, and why some look for a CARTO alternative."
lead: "8 negative, 3 mixed, 3 positive. I reached out to 89 CARTO users on LinkedIn and got honest feedback from 14 of them."
date: 2026-03-27T00:00:00Z
lastmod: 2026-03-27T00:00:00Z
draft: false
weight: 1
contributors: ["Vladi"]
images: ["carto-feedback-15-users.png"]
---

{{< img src="carto-feedback-15-users.png" caption="CARTO feedback from 14 real users" class="wide" >}}

This is an independent CARTO review based on real conversations, not a marketing page.

I build [Dekart](https://dekart.xyz/carto/), an open-source product that competes with CARTO. That means I have both an incentive to ask and an incentive to be honest. I wanted real data, not confirmation bias.

## Methodology

Over a few weeks I connected to everyone who engaged in CARTO-related posts on LinkedIn and asked whether they use or evaluated it. If yes, I asked three questions:

- What was your use case?
- What worked well?
- What didn't work?

I reached out to 89 people. 14 shared a real opinion. The rest gave shallow responses: "yes I used it," "no," or no reply at all.

Bias caveat: people with complaints are more likely to respond to someone building a competing product. Take the 9/3/3 split below with a grain of salt. The signal is in the detail.

---

## Summary

**The split: 8 negative, 3 mixed, 3 positive.**

**Top CONs (by frequency):**
- 💰 Pricing (4 mentions)
- 🔄 Data prep overhead / not warehouse-native (3 mentions)
- 🔓 Not open source / vendor lock-in (3 mentions)
- 😤 Bad UX (2 mentions)

**Top PROs:**
- ☁️ Cloud-native architecture: connect your warehouse, no pipeline (3 mentions)
- 🗺️ Easy to use, good visual output, no-code (3 mentions)
- 🔐 Enterprise permissions and role-based access (2 mentions)

**Overall:** People generally like the CARTO product, except for the requirement to reshape data before it can be visualized. They struggle more with the business model: procurement, pricing, and governance.

If your team runs on BigQuery or Snowflake and wants to skip the data prep, [Dekart queries your warehouse directly](https://dekart.xyz/carto/).

---

## CONs: Pain Points

| Role | Quote | Issue |
|------|-------|-------|
| Data analytics lead at a Databricks team | "We ditched CARTO… the integration seemed to require significant additional processing to get our data ready to visualize, the widgets weren't quite what we needed, and the data science toolbox was nearly empty." | Data prep overhead, weak widgets, no data science |
| Geospatial department manager | "Working with them wasn't very pleasant or constructive; after a year we had to renegotiate due to many poor design issues. I favor interoperability, cooperation, and open source, which are things they can't offer." | Bad relationship, poor design, not open |
| Data analyst | "I personally don't like the UI/UX and it was a bit heavy to learn the platform requirements." | Bad UX, steep learning curve |
| GIS analyst working on EU-funded projects | "The main pain point was the license fee." | Price |
| Data engineer | "Carto charges too much, stopped liking them before I even started." | Price |
| GIS consultant | "The fact it's really expensive; the client reviewed his choice for another solution on-premise." | Price, lost deal |
| Geospatial analyst | "Most of the features CARTO offers will render useless or too difficult to work with." | Features don't fit use case |
| Senior data engineer at an open-source-first team | "We never use Carto. We only use open tools that we can configure and inspect." | Not open, can't inspect |
| Enterprise data lead | "Lock-in is less of a concern than cost, and cost of switching." | Cost + switching cost |
| Data platform lead at a digital agency | "Not anymore. Dropped it 2 years ago." | Dropped it (now uses AI-assisted coding) |
| Urban data analyst in an Esri environment | "Does not fit to our organization's requirements and vision." | Doesn't fit org |

---

## PROs: Strengths

| Role | Quote | Strength |
|------|-------|----------|
| Engineer at a location intelligence company | "Carto is cloud native… just connect your data, no pipeline. Robust toolbelt for custom React apps. Widgets are very responsive. I could click a bar chart and configure it so quickly." | Cloud-native, React SDK, responsive widgets |
| BI engineer in financial services | "Carto because of the resources for integrated dashboards and the authentication system with complex permission levels." | Dashboards, enterprise permissions |
| GIS consultant | "Really easy to use, good visual maps, user-friendly no-code interface with Snowflake behind." | Easy, no-code, visual |
| Enterprise data lead | "Pretty much essential. Appreciate the enterprise readiness features and easy GCP deployment." | Enterprise features, GCP |
| Data analyst at an automotive OEM | "Happy most of the time. No pain point so far." | Works well for their use case |

---

## Who should use CARTO

Based on these responses, CARTO is a strong fit for teams that:

- want a polished no-code mapping interface
- care about enterprise roles, permissions, and dashboarding
- are comfortable with the pricing model

A SQL-native alternative makes more sense for teams that:

- already live in BigQuery, Snowflake, or Redshift
- want to write SQL directly instead of learning a builder workflow
- want more control over deployment and data ownership
- want to avoid vendor lock-in and extra data movement

[Try Dekart with your own warehouse data](https://dekart.xyz/docs/about/playground/) or [see how Dekart compares to CARTO](https://dekart.xyz/carto/).
