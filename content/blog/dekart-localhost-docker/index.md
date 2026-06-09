---
title: "One Docker Command to Replace Enterprise GIS"
url: "/blog/one-docker-command-to-replace-carto-and-felt/"
description: "Dekart is an open-source CARTO and Felt alternative that turns SQL into maps. One Docker command, runs on localhost or self-hosted, no accounts."
lead: "Localhost or self-hosted, no SaaS, no accounts."
date: 2026-06-05T00:00:00Z
lastmod: 2026-06-06T00:00:00Z
draft: false
weight: 1
contributors: ["Vladi"]
images: ["dekart-localhost-docker.png"]
---

{{< img src="dekart-localhost-docker.png" caption="One Docker command to replace CARTO and Felt" class="wide" >}}

## What is Dekart

Dekart runs as a single Docker container with no dependencies. It is a backend for Kepler.gl with connectors to PostGIS, BigQuery, Snowflake and more. It turns SQL into maps and lets you share them privately.

{{< github-cta ref="blog-carto-felt-top" >}}

## How to run it

One command, nothing to set up first:

```bash
docker run -p 8080:8080 dekartxyz/dekart:0.23
```

Open `localhost:8080`, add a connection to your database, and run a query. The result renders on a map, and the data never leaves your machine.

Inside that one container is a carefully maintained Go backend, a built-in SQLite database, local file storage, and a free base map. There is nothing else to wire up, and a few large companies already run the same backend in production.

## Run in Cloud

By default everything lives inside the container. To run Dekart on a server and keep your maps and uploads across restarts, point it at object storage. For Google Cloud Storage, set the storage mode, the bucket, and mount your service account credentials:

```bash
docker run -p 8080:8080 \
  -e DEKART_STORAGE=GCS \
  -e DEKART_CLOUD_STORAGE_BUCKET=your-bucket \
  -v ${GOOGLE_APPLICATION_CREDENTIALS}:${GOOGLE_APPLICATION_CREDENTIALS} \
  -e GOOGLE_APPLICATION_CREDENTIALS=${GOOGLE_APPLICATION_CREDENTIALS} \
  dekartxyz/dekart:0.23
```

Amazon S3 works the same way with `DEKART_STORAGE=S3`, and you can use Postgres for metadata if you prefer a database over the built-in SQLite. The full set of storage and deployment options is in the [Docker self-hosting docs](/docs/self-hosting/docker/).

## Create maps with Claude and Codex

If you do not want to write the SQL yourself, hand it to an agent. Dekart connects to Claude and Codex over MCP:

```bash
pip install dekart && dekart init   # install the CLI
pip install geosql && geosql        # install the skill
```

Then ask Claude to make a map from your data.

{{< img-simple src="geosqldemo.gif" caption="Claude querying a database and building a Dekart map" >}}

Here is why routing through Dekart helps. Without a map, an agent does SQL and pray: it writes a query, gets back a table of coordinates, and cannot tell if the geometry is right. With Dekart in the loop it sees the map, notices when points land in the ocean, and corrects itself. In my testing that roughly 4x'd how often Claude got geospatial questions right, and [here is how I measured it](/blog/how-to-evaluate-claude-skill-output-quality-for-prompt-to-sql-scenarios/). It is not only for maps either, it helps with any analytics that touches lat/lon.

{{< img src="agent-with-maps-4x.png" caption="Geospatial eval accuracy went from 2/8 to 8/8 once the agent could see the map" class="wide" >}}

If you think this is heading the right way, give it a star on GitHub so I know to keep going.

{{< github-cta ref="blog-carto-felt-bottom" >}}
