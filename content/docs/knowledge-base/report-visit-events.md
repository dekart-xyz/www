---
title: "Report Visit Events"
description: "Query report visit events in Dekart v0.23.1 and later."
lead: "Dekart v0.23.1 adds report visit events for self-hosted analytics."
date: 2026-06-04T05:00:00Z
lastmod: 2026-06-04T05:00:00Z
draft: false
weight: 20
toc: true
images: []
contributors: ["Vladi"]
menu:
  docs:
    parent: "knowledge-base"
---

## What changed

Dekart v0.23.1 adds a `report_visit_events` table to the metadata database.

Each row is one tracked report visit:

| Column | Meaning |
|---|---|
| `report_id` | Report that was visited |
| `email` | User who visited the report |
| `created_at` | Time when the visit was recorded |

Events are recorded only when viewer tracking is enabled for the report. New events are recorded after the upgrade; historical per-visit timestamps are not backfilled.

## Queries

Visits per report per month:

```sql
SELECT
    report_id,
    date_trunc('month', created_at) AS month,
    count(*) AS visits
FROM report_visit_events
GROUP BY report_id, month
ORDER BY month, report_id;
```

Unique users per report per month:

```sql
SELECT
    report_id,
    date_trunc('month', created_at) AS month,
    count(DISTINCT email) AS users
FROM report_visit_events
GROUP BY report_id, month
ORDER BY month, report_id;
```

Recent visits:

```sql
SELECT
    report_id,
    email,
    created_at
FROM report_visit_events
ORDER BY created_at DESC
LIMIT 100;
```

## Add report names

Use this query when you want report names together with visit events:

```sql
SELECT
    r.name AS report_name,
    e.report_id,
    e.email,
    e.created_at
FROM report_visit_events e
JOIN reports r ON r.id = e.report_id
ORDER BY e.created_at DESC;
```
