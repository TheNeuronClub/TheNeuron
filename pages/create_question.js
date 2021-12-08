import Head from "next/head"
import CreateQ from "../components/CreateQ"
import { userSession } from "../lib/user-session"
import { useEffect } from 'react'
import Router from 'next/router'

function create_question({ categories }) {
    const session = userSession();
    useEffect(() => {
        if (!session) {
            Router.push('/account/login')
        }
        else if (session?.type !== 'admin') {
            Router.push('/account/login')
        }
    }, [session])
    return (
        <>
            <Head>
                <title>The Neuron | Create Question</title>
            </Head>
            <CreateQ session={session} categories={categories} />
        </>
    )
}

export default create_question

export async function getServerSideProps() {
    const categories = await fetch(`${process.env.HOST}/api/question/queCategory`).then((res) => res.json());
    return {
        props: {
            categories
        }
    }
}