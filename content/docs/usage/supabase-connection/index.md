---
title: "Supabase Connection Guide"
description: "Connect Dekart to a Supabase Postgres database and map your PostGIS tables with SQL"
date: 2026-11-05T00:00:00+00:00
lastmod: 2026-11-05T00:00:00+00:00
draft: false
menu:
  docs:
    parent: "usage"
images: []
toc: true
---

Supabase runs on Postgres, so Dekart connects to it with the Postgres connector. There is no separate Supabase connector.

Dekart Cloud connects from one static IPv4 address:

```text
35.242.193.95/32
```

Supabase's direct database host (`db.<project-ref>.supabase.co`) is IPv6-only unless you buy the Supabase IPv4 add-on. Use the **Session pooler** instead. It accepts IPv4 connections and works on every Supabase plan.

## Enable PostGIS

Skip this if your tables have no geometry columns.

1. Open your Supabase project.
2. Go to **Database** -> **Extensions**.
3. Search for `postgis` and enable it.

## Create a Read-Only User

Run this in the Supabase **SQL Editor**. Replace the password, and repeat the schema grants for any schema other than `public` that holds your tables.

```sql
CREATE USER dekart_readonly WITH PASSWORD 'replace-with-a-strong-password';

GRANT USAGE ON SCHEMA public TO dekart_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO dekart_readonly;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT ON TABLES TO dekart_readonly;
```

You can also connect as the `postgres` user, but a read-only user is safer.

## Allow Dekart Cloud

Skip this if Network Restrictions are off in your project. By default Supabase accepts connections from any IP.

1. Go to **Project Settings** -> **Database** -> **Network Restrictions**.
2. Add `35.242.193.95/32` to the allowed IPv4 CIDRs.

## Copy the Session Pooler Details

1. Click **Connect** at the top of your Supabase project.
2. Under connection method, choose **Session pooler**.
3. Copy the values from the connection details:
   - Host: `aws-0-<region>.pooler.supabase.com`
   - Port: `5432`
   - Database: `postgres`
   - User: `postgres.<project-ref>`

The pooler username includes your project ref after a dot. For the read-only user, use `dekart_readonly.<project-ref>`. Leaving out the project ref is the most common cause of authentication errors.

## Create the Connection in Dekart

1. In Dekart, open a report and click **New connection**.
2. Choose **Postgres**.
3. Fill in the form:
   - Connection name: `Supabase`
   - Server: the pooler host, for example `aws-0-eu-central-1.pooler.supabase.com`
   - Port: `5432`
   - Username: `dekart_readonly.<project-ref>`
   - Password: the password you set for the user
   - Database: `postgres`
   - SSL mode: `Require SSL` (always on in Dekart Cloud)
4. Click **Test connection**, then **Save**.

Now write a query and press **Execute**:

```sql
SELECT id, name, geom
FROM public.charging_stations
LIMIT 1000;
```

## Self-Hosted Dekart

The same form works in self-hosted Dekart. If your server has IPv6, you can use the direct host `db.<project-ref>.supabase.co` on port `5432` with the plain username. Otherwise use the Session pooler as above.

To set the connection at deploy time instead of in the UI:

```bash
DEKART_DATASOURCE=PG
DEKART_POSTGRES_DATASOURCE_CONNECTION=postgres://dekart_readonly.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres?sslmode=require
```

## Troubleshooting

### Network Connection Failed

You are probably using the direct host from an IPv4-only network. Switch to the Session pooler host. If Network Restrictions are on, check that `35.242.193.95/32` is allowed.

### Authentication Failed

Check that the username includes `.<project-ref>` when you connect through the pooler. Reset the password in the SQL Editor if needed.

### Permission Denied

Run the read-only grants again for the schema that contains your tables.

### Table Not Found

Prefix the table with its schema, for example `public.my_table`.

References: [Supabase Postgres connections](https://supabase.com/docs/guides/database/connecting-to-postgres), [Supabase network restrictions](https://supabase.com/docs/guides/platform/network-restrictions), [Supabase IPv4 add-on](https://supabase.com/docs/guides/platform/ipv4-address), [Dekart Postgres connection guide](/docs/usage/postgres-connection/)
