---
title: "GIS Analytics Cost Comparison"
description: "Cost comparison: BigQuery, Snowflake, Wherobots, Cloud SQL PostGIS, and Hetzner PostGIS on the same Overture Maps workload."
lead: "BigQuery vs Snowflake vs Wherobots vs PostGIS on the same workload."
date: 2026-03-19T05:00:00Z
lastmod: 2026-03-19T05:00:00Z
draft: false
weight: 10
toc: true
images: []
contributors: ["Vladi"]
menu:
  docs:
    parent: "knowledge-base"
---

## Summary

| # | Engine | Monthly cost | Managed? |
|---|---|---|---|
| 1 | **BigQuery** | **~$400** | Yes |
| 2 | **Wherobots** | **~$410** | Yes |
| 3 | **Hetzner PostGIS** | **~$500** | No (self-hosted) |
| 4 | **Snowflake (Small WH)** | **~$1,000** | Yes |
| 5 | **Cloud SQL PostGIS** | **~$3,500** | Yes |

## Assumptions

Fixed scenario for all engines:

| Parameter | Value |
|---|---|
| Team size | 10 analysts, 6-8 hours/day |
| Queries per analyst | 15/day (analytical + batch) |
| Total queries | 150/day |
| Avg data scanned/query | 12 GiB (well-pruned spatial analytics) |
| Working days | 22/month |
| Data scanned/month | ~39.6 TiB |
| Dataset | [Overture Maps](https://overturemaps.org/), ~7 TB compressed (Parquet) |

## BigQuery - ~$400/month

| Component | Calculation | Cost |
|---|---|---|
| Storage | 7 TB x $0.02/GB/month | $140 |
| Queries (on-demand) | 38.6 TiB x [$6.25/TiB](https://cloud.google.com/bigquery/pricing) (first 1 TiB free) | $241 |
| **Total** | | **~$400** |

See how BigQuery spatial queries look in practice: [BigQuery map examples in Dekart](/docs/about/kepler-gl-map-examples/).

## Wherobots - ~$410/month

| Component | Calculation | Cost |
|---|---|---|
| Engine | 165 SU-hours x [$1.50/SU-hour](https://wherobots.com/pricing/) (US) | $248 |
| Storage (S3) | 7,000 GB x $0.023/GB | $161 |
| **Total** | | **~$410** |

1 SU = 32 vCPU Spark/Sedona cluster. 150 queries/day x 3 min each = 7.5 SU-hours/day x 22 days = 165 SU-hours/month. $300/month minimum on Professional plan.

## Hetzner PostGIS - ~$500/month

| Component | Calculation | Cost |
|---|---|---|
| Server | [AX102](https://www.hetzner.com/dedicated-rootserver/ax102): 16 cores, 128 GB DDR5, 2x 1.92 TB NVMe | $115 (€104) |
| Additional NVMe | 2x 7.68 TB for ~10 TB Postgres data | $205 (€186) |
| Backups | WAL-G to S3-compatible, ~7-10 TB | $180 |
| **Total** | | **~$500** |

You own all ops: upgrades, PostGIS extensions, monitoring, failover, no SLA.

## Snowflake - ~$1,000/month

| Component | Calculation | Cost |
|---|---|---|
| Storage | 7 TB x $23/TB | $161 |
| Compute | 264 credits x [$3/credit](https://www.revefi.com/blog/snowflake-pricing-guide) (Enterprise) | $792 |
| **Total** | | **~$1,000** |

Small WH = 2 credits/hour. 6 hours/day x 22 days = 132 hours x 2 = 264 credits. Medium WH doubles the cost.

See Snowflake spatial queries in action: [Snowflake Kepler.gl map examples](/docs/about/snowflake-kepler-gl-examples/).

## Cloud SQL PostGIS - ~$3,500/month

| Component | Calculation | Cost |
|---|---|---|
| Storage (SSD) | 10 TB x [$0.22/GB](https://cloud.google.com/sql/pricing) (incl. indexes/bloat) | $2,200 |
| Compute | 8 vCPU / 32 GB RAM, 24x7 | $518 |
| Backups | 10 TB x $0.08/GB | $800 |
| **Total** | | **~$3,500** |

SSD storage pricing makes Cloud SQL brutal for large datasets. Built for OLTP, not planetary analytics.

## Key takeaways

- **BigQuery** is cheapest fully-managed. Pay per bytes scanned - well-clustered tables with partition pruning keep costs low.
- **Wherobots** is similar cost, serverless, geo-specialized. Better for heavy spatial joins.
- **Hetzner** is cheap raw metal, but you own everything.
- **Snowflake** is ~2.5x more because you pay for warehouse time, not bytes.
- **Cloud SQL PostGIS** is 8x more expensive than BigQuery at planet scale.

Pragmatic architecture: **BigQuery or Wherobots for planetary analytics** + small PostGIS for low-latency APIs.

## Caveats

- Published list prices, no committed-use discounts applied
- Egress costs not included
- HA/replication doubles PostGIS costs
- Query pruning efficiency varies - these assume well-optimized spatial queries

## Try it yourself

- [Overture Maps examples](/docs/about/overture-maps-examples/) - interactive maps built with Dekart on Overture data
- [BigQuery map examples](/docs/about/kepler-gl-map-examples/) - large-scale datasets visualized
- [Snowflake map examples](/docs/about/snowflake-kepler-gl-examples/) - Snowflake spatial queries rendered on a map
- [BigQuery vs Snowflake GIS performance](/blog/bigquery-vs-snowflake-gis-sql-performance-comparison-1/) - query speed and cost benchmarks
- [Try Dekart Cloud free](https://cloud.dekart.xyz) - paste SQL, get a map
