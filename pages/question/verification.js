import { useState, useEffect } from 'react'
import { userSession } from '../../lib/user-session';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const EditQue = dynamic(() => import('../../components/EditQue') , {
    ssr: false,
    loading: () => <p className="text-gray-200">Loading ...</p>,
})

function verification({ data }) {
    const session = userSession();
    const router = useRouter();
    useEffect(() => {
        if (!session) {
            router.push('/')
        }
        if (session?.type !== 'admin') {
            router.push('/')
        }
    }, [])
    const [isQue, setIsQue] = useState(null);
    const [queList, setQueList] = useState(data ? [...data] : null);

    const updateQues = async ({ _id }) => {
        const index = queList.findIndex((q) => q._id == _id)
        if (index >= 0) {
            queList.splice(index, 1)
        } else {
            console.warn(`Can't verify question`)
        }
        setQueList([...queList]);
    }


    return (
        <>
            {session &&
                <div className="py-10">
                    {isQue && <EditQue queData={isQue} setIsQue={setIsQue} updateQues={updateQues} from="queVerification" />}
                    <h1 className="text-xl sm:text-2xl 2xl:text-3xl text-white font-semibold max-w-5xl mx-auto p-5">Question List For Verification</h1>
                    {queList?.length > 0 ?
                        <>
                            {queList.map(que => (
                                <div key={que?._id} className="w-full blur-blue text-white max-w-5xl mx-auto text-lg sm:text-xl font-medium p-5 px-10 flex space-x-2 sm:space-x-4 items-center relative rounded-lg gradient-shadow my-2">
                                    <img src={que?.image_url || `/images/que/${que?.category?.toLowerCase()}.jfif`} alt="" className="w-12 h-12 shadow-lg border border-white hover:scale-105 transition-md object-cover rounded-full" />
                                    <div className="my-3 sm:my-0 flex-1">
                                        <h1 className="flex-1 line-clamp-1"> {que?.question} </h1>
                                        <h2 className="flex-1 text-sm text-gray-100 capitalize"> {que?.category} </h2>
                                    </div>
                                    <button className="px-4 py-1 mx-auto leading-loose btn-orange text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={() => setIsQue(que)}>View</button>
                                </div>
                            ))}
                        </>
                        :
                        <h1 className="text-lg sm:text-xl 2xl:text-2xl text-white blur-gray font-medium max-w-5xl mx-auto p-5 rounded-lg gradient-shadow">No Questions Available</h1>
                    }
                </div>
            }
        </>
    )
}

export default verification


export async function getServerSideProps() {
    const data = await fetch(`${process.env.HOST}/api/question/get_questions?filter=created`).then(res => res.json())
    return {
        props: {
            data
        }
    }
}
