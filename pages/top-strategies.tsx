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
          <li>
            Top 15 by points sorted by ROI + ROM{' '}
            <Link href="https://bit.ly/3bGPqJH">
              <a target="_blank">https://bit.ly/3bGPqJH</a>
            </Link>
          </li>
          <li>
            Top 15 by points sorted by ROI{' '}
            <Link href="https://bit.ly/3bKUTiy">
              <a target="_blank">https://bit.ly/3bKUTiy</a>
            </Link>
          </li>
          <li>
            Top 15 by points sorted by ROM{' '}
            <Link href="https://bit.ly/3mNyHuD">
              <a target="_blank">https://bit.ly/3mNyHuD</a>
            </Link>
          </li>
        </ol>
      </main>
    </div>
  )
}

export default Home
