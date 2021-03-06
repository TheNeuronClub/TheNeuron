import { useRouter } from 'next/router'
import Head from 'next/head'
import React from 'react'
import QuestionList from '../components/QuestionList'
import { userSession } from '../lib/user-session'
import Result from '../components/Result'

function contest({ contestList, rankList }) {
    const router = useRouter()
    const session = userSession()
    return (
        <>
            <Head>
                <title>Contest | Oscars</title>
            </Head>
            <div>
                <img className='w-full max-h-[450px] rounded max-w-7xl object-contain mx-auto m-5 cursor-pointer' src={session ? contestList[1]?.imgSrc : contestList[0]?.imgSrc || 'https://res.cloudinary.com/theneuron/image/upload/v1646032057/contest/d7j8cxtw6bphbyz63vhe.jpg'} alt="" onClick={() => router.push('/tnc/contest')} />
            </div>
            {/* <QuestionList category={router.query?.category || 'oscars'} contest /> */}
            <Result rankList={rankList} />
        </>
    )
}

export default contest

export async function getServerSideProps(context) {
    const contestList = await fetch(`${process.env.HOST}/api/contest`).then((res) => res.json());
    const rankList = await fetch(`${process.env.HOST}/api/result`).then((res) => res.json());
    return {
        props: {
            contestList,
            rankList
        }
    }
}
