import { Description } from '@geist-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { Menu } from '../components/Menu'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>FPL.cool</title>
        <meta
          name="description"
          content="FPL.cool - analyse fantasy premier league data with SQL"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="p-4">
        <Menu />

        <h2>How it works</h2>

        <Description
          title=""
          content={
            <p>
              <ol>
                <li>
                  Converts data from{' '}
                  <Link href="https://github.com/vaastav/Fantasy-Premier-League">
                    <a target="_blank">
                      https://github.com/vaastav/Fantasy-Premier-League
                    </a>
                  </Link>{' '}
                  to SQLite
                </li>
                <li>
                  Uses{' '}
                  <Link href="https://github.com/sql-js/sql.js">
                    <a target="_blank">https://github.com/sql-js/sql.js</a>
                  </Link>{' '}
                  to run it in browser
                </li>
                <li>
                  When you click save, the query and description is stored as
                  base64 in the URL. There is no backend and hence no analytics,
                  your strategy is private until you decide to share it.
                </li>
                <li>
                  Share the URL with your friends to discuss your FPL
                  strategies.
                </li>
                <li>
                  Share the URL with me on my{' '}
                  <Link href="https://twitter.com/divyenduz">
                    <a target="_blank">https://twitter.com/divyenduz</a>
                  </Link>
                  . I will collect and publish top strategies{' '}
                  <Link href="/top-strategies">here</Link>.
                </li>
              </ol>
            </p>
          }
        />
      </main>
    </div>
  )
}

export default Home
