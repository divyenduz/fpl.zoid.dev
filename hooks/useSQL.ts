import { useState, useEffect } from "react"

import type {
    Database, QueryExecResult, SqlValue
} from 'sql.js'

interface UseSQLArgs {
    query: string
    databasePath: string
}

export function useSQL({ query: queryArg, databasePath }: UseSQLArgs) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [query, setQuery] = useState(queryArg)
    const [result, setResult] = useState<QueryExecResult[] | null>(null)

    const schemaQuery = 'SELECT sql as Schema FROM sqlite_master'
    const [schema, setSchema] = useState<SqlValue[] | null>(null)

    useEffect(() => {
        const load = async () => {
            setLoading(true)

            //@ts-ignore
            const initSqlJs = window.initSqlJs
            const SQL = await initSqlJs({
                locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.1/sql-wasm.wasm`,
            })

            const r = await fetch(databasePath)
            const db = await r.arrayBuffer()
            const database = new SQL.Database(new Uint8Array(db)) as Database
            try {
                const schema = database.exec(schemaQuery)
                setSchema(schema[0].values[0])

                const result = database.exec(query)
                setResult(result)
                setLoading(false)
                setError('')
            } catch (e: any) {
                console.log(e)
                setResult(null)
                setLoading(false)
                setError(e.toString())
            }
        }
        load()
    }, [query, databasePath])
    return {
        schema,
        result,
        loading,
        error,
        query,
        setQuery
    }
}