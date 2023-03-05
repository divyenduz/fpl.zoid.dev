import { useEffect, useState } from 'react'
import type { Database, QueryExecResult, SqlValue } from 'sql.js'

import { getAllColumns, getRowDataFromResultSet } from '../lib/sql'

interface UseSQLArgs {
  query: string
  databasePath: string
}

export function useSQL<T = Record<string, string>>({
  query: queryArg,
  databasePath,
}: UseSQLArgs) {
  const [retryCount, setRetryCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [query, setQuery] = useState(queryArg)
  const [result, setResult] = useState<QueryExecResult[] | null>(null)

  const schemaQuery = 'SELECT sql as Schema FROM sqlite_master'
  const [schema, setSchema] = useState<string | null>(null)

  const structureQuery = getAllColumns()
  const [structure, setStructure] = useState<QueryExecResult[] | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setRetryCount(retryCount + 1)
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const load = async () => {
      setLoading(true)

      //@ts-ignore
      const initSqlJs = window.initSqlJs

      if (!initSqlJs) {
        return
      }

      const SQL = await initSqlJs({
        locateFile: (file: string) =>
          `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.1/sql-wasm.wasm`,
      })

      const r = await fetch(databasePath)
      const db = await r.arrayBuffer()
      const database = new SQL.Database(new Uint8Array(db)) as Database

      try {
        const schema = database.exec(schemaQuery)
        setSchema(schema[0].values[0]?.[0]?.toString() || '')

        const structure = database.exec(structureQuery)
        setStructure(structure)

        if (query) {
          const result = database.exec(query)
          setResult(result)
        }
        setLoading(false)
        setError('')
      } catch (e: any) {
        setResult(null)
        setLoading(false)
        setError(e.toString())
      }
    }
    load()
  }, [retryCount, query, databasePath, structureQuery])

  const columns = result?.[0]?.columns || []
  const data = getRowDataFromResultSet(columns, result || [])

  const structureColumns = structure?.[0]?.columns || []
  const structureData = getRowDataFromResultSet(
    structureColumns,
    structure || [],
  )

  return {
    schema,
    structureData,
    data: data as T[],
    loading,
    error,
    query,
    setQuery,
  }
}
