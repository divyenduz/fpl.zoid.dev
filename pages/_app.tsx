import { CssBaseline, GeistProvider, Themes } from '@geist-ui/react'
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

const customTheme = Themes.createFromLight({
  type: 'customTheme',
  palette: {
    foreground: '#0057B8', // Button background etc, primary color
    accents_1: '#0057B8', // On hover of table
    accents_5: '#FFD700', // Rows of the table header
    // accents_6: '#fff', // Rows of the table
    link: '#FFD700', // Just link, not button text
  },
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
