import '@/styles/globals.css'
import Layout from './container/Layout'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Layout />
    </>
  )
}
