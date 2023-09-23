import '@/styles/globals.css'
import Layout from './container/Layout'
import { CartProvider } from '@/Context/Cartcontext'

export default function App({ Component, pageProps }) {
  return (
    <>
      <CartProvider>
      <Layout />
      <Component {...pageProps} />
      </CartProvider>
    </>
  )
}
