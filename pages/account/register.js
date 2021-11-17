import { LockClosedIcon, MailIcon, UserIcon, UsersIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { pageTransition, pageZoom } from '../../util'
import { userSession } from '../../lib/user-session'
import { useRouter } from 'next/router'
import { useSession, signIn } from "next-auth/client"
import Modal from '../../components/Modal'

function register({ referral_code }) {
    const user = userSession();
    const router = useRouter();
    const [session] = useSession()

    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [user])

    const [isSending, setIsSending] = useState(false)
    const [isForm, setIsForm] = useState(true);
    const [isEmail, setIsEmail] = useState(false)
    const [data, setData] = useState({
        email: '',
        password: '',
        name: '',
        referral_code: referral_code || null,
        image_url: session?.user?.image || null,
        isVerified: false
    })

    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const registerUser = async (userData, url) => {
        const res = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        if (res.status == 421) {
            setIsEmail(true);
        }
        else if (res.status == 200) {
            const response = await res.json();
            if (userData.image) {
                window.localStorage.setItem('neuron-token', JSON.stringify(response.token))
                window.localStorage.setItem('neuron-newUser', response.newUser)
                router.push('/')
            }
            else {
                setIsForm(false);
            }
        } else {
            console.log("Unable to register user")
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true)
        if (data.email && data.password) {
            await registerUser(data, '/api/account/register');
        }
        setIsSending(false)
    }

    const socialSignin = async () => {
        setIsSending(true);
        if (session?.user) {
            await registerUser(session?.user, '/api/account/login?type=social');
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
                    <title>TheNeuron | Register</title>
                </Head>
                <div className="md:flex items-center relative min-h-screen">
                {isEmail && <div className="fixed inset-0 w-full grid place-items-center blur-white z-40" onClick={() => setIsEmail(false)}><Modal state={isEmail} text="The account already exists, please sign-in instead" link={'/account/login'} /> </div>}
                    <div className="min-h-[300px] p-7 w-full flex flex-col items-center justify-end md:justify-center">
                        <Link href="/">
                            <div className="absolute top-5 left-5 cursor-pointer">
                                <div className="relative h-12 w-48">
                                    <Image src="/images/logo.png" layout="fill" objectFit="contain" className="drop-shadow-md overflow-hidden" />
                                </div>
                            </div>
                        </Link>
                        <div className="max-w-sm lg:max-w-md text-white text-center md:text-left">
                            <h1 className="text-3xl md:text-5xl mb-3 font-semibold">Start Predicting Now</h1>
                            <p className="text-lg md:text-xl">Join TheNeuron.club to bet directly on the outcome of events. Use your know-how to predict global events across categories and win rewards</p>
                        </div>
                    </div>
                    <motion.div initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageZoom}
                        transition={pageTransition} className="flex flex-col items-center w-full justify-center p-10 px-5">
                        {
                            isForm ?
                            <>
                                <form className="max-w-lg p-10 min-w-[380px] blur-black gradient-shadow" onSubmit={handleSubmit}>
                                    <div className="flex border-b border-gray-100 py-2">
                                        <UserIcon className="h-6 text-white" />
                                        <input onChange={handleChange} className="outline-none flex-grow px-2 bg-transparent text-white focus:bg-transparent" type="text" name="name" minLength="1" value={data.name} required placeholder="Your Name " />
                                    </div>
                                    <div className="flex border-b border-gray-100 py-2 mt-6">
                                        <MailIcon className="h-6 text-white" />
                                        <input onChange={handleChange} className="outline-none flex-grow px-2 bg-transparent text-white focus:bg-transparent" type="email" name="email" value={data.email} required placeholder="Your Mail Id " />
                                    </div>

                                    <div className="flex border-b border-gray-100 py-2 my-4">
                                        <LockClosedIcon className="h-6 text-white" />
                                        <input onChange={handleChange} className="outline-none flex-grow px-2 bg-transparent text-white focus:bg-transparent" type="password" name="password" minLength="6" value={data.password} required placeholder="Password " />
                                    </div>
                                    <div className="flex border-b border-gray-100 py-2 mb-6">
                                        <UsersIcon className="h-6 text-white" />
                                        <input onChange={handleChange} className="outline-none flex-grow px-2 bg-transparent text-white focus:bg-transparent" type="text" name="referral_code" minLength="6" maxLength="6" value={data.referral_code} placeholder="Referral Code (If Any) " />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input required className="w-4 h-4 cursor-pointer" style={{accentColor: 'yellow'}} type="checkbox" />
                                        <h1 className="text-white">I accept&nbsp;<a href="/tnc" className="text-yellow-300 cursor-pointer">terms & conditions</a></h1>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input required className="w-4 h-4 cursor-pointer" style={{accentColor: 'yellow'}} type="checkbox" />
                                        <h1 className="text-white">I am 18+ or more</h1>
                                    </div>
                                    <button type="submit" className="w-full px-6 py-2 text-lg text-white font-semibold rounded-md my-4 btn-blue active:scale-95 transition-sm">{isSending ? 'Wait...' : 'Register'}</button>
                                    <h1 className="text-center text-white">Already have an account? &nbsp;<a href="/account/login" className="text-yellow-300 font-medium">Login</a></h1>
                                </form>
                        <h1 className="text-xl font-medium mt-6 tracking-wide text-gray-100"> Or Login With </h1>
                        <div className="flex items-center">
                            <button className="signup__btn border-white hover:text-gray-800 hover:bg-gray-50" onClick={() => signIn("google")}>
                                <img src="/images/google.svg" alt="" className="w-10 h-10" />
                                <span>Google</span>
                            </button>
                            <button className="signup__btn border-white hover:btn-bg" onClick={() => signIn("facebook")}>
                                <img src="/images/facebook.svg" alt="" className="w-10 h-10" />
                                <span>Facebook</span>
                            </button>
                        </div>
                        </>
                                :
                                <h1 className="text-center max-w-xl p-7 text-xl md:text-2xl font-semibold text-white blur-white py-10 gradient-shadow">You've successfully registered to TheNeuron.Club. To continue, please verify your Email Adress</h1>
                        }
                    </motion.div>
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
