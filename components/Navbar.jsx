import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { MenuAlt1Icon, XIcon } from '@heroicons/react/solid'
import { userSession } from '../lib/user-session'
import UserDropDown from './UserDropDown'
import { updateBalance } from '../slices/userBalance'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader'
import { signOut } from 'next-auth/client'
import { motion } from 'framer-motion'
import { fadeOut, pageTransition } from '../util'

function Navbar() {
    const router = useRouter();
    const session = userSession();
    const dispatch = useDispatch();
    const [scrolled, setScrolled] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const [isLoader, setIsLoader] = useState(false)

    const userSignOut = () => signOut();
    const logout = async () => {
        setIsLoader(true)
        window.localStorage.setItem('neuron-token', '');
        const res = await fetch(`/api/account/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: session?._id })
        });
        if (res.status === 200) {
            userSignOut();
        }
        setIsLoader(false)
    }

    const checkDailyVisit = async () => {
        const currentDate = new Date().toDateString();
        const res = await fetch(`/api/user/dailyVisit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: session._id, currentDate: currentDate })
        });
        const response = await res.json();
        if (res.status === 200) {
            toast("You've won 100 Neuron coins for daily visit! 🥳", {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(updateBalance(response.balance))
        }
    }

    useEffect(() => {
        if (session) {
            checkDailyVisit()
        }
    }, [session])

    const checkScrollTop = () => {
        if (window.pageYOffset > 75) {
            setScrolled(true)
        } else if (window.pageYOffset <= 75) {
            setScrolled(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop)
        return () => {
            window.removeEventListener('scroll', checkScrollTop)
        }
    }, [scrolled])

    return (
        <>
            <div style={{ zIndex: 45 }} className={`nav__bar flex items-center justify-between p-5 py-4 fixed w-full z-50 md:px-8 md:pr-16 lg:px-16 text-white ${(router.pathname !== '/' || scrolled) && 'gradient-bg gradient-shadow-md'}`}>
                <Link href="/">
                    <div className="relative cursor-pointer">
                        <picture>
                            <source media="(max-width: 640px)" srcSet="/favicon.png" />
                            <source media="(min-width: 640px)" srcSet="/images/beta-logo.png" />
                            <img src="/images/logo.png" layout="fill" className="h-12 w-12 sm:w-48 object-contain drop-shadow-md overflow-hidden" />
                        </picture>
                    </div>
                </Link>
                <div className="flex items-center">
                    <ul className="flex hidden md:block space-x-5 pr-6 font-medium text-lg">
                        <Link href="/question/">Explore</Link>
                        {session?.type === 'admin' && <Link href="/create_question">Create Question</Link>}
                        <Link href="/how_it_works">How it Works</Link>
                        {!session &&
                            <>
                                <Link href="/faq">FAQs</Link>
                                <Link href="/account/login">Login</Link>
                            </>
                        }
                    </ul>
                    {
                        session ?
                            <UserDropDown session={session} />
                            :
                            <>
                                <Link href="/account/register">
                                    <button className="btn hidden md:inline-block cursor-pointer active:scale-95 transition-sm">Get Started</button>
                                </Link>
                            </>
                    }

                    <MenuAlt1Icon className="w-10 h-10 ml-3 cursor-pointer md:hidden active:scale-95 transition-sm" onClick={() => setIsActive(true)} />
                </div>
            </div>

            {isActive &&
                <motion.div initial="initial"
                    animate="in"
                    exit="out"
                    variants={fadeOut}
                    transition={pageTransition} className="fixed md:hidden z-50 bg-white top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center">
                    <XIcon className="h-10 w-10 md:hidden absolute top-4 right-5 cursor-pointer active:scale-95 transition-sm" onClick={() => setIsActive(false)} />
                    <ul className="flex flex-col justify-center items-center text-3xl font-bold space-y-5">
                        <Link href="/question/">
                            <h1 className="text-gray-700 hover:text-blue-500 cursor-pointer transition-sm" onClick={() => setIsActive(false)} >Explore</h1>
                        </Link>
                        {session?.type === 'admin' &&
                            <Link href="/create_question">
                                <h1 className="text-gray-700 hover:text-blue-500 cursor-pointer transition-sm" onClick={() => setIsActive(false)} >Create Question</h1>
                            </Link>
                        }
                        <Link href="/how_it_works">
                            <h1 className="text-gray-700 hover:text-blue-500 cursor-pointer transition-sm" onClick={() => setIsActive(false)} >How it Works</h1>
                        </Link>
                        <Link href="/contact">
                            <h1 className="text-gray-700 hover:text-blue-500 cursor-pointer transition-sm" onClick={() => setIsActive(false)} >Contact us</h1>
                        </Link>
                        {
                            session ?
                                <button onClick={logout} className="font-bold" > <h1 className="text-gray-700 hover:text-blue-500 cursor-pointer transition-sm" onClick={() => setIsActive(false)} >Logout</h1> </button>
                                :
                                <Link href="/account/register">
                                    <h1 className="text-gray-700 hover:text-blue-500 cursor-pointer transition-sm" onClick={() => setIsActive(false)} >Get Started</h1>
                                </Link>
                        }
                    </ul>
                </motion.div>
            }
            <ToastContainer style={{ textAlign: "center", zIndex: '49' }} />
            {isLoader && <div className=" w-full h-full bg-white bg-opacity-80 grid place-items-center fixed top-0 right-0">
                <Loader />
            </div>}
        </>
    )
}

export default Navbar
