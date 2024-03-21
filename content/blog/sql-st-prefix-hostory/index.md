---
title: "ST_ Prefix in SQL: A Tale of Time, Space, and Standardization"
description: "History of SQL/MM Spatial Standardization"
lead: "What exactly ST_ means in SQL?"
date: 2024-03-21T05:59:51Z
lastmod: 2024-03-21T05:59:51Z
draft: false
weight: 50
images: ["gis-systems-in-past.png"]
contributors: ["Vladi"]
---

{{< img src="gis-systems-in-past.png"  class="wide" >}}

As you know, many modern databases and warehouses like BigQuery and Snowflake provide support for map geometry operations. All these functions, like ST_ASGEOJSON are prefixed with ST_. This prefix is reference to SQL/MM Spatial  standard. But what exactly ST_ means? If you thought it’s “Spatial Type” you are mistaken. Below is a shorten history of  SQL/MM Spatial Standardization

### SQL/MM Spatial

ISO/IEC 13249 SQL/MM is the effort to standardize extensions for multi-media and application-specific packages in SQL. SQL, as defined in [ISO99], is extended to manage data like texts, still images, spatial data, or to perform data mining.

The first version of the standard was published in 1999. In this standard, geometries like points, lines, and polygons or composites thereof are also referred to as *spatial data*. The standard was originally derived from the OpenGIS Simple Features Specification for SQL [OGC99], also published in the year 1999 as version 1.1 by the OpenGIS Consortium (OGC).

### Spatial and Temporal

The SQL/MM standard uses consistently the prefix ST for all tables, views, types, methods, and function names. *The prefix stood originally for Spatial and Temporal*. It was intended in the early stages of the standard development to define a combination of temporal and spatial extension. A reason for that was that spatial information is very often tied with temporal data [SWCD98, SWCD97, RA01, TJS97].

During the development of SQL/MM Spatial, it was decided that temporal has a broader scope beyond the spatial application and should be a part of the SQL standard [ISO99] as SQL/Temporal [ISO01]. The contributors to SQL/MM did not want to move forward with a Spatio-temporal support until SQL/Temporal developed.

In the mean time, the focus of spatial standard lied on keeping it aligned with the OGC specification and the standards developed by the technical committee ISO/TC 211, for example [ISO02a, ISO02b]. The prefix ST for the spatial tables, types, and methods was not changed during the organizational changes of the standards, however. Today, one might want to interpret it as Spatial Type.

### Reference

* Stolze, K. (2003, February). SQL/MM Spatial-The Standard to Manage Spatial Data in a Relational Database System
