import Head from "next/head";
import Router from "next/router"
import { useEffect } from 'react'
import { userSession } from "../../lib/user-session";

function verify({ verified }) {
    const session = userSession();
    useEffect(() => {
        if (session) {
            Router.push('/')
        }
    }, [session])

    return (
        <>
            <Head>
                <title>The Neuron | Verify</title>
            </Head>
            <div className="py-28">
                <div className="max-w-lg bg-white py-10 px-5 mx-auto text-center gradient-shadow-md">
                    {verified ?
                        <>
                            <h1 className="text-3xl font-bold text-blue-500">Your account is Verified</h1>
                            <button onClick={() => Router.push('/account/login')} className="inline-block px-6 py-2 text-lg text-white font-semibold rounded-md my-4 gradient-bg active:scale-95 transition-sm">Login</button>
                        </>
                        :
                        <h1 className="text-3xl font-bold text-blue-500">Please verify your account first</h1>
                    }
                </div>
            </div>
        </>
    )
}

export default verify

export async function getServerSideProps(context) {
    let verified = false;
    const res = await fetch(`${process.env.HOST}/api/account/verify?token=${context.query.token}`)
    if (res.status === 200) {
        verified = true
    }
    return {
        props: {
            verified
        }
    }
}
