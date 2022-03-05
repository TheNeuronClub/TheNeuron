import { useRouter } from 'next/router'
import React from 'react'
import QuestionList from '../components/QuestionList'

function contest({ contestList }) {
    const router = useRouter()
    console.log(contestList)
    return (
        <>
            <div>
                <img className='h-96 w-full rounded max-w-7xl object-cover mx-auto m-5' src={contestList[0]?.imgSrc} alt="" />
            </div>
            <QuestionList category={router.query?.category || 'sports'} contest />
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
