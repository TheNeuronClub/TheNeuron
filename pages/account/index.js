import { userSession } from "../../lib/user-session"
import { useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import { motion } from "framer-motion";
import { pageTransition, pageZoom } from "../../util";
import Portfolio from "../../components/Portfolio";

function index() {
    const session = userSession();
    useEffect(() => {
        if (!session) {
            Router.push('/')
        }
    }, [session])

    return (
        <div className="py-10">
            <Head> <title>The Neuron | Portfolio</title> </Head>
            {session &&
                <>
                    <Portfolio />
                    {/* <Notification notifications={userData?.notification} /> */}
                </>
            }
        </div>
    )
}

export default index
