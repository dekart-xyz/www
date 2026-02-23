---
title: "Kepler.gl + DuckDB (WASM): configuration and custom SQL UI"
description: "Minimal steps to enable DuckDB-WASM in a Kepler.gl app and run DuckDB SQL from a custom UI so results show up as a new layer."
date: 2026-02-23T00:00:00Z
lastmod: 2026-02-23T00:00:00Z
draft: false
contributors: ["Vladi"]
---

This document describes the minimal steps to:

1) enable DuckDB-WASM inside a Kepler.gl app, and
2) run DuckDB SQL from a custom UI (your own editor + Run button) so the result is added to Kepler as a new dataset and auto-creates a layer.


## 1) Install dependencies

```bash
npm install @kepler.gl/duckdb
```


## 2) Configure Kepler (required)

Call `initApplicationConfig` once before the map is used:

```js
import { initApplicationConfig } from '@kepler.gl/utils'
import { KeplerGlDuckDbTable, DuckDBWasmAdapter } from '@kepler.gl/duckdb'

initApplicationConfig({
  // Required: makes dataset ingestion and “add Arrow result to map” follow the DuckDB path.
  table: KeplerGlDuckDbTable,

  // Required: DuckDB-WASM adapter used by your custom editor.
  database: new DuckDBWasmAdapter({
    debug: false,
    config: {
      // Recommended for visualization: avoid bigint/decimal type issues downstream.
      query: { castBigIntToDouble: true }
    }
  }),

  // Recommended: DuckDB execution is async.
  useArrowProgressiveLoading: false
})
```

Notes:
- `DuckDBWasmAdapter` runs DuckDB in a Web Worker and provides `connect()` + `query()`.
- `KeplerGlDuckDbTable` controls how datasets are ingested into DuckDB and read back as Arrow.

### Under the hood (short)

- DuckDB runs in-browser via `@duckdb/duckdb-wasm` inside a Web Worker (the adapter selects the right WASM bundle and initializes the worker).
- Kepler switches its dataset storage path by swapping the table class to `KeplerGlDuckDbTable` via `initApplicationConfig`.
- Query results are passed to Kepler as Apache Arrow (`info.format = 'arrow'`) to avoid materializing large result sets into JS arrays.
- The SQL Panel path typically casts types for compatibility (e.g. geometry → WKB; bigint/decimal → double) and attaches GeoArrow metadata for geometry columns.

### `KeplerGlDuckDbTable` (what it actually changes)

- On dataset import/update, it creates (or replaces) a DuckDB table named after the dataset label.
- It can ingest rows, GeoJSON (via `ST_READ(..., keep_wkb=TRUE)`), or Arrow (via `insertArrowTable`), and it loads DuckDB’s `spatial` extension when needed.
- After ingestion, it runs a generated `SELECT` that casts types for Kepler (geometry → WKB, bigint/decimal → double, etc.) and returns an Arrow table.
- Kepler UI then uses Arrow `fields + cols` (and no JS `rows`), while DuckDB remains the source-of-truth for SQL.


## 3) Run DuckDB SQL from a custom UI and add the result to Kepler

Kepler’s built-in SQL Panel uses this approach:
- run SQL (optionally multiple statements)
- ensure the final statement is a `SELECT`
- materialize it into a temp table
- re-select with type casts (geometry → WKB; bigint/decimal → double)
- dispatch `addDataToMap` with `info.format = 'arrow'`

Minimal implementation:

```js
import { getApplicationConfig } from '@kepler.gl/utils'
import { addDataToMap } from '@kepler.gl/actions'
import { arrowSchemaToFields } from '@kepler.gl/processors'
import { generateHashId } from '@kepler.gl/common-utils'
import {
  getDuckDBColumnTypes,
  getDuckDBColumnTypesMap,
  castDuckDBTypesForKepler,
  setGeoArrowWKBExtension,
  splitSqlStatements,
  removeSQLComments,
  checkIsSelectQuery
} from '@kepler.gl/duckdb'

const TEMP_TABLE = 'temp_keplergl_table'

export async function runDuckDbSqlAndAddToMap ({ sql, label, dispatch }) {
  const db = getApplicationConfig().database
  if (!db) throw new Error('DuckDB is not configured')

  const cleaned = removeSQLComments(sql)
  if (!cleaned.trim()) throw new Error('Query is empty')

  const c = await db.connect()
  try {
    const statements = splitSqlStatements(cleaned)
    let arrowTable = null
    let tableDuckDBTypes = {}

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      const isLast = i === statements.length - 1

      if (isLast && (await checkIsSelectQuery(c, statement))) {
        await c.query(`CREATE OR REPLACE TABLE "${TEMP_TABLE}" AS ${statement}`)

        const duckDbColumns = await getDuckDBColumnTypes(c, TEMP_TABLE)
        tableDuckDBTypes = getDuckDBColumnTypesMap(duckDbColumns)

        const adjustedSql = castDuckDBTypesForKepler(TEMP_TABLE, duckDbColumns)
        arrowTable = await c.query(adjustedSql)
        setGeoArrowWKBExtension(arrowTable, duckDbColumns)

        await c.query(`DROP TABLE "${TEMP_TABLE}"`)
      } else {
        await c.query(statement)
      }
    }

    if (!arrowTable) {
      throw new Error('Last statement must be a SELECT')
    }

    const fields = arrowSchemaToFields(arrowTable, tableDuckDBTypes)

    dispatch(addDataToMap({
      datasets: [{
        info: { id: generateHashId(), label: label || 'query_result', format: 'arrow' },
        data: { fields, rows: arrowTable }
      }],
      options: {
        // Default is true in Kepler; include explicitly if you depend on it.
        autoCreateLayers: true
      }
    }))
  } finally {
    await c.close()
  }
}
```

What happens after `addDataToMap`:
- Kepler adds the dataset to state.
- If `options.autoCreateLayers !== false`, Kepler auto-creates a layer based on columns.


## 4) Pitfalls / workarounds

### 4.1 Arrow version mismatch

If your app bundle ends up with multiple `apache-arrow` versions, Arrow vector instances may become incompatible at runtime.

Workaround: pin `apache-arrow` to one version at the application `package.json`.

```json
"overrides": {
  "apache-arrow": "17.0.0"
}
```

### 4.2 Temp table collisions

If you allow concurrent runs, fixed temp table names (like `temp_keplergl_table`) can collide.

Workaround: include a run-scoped suffix in the temp table name.

### 4.3 Avoid Arrow → JS row materialization for large results

Avoid converting Arrow results to JS row arrays for large datasets. Prefer the Arrow-native payload (`format: 'arrow'`) shown above.
