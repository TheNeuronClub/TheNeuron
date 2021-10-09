import 'tailwindcss/tailwind.css'
import '../styles/quill.snow.css'
import '../styles/global.css'
import { Provider } from 'react-redux'
import Router, { useRouter } from 'next/router'
import * as ga from '../lib/ga'
import { useEffect } from 'react'
import { store } from '../app/store'
import Head from 'next/head'
import ProgressBar from '@badrap/bar-of-progress'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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
    <Provider store={store}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div className="w-full relative min-h-screen flex flex-col justify-between max_w_3xl">
      {(router.pathname !== '/account/login' && router.pathname !== '/account/register') && <Navbar />}
      <Component {...pageProps} />
      {(router.pathname !== '/account/login' && router.pathname !== '/account/register') && <Footer />}
      </div>
    </Provider>
  )
}

export default MyApp

