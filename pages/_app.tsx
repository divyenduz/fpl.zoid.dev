import { CssBaseline, GeistProvider, Themes } from '@geist-ui/react'
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

const customTheme = Themes.createFromLight({
  type: 'customTheme',
  palette: {},
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider themes={[customTheme]} themeType="customTheme">
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
