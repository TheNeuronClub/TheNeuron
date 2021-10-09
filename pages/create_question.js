import Head from "next/head"
import CreateQ from "../components/CreateQ"
import { userSession } from "../lib/user-session"
import {useEffect} from 'react'
import Router from 'next/router'
function create_question() {
    const session = userSession();
    useEffect(() => {
        if(!session){
            Router.push('/account/login')
        }
    }, [session])
    return (
        <>
            <Head>
                <title>The Neuron | Create Question</title>
            </Head>
            <CreateQ session={session} />
        </>
    )
}

export default create_question

// export async function getServerSideProps(){
//     const session = userSession();
//     console.log(session)
//     if(!session){
//         return {
//             redirect: {
//                 destination: '/account/login',
//                 parmanent: false
//             }
//         }
//     }
//     return {
//         props: {
//             session
//         }
//     }
// }
