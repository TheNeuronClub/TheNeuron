import { useRouter } from 'next/router'
import React from 'react'
import QuestionList from '../components/QuestionList'
import { userSession } from '../lib/user-session'

function contest({ contestList }) {
    const router = useRouter()
    const session = userSession()
    return (
        <>
            <div>
                <img className='h-96 w-full rounded max-w-7xl object-contain mx-auto m-5 cursor-pointer' src={session ? contestList[1]?.imgSrc : contestList[0]?.imgSrc} alt="" onClick={() => router.push('/tnc')} />
            </div>
            <QuestionList category={router.query?.category || 'oscars'} contest />
        </>
    )
}

export default contest

export async function getServerSideProps(context) {
    const contestList = await fetch(`${process.env.HOST}/api/contest`).then((res) => res.json());
    return {
        props: {
            contestList
        }
    }
}
