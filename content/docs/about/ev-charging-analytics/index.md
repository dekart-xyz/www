---
title: "EV Charging Analytics Maps"
description: "Explore how to plan smarter EV charging infrastructure using open and premium data."
lead: ""
date: 2025-05-25T09:39:52+02:00
lastmod: 2025-05-25T09:39:52+02:00
draft: false
images: []
menu:
  docs:
    parent: "examples"
    name: "EV Charging Analytics"
weight: 999
toc: true
---

This curated collection of interactive maps—built with SQL in BigQuery and Snowflake—helps analysts, planners, and EV operators uncover high-opportunity locations, optimize deployments, and benchmark market presence.

### How to Use These Maps
To use these maps, you can:
* Open the provided links to view the maps in Dekart.
* Fork the maps to your own Dekart workspace.
* Customize the underlying SQL queries to fit your specific data needs.

### Electric Vehicle Ownership Affinity Index

*Dataset provided by Echo Analytics.*

{{< img src="ad09c66c-9389-4810-bc61-09258d2b3ee6.png" cloudsql="ad09c66c-9389-4810-bc61-09258d2b3ee6" >}}

This map visualizes *electric vehicle (EV) adoption* in France using the **EV Affinity Index**, which shows how concentrated EV ownership is in each postcode compared to national and regional averages.

* **Darker green** = Above-average adoption
* **Lighter green/white** = Below-average adoption

**Data sources (Google BigQuery):**

• *EV Ownership – Echo Analytics*
`dekart-data-samples.echo_analytics.electric_vehicle_owners`
– `postcode`, `affinity_index_nation`, `affinity_index_region`

• *Geolocation – Overture Maps*
`bigquery-public-data.overture_maps.address`
– `postcode`, `geometry`

**Joining process:**

1. Filter relevant postcodes from EV dataset
2. Get coordinates from Overture Maps
3. Join on `postcode`
4. Sample 4% for performance using `RAND() <= 0.04`

**How to interpret the map:**

• **Affinity Index > 1.19** → High EV adoption (ideal for expanding charging networks)
• **0.75 – 1.19** → Average adoption
• **< 0.75** → Low adoption (could signal access or infrastructure challenges)

**Use cases:**

• Plan EV charging infrastructure
• Target high-affinity areas for EV marketing
• Guide policy or incentives in low-adoption regions

### EV Charging Demand vs Supply

*Dataset provided by Data Appeal.*

{{< img src="4945121f-c277-474f-a9bb-3420292b466a.png" cloudsql="4945121f-c277-474f-a9bb-3420292b466a" >}}

This map reveals the *spatial gap between charging demand and existing EV charger locations* in central Paris, using **POI-based demand signals** from Data Appeal.

* **Orange points** = EV charging stations (`vehicle_charging_station`)
* **Cyan points** = All other POIs (for density and land-use context)
* **Extruded hexagons** = Aggregated *EV-relevant demand*, based on:
`ev_relevance_popularity = popularity * category_weight`
*(Weights reflect how likely a POI type supports charging — e.g., higher for gyms/cafés, lower for banks.)*

**Hexagon colors** show the demand-to-supply ratio:
`relevance_per_charger = SUM(ev_relevance_popularity) / (COUNT(chargers) + 1)`
This highlights areas with *high EV activity but few existing chargers*.

**Why this matters:**

* Combines human behavior (POI popularity) with real charger locations
* Highlights "opportunity charging zones" — where people dwell and could charge
* Uses H3 hexagons (\~100m) for granular urban planning
* Category weights are based on actual EV user behavior and EU mobility studies

**Data sources:**

* `dekart-data-samples.datappeal_2.poi_data`
* `dekart-data-samples.datappeal_2.poi_characterization`
* POI category weights (custom, based on research)
* H3 indexing via `bqcarto.h3.LONGLAT_ASH3`

**Use cases:**
* Identify underserved high-demand areas for new chargers
* Model demand from urban amenities
* Layer with EV adoption or grid data for planning
* Track shifts in demand/supply over time

### EV Charging Competition Analysis

*Dataset provided by MyTraffic.*

