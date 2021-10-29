import { useState, useEffect } from "react"

interface UseSQLArgs {
    query: string
    databasePath: string
}

export function useSQL({ query: queryArg, databasePath }: UseSQLArgs) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [query, setQuery] = useState(queryArg)
    const [result, setResult] = useState(null)

    const schemaQuery = 'SELECT sql as Schema FROM sqlite_master'
    const [schema, setSchema] = useState(null)

    useEffect(() => {
        const load = async () => {
            //@ts-ignore
            const initSqlJs = window.initSqlJs
            const SQL = await initSqlJs({
                locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.1/sql-wasm.wasm`,
            })

            const r = await fetch(databasePath)
            const db = await r.arrayBuffer()
            const database = new SQL.Database(new Uint8Array(db))
            try {
                const schema = database.exec(schemaQuery)
                setSchema(schema[0].values[0])

                const result = database.exec(query)
                setResult(result)
                setLoading(false)
            } catch (e: any) {
                console.log(e)
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