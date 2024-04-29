import Script from 'next/script'
import 'tailwindcss/tailwind.css'

import { Providers } from './Providers'
import './globals.css'
import { Menu } from './sections/Menu'

const FAVICON_PATH = '/assets/favicon.png'
const SQL_WASM_JS_PATH = '/assets/sql.js/1.8.0/sql-wasm.js'

export const metadata = {
  title: 'FPL.zoid.dev - analyse fantasy premier league data with SQL',
  description: 'FPL.zoid.dev - analyse fantasy premier league data with SQL',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={FAVICON_PATH} />
        <Script src={SQL_WASM_JS_PATH}></Script>
      </head>
      <body className="flex flex-col items-center justify-center pt-4 lg:mx-32">
        <Providers>
          <div className="mb-2">
            <Menu />
          </div>
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  )
}