{{< img src="1966a88e-4afc-4747-88cf-13db220be242.png" cloudsql="1966a88e-4afc-4747-88cf-13db220be242" >}}

This map shows the *spatial distribution of EV chargers* in Paris using **MyTraffic data**, visualized with **H3 hexagons** to analyze charger density and brand dominance.

* **Darker hexagons** = Higher charger density
* **Point symbols** = Individual stations by brand, size, or power

**Layer descriptions:**
* *Charger Density (H3)* – Charging points per km²
* *Top Brand (H3)* – Most common brand in each hex
* *By Brand (Points)* – Station locations grouped by provider
* *By Count (Points)* – Sized by number of ports
* *By Power (Points)* – Sized by maximum charging power
* *Paris (GeoJSON)* – City boundary reference

**Key insights:**
* **High charger density in central Paris**
* **Brand competition varies by area**, showing localized leadership
* **Peripheral areas** show gaps with potential for expansion

**Data sources:**
* `MyTraffic EV charging data`
* H3 processing via Snowflake

**Use cases:**
* Spot underserved zones for network growth
* Benchmark charger brands by geography
* Guide investment or partnership strategies

### EV Charger Proximity Analysis (UK Highways)
*Dataset from Overture Maps.*

{{< img src="b33117ab-567d-4f86-877a-3dee828f8a81.png" cloudsql="b33117ab-567d-4f86-877a-3dee828f8a81" >}}

This map shows *EV charger density along major UK roads*, highlighting how many charging stations are within 50 km of each motorway or trunk segment.

**Darker lines** = More nearby chargers
**Lighter lines** = Fewer or none

**What’s measured:**
Each road segment is scored by the **number of EV charging stations** located within a 50 km radius.

**How it works:**

* Defines the UK boundary using Overture Maps divisions
* Selects *motorways* and *trunk roads* only
* Filters POIs categorized as EV charging stations
* Counts stations within 50 km of each road segment

**Data sources:**

* `OVERTURE_MAPS__DIVISIONS.CARTO.DIVISION_AREA` – UK boundary
* `OVERTURE_MAPS__TRANSPORTATION.CARTO.SEGMENT` – Road geometry and metadata
* `OVERTURE_MAPS__PLACES.CARTO.PLACE` – Charging station locations

**Use cases:**

* Identify highway segments underserved by EV infrastructure
* Guide national charging network expansion
* Support EV readiness assessments across transport corridors

### EV Charging Density – by Country (Overture Maps + H3)

*Dataset from Overture Maps.*


{{< img src="25ffca56-bf81-45e2-8d8b-03be637f3778.png" cloudsql="98071bc3-1707-43ee-9d67-041d7c89fcb9" >}}

This map shows *the distribution of EV charging stations* within a selected country using **H3 hexagons** for spatial aggregation.

**Taller hexagons** = More EV charging stations
**Darker stroke colors** = Country boundary for geographic context

**What’s measured:**
EV charging stations are counted within **H3 hexagons** (resolution 7 ≈ 1 km²) based on POI data. Results are sorted by station density.

**How it works:**

* Filters country boundaries from `overture_maps.division_area` using a country code
* Selects POIs categorized as EV charging stations
* Applies `ST_WITHIN()` to include only stations inside the country
* Aggregates station counts into H3 cells via `bqcarto.h3.ST_ASH3()`
* Orders by density for analysis or visualization

**Data sources:**

* `bigquery-public-data.overture_maps.division_area` – Country geometry
* `bigquery-public-data.overture_maps.place` – Charging station locations
* H3 spatial indexing via `bqcarto.h3.ST_ASH3`

**Use cases:**

* Compare charging infrastructure density across regions
* Identify high- and low-coverage areas within a country
* Support infrastructure planning and investment decisions

**To run for another country:**
Replace `{{country}}` with a valid 2-letter ISO code (e.g., `DE`, `FR`, `IT`)


## Want to build similar maps?

<p><a class="btn btn-primary" target="_blank" href="https://calendly.com/vladi-dekart/30min?ref=book-ev-charging-demo" role="button">Book a free demo</a></p>


*Book a free demo*: we’ll walk you through the process, help customize your data, and show how to spin off maps in minutes.



