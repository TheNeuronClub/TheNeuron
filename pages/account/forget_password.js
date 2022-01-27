import Head from 'next/head'
import { useState, useEffect } from 'react'
import { userSession } from '../../lib/user-session'
import Router from 'next/router'
import { motion } from 'framer-motion'
import { pageTransition, pageZoom } from '../../util';

function forget_password() {
    const session = userSession();
    useEffect(() => {
        if (session) {
            Router.push('/')
        }
    }, [session])

    const [isSending, setIsSending] = useState(false)
    const [mail, setMail] = useState('')
    const [isValid, setIsValid] = useState(true)
    const [verify, setVerify] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        const res = await fetch(`/api/account/forget_password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mail)
        })

        if (res.status === 200) {
            setVerify(true);
            setIsValid(true)
        } else {
            setIsValid(false);
        }
        setIsSending(false)
    }
    return (
        <>
            <Head>
                <title>The Neuron Club | Forget Password</title>
            </Head>
            <div className="w-full min-h-[500px] pt-32 pb-10">
                <motion.div initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageZoom}
                    transition={pageTransition} className="p-5 sm:px-10 sm:py-10 max-w-3xl blur-black text-center mx-auto gradient-shadow-md">

                    {verify ? <h1 className="text-2xl md:text-3xl text-white blur-white font-semibold">Reset Password link is sent to your email </h1> :
                        <>
                            <h1 className="text-2xl md:text-3xl text-white mb-3 font-bold">Enter Your Email</h1>
                            <div className="max-w-sm my-8 rounded-lg gradient-shadow mx-auto">
                                <form onSubmit={handleSubmit} className="flex">
                                    <input type="text" className="flex-grow max-w-xs p-3 px-4 focus:outline-none focus:border focus:border-blue-400 blur-black text-white placeholder-gray-200 font-normal" value={mail} required placeholder="Email Address ..." onChange={(e) => setMail(e.target.value)} />
                                    <button type="submit" className="px-6 py-3 text-lg btn-blue font-semibold">{isSending ? `Verifying` : `Verify`}</button>
                                </form>
                            </div>
                        </>
                    }
                    {!isValid && <p className="text-xs text-red-400">Invalid Credentials </p>}
                </motion.div>
            </div>
        </>
    )
}

export default forget_password
