import { Card, Note, Textarea } from '@geist-ui/react'
import { CssBaseline, GeistProvider, Themes } from '@geist-ui/react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import 'tailwindcss/tailwind.css'

import { ActionButtons } from '../components/ActionButtons'
import { Menu } from '../components/Menu'
// import { Menu } from '../components/Menu'
import { ResultSet } from '../components/ResultSet'
import { SchemaTree } from '../components/SchemaTree'
import { useSQL } from '../hooks/useSQL'
import { getAllColumns, getDefaultQuery } from '../lib/sql'
import './App.css'
import FAVICON_PATH from './assets/favicon.png'
import FPL_DB_PATH from './assets/fpl.db?url'
import SQL_WASM_JS_PATH from './assets/sql.js/1.8.0/sql-wasm.js?url'
import SQL_WASM_WASM_PATH from './assets/sql.js/1.8.0/sql-wasm.wasm?url'

const customTheme = Themes.createFromLight({
  type: 'customTheme',
  palette: {},
})

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
    <GeistProvider themes={[customTheme]} themeType="customTheme">
      <CssBaseline />
      <div className="App">
        <div>
          <Helmet>
            <link rel="icon" href={FAVICON_PATH} />
            <script src={SQL_WASM_JS_PATH}></script>
          </Helmet>

          <Menu />

          <main className="p-4 space-y-2">
            <div className="flex flex-row flex-wrap gap-2">
              <div className="">
                <Note label="Data Source Credits">
                  <a
                    href="https://github.com/vaastav/Fantasy-Premier-League"
                    target="_blank"
                  >
                    https://github.com/vaastav/Fantasy-Premier-League
                  </a>
                </Note>
              </div>
              <div className="">
                <Note label="Last Updated">
                  {resultLastUpdated?.[0].lastUpdated || 'Loading'}
                </Note>
              </div>
            </div>

            <Note label="Database Schema">
              <SchemaTree data={structureData} />
            </Note>

            {Boolean(error) && (
              <Note type="error" label="Error">
                {error}
              </Note>
            )}

            <ActionButtons
              queryDraft={queryDraft}
              setQueryDraft={setQueryDraft}
              setQuery={setQuery}
            ></ActionButtons>

            <Card className="space-x-2 flex-column">
              <Textarea
                type="success"
                rows={100}
                cols={200}
                style={{ width: '100%', height: '450px', marginBottom: 10 }}
                value={queryDraft}
                onChange={(e) => {
                  setQueryDraft(e.target.value)
                }}
              />
            </Card>

            <ActionButtons
              queryDraft={queryDraft}
              setQueryDraft={setQueryDraft}
              setQuery={setQuery}
            ></ActionButtons>

            {data && (
              <Card>
                <ResultSet data={data} />
              </Card>
            )}
          </main>
        </div>
      </div>
    </GeistProvider>
  )
}

export default App
