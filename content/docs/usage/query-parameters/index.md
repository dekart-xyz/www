---
title: "Query Parameters"
description: "Turn your maps in applications with Dekart Query Parameters."
date: 2021-02-22T07:48:05+01:00
lastmod: 2021-02-22T07:48:05+01:00
draft: false
menu:
  docs:
    parent: "usage"
images: ["dekart-query-parameters.png", "setting-default-query-parameter-value.png", "share-with-query-params.png"]
---

<p><iframe width="560" height="315" src="https://www.youtube.com/embed/aItBYkfr530" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

👉 [Example Map with Query Parameters](https://cloud.dekart.xyz/reports/322dbd27-0699-4c41-8a08-a3e023edf981/source?qp_country=DE&qp_region=BE&ref=query-param-example)

Query parameters in Dekart provide a powerful way to make your maps interactive and dynamic. With query parameters, you can create SQL queries that dynamically adjust based on user input. Below is a detailed guide to understanding and using query parameters in Dekart.

---

## Syntax for Query Parameters
Query parameters are wrapped in double curly braces (`{{parameter_name}}`) and can be used in your SQL queries. For example:
```sql
SELECT geometry
FROM `bigquery-public-data.overture_maps.division_area`
WHERE region = {{region}}
  AND subtype = 'region'
```

In this query:
- `{{region}}` is a query parameter that the user can set dynamically.
- SQL logic adjusts based on the value provided for the parameter.

## Setting Default Values
You can define default values for query parameters. This is useful when a user doesn't provide input for a parameter.

{{< img src="setting-default-query-parameter-value.png"  >}}


## Making Parameters Optional
To make a parameter optional:
1. Use SQL logic to handle cases where the parameter is not provided.
2. Combine conditions in your query to handle "all data" when a parameter is empty.

For instance:
Example:
```sql
SELECT geometry
FROM `bigquery-public-data.overture_maps.division_area`
WHERE (
        ({{region}} = 'ALL' AND country = 'FR')
        OR region = 'FR-' || {{region}}
      )
  AND subtype = 'region'
```
- The default value `'ALL'` ensures that if no value is entered, all regions are shown.

## Sharing Reports with Query Parameters

{{< img src="share-with-query-params.png"  >}}

When you share a report with query parameters, the parameters are included in the URL. This allows you to share a report with specific parameters set.

User with Editor and Admin roles, who have access to update the report, can change the query parameters and see the updated results.

Viewers can view only cached results with the parameters set by the report owner.