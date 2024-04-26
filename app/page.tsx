'use client'

import { Alert } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

import { ActionButtons } from './components/ActionButtons'
import { Credit } from './components/Credit'
import { Menu } from './components/Menu'
import { ResultSet } from './components/ResultSet'
import { SchemaTree } from './components/SchemaTree'
import { useSQL } from './hooks/useSQL'
import './index.css'
import { getAllColumns, getDefaultQuery } from './lib/sql'

export const AppCss = {
  Card: `w-full p-2 overflow-hidden border-2 border-gray-100 border-solid rounded-[5px]`,
  NoteCss: `font-bold`,
}

const FPL_DB_PATH = '/assets/fpl.db'
const SQL_WASM_WASM_PATH = '/assets/sql.js/1.8.0/sql-wasm.wasm'

function App() {
  const [queryDraft, setQueryDraft] = useState<string>(getDefaultQuery())
  const { data, error, setQuery } = useSQL({
    query: getDefaultQuery(),
    databasePath: FPL_DB_PATH,
    sqlWASMPath: SQL_WASM_WASM_PATH,
  })

  const { data: resultLastUpdated } = useSQL<{ lastUpdated: string }>({
    query: `SELECT strftime('%d.%m.%Y %H:%M:%S (local time)', datetime(lastUpdated, 'localtime')) as "lastUpdated" FROM meta;`,
    databasePath: FPL_DB_PATH,
    sqlWASMPath: SQL_WASM_WASM_PATH,
  })

  const { data: structureData } = useSQL<{
    tableName: string
    columnName: string
  }>({
    query: getAllColumns(),
    databasePath: FPL_DB_PATH,
    sqlWASMPath: SQL_WASM_WASM_PATH,
  })

  return (
    <div className="App">
      <div>
        <Menu />

        <main className="my-4 space-y-2">
          <Credit lastUpdated={resultLastUpdated?.[0].lastUpdated}></Credit>

          <div className={AppCss.Card}>
            <label className={AppCss.NoteCss}>Database Schema:</label>
            <SchemaTree data={structureData} />
          </div>

          {Boolean(error) && <Alert variant="destructive">{error}</Alert>}

          <div className={AppCss.Card}>
            <Textarea
              rows={100}
              cols={200}
              style={{ width: '100%', height: '450px', marginBottom: 10 }}
              value={queryDraft}
              onChange={(e) => {
                setQueryDraft(e.target.value)
              }}
            />
          </div>

          <ActionButtons
            queryDraft={queryDraft}
            setQueryDraft={setQueryDraft}
            setQuery={setQuery}
          ></ActionButtons>

          {data && (
            <div className={AppCss.Card}>
              <ResultSet data={data} />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
