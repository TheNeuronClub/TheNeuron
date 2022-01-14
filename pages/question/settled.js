import { useState, useEffect } from 'react'
import { userSession } from '../../lib/user-session';
import { useRouter } from 'next/router'
import Head from 'next/head'

function verification({ settled, unSettled }) {
    const session = userSession();
    const router = useRouter();

    const [isSettled, setIsSettled] = useState(false);
    const [isUnSettled, setIsUnSettled] = useState(false);

    useEffect(() => {
        if (!session) {
            router.push('/')
        }
        if (session?.type !== 'admin') {
            router.push('/')
        }
    }, [])

    return (
        <><Head>
            <title>Past Questions</title>
        </Head>
            {session &&
                <>
                    <div className="pt-10 min-h-[300px]">
                        <div className='flex items-center justify-between text-white py-4 pl-5 pr-10 cursor-pointer' onClick={() => setIsUnSettled(!isUnSettled)}>
                            <h1 className="text-xl sm:text-2xl 2xl:text-3xl font-semibold p-1">UnSettled Question List</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 ${isUnSettled && 'rotate-180'} transition-all duration-300 ease-in-out`} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                        {isUnSettled && <> {unSettled?.length > 0 ?
                            <>
                                {unSettled.map(que => (
                                    <div key={que?._id} className="w-full blur-blue text-white max-w-5xl mx-auto text-lg sm:text-xl font-medium p-5 px-10 flex space-x-2 sm:space-x-4 items-center relative rounded-lg gradient-shadow my-2">
                                        <img src={que?.image_url || `/images/que/${que?.category?.toLowerCase()}.jfif`} alt="" className="w-12 h-12 shadow-lg border border-white hover:scale-105 transition-md object-cover rounded-full" />
                                        <div className="my-3 sm:my-0 flex-1">
                                            <h1 className="flex-1 line-clamp-1"> {que?.question} </h1>
                                            <h2 className="flex-1 text-sm text-gray-100 capitalize"> {que?.category} </h2>
                                        </div>
                                        <button className="px-4 py-1 mx-auto leading-loose btn-orange text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={() => router.push(`/question/${que._id}`)}>View</button>
                                    </div>
                                ))}
                            </>
                            :
                            <h1 className="text-lg sm:text-xl 2xl:text-2xl text-white font-medium max-w-5xl mx-auto p-5 rounded-lg gradient-shadow">No Questions Available</h1>
                        }</>}
                        <div className='flex items-center justify-between text-white py-4 pl-5 pr-10 cursor-pointer' onClick={() => setIsSettled(!isSettled)}>
                            <h1 className="text-xl sm:text-2xl 2xl:text-3xl font-semibold p-1">Settled Question List</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 ${isSettled && 'rotate-180'} transition-all duration-300 ease-in-out`} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                        {isSettled && <> {settled?.length > 0 ?
                            <>
                                {settled.map(que => (
                                    <div key={que?._id} className="w-full blur-blue text-white max-w-5xl mx-auto text-lg sm:text-xl font-medium p-5 px-10 flex space-x-2 sm:space-x-4 items-center relative rounded-lg gradient-shadow my-2">
                                        <img src={que?.image_url || `/images/que/${que?.category?.toLowerCase()}.jfif`} alt="" className="w-12 h-12 shadow-lg border border-white hover:scale-105 transition-md object-cover rounded-full" />
                                        <div className="my-3 sm:my-0 flex-1">
                                            <h1 className="flex-1 line-clamp-1"> {que?.question} </h1>
                                            <h2 className="flex-1 text-sm text-gray-100 capitalize"> {que?.category} </h2>
                                        </div>
                                        <button className="px-4 py-1 mx-auto leading-loose btn-orange text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={() => router.push(`/question/${que._id}`)}>View</button>
                                    </div>
                                ))}
                            </>
                            :
                            <h1 className="text-lg sm:text-xl 2xl:text-2xl text-white font-medium max-w-5xl mx-auto p-5 rounded-lg gradient-shadow">No Questions Available</h1>
                        }</>}
                    </div>
                </>
            }
        </>
    )
}

export default verification


export async function getServerSideProps() {
    const settled = await fetch(`${process.env.HOST}/api/question/get_questions?filter=closed`).then(res => res.json())
    const unSettled = await fetch(`${process.env.HOST}/api/question/ques?type=expiring`).then(res => res.json())
    return {
        props: {
            settled,
            unSettled
        }
    }
}
