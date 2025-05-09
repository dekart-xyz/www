---
title: "Reusable Map Templates"
description: "Collection of reusable Dekart Maps for your analytics projects"
lead: ""
date: 2025-01-26T07:26:19+02:00
lastmod: 2025-01-26T07:26:19+02:00
draft: false
images: ["62130325-9fc7-4687-ac05-52f6b7513502.png"]
menu:
  docs:
    parent: "examples"
    name: "Map Templates"
weight: 999
toc: true
---

## What is a Map Template?

A Map Template is a reusable Dekart Map that you can use as a starting point for your analytics projects. Each Map Template is designed to help you quickly visualize your data and answer common business questions. Map Templates utilize Dekart's query parameters to make it easy to customize the map to your specific needs.

## Templates

### OSM vs Overture Maps – Compare Bike Lane Coverage

{{< img src="62130325-9fc7-4687-ac05-52f6b7513502.png" template="62130325-9fc7-4687-ac05-52f6b7513502" >}}

This template lets you visualize and compare bike lane coverage in any city by pulling data from both OpenStreetMap (OSM) and Overture Maps. Simply choose a city (and country code) to see which streets have dedicated cycle paths—and whether certain lane tags (like cycleway:left) appear in one dataset but not the other. It’s ideal for data analysts, urban planners, or anyone curious about how well bike lanes are mapped in their area.

Requires: <small class="badge badge-info">BigQuery Account</small>


### City Boundaries by Name – Resolve Duplicate Cities

{{< img src="a75befda-e8d9-4771-b644-a2f2e6d44848.png" template="a75befda-e8d9-4771-b644-a2f2e6d44848" >}}

This template queries city boundaries from the Overture Maps dataset in BigQuery—even if multiple cities share the same name. It fetches all matching boundaries, counts the Points of Interest (POIs) in each, and returns the boundary with the highest POI count as the “most relevant” city. Perfect for data analysts and data scientists who need accurate location context without diving into specialized GIS tools.

Requires: <small class="badge badge-info">BigQuery Account</small>
