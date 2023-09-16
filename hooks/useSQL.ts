import { useEffect, useState } from 'react'
import { type Database, type QueryExecResult, SqlJsStatic } from 'sql.js'

import { getRowDataFromResultSet } from '../lib/sql'

interface UseSQLArgs {
  query: string
  databasePath: string
  sqlWASMPath: string
}

export function useSQL<T = Record<string, string>>({
  query: queryArg,
  databasePath,
  sqlWASMPath,
}: UseSQLArgs) {
  const [SQL, setSQL] = useState<SqlJsStatic | null>(null)
  const [error, setError] = useState('')
  const [query, setQuery] = useState(queryArg)
  const [result, setResult] = useState<QueryExecResult[]>([])

  useEffect(() => {
    const load = async () => {
      const initSqlJs = window.initSqlJs

      if (!initSqlJs) {
        console.error(`Failed to load SQL.js`)
        return
      }

      const SQL = await initSqlJs({
        locateFile: (url, scriptDirectory) => {
          return sqlWASMPath
        },
      })
      setSQL(SQL)
    }

    setTimeout(() => {
      load()
    }, 50)
  }, [])

  useEffect(() => {
    const load = async () => {
      if (!SQL) {
        console.error(`Failed to initialize SQL.js`)
        return
      }

      const r = await fetch(databasePath)
      const db = await r.arrayBuffer()
      const database = new SQL.Database(new Uint8Array(db)) as Database

      try {
        if (query) {
          const result = database.exec(query)
          setResult(result)
        }
        setError('')
      } catch (e: any) {
        setResult([])
        setError(e.toString())
      }
    }
    load()
  }, [query, databasePath, SQL])

  const columns = result?.[0]?.columns || []
  const data = getRowDataFromResultSet(columns, result || [])

  return {
    data: data as T[],
    error,
    setQuery,
  }
}
