import { useState } from 'react'
import Head from 'next/head'

function signup() {
    const [isSending, setIsSending] = useState(false)
    const [mail, setMail] = useState('')
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        const res = await fetch(`/api/early_signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mail)
        })

        const response = await res.json();
        if (response) {
            setSubscribed(true);
        }
        setIsSending(false)
    }
    return (
        <>
            <div className="w-full min-h-[500px] pt-36">
                <Head>
                    <title>TheNeuron | Signup</title>
                </Head>

                <div className="p-5 sm:px-10 sm:py-10 max-w-3xl text-center bg-white text-gray-700 mx-auto rounded-xl">
                    <h1 className="text-3xl md:text-4xl mb-3 font-semibold">Sign Up for our early launch</h1>
                    <p className="text-lg md:text-xl">Be the first one to be notified when we launch! Please share your email</p>

                    {subscribed ? <h1 className="text-2xl md:text-3xl mt-6 text-blue-500 font-medium">Thank you for your interest.<br/> We'll let you know when we launch! </h1> :
                        <div className="max-w-sm my-8 rounded-lg gradient-shadow mx-auto">
                            <form onSubmit={handleSubmit} className="flex">
                                <input type="email" className="flex-grow max-w-xs p-3 px-4 focus:outline-none focus:border focus:border-blue-500 placeholder-gray-400 font-normal" value={mail} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder="Email Address ..." onChange={(e) => setMail(e.target.value)} />
                                <button type="submit" className="px-6 py-3 text-lg text-white font-semibold gradient-bg">{isSending ? `Wait...` : `Submit`}</button>
                            </form>
                        </div>

                    }
                </div>
            </div>
        </>
    )
}

export default signup
