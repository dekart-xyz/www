---
title: "Postgres Connection Guide"
description: "Connect Dekart Cloud to Postgres or PostGIS with TLS and IP allowlisting"
date: 2026-07-08T00:00:00+00:00
lastmod: 2026-07-08T00:00:00+00:00
draft: false
menu:
  docs:
    parent: "usage"
images: []
toc: true
---

Dekart Cloud connects to your Postgres or PostGIS database from one static egress IP.

Allowlist this CIDR in your database firewall:

```text
35.242.193.95/32
```

Use SSL mode `Require SSL` in Dekart Cloud. Cloud connections must use TLS.

## Before You Connect

1. Make the database reachable from the public internet, but only from Dekart Cloud's egress CIDR.
2. Allow inbound TCP traffic to your Postgres port, usually `5432`, from `35.242.193.95/32`.
3. Create a read-only database user for Dekart.
4. Keep TLS enabled on the database.
5. Open the Postgres connection dialog in Dekart and click **Test connection** before saving.

## Create a Read-Only User

Run this as a database admin and replace `my_database`, `public`, and the password.

```sql
CREATE USER dekart_readonly WITH PASSWORD 'replace-with-a-strong-password';

GRANT CONNECT ON DATABASE my_database TO dekart_readonly;
GRANT USAGE ON SCHEMA public TO dekart_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO dekart_readonly;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT ON TABLES TO dekart_readonly;
```

If your spatial tables live in another schema, repeat the schema grants for that schema.
Default privileges only apply to future tables created by the role that runs the command. If another application owner creates tables, run:

```sql
ALTER DEFAULT PRIVILEGES FOR ROLE app_owner IN SCHEMA public
GRANT SELECT ON TABLES TO dekart_readonly;
```

## AWS RDS or Aurora PostgreSQL

Use this for Amazon RDS PostgreSQL or Aurora PostgreSQL with PostGIS enabled.

1. Confirm the DB instance is publicly reachable, or reachable through a public proxy you control.
2. Open the database VPC security group.
3. Add an inbound rule:
   - Type: `PostgreSQL`
   - Port: `5432`, or your custom database port
   - Source: `35.242.193.95/32`
4. Keep SSL enabled. For RDS PostgreSQL, use `rds.force_ssl = 1` when you want the server to reject non-TLS clients.
5. In Dekart, use the RDS endpoint as **Server** and choose `Require SSL`.

References: [RDS security groups](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.RDSSecurityGroups.html), [RDS PostgreSQL SSL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/PostgreSQL.Concepts.General.SSL.html)

## Google Cloud SQL for PostgreSQL

Use this for Cloud SQL PostgreSQL with PostGIS enabled.

1. Open the Cloud SQL instance in Google Cloud Console.
2. Go to **Connections** -> **Networking**.
3. Make sure the instance has a public IP address.
4. Under **Authorized networks**, add:
   - Name: `Dekart Cloud`
   - Network: `35.242.193.95/32`
5. Keep SSL/TLS enabled or enforced.
6. In Dekart, use the Cloud SQL public IP or DNS name as **Server** and choose `Require SSL`.

References: [Cloud SQL authorized networks](https://docs.cloud.google.com/sql/docs/postgres/authorize-networks), [Cloud SQL SSL/TLS](https://docs.cloud.google.com/sql/docs/postgres/authorize-ssl)

## Azure Database for PostgreSQL Flexible Server

Use this for Azure Database for PostgreSQL Flexible Server with PostGIS enabled.

1. Open the PostgreSQL flexible server in Azure Portal.
2. Go to **Networking**.
3. Enable public access if your server is not private-only.
4. Add a firewall rule:
   - Rule name: `DekartCloud`
   - Start IP address: `35.242.193.95`
   - End IP address: `35.242.193.95`
5. Keep encrypted connections enabled.
6. In Dekart, use the server hostname as **Server** and choose `Require SSL`.

References: [Azure PostgreSQL firewall rules](https://learn.microsoft.com/en-us/azure/postgresql/security/security-firewall-rules), [Azure public networking](https://learn.microsoft.com/en-us/azure/postgresql/network/concepts-networking-public)

## Supabase

Use this for Supabase Postgres with the PostGIS extension enabled.

1. Open your Supabase project.
2. Go to **Project Settings** -> **Database** -> **Network Restrictions**.
3. Add `35.242.193.95/32` to the database allowed IPv4 CIDRs.
4. Use the Supavisor session pooler host on port `5432`, which is IPv4-compatible. If you want to use the direct Postgres host, enable the Supabase IPv4 add-on first.
5. In Dekart, enter the pooler host, database name, user, and password from Supabase connection settings.
6. In Dekart, choose `Require SSL`.

References: [Supabase network restrictions](https://supabase.com/docs/guides/platform/network-restrictions), [Supabase Postgres connections](https://supabase.com/docs/guides/database/connecting-to-postgres), [Supabase IPv4 add-on](https://supabase.com/docs/guides/platform/ipv4-address)

## DigitalOcean Managed PostgreSQL

Use this for DigitalOcean Managed PostgreSQL with PostGIS enabled.

1. Open the database cluster in DigitalOcean.
2. Go to **Settings** or **Network Access**.
3. Add a trusted source for `35.242.193.95/32`.
4. Create or choose a least-privilege database user.
5. In Dekart, use the public host and port from the connection details and choose `Require SSL`.

References: [DigitalOcean trusted sources](https://docs.digitalocean.com/products/databases/postgresql/how-to/secure/), [DigitalOcean PostgreSQL connection details](https://docs.digitalocean.com/products/databases/postgresql/how-to/connect/)

## Self-Managed Postgres or PostGIS

Use this for Postgres running on your own VM, Kubernetes cluster, or bare metal server.

Open your firewall only to `35.242.193.95/32` on the Postgres port, enable TLS in Postgres, and prefer a `hostssl` rule in `pg_hba.conf`:

```text
hostssl my_database dekart_readonly 35.242.193.95/32 scram-sha-256
```

Reload Postgres after updating `pg_hba.conf`. In Dekart, choose `Require SSL`.

## Troubleshooting

### Network Connection Failed

Check that the database host is public, the firewall allows `35.242.193.95/32`, and the database listens on the port entered in Dekart.

### TLS Connection Failed

Keep Dekart set to `Require SSL`. Check that the database accepts TLS connections and that any provider-side "require SSL" option is enabled.

### Authentication Failed

Verify the username and password. For managed services, make sure you are using the database username, not the cloud account login.

### Permission Denied

Run the read-only grants again for the schema that contains your tables. PostGIS geometry columns work like regular columns for `SELECT` queries.

## Security Checklist

- Allowlist only `35.242.193.95/32`, not `0.0.0.0/0`.
- Use a dedicated read-only user for Dekart.
- Keep TLS enabled.
- Rotate the password if a team member who knew it leaves.
- Use **Test connection** after every firewall, credential, or TLS change.
