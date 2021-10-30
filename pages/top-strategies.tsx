import type { NextPage } from 'next'
import Head from 'next/head'

import { Description } from '@geist-ui/react'

import { Menu } from '../components/Menu'

import Link from 'next/link'

const Home: NextPage = () => {
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
        <Menu />

        <h2>Top Strategies</h2>

        <Link href="/how-it-works">
          See how to submit a strategy for listing here.
        </Link>

        <ol>
          <li></li>
        </ol>
      </main>
    </div>
  )
}

export default Home
