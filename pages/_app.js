import 'tailwindcss/tailwind.css'
import '../styles/quill.snow.css'
import '../styles/global.css'
import { Provider } from 'react-redux'
import { Provider as AuthProvider } from "next-auth/client"
import Router, { useRouter } from 'next/router'
import * as ga from '../lib/ga'
import { useEffect } from 'react'
import { store } from '../app/store'
import ProgressBar from '@badrap/bar-of-progress'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import Layout from '../components/Layout'

const progress = new ProgressBar({
  size: 4,
  color: '#fff',
  className: "z-50",
  delay: 100
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <AnimatePresence exitBeforeEnter>
      <AnimateSharedLayout>
        <AuthProvider session={pageProps.session}>
          <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </AuthProvider>
      </AnimateSharedLayout>
    </AnimatePresence>
  )
}

export default MyApp

