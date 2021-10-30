import type { NextPage } from 'next'
import Head from 'next/head'
import { Button, Card, Note, Textarea } from '@geist-ui/react'
import { useEffect, useState } from 'react'
import { useSQL } from '../hooks/useSQL'

import Editor from '../components/Editor'
import { ResultSet } from '../components/ResultSet'

import Link from 'next/link'

import {
  formatQuery,
  getDefaultQuery,
  getRowDataFromResultSet,
} from '../lib/sql'
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

  const { setQuery, result, schema, error } = useSQL({
    query: queryDraft,
    databasePath: '/static/fpl.db',
  })

  const columns = result?.[0]?.columns || []
  const data = getRowDataFromResultSet(columns, result || [])

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

      <main className="p-4">
        <div className="m-4">
          <Link href="/" passHref>
            <Button type="secondary">FPL.cool Home</Button>
          </Link>
        </div>

        <Note label="Data Source Credits">
          <Link href="https://github.com/vaastav/Fantasy-Premier-League">
            <a target="_blank">
              https://github.com/vaastav/Fantasy-Premier-League
            </a>
          </Link>
        </Note>

        <Note label="Schema">{formatQuery(schema || '')}</Note>

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
