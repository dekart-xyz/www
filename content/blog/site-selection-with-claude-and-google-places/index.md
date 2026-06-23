---
title: "Site Selection with Claude and Google Places"
url: "/blog/site-selection-with-claude-and-google-places/"
description: "How the Claude and Google Places site-selection demo works: the data, the GIS method, the prompts, the limitations, and how to run it on your own warehouse."
lead: "For GIS consultants and location-intelligence analysts: run a site-selection analysis on Google Places and Overture in BigQuery, with the full prompt and method."
date: 2026-06-23T00:00:00Z
lastmod: 2026-06-23T00:00:00Z
draft: false
weight: 1
contributors: ["Vladi"]
images: ["claude-google-places.png"]
---

<video autoplay loop muted playsinline preload="metadata" poster="claude-google-places.png" style="width: 100%; max-width: 100%; height: auto; border-radius: 6px; margin: 1.5rem 0;">
  <source src="claude-google-places.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

I built a site-selection analysis that runs with Claude, the GeoSQL skill, Google Places and Overture in BigQuery, and renders on a Dekart map. This post explains how it works: the data, the method, the prompts, where it breaks, and how to run it yourself.

## The data

Two datasets, both already in BigQuery:

Google Places, as the [Places Insights dataset](/docs/knowledge-base/places-insights-bigquery/). On BigQuery this returns aggregated place statistics for an area, counts by category and rating distributions, above an aggregation threshold. It is not row-level venue records, and you query it with `SELECT ... WITH AGGREGATION_THRESHOLD`.

[Overture Maps](/blog/why-we-stopped-using-openstreetmap-and-switched-to-overture-maps-on-bigquery-and-snowflake/), the free public dataset, for boundaries and general POIs.

Plus one table of my own: the client's existing store locations.

The reason to use BigQuery is that none of this needs procurement. The usual path to use Places data for analytics is to find the dataset, license it, satisfy the usage rules, and load it into your environment before you can start. With Places and Overture already in BigQuery, you skip that and query both in the same place.

The demo used these tables:

```
existing stores: dekart-data-samples.demo_data_samples.customer_locations_poi
Google Places:   dekart-data-samples.places_insights___de___sample.places_sample
Overture Maps:   public Overture tables
```

→ [Set up Google Places Insights in BigQuery](/docs/knowledge-base/places-insights-bigquery/?ref=blog-site-selection-data)

## How the analysis works

GeoSQL is a free, open-source skill that gives Claude the moves this analysis needs: discover the warehouse schema, resolve the city from Overture, write H3 geospatial SQL, dry-run each query to keep BigQuery cheap, and iterate. Dekart turns the result into an interactive map, a self-hosted alternative to [CARTO](/carto/) and Felt, so candidates, catchments, competitors, and hot spots land as layers you can click. Both run on your own warehouse, so the data never leaves BigQuery.

I gave Claude two files and one prompt: a customer brief with the business ask, and the method below, the GIS recipe it followed. It ran the whole chain, from co-location and hot spots to a weighted suitability score and a 1km cannibalization check, and rendered every layer as evidence so each score traces back to the data behind it.

