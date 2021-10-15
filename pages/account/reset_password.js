import Head from 'next/head';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import { userSession } from '../../lib/user-session';

function reset_password({ _id, username }) {
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
        username: username,
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
                <title>The Neuron | Reset Password</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <div className="w-full min-h-[500px] pt-32 pb-10">
                <div className="p-5 sm:px-10 sm:py-10 max-w-3xl text-center bg-white text-gray-700 mx-auto gradient-shadow">

                    {verify ?
                        <>
                            <h1 className="text-3xl font-bold text-blue-500">Your Password is Reset Successfully</h1>
                            <button onClick={() => router.push('/account/login')} className="inline-block px-6 py-2 text-lg text-white font-semibold rounded-md my-4 gradient-bg active:scale-95 transition-sm">Login</button>
                        </>
                        :
                        <>
                            <h1 className="text-2xl md:text-3xl mb-3 font-bold">Enter New Password</h1>
                            <div className="max-w-sm my-8 mx-auto">
                                <form onSubmit={handleSubmit} >
                                    <div className="flex border-b-2 border-gray-700 py-2 my-6">
                                        <LockClosedIcon className="h-6" />
                                        <input onChange={handleChange} className="outline-none flex-grow px-2" type="password" name="password" minLength="6" value={data.password} required placeholder="New Password " />
                                    </div>
                                    <div className="flex border-b-2 border-gray-700 py-2 my-6">
                                        <LockClosedIcon className="h-6" />
                                        <input onChange={handleChange} className="outline-none flex-grow px-2" type="password" name="confirm_password" minLength="6" value={data.confirm_password} required placeholder="Confirm Password " />
                                    </div>
                                    {!isValid && <p className="text-xs text-red-400 mb-2 text-left">Password doesn't match </p>}
                                    <button type="submit" className="px-6 py-2 text-lg text-white font-semibold gradient-bg rounded-lg active:scale-95 transition-sm">{isSending ? `Please Wait` : `Reset`}</button>
                                </form>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default reset_password

export function getServerSideProps(context) {
    const { _id, username } = context.query;
    return {
        props: {
            _id,
            username
        }
    }
}

