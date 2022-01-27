import Head from 'next/head';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import { userSession } from '../../lib/user-session';
import { motion } from 'framer-motion';
import { pageTransition, pageZoom } from '../../util';

function reset_password({ _id, code }) {
    const router = useRouter();
    const session = userSession();
    useEffect(() => {
        if (session) {
            router.push('/')
        }
    }, [session])

    const [isSending, setIsSending] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [verify, setVerify] = useState(false);
    const [data, setData] = useState({
        _id: _id,
        code: code,
        password: '',
        confirm_password: ''
    })

    const handleChange = (e) => {
        e.preventDefault();
        setIsValid(true);
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.password === data.confirm_password) {
            setIsValid(true)
            setIsSending(true);
            const res = await fetch(`/api/account/reset_password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (res.status === 200) {
                setVerify(true);
                router.push('/account/login')
            }
            setIsSending(false)
        }
        else {
            setIsValid(false)
        }
    }
    return (
        <>
            <Head>
                <title>The Neuron Club | Reset Password</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <div className="w-full min-h-[500px] py-10">
                <motion.div initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageZoom}
                    transition={pageTransition} className="p-5 sm:px-10 sm:py-10 max-w-xl text-center blur-black mx-auto gradient-shadow">

                    {verify ?
                        <>
                            <motion.h1 initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageZoom}
                                transition={pageTransition} className="text-3xl font-bold text-gray-100">Your Password is Reset Successfully</motion.h1>
                            <motion.button onClick={() => router.push('/account/login')} initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageZoom}
                                transition={pageTransition} className="inline-block px-6 py-2 text-lg text-white font-semibold rounded-md my-4 btn-blue active:scale-95 transition-sm">Login</motion.button>
                        </>
                        :
                        <>
                            <h1 className="text-2xl md:text-3xl mb-3 font-bold text-white">Enter New Password</h1>
                            <div className="max-w-sm my-8 mx-auto">
                                <form onSubmit={handleSubmit} >
                                    <div className="flex border-b-2 border-gray-100 py-2 my-6">
                                        <LockClosedIcon className="h-6 text-white" />
                                        <input onChange={handleChange} className="outline-none flex-grow px-2 bg-transparent text-white focus:bg-transparent" type="password" name="password" minLength="6" value={data.password} required placeholder="New Password " />
                                    </div>
                                    <div className="flex border-b-2 border-gray-100 py-2 my-6">
                                        <LockClosedIcon className="h-6 text-white" />
                                        <input onChange={handleChange} className="outline-none flex-grow px-2 bg-transparent text-white focus:bg-transparent" type="password" name="confirm_password" minLength="6" value={data.confirm_password} required placeholder="Confirm Password " />
                                    </div>
                                    {!isValid && <p className="text-xs text-red-500 mb-2 text-left">Password doesn't match </p>}
                                    <button type="submit" className="px-6 py-2 text-lg text-white font-semibold btn-blue rounded-lg active:scale-95 transition-sm">{isSending ? `Please Wait` : `Reset`}</button>
                                </form>
                            </div>
                        </>
                    }
                </motion.div>
            </div>
        </>
    )
}

export default reset_password

export function getServerSideProps(context) {
    const { _id, code } = context.query;
    return {
        props: {
            _id,
            code
        }
    }
}

