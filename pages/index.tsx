import { Card, Note, Textarea } from '@geist-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import type { GetStaticPropsContext, NextPage } from 'next/types'
import { useEffect, useState } from 'react'
import { match } from 'ts-pattern'

import { ActionButtons } from '../components/ActionButtons'
import { Menu } from '../components/Menu'
import { ResultSet } from '../components/ResultSet'
import { SchemaTree } from '../components/SchemaTree'
import { useSQL } from '../hooks/useSQL'
import { decodeHash, encodeHash } from '../lib/base64'
import { getDefaultQuery } from '../lib/sql'

const Home: NextPage<{
  slug: string
}> = ({ slug }) => {
  const defaultState = {
    text: 'Write a quick description of your strategy!',
    defaultQuery: getDefaultQuery(),
  }

  const [text, setText] = useState(defaultState.text)
  const [queryDraft, setQueryDraft] = useState(defaultState.defaultQuery)
  const [slugLength, setSlugLength] = useState(0)

  useEffect(() => {
    if (slug) {
      setSlugLength(slug?.length || 0)

      const decodedState = decodeHash(slug)
      match(decodedState.status)
        .with('OK', () => {
          setText(decodedState.text)
          setQueryDraft(decodedState.queryDraft)
        })
        .otherwise(() => {})
    }
  }, [slug])

  const { setQuery, data, structureData, error } = useSQL({
    query: queryDraft,
    databasePath: '/static/fpl.db',
  })

  const { data: resultLastUpdated } = useSQL<{ lastUpdated: string }>({
    query: `SELECT strftime('%d.%m.%Y %H:%M:%S (local time)', datetime(lastUpdated, 'localtime')) as "lastUpdated" FROM meta;`,
    databasePath: '/static/fpl.db',
  })

  useEffect(() => {
    const urlStateHash = encodeHash({ text, queryDraft })
    setSlugLength(urlStateHash.length)
  }, [text, queryDraft])

  return (
    <div>
      <Head>
        <title>
          FPL.lol
          {match(Boolean(text))
            .with(true, () => ` - ${text}`)
            .with(false, () => '')
            .exhaustive()}
        </title>
        <meta
          name="description"
          content="FPL.lol - analyse fantasy premier league data with SQL"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="p-4 space-y-2">
        <Menu />

        <div className="flex flex-row flex-wrap gap-2">
          <div className="">
            <Note label="Data Source Credits">
              <Link
                href="https://github.com/vaastav/Fantasy-Premier-League"
                target="_blank"
              >
                https://github.com/vaastav/Fantasy-Premier-League
              </Link>
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
          text={text}
          slugLength={slugLength}
        ></ActionButtons>

        <Card className="space-x-2 flex-column">
          <Textarea
            type="success"
            height="150px"
            width="100%"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="m-2"></div>

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
          text={text}
          slugLength={slugLength}
        ></ActionButtons>

        {data && (
          <Card>
            <ResultSet data={data} />
          </Card>
        )}
      </main>
    </div>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { slug } = context.params || { slug: '' }
  return {
    props: {
      slug,
    },
    revalidate: 10,
  }
}

export default Home
