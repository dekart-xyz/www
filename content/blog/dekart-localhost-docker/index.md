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

<a class="btn btn-outline-dark" href="https://github.com/dekart-xyz/dekart?ref=blog-carto-felt-top" role="button"><svg class="github-btn-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-right: 6px; position: relative; top: -1px;"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>https://github.com/dekart-xyz/dekart</a>

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

<a class="btn btn-outline-dark" href="https://github.com/dekart-xyz/dekart?ref=blog-carto-felt-bottom" role="button"><svg class="github-btn-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-right: 6px; position: relative; top: -1px;"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>https://github.com/dekart-xyz/dekart</a>