→ [GeoSQL skill on GitHub](https://github.com/dekart-xyz/geosql?ref=blog-site-selection-how)

## The prompt and the method file

The prompt is short. It states the goal, points at the two files, names the tables, and describes the result.

```
Client is expanding in Berlin. Find the best candidate areas for new stores that maximize demand and do not cannibalize the existing network.

Follow ~/Downloads/method.md for the analysis and ~/Downloads/customer-brief.md for the client's requirements.

Use BigQuery: existing stores dekart-data-samples.demo_data_samples.customer_locations_poi, Google Places dekart-data-samples.places_insights___de___sample.places_sample (requires SELECT WITH AGGREGATION_THRESHOLD)

Deliver an interactive map: a ranked shortlist of candidate areas with suitability scores, plus every supporting layer as evidence (existing stores with their 1km exclusion zones, competitors, demand hot spots, and the demand predictors). I should be able to click any candidate and see why it scored.
```

Everything else lives in `method.md`, the recipe Claude follows:

```markdown
# Method: Retail Site Selection — Demand-Supply Suitability + Cannibalization

## Purpose
Rank candidate micro-areas for a new lunch-led fast-casual unit by demand minus
supply, excluding areas that cannibalize the existing network. No revenue data:
this is an unsupervised suitability model, not a revenue prediction.

## Inputs
- Existing network: client locations table (points).
- Google Places: POIs with rating, review count, category, price level, status.
- Overture Maps: `place` (POIs) and `division_area` (boundaries).

## Parameters (defaults; override from brief)
- Candidate grid:            H3 resolution 9
- Co-location / predictors:  H3 resolution 8 (coarser, less noisy)
- Enrichment smoothing:      H3 k-ring, k = 1
- Cannibalization rule:      1 km walking separation (buffer or H3 k-ring)
- Shortlist size:            top 15
- Popularity metric:         log(1 + total_reviews)
- Quality metric:            average rating (separate variable, never multiplied
                             by reviews)

## Workflow
1. Schema discovery. Confirm exact tables/columns from warehouse metadata. Never
   assume column names.
2. Resolve target area. Query Overture `division_area` for Berlin; extract the
   real geometry + bbox. Gate all scans with bbox + ST_INTERSECTS.
3. Co-location analysis (H3 r8). Relative to existing stores + comparable
   concepts, find which POI categories spatially associate (offices, coworking,
   transit, universities, gyms, premium retail). Output: the demand predictors.
4. Candidate grid (H3 r9). Polyfill Berlin. Filter to commercially viable cells
   only (must contain retail/food POIs). Exclude parks, water, rail, pure
   residential.
5. Spatial enrichment (k-ring smoothed) per candidate cell:
   - competitor count (direct healthy fast-casual),
   - complementary-POI density (predictors from step 3),
   - daytime-demand proxy = office/coworking POI density (label as PROXY; real
     daytime population needs an employment dataset),
   - comparable-concept popularity = log(1+reviews),
   - comparable-concept quality = avg rating.
6. Hot spot analysis (Getis-Ord Gi*) on the demand surface. This is a SUPPORTING
   EVIDENCE layer and a sanity check on the suitability score, NOT a competing
   ranking.
7. Suitability model (weighted overlay / MCDA):
   - normalize each variable to [0,1],
   - apply weights: demand positive, competition negative,
   - propose defensible starting weights and state them,
   - composite score, rank top 15.
8. Cannibalization. Drop or flag candidates within 1 km (buffer or H3 k-ring) of
   any existing store.

## Output map layers (all required, as evidence)
- Candidate shortlist, colored by suitability score (top 15).
- Existing stores + 1 km exclusion zones.
- Competitors.
- Gi* demand hot spots.
- Demand predictor layers (the inputs, so the score is auditable).
- Per-candidate scorecard: the normalized variable contributions behind its score.

## Honesty rules (claims must be capability-true)
- "Daytime workers" is proxied by office POI density. Say so.
- Popularity = review volume; quality = rating. Do not multiply them.
- Catchment uses walk isochrones only if a walk network is available; otherwise a
  buffer, labeled "buffer approximation."
- Getis-Ord Gi* only if z-scores are actually computed; else call it a demand
  density surface.
- With client performance data, upgrade to calibrated weights (spatial regression
  / GWR) validated against known top stores. ~18 stores is too few to train a
  revenue predictor; calibrate, do not predict.

## Cost safety
- Discover schema before querying.
- bbox + ST_INTERSECTS on every named-area scan.
- Dry-run and cost-gate the r9 query before running.
- Select only needed columns; LIMIT during exploration.
- Cast 64-bit ints to int/double for any column bound to a map visual channel.
```

## The result

{{< img src="result-map.png" caption="Ranked candidate areas in Berlin scored by suitability, with existing stores and their 1km exclusion zones, competitors, and demand hot spots as layers." class="wide" >}}

The map is interactive: click any candidate to see the variables behind its score.

→ [Open the live map](https://cloud.dekart.xyz/reports/0b11aa00-08c8-483e-95c4-6b81cb44e4d8?ref=blog-site-selection-result)

## Run it yourself

Everything here is open source and runs locally, no SaaS account required: [GeoSQL](https://github.com/dekart-xyz/geosql), the agent skill, and [Dekart](https://github.com/dekart-xyz/dekart), the map backend.

Install the skill into your agent (Claude, Codex, or Copilot):

```bash
pip install geosql && geosql
```

Add Dekart for maps and warehouse access. Run it locally, or use [Dekart Cloud](/cloud/?ref=blog-site-selection-setup) or [self-host](/docs/self-hosting/docker/?ref=blog-site-selection-setup):

```bash
docker run -p 8080:8080 dekartxyz/dekart # optional
pip install dekart && dekart init
```

`dekart init` connects BigQuery, Snowflake, PostGIS, or Wherobots through your local CLI auth, so credentials never reach the agent.

Then drop your store locations in a table, point the agent at it plus the Places and Overture tables, and run the prompt above. `method.md` is your starting recipe: change the weights, catchment distance, and cannibalization rule to fit your case.

→ [Dekart on GitHub](https://github.com/dekart-xyz/dekart?ref=blog-site-selection-setup)
