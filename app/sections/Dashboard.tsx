'use client'

import { Alert } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'
import { Card } from 'app/components/Card'
import { useState } from 'react'

import { ActionButtons } from '../components/ActionButtons'
import { Credit } from '../components/Credit'
import { ResultSet } from '../components/ResultSet'
import { useSQL } from '../hooks/useSQL'
import { getDefaultQuery } from '../lib/sql'

export const FPL_DB_PATH = '/assets/fpl.db'
export const SQL_WASM_WASM_PATH = '/assets/sql.js/1.8.0/sql-wasm.wasm'

interface Props {
  name?: string
  queryFromDatabase?: string
}

function Dashboard({ name, queryFromDatabase }: Props) {
  const [queryDraft, setQueryDraft] = useState<string>(
    queryFromDatabase || getDefaultQuery(),
  )
  const { data, error, query, setQuery } = useSQL({
    query: getDefaultQuery(),
    databasePath: FPL_DB_PATH,
    sqlWASMPath: SQL_WASM_WASM_PATH,
  })

  const { data: resultLastUpdated } = useSQL<{ lastUpdated: string }>({
    query: `SELECT strftime('%d.%m.%Y %H:%M:%S (local time)', datetime(lastUpdated, 'localtime')) as "lastUpdated" FROM meta;`,
    databasePath: FPL_DB_PATH,
    sqlWASMPath: SQL_WASM_WASM_PATH,
  })

  return (
    <div className="App">
      <main className="space-y-2">
        {name && <h1 className="text-2xl font-bold">{name}</h1>}

        <Credit lastUpdated={resultLastUpdated?.[0].lastUpdated}></Credit>

        {Boolean(error) && <Alert variant="destructive">{error}</Alert>}

        <Card title="Actions">
          <ActionButtons
            queryDraft={queryDraft}
            setQueryDraft={setQueryDraft}
            query={query}
            setQuery={setQuery}
          ></ActionButtons>
        </Card>

        <Card title="Query">
          <Textarea
            rows={100}
            cols={200}
            style={{ width: '100%', height: '450px', marginBottom: 10 }}
            value={queryDraft}
            onChange={(e) => {
              setQueryDraft(e.target.value)
            }}
          />
        </Card>

        {data && (
          <Card title="Results">
            <ResultSet data={data} />
          </Card>
        )}
      </main>
    </div>
  )
}

export default Dashboard
