import Head from 'next/head'
import { useRouter } from 'next/router'
import Navbar from './Navbar'
import Footer from './Footer'
import { getLoader } from '../slices/loader'
import Loader from './Loader'
import { useSelector } from 'react-redux'

export default function Layout({ children }) {
    const router = useRouter()
    const loader = useSelector(getLoader)

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <img style={{ zIndex: -1 }} className='fixed w-full h-full m-0 object-contain filter saturate-200 max_w_3xl overflow-hidden' src="/ani.svg" alt="" />
            <div className="relative w-full h-screen min-h-screen max-h-screen overflow-y-scroll bg-transparent flex flex-col justify-between max_w_3xl" id='mainWindow'>
                <div className="bg-contain w-full h-full top-0 left-0 right-0 bottom-0 fixed gradient-dark" style={{ zIndex: '-10' }}></div>
                {loader && <div className=" w-full h-screen blur-black grid place-items-center fixed inset-0 z-50 max_w_3xl"><Loader /> </div>}
                {(router.pathname !== '/account/login' && router.pathname !== '/account/register') && <Navbar />}
                <main>{children}</main>
                {(router.pathname !== '/account/login' && router.pathname !== '/account/register') && <Footer />}
            </div>
        </>
    )
}