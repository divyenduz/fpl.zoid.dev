import type { NextPage } from 'next'
import Head from 'next/head'
import { Card, Note, Textarea } from '@geist-ui/react'
import { useEffect, useState } from 'react'
import { useSQL } from '../hooks/useSQL'

import Editor from '../components/Editor'
import { ResultSet } from '../components/ResultSet'
import { SchemaTree } from '../components/SchemaTree'
import { Menu } from '../components/Menu'

import Link from 'next/link'

import { getDefaultQuery, getRowDataFromResultSet } from '../lib/sql'
import { decodeHash, encodeHash } from '../lib/base64'
import { ActionButtons } from '../components/ActionButtons'

const Home: NextPage<{
  slug: string
}> = ({ slug }) => {
  let defaultState = {
    text: 'Write a quick description of your strategy!',
    defaultQuery: getDefaultQuery(),
  }
  if (slug) {
    const decodedState = decodeHash(slug)
    defaultState = {
      text: decodedState.text,
      defaultQuery: decodedState.queryDraft,
    }
  }

  const [slugLength, setSlugLength] = useState(slug?.length || 0)

  const [text, setText] = useState(defaultState.text)
  const [queryDraft, setQueryDraft] = useState(defaultState.defaultQuery)

  const { setQuery, result, schema, structure, error } = useSQL({
    query: queryDraft,
    databasePath: '/static/fpl.db',
  })

  const columns = result?.[0]?.columns || []
  const data = getRowDataFromResultSet(columns, result || [])

  const structureColumns = structure?.[0]?.columns || []
  let structureData = getRowDataFromResultSet(structureColumns, structure || [])

  useEffect(() => {
    const timer = setInterval(() => {
      const urlStateHash = encodeHash({ text, queryDraft })
      setSlugLength(urlStateHash.length)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  })

  return (
    <div>
      <Head>
        <title>FPL.cool</title>
        <meta
          name="description"
          content="FPL.cool - analyse fantasy premier league data with SQL"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 space-y-2">
        <Menu />

        <div className="flex flex-row space-x-2">
          <div className="">
            <Note label="Data Source Credits">
              <Link href="https://github.com/vaastav/Fantasy-Premier-League">
                <a target="_blank">
                  https://github.com/vaastav/Fantasy-Premier-League
                </a>
              </Link>
            </Note>
          </div>
          <div className="">
            <Note label="Last Updated">GW10</Note>
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
          text={text}
          slugLength={slugLength}
        ></ActionButtons>

        <Card className="flex-column space-x-2">
          <Textarea
            type="success"
            height="150px"
            width="100%"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="m-2"></div>

          <Editor
            lang="sql"
            dialect="postgresql"
            theme="dark"
            style={{ width: '100%', height: '450px', marginBottom: 10 }}
            value={queryDraft}
            onChange={(code: string) => {
              setQueryDraft(code)
            }}
          ></Editor>
        </Card>

        <ActionButtons
          queryDraft={queryDraft}
          setQueryDraft={setQueryDraft}
          setQuery={setQuery}
          text={text}
          slugLength={slugLength}
        ></ActionButtons>

        {data && (
          <Card>
            <ResultSet columns={columns} data={data} />
          </Card>
        )}
      </main>
    </div>
  )
}

Home.getInitialProps = ({ query }) => {
  let slug = query.slug as string
  return {
    slug,
  }
}

export default Home
