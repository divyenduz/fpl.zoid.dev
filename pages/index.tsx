import type { NextPage } from 'next'
import Head from 'next/head'
import { Card, Button, Table } from '@geist-ui/react'
import { useEffect, useState } from 'react'
import { useSQL } from '../hooks/useSQL'

import Editor from '../components/Editor'
import { useRouter } from 'next/router'
import { format } from 'sql-formatter'

const Home: NextPage<{
  slug: string
}> = ({ slug }) => {
  const router = useRouter()

  let defaultQuery = `SELECT
	first_name,
	second_name,
	total_points,
	element_type AS position,
	minutes,
	now_cost AS price,
	influence,
	threat,
	creativity
FROM
	players
WHERE
	position = 'GK'
ORDER BY
	CAST(total_points AS INTEGER)
	DESC,
	CAST(minutes AS INTEGER)
	DESC
LIMIT 20`
  if (slug) {
    defaultQuery = Buffer.from(slug, 'base64').toString()
  }

  const [queryDraft, setQueryDraft] = useState(defaultQuery)

  const { query, setQuery, result, schema, error } = useSQL({
    query: queryDraft,
    databasePath: '/static/fpl.db',
  })

  console.log({ error })

  useEffect(() => {
    const urlStateHash = Buffer.from(query).toString('base64')
    router.replace(urlStateHash, undefined, {
      shallow: true,
    })
  }, [query])

  //@ts-expect-error
  const columns = result?.[0]?.columns
  //@ts-expect-error
  const data = result?.[0]?.values.map((row: string[]) => {
    return row.reduce((acc, column: string, index) => {
      return {
        ...acc,
        [`${columns[index]}`]: column,
      }
    }, {})
  })

  const TableResultSet = ({ data }: { data: any }) => {
    return (
      <Table data={data}>
        {columns.map((c: string, index: number) => {
          return (
            <Table.Column
              key={c.concat(index.toString())}
              prop={c}
              label={c}
            ></Table.Column>
          )
        })}
      </Table>
    )
  }

  return (
    <div>
      <Head>
        <title>FPL.cool</title>
        <meta
          name="description"
          content="fpl.cool - analyse fantasy premier league data with SQL"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to fpl.cool</h1>

        {schema}

        <Card>
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

          <Button
            shadow
            type="secondary"
            onClick={() => {
              try {
                setQueryDraft(
                  format(queryDraft, {
                    language: 'postgresql',
                    uppercase: true,
                  })
                )
              } catch (e) {
                console.error(`Failed to format SQL`)
                console.error(e)
              }
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
        </Card>

        {data && (
          <Card>
            <TableResultSet data={data} />
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
