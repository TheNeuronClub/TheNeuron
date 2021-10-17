import { LockClosedIcon, MailIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Router from "next/router"
import { useState, useEffect } from 'react'
import { userSession } from '../../lib/user-session'
import { useSession } from "next-auth/client"

function login() {
    const user = userSession();
    const [session] = useSession();
    useEffect(() => {
        if (user) {
            Router.push('/')
        }
    }, [user])

    useEffect(() => {
        if (session) {
            setData({ email: session?.user?.email})
        }
    }, [])

    const [isSending, setIsSending] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [isVerified, setIsVerified] = useState(true);
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
        setIsValid(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        const res = await fetch(`/api/account/login`, {
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
        } else {
            setIsValid(false);
            console.log("User Unauthorized")
        }
        setIsSending(false)
    }
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
                            <h1 className="text-3xl md:text-5xl mb-3 font-semibold">Start Betting Now</h1>
                            <p className="text-lg md:text-xl">Join TheNeuron.club to bet directly on the outcome of events. Use your know-how to predict global events across categories and win rewards</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-full justify-center p-10 px-5">
                        {isVerified ?
                            <form className="max-w-lg p-10 min-w-[350px] bg-white gradient-shadow" onSubmit={handleSubmit}>
                                {!isValid && <p className="text-xs text-red-400 mb-2">Invalid Credentials </p>}
                                <div className="flex border-b-2 border-gray-700 py-2 mb-6">
                                    <MailIcon className="h-6" />
                                    <input onChange={handleChange} className="outline-none flex-grow px-2" type="text" name="email" value={data.email} required placeholder="Email or Username " />
                                </div>
                                <div className="flex border-b-2 border-gray-700 py-2 my-6">
                                    <LockClosedIcon className="h-6" />
                                    <input onChange={handleChange} className="outline-none flex-grow px-2" type="password" name="password" value={data.password} required placeholder="Password " />
                                </div>

                                <h1><a href="/account/forget_password" className="text-blue-500 font-medium">Forget Password ?</a></h1>
                                <div className="flex items-center space-x-2 mt-2">
                                    <input className="w-4 h-4" type="checkbox" />
                                    <h1>Remember me</h1>
                                </div>
                                <button type="submit" className="w-full px-6 py-3 text-lg text-white font-semibold rounded-md my-4 gradient-bg focus:border-none focus:outline-none active:scale-95 transition-sm">{isSending ? 'Wait...' : 'Login'}</button>
                                <h1>Don't have an account ? <a href="/account/register" className="text-blue-500 font-medium">Register</a></h1>
                            </form>
                            :
                            <h1 className="text-center max-w-xl p-7 text-3xl font-semibold text-blue-500 bg-white py-10 gradient-shadow">User aleady registered, Verify your email to continue</h1>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default login
