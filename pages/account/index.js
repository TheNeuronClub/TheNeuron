import { userSession } from "../../lib/user-session"
import { useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Profile from "../../components/Profile";

function index() {
    const session = userSession();
    useEffect(() => {
        if (!session) {
            Router.push('/')
        }
    }, [session])

    return (
        <div className="pb-10">
            <Head> <title>The Neuron | Profile</title> </Head>
            {session &&
                <>
                    <Profile />
                </>
            }
        </div>
    )
}

export default index
