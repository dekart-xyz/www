---
title: "Architecture"
description: "Build Dekart from Source"
date: 2021-12-13T06:34:01Z
lastmod: 2021-12-13T06:34:01Z
weight: 100
toc: false
draft: false
images: []
menu:
  docs:
    parent: "contributing"
---

## Overview

<a href="./dekart-architecture-overview.png">{{< img src="dekart-architecture-overview.png"  alt="Dekart Architecture Overview" caption="Click for big picture" >}}</a>

### Client

Dekart Client is based on [Create React App](https://create-react-app.dev/docs/getting-started) project setup, javascript Redux application utilizing Actions and Store. Components are build on top of [And Design](https://ant.design/components/overview/) components framework.

Keplrer.gl (fork) is used to render maps and configure visualizations. It is integrated via redux [actions](https://docs.kepler.gl/docs/api-reference/actions/actions)

Communication with server is happening via GRPC. Query results are fetched via HTTP in CSV format.

### Server

Server is a golang application. API is based on GRPC and described in [proto file](https://github.com/dekart-xyz/dekart/blob/main/proto/dekart.proto). Browser support is implemented via [grpc-web](https://github.com/improbable-eng/grpc-web) package.

GRPC Server Streams are using long pull pattern for backwards compatibility with proxies and load balancers:
* client subscribes on stream and waits for the first message
* server sends messages and immediately closes a stream
* client receives message and reopens stream

see client [implementation details](https://github.com/dekart-xyz/dekart/blob/main/src/client/lib/grpc.js)

### Service Dependencies

**Postgres Database**

Is uses to store query metadata:
* Dekart report ids
* SQL queries associated with report
* BigQuery Job ids
* Kepler Map Configuration

**Google Cloud Store**

Is used to store query results

**BigQuery**

Is used to perform queries on datasets. Once Job is ready data is fetched from BigQuery and stored on GCS.

## BigQuery Query Flow

<a href="./making-query.png">{{< img src="making-query.png"  alt="BigQuery Query Flow" caption="Click for big picture" >}}</a>

This diagram explains BigQuery query flow step by step:

1. Client subscribes on Report GRPC Stream to watch all report updates. Multiple clients can subscribe on report and will see synchronized status.
2. Client sends `RunQuery` command (unary GRPC call)
3. Server updates report status in Postgres DB and starts BigQuery Job
4. Server waits for BigQuery Job to complete
5. Once Job is Ready Server fetches Job Results and streams it to Google Cloud Storage
6. Once Result is saved in Cloud Storage update with result id is received by the client
7. Client requests result by separate HTTP endpoint from server

Google IAP (Identity Aware Proxy) is supported to authenticate user requests.


