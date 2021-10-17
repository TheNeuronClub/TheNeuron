import { ArrowLeftIcon, ArrowRightIcon, GlobeAltIcon, LockClosedIcon, MailIcon, UserIcon, UsersIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { countries } from '../../util'
import { userSession } from '../../lib/user-session'
import { useRouter } from 'next/router'
import { useSession, signIn } from "next-auth/client"

function register({ referral_code }) {
    const user = userSession();
    const router = useRouter();
    const [session] = useSession()

    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [user])
    useEffect(() => {
        if (session) {
            setData({ email: session?.user?.email, name: session?.user?.name, image_url: session?.user?.image, isVerified: true })
        }
    }, [session])

    const [isSending, setIsSending] = useState(false)
    const [step, setStep] = useState('one')
    const [isForm, setIsForm] = useState(true);
    const [isEmail, setIsEmail] = useState(false)
    const [isUsername, setIsUsername] = useState(false)
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        country: 'Sweden',
        referral_code: referral_code || null,
        image_url: session?.user?.image || null,
        isVerified: false
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
            if (data.image_url) {
                router.push('/account/login')
            }
            else {
                setIsForm(false);
            }
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
                            <p className="text-lg md:text-xl">Join TheNeuron.club to bet directly on the outcome of events. Use your know-how to predict global events across categories and win rewards</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-full justify-center p-10 px-5">
                        {
                            isForm ?
                                <form className="max-w-lg p-10 min-w-[380px] bg-white gradient-shadow" onSubmit={handleSubmit}>
                                    {isUsername && <p className="text-sm text-red-400 text-center">Username already exist</p>}
                                    {isEmail && <p className="text-sm text-red-400 text-center">Email already exist</p>}
                                    {step === 'one' && <>
                                        <div className="flex border-b border-gray-700 py-2">
                                            <UserIcon className="h-6" />
                                            <input onChange={handleChange} className="outline-none flex-grow px-2" type="text" name="name" minLength="5" value={data.name} required placeholder="Your Name " />

                                        </div>
                                        {/* {isUsername && <p className="text-xs text-red-400">Username already exist</p>} */}
                                        <div className="flex border-b border-gray-700 py-2 mt-6">
                                            <MailIcon className="h-6" />
                                            <input onChange={handleChange} className="outline-none flex-grow px-2" type="email" name="email" value={data.email} required placeholder="Your Mail Id " />
                                        </div>
                                        {/* {isEmail && <p className="text-xs text-red-400">Email already exist</p>} */}
                                        <div className="flex border-b border-gray-700 py-2 my-4">
                                            <GlobeAltIcon className="h-6" />
                                            <select onChange={handleChange} className="outline-none flex-grow px-2" type="country" name="country" value={data.country} required placeholder="Country ">
                                                <option disabled>Country </option>
                                                {countries.map((country, i) => <option key={i} value={country.country} >{country.country}</option>)}
                                            </select>
                                        </div>

                                        <div className="flex items-center justify-end cursor-pointer mb-2" onClick={() => setStep('two')}>
                                            <button className="text-lg text-blue-500 font-semibold rounded-md my-4 bg-white active:scale-95 transition-sm flex items-center" onClick={() => setStep('one')}>Next<ArrowRightIcon className="h-4 ml-2" /></button>
                                        </div>
                                    </>}

                                    {step === 'two' && <>
                                        <div className="flex border-b border-gray-700 py-2">
                                            <UserIcon className="h-6" />
                                            <input onChange={handleChange} className="outline-none flex-grow px-2" type="text" name="username" minLength="5" value={data.username} required placeholder="User Name " />
                                        </div>
                                        <div className="flex border-b border-gray-700 py-2 my-4">
                                            <LockClosedIcon className="h-6" />
                                            <input onChange={handleChange} className="outline-none flex-grow px-2" type="password" name="password" minLength="6" value={data.password} required placeholder="Password " />
                                        </div>
                                        <div className="flex border-b border-gray-700 py-2 mb-6">
                                            <UsersIcon className="h-6" />
                                            <input onChange={handleChange} className="outline-none flex-grow px-2" type="text" name="referral_code" minLength="6" maxLength="6" value={data.referral_code} placeholder="Referral Code (If Any) " />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input required className="w-4 h-4 cursor-pointer" type="checkbox" />
                                            <h1>I accept terms & conditions</h1>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input required className="w-4 h-4 cursor-pointer" type="checkbox" />
                                            <h1>I am 18+ or more</h1>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <button className="py-2 text-lg text-blue-500 font-semibold rounded-md my-4 bg-white active:scale-95 transition-sm flex items-center" onClick={() => setStep('one')}><ArrowLeftIcon className="h-4 mr-2" /> Previous</button>
                                            <button type="submit" className="px-6 py-2 text-lg text-white font-semibold rounded-md my-4 gradient-bg active:scale-95 transition-sm">{isSending ? 'Wait...' : 'Register'}</button>
                                        </div>
                                    </>}
                                    <h1 className="text-center">Already have an account ? <a href="/account/login" className="text-blue-500 font-medium">Login</a></h1>
                                </form>
                                :
                                <h1 className="text-center max-w-xl p-7 text-3xl font-semibold text-blue-500 bg-white py-10 gradient-shadow">You've successfully registered to TheNeuron.Club. To continue, please verify your Email Adress</h1>
                        }
                        <h1 className="text-xl font-medium mt-6 tracking-wide text-gray-700"> Or Signup Using </h1>
                        <div className="flex items-center">
                            <button className="signup__btn border-gray-500 hover:bg-gray-800" onClick={() => signIn("google")}>
                                <img src="/images/google.svg" alt="" className="w-10 h-10" />
                                <span>Google</span>
                            </button>
                            <button className="signup__btn border-blue-500 hover:gradient-bg" onClick={() => signIn("facebook")}>
                                <img src="/images/facebook.svg" alt="" className="w-10 h-10" />
                                <span>Facebook</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default register
export function getServerSideProps(context) {
    const { referral_code } = context.query;
    return {
        props: {
            referral_code: referral_code || null
        }
    }
}
