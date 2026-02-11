---
title: "Dekart Snowpark Application"
description: "Why Dekart Cloud is Secure"
date: 2021-02-22T07:48:05+01:00
lastmod: 2021-02-22T07:48:05+01:00
draft: false
images: []
menu:
  docs:
    parent: "self-hosting"
    name: "Deploy to Snowflake"

---

**Dekart** enables you to create powerful **Kepler.gl** visualizations directly from SQL queries in Snowflake, simplifying the process of visualizing and sharing location data without ETL pipelines.

<p><iframe width="560" height="315" src="https://www.youtube.com/embed/KusNayeGFaI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

<p><a class="btn btn-primary" target="_blank" href="https://app.snowflake.com/marketplace/listing/GZSYZJNO4W/dekart-xyz-dekart" role="button">Get it instantly in Snowflake Marketplace</a></p>

## 💡 How Dekart Works

- **Single Docker Container**: Dekart runs efficiently as a single container within the Snowpark Container Service, requiring minimal setup.
- **State Management**: All Dekart's state is securely stored on `dekart.app_public.app_state_stage`, which includes 7 days of backups. When the application is uninstalled, the associated stage is also deleted.
- **Data Warehouse**: Dekart uses by default the `WH_DEKART` data warehouse for executing and storing SQL queries. You can [change](/docs/snowflake-snowpark/about/#change-data-warehouse-for-dekart) it to your preference.
- **Query Results**: Query data is loaded from Snowflake's persisted query results. If the query results expire, Dekart will automatically rerun the query to refresh the map data.

  **Recommended limits**:
  - Maximum result size: **100 MB**
  - Maximum number of rows: **1 million rows**

## 🛡️ Accessing Datasets

To use datasets in your visualizations, Dekart needs access to the relevant databases. For instance, to grant Dekart access to the **OpenStreetMap New York** dataset, run the following SQL command:

```SQL
-- Grant access to a dataset (e.g., OpenStreetMap New York)
GRANT IMPORTED PRIVILEGES ON DATABASE OPENSTREETMAP_NEW_YORK TO application DEKART__WEBGL_MAPS_FOR_SNOWFLAKE;
```

💡 Please note that app name could be changed during the installation process.

## 👫 Granting Access to Other Users

To allow other users access to the Dekart application, assign them the appropriate role with the following SQL command:

```SQL
-- Grant access to a user role
GRANT application role DEKART__WEBGL_MAPS_FOR_SNOWFLAKE.app_public.app_user TO role user_role;
```

💡 Please note that app name could be changed during the installation process.

## 🎁 Getting access to free Overture Maps

Dekart offers great way to explore Overture Maps datasets and enrich your visualizations with Places, Roads, and other map data.

1. Go to Snowflake Marketplace and search for [Overture Maps](https://app.snowflake.com/marketplace/data-products/search?search=overture%20maps)

2. Get Datasets you need, for example Places. They are instantly available in your Snowflake account.

3. Give Dekart access to the dataset:

```SQL
-- as ACCOUNTADMIN
GRANT IMPORTED PRIVILEGES ON DATABASE OVERTURE_MAPS__PLACES TO APPLICATION DEKART__WEBGL_MAPS_FOR_SNOWFLAKE;
```

4. Go to Dekart application, create a new report click *Start with sample query* to test it.

💡 Please note that app name could be changed during the installation process.

## 🛠️ Compute and cost control

Dekart allows you to change parameters of the compute pool and data warehouse.

### Change compute pool settings for Dekart

Dekart runs its Snowpark Container Service in a compute pool (default name:  `DEKART_CP`). You can configure the compute pool to your preference. Note that Dekart does not support more than 1 node.

```
ALTER COMPUTE POOL DEKART_CP
  SET
    MIN_NODES         = 1,       -- minimum nodes when active
    MAX_NODES         = 1,       -- maximum nodes under load
    AUTO_RESUME       = TRUE,    -- start automatically when needed
    AUTO_SUSPEND_SECS = 300;     -- suspend after 300s idle
```

### Change data warehouse for Dekart

Dekart executes all SQL queries on a Snowflake warehouse (default name:  `WH_DEKART` ). You can adjust its settings:

```
ALTER WAREHOUSE WH_DEKART
  SET
    WAREHOUSE_SIZE = 'XSMALL',   -- XS / S / M / L, etc.
    AUTO_SUSPEND   = 60,         -- seconds of inactivity
    AUTO_RESUME    = TRUE;
```

You can also point Dekart to a different warehouse:

```
USE APPLICATION DEKART;
USE SCHEMA app_public;
CALL v1.set_query_warehouse('MY_WH');
```

## 💾 Backup and Restore

Dekart stores its state on Snowflake Stage every 5 minutes and keeps 7 days of history. This section explains how to backup and restore this state.

### Backing Up State

To backup the Dekart application state, follow these steps:

```SQL
-- as ACCOUNTADMIN

-- List backup files to verify they exist
LIST @DEKART.APP_PUBLIC.APP_STATE_STAGE;

-- Create example database for copying backup
CREATE DATABASE DEKART_MIGRATE;

CREATE SCHEMA DEKART_MIGRATE.APP_PUBLIC;

CREATE STAGE DEKART_MIGRATE.APP_PUBLIC.APP_STATE_STAGE;

-- Copy backup files
COPY FILES
  INTO @DEKART_MIGRATE.APP_PUBLIC.APP_STATE_STAGE
  FROM @DEKART.APP_PUBLIC.APP_STATE_STAGE;

-- Verify backup was saved
LIST @DEKART_MIGRATE.APP_PUBLIC.APP_STATE_STAGE;
```

### Restoring State

To restore the state to a new Dekart installation:

1. Uninstall the old app
2. Install the marketplace app version (do **not** activate it yet)
3. Grant permissions so the activate button becomes visible, then run:

```SQL
-- Copy backup files back to the new app stage
COPY FILES
  INTO @DEKART.APP_PUBLIC.APP_STATE_STAGE
  FROM @DEKART_MIGRATE.APP_PUBLIC.APP_STATE_STAGE;

-- Verify files were copied
LIST @DEKART.APP_PUBLIC.APP_STATE_STAGE;
```

4. Press **Activate** button
5. Grant permissions to the new app (example):

```SQL
GRANT IMPORTED PRIVILEGES ON DATABASE OVERTURE_MAPS__PLACES TO APPLICATION DEKART;
```

All maps should now be migrated to the new instance.

💡 **Note**: Depending on share type, the app name can be `DEKART` or `DEKART__WEBGL_MAPS_FOR_SNOWFLAKE`. Adjust the commands accordingly.

## 🛟 Support

* [Get support in Slack Community](https://slack.dekart.xyz/)
* [Book a walkthrough demo with our team](https://calendly.com/vladi-dekart/30min)
* [Create a GitHub Issue](https://github.com/dekart-xyz/dekart/issues)
* Contact us over email [support@dekart.xyz](mailto:support@dekart.xyz)
