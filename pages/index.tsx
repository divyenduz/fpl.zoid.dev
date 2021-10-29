import type { NextPage } from 'next'
import Head from 'next/head'
import {
  Card,
  Button,
  Note,
  Textarea,
  useToasts,
  useClipboard,
} from '@geist-ui/react'
import { useEffect, useState } from 'react'
import { useSQL } from '../hooks/useSQL'

import Editor from '../components/Editor'
import { ResultSet } from '../components/ResultSet'
import { useRouter } from 'next/router'
import {
  formatQuery,
  getDefaultQuery,
  getRowDataFromResultSet,
} from '../lib/sql'

function encodeHash(state: Record<any, any>) {
  return Buffer.from(JSON.stringify(state)).toString('base64')
}

function decodeHash(hash: string) {
  return JSON.parse(Buffer.from(hash, 'base64').toString())
}

const Home: NextPage<{
  slug: string
}> = ({ slug }) => {
  const router = useRouter()
  const [, setToast] = useToasts()
  const { copy } = useClipboard()

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
        <h1>Welcome to FPL.cool</h1>

        <Note label="Schema">{formatQuery(schema || '')}</Note>

        {Boolean(error) && (
          <Note type="error" label="Error">
            {error}
          </Note>
        )}

        <Card className="flex-column space-x-2">
          <Textarea
            type="success"
            height="200px"
            width="100%"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="m-2"></div>

          <Editor
            lang="sql"
            dialect="postgresql"
            theme="dark"
            style={{ width: '100%', height: '50vh', marginBottom: 10 }}
            value={queryDraft}
            onChange={(code: string) => {
              setQueryDraft(code)
            }}
          ></Editor>

          <div className="space-x-1">
            <Button
              shadow
              type="secondary"
              onClick={() => {
                setQueryDraft(formatQuery(queryDraft))
              }}
            >
              Format SQL
            </Button>

            <Button
              shadow
              type="secondary"
              onClick={() => {
                setQuery(queryDraft)
              }}
            >
              Execute
            </Button>

            <Button
              shadow
              type="secondary"
              onClick={() => {
                const urlStateHash = encodeHash({ text, queryDraft })

                const protocol = window.location.hostname.startsWith('local')
                  ? 'http://'
                  : 'https://'
                copy(protocol + window.location.host + '/' + urlStateHash)
                setToast({ text: 'URL copied to clipboard!' })

                router.replace(urlStateHash, undefined, {
                  shallow: true,
                })
              }}
            >
              Save and copy URL ({slugLength} / 2048)
            </Button>
          </div>
        </Card>

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
