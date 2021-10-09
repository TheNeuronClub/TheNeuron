import { GlobeAltIcon, LockClosedIcon, MailIcon, UserIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { countries } from '../../util'
import { userSession } from '../../lib/user-session'
import Router from 'next/router'

function register() {
    const session = userSession();
    useEffect(() => {
        if (session) {
            Router.push('/')
        }
    }, [session])


    const [isSending, setIsSending] = useState(false)
    const [isForm, setIsForm] = useState(true);
    const [isEmail, setIsEmail] = useState(false)
    const [isUsername, setIsUsername] = useState(false)
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        country: 'Sweden'
    })

    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        const res = await fetch(`/api/account/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (res.status == 421) {
            setIsEmail(true);
        }
        else if (res.status == 422) {
            setIsUsername(true);
        }
        else if (res.status == 201) {
            setIsForm(false);
        } else {
            console.log("Unable to register user")
        }
        setIsSending(false)
    }
    return (
        <>
            <div className="min-h-screen w-full">
                <Head>
                    <title>TheNeuron | Register</title>
                </Head>
                <div className="md:flex relative min-h-screen">
                    <div className="relative min-h-[300px] p-7 gradient-bg w-full flex flex-col items-center justify-end md:justify-center">
                        <Link href="/">
                            {/* <h1 className="absolute top-5 left-5 text-white text-3xl lg:text-4xl font-bold cursor-pointer">LOGO.</h1> */}
                            <div className="absolute top-5 left-5 cursor-pointer">
                                <div className="relative h-12 w-48">
                                    <Image src="/images/logo.png" layout="fill" objectFit="contain" className="drop-shadow-md overflow-hidden" />
                                </div>
                            </div>
                        </Link>
                        <div className="max-w-sm lg:max-w-md text-white text-center">
                            <h1 className="text-3xl md:text-5xl mb-3 font-semibold">Start Betting Now</h1>
                            <p className="text-lg md:text-xl">Join TheNeuron.club to bet directly on the outcome of events. We've built a next gen betting platform for you to bet on your opinion.</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-full justify-center p-10 px-5">
                        {
                            isForm ?
                                <form className="max-w-lg p-10 min-w-[350px] bg-white gradient-shadow" onSubmit={handleSubmit}>
                                    <div className="flex border-b border-gray-700 py-2">
                                        <UserIcon className="h-6" />
                                        <input onChange={handleChange} className="outline-none flex-grow px-2" type="text" name="username" value={data.username} required placeholder="User Name " />
                                    </div>
                                    {isUsername && <p className="text-xs text-red-400">Username already exist</p>}
                                    <div className="flex border-b border-gray-700 py-2 mt-6">
                                        <MailIcon className="h-6" />
                                        <input onChange={handleChange} className="outline-none flex-grow px-2" type="email" name="email" value={data.email} required placeholder="Your Mail Id " />
                                    </div>
                                    {isEmail && <p className="text-xs text-red-400">Email already exist</p>}
                                    <div className="flex border-b border-gray-700 py-2 my-6">
                                        <LockClosedIcon className="h-6" />
                                        <input onChange={handleChange} className="outline-none flex-grow px-2" type="password" name="password" minLength="6" value={data.password} required placeholder="Password " />
                                    </div>
                                    <div className="flex border-b border-gray-700 py-2 my-6">
                                        <GlobeAltIcon className="h-6" />
                                        <select onChange={handleChange} className="outline-none flex-grow px-2" type="country" name="country" value={data.country} required placeholder="Country ">
                                            {countries.map((country, i) => <option key={i} value={country.country} >{country.country}</option>)}
                                        </select>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input required className="w-4 h-4" type="checkbox" />
                                        <h1>I accept terms & conditions</h1>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input required className="w-4 h-4" type="checkbox" />
                                        <h1>I am 18+ or more</h1>
                                    </div>

                                    <button type="submit" className="w-full px-6 py-3 text-lg text-white font-semibold rounded-md my-4 gradient-bg active:scale-95 transition-sm">{isSending ? 'Validating' : 'Register'}</button>
                                    <h1 className="text-center">Already have an account ? <a href="/account/login" className="text-blue-500 font-medium">Login</a></h1>
                                    {/* <div className="flex space-x-6 sm:px-5 mt-5">
                                        <div className="px-4 py-2 border border-gray-700 text-gray-700 font-semibold cursor-pointer hover:bg-gray-800 hover:text-white rounded-full transition duration-100 ease-linear">
                                            Google G+
                                        </div>
                                        <div className="px-4 py-2 border border-gray-700 text-gray-700 font-semibold cursor-pointer hover:bg-gray-800 hover:text-white rounded-full transition duration-100 ease-linear">
                                            Facebook F+
                                        </div>
                                    </div> */}
                                </form>
                                :
                                <h1 className="text-center max-w-xl p-7 text-3xl font-semibold text-blue-500 bg-white py-10 gradient-shadow">Verification link is sent to your Email</h1>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default register
