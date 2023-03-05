import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { Menu } from '../components/Menu'
import { getPageData } from './[slug]'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>FPL.lol</title>
        <meta
          name="description"
          content="FPL.lol - analyse fantasy premier league data with SQL"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="p-4">
        <Menu />

        <h2>Top Strategies</h2>

        <Link href="/how-it-works">
          See how to submit a strategy for listing here.
        </Link>

        <ol>
          {getPageData().map((p) => (
            <li key={p.identifier}>
              <Link as={`/${p.slug}`} href="/[slug]">
                {p.text}
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </div>
  )
}

export default Home
