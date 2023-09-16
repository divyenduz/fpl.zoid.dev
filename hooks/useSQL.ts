import { useEffect, useState } from 'react'
import type { Database, QueryExecResult, SqlValue } from 'sql.js'

import { getRowDataFromResultSet } from '../lib/sql'

interface UseSQLArgs {
  query: string
  databasePath: string
}

export function useSQL<T = Record<string, string>>({
  query: queryArg,
  databasePath,
}: UseSQLArgs) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState(queryArg)
  const [result, setResult] = useState<QueryExecResult[]>([])

  useEffect(() => {
    const load = async () => {
      setLoading(true)

      const initSqlJs = window.initSqlJs

      if (!initSqlJs) {
        console.error(`Failed to load SQL.js`)
        return
      }

      const SQL = await initSqlJs({
        locateFile: (url, scriptDirectory) => {
          return `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.wasm`
        },
      })

      const r = await fetch(databasePath)
      const db = await r.arrayBuffer()
      const database = new SQL.Database(new Uint8Array(db)) as Database

      try {
        if (query) {
          const result = database.exec(query)
          setResult(result)
        }
        setLoading(false)
        setError('')
      } catch (e: any) {
        setResult([])
        setLoading(false)
        setError(e.toString())
      }
    }
    load()
  }, [query, databasePath])

  const columns = result?.[0]?.columns || []
  const data = getRowDataFromResultSet(columns, result || [])

  return {
    data: data as T[],
    loading,
    error,
    setQuery,
  }
}
