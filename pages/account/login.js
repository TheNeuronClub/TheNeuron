import { GlobeAltIcon, LockClosedIcon, MailIcon, UserIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Router from "next/router"
import { useState, useEffect } from 'react'
import { userSession } from '../../lib/user-session'
import { signIn, useSession } from "next-auth/client"
import { motion } from 'framer-motion'
import { countries, pageTransition, pageZoom } from '../../util'

function login() {
    const user = userSession();
    const [session] = useSession();
    useEffect(() => {
        if (user) {
            Router.push('/')
        }
        else if (session) {
            socialSignin()
        }
    }, [user, session])

    const [isSending, setIsSending] = useState(false)
    const [isNew, setIsNew] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [isVerified, setIsVerified] = useState(true);
    const [data, setData] = useState({
        email: session?.user?.email || '',
        password: ''
    })

    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
        setIsValid(true)
    }

    const login = async (data, url) => {
        const res = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const response = await res.json();
        if (res.status === 200) {
            window.localStorage.setItem('neuron-token', JSON.stringify(response.token))
            window.localStorage.setItem('neuron-newUser', JSON.stringify(response.newUser))
            Router.push('/')
        } else if (res.status === 203) {
            setIsVerified(false)
        }
        // else if (res.status === 401) {
        //     setIsNew(true)
        // }
        else {
            setIsValid(false);
            console.log("User Unauthorized")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        if (data.email && data.password) {
            await login(data, '/api/account/login');
        }
        setIsSending(false)
    }

    const socialSignin = async () => {
        setIsSending(true);
        if (session?.user) {
            await login(session?.user, '/api/account/login?type=social');
        }
        setIsSending(false)
    }
    useEffect(() => {
        if (session) {
            socialSignin()
        }
    }, [session])
    
    return (
        <>
            <div className="min-h-screen w-full">
                <Head>
                    <title>TheNeuron | Login</title>
                </Head>
                <div className="md:flex relative min-h-screen">
                    <div className="min-h-[300px] p-7 gradient-bg w-full flex flex-col items-center justify-end md:justify-center">
                        <Link href="/">
                            <div className="absolute top-5 left-5 cursor-pointer">
                                <div className="relative h-12 w-48">
                                    <Image src="/images/logo.png" layout="fill" objectFit="contain" className="drop-shadow-md overflow-hidden" />
                                </div>
                            </div>
                        </Link>
                        <div className="max-w-sm lg:max-w-md text-white">
                            <h1 className="text-3xl md:text-5xl mb-3 font-semibold">Start Predicting Now</h1>
                            <p className="text-lg md:text-xl">Join TheNeuron.club to bet directly on the outcome of events. Use your know-how to predict global events across categories and win rewards</p>
                        </div>
                    </div>
                    <motion.div initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageZoom}
                        transition={pageTransition} className="flex flex-col items-center w-full justify-center p-10 px-5">
                        {isVerified ?
                            <form className="max-w-lg p-10 min-w-[350px] bg-white gradient-shadow" onSubmit={handleSubmit}>
                                {!isValid && <p className="text-xs text-red-400 mb-2">Invalid Credentials </p>}
                                {isNew && <p className="text-sm text-center text-green-500 mb-2">Welcome {session?.user?.name} </p>}
                                {
                                    isNew ?
                                        <>
                                            <div className="flex border-b border-gray-700 py-2 mb-4">
                                                <UserIcon className="h-6" />
                                                <input onChange={handleChange} className="outline-none flex-grow px-2" type="text" name="username" minLength="5" value={data.username} required placeholder="Create Username " />
                                            </div>
                                            <div className="flex border-b border-gray-700 py-2 my-4">
                                                <GlobeAltIcon className="h-6" />
                                                <select onChange={handleChange} className="outline-none flex-grow px-2" type="country" name="country" value={data.country} required placeholder="Country ">
                                                    <option value="" disabled>Country </option>
                                                    {countries.map((country, i) => <option key={i} value={country.country} >{country.country}</option>)}
                                                </select>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className="flex border-b-2 border-gray-700 py-2 mb-6">
                                                <MailIcon className="h-6" />
                                                <input onChange={handleChange} className="outline-none flex-grow px-2" type="text" name="email" value={data.email} required placeholder="Email Address... " />
                                            </div>
                                            <div className="flex border-b-2 border-gray-700 py-2 my-6">
                                                <LockClosedIcon className="h-6" />
                                                <input onChange={handleChange} className="outline-none flex-grow px-2" type="password" name="password" value={data.password} required placeholder="Password " />
                                            </div>
                                        </>
                                }

                                <h1><a href="/account/forget_password" className="text-blue-500 font-medium">Forget Password ?</a></h1>
                                <div className="flex items-center space-x-2 mt-2">
                                    <input className="w-4 h-4" type="checkbox" />
                                    <h1>Remember me</h1>
                                </div>
                                <button type="submit" className="w-full px-6 py-3 text-lg text-white font-semibold rounded-md my-4 gradient-bg focus:border-none focus:outline-none active:scale-95 transition-sm">{isSending ? 'Wait...' : 'Login'}</button>
                                <h1>Don't have an account ?&nbsp;<a href="/account/register" className="text-blue-500 font-medium">Register</a></h1>
                            </form>
                            :
                            <h1 className="text-center max-w-xl p-7 text-3xl font-semibold text-blue-500 bg-white py-10 gradient-shadow">User aleady registered, Verify your email to continue</h1>
                        }
                        <h1 className="text-xl font-medium mt-6 tracking-wide text-gray-700">Or Login With </h1>
                        <div className="flex items-center">
                            <button className="signup__btn border-gray-500 hover:bg-gray-800" onClick={() => signIn('google')}>
                                <img src="/images/google.svg" alt="" className="w-10 h-10" />
                                <span>Google</span>
                            </button>
                            <button className="signup__btn border-blue-500 hover:gradient-bg" onClick={() => signIn('facebook')}>
                                <img src="/images/facebook.svg" alt="" className="w-10 h-10" />
                                <span>Facebook</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default login
