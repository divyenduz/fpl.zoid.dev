import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'

import { GeistProvider, CssBaseline } from '@geist-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider>
      <CssBaseline />
      <Component {...pageProps} />
      <script
        async
        src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.1/sql-wasm.js"
      ></script>
    </GeistProvider>
  )
}

export default MyApp
