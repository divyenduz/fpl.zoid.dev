import { useEffect, useState } from 'react'
import { type QueryExecResult, SqlJsStatic } from 'sql.js'

import { getRowDataFromResultSet } from '../lib/sql'
import { Effect } from 'effect'
import {
  DatabaseService,
  DatabaseServiceLive,
} from '../effects/DatabaseService'

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
    }, 500)
  }, [])

  useEffect(() => {
    const load = async () => {
      if (!SQL) {
        console.error(`Failed to initialize SQL.js`)
        return
      }

      const program = DatabaseService.pipe(
        Effect.flatMap((databaseService) => {
          const database = databaseService.database(SQL, databasePath)
          return database.pipe(
            Effect.flatMap((database) => {
              return databaseService.executeQuery(database, query)
            }),
          )
        }),
      )
      const runnable = Effect.provide(program, DatabaseServiceLive)
      const r = Effect.match(runnable, {
        onFailure: (e) => {
          setError(e.message)
          setResult([])
        },
        onSuccess: (result) => {
          setResult(result)
          setError('')
        },
      })
      Effect.runPromise(r)
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
