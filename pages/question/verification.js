import { useState, useEffect } from 'react'
import moment from 'moment'
import { motion } from 'framer-motion';
import { modules, formats, pageTransition, pageZoom } from '../../util'
import { XIcon } from '@heroicons/react/solid';
import { userSession } from '../../lib/user-session';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

export const Detail = ({ queData, onSelect, updateQue }) => {
    const [isVerify, setIsVerify] = useState(false)
    const [isInValid, setIsInValid] = useState(false)
    const [userInfo, setUserInfo] = useState()
    const [que, setQue] = useState(queData);
    const [updatedQue, setUpdatedQue] = useState(queData);
    const [desc, setDesc] = useState(que?.desc)
    const [isQueEdit, setIsQueEdit] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)


    const getUser = async () => {
        const res = await fetch(`/api/user/info?_id=${que?.userId}`);
        if (res.status == 200) {
            const response = await res.json();
            setUserInfo(response)
        }
    }
    useEffect(() => {
        getUser();
    }, []);

    const updateStatus = async ({ qstatus }) => {
        qstatus == 'verified' ? setIsVerify(true) : setIsInValid(true)
        const res = await fetch(`/api/question/verifyQue`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: que?._id, qstatus: qstatus })
        })
        if (res.status === 200) {
            qstatus == 'verified' ? setIsVerify(false) : setIsInValid(false)
            updateQue(que?._id)
            onSelect(null);
        }
        qstatus == 'verified' ? setIsVerify(false) : setIsInValid(false)
        setIsVerify(false)
    }

    const handleChange = (e) => {
        setUpdatedQue({ ...updatedQue, [e.target.name]: e.target.value });
    }

    const updateQuestion = async () => {
        setIsUpdating(true)
        const { _id, question } = updatedQue;
        console.log(updatedQue)
        const res = await fetch(`/api/question/update_que`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id, desc, question })
        })
        console.log(res.status)
        const response = await res.json();
        if (res.status == 200) {
            setIsQueEdit(false);
            setQue(response)
        }
        setIsUpdating(false);
    }

    function DESC() {
        return { __html: que?.desc };
    }
    return (
        <div className="fixed top-0 left-0 grid place-items-center bg-black bg-opacity-80 w-full min-h-screen p-1 z-50">
            <XIcon className="bg-white text-gray-700 w-12 h-12 cursor-pointer rounded-full p-1 absolute top-5 right-6 z-[55] gradient-shadow" onClick={() => onSelect(null)} />
            <motion.div initial="initial"
                animate="in"
                exit="out"
                variants={pageZoom}
                transition={pageTransition} className="details__div w-full max-w-5xl bg-white rounded-lg py-5">
                <div className="w-full max-w-5xl mx-auto text-xl font-medium p-5 px-10 sm:flex sm:space-x-4 items-center text-gray-700 relative">
                    <img src={que?.image_url || `/images/que/${que?.category?.toLowerCase()}.jfif`} alt="" className="w-12 h-12 shadow-lg hover:scale-105 transition-md object-cover rounded-full" />
                    <div className="my-3 sm:my-0 flex-1">
                        {isQueEdit ? <input
                            placeholder="Question"
                            type="text"
                            name="question"
                            required
                            value={updatedQue?.question}
                            onChange={handleChange}
                            className="w-full flex-1 h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                        /> : <h1 className="flex-1"> {que?.question} </h1>
                        }
                        <h2 className="flex-1 text-sm text-gray-500 capitalize"> {que?.category} </h2>
                    </div>
                    <button className="px-4 py-1 mx-auto leading-loose gradient-bg text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={() => updateStatus({ qstatus: 'verified' })}>{isVerify ? 'Wait...' : 'Set Verified'}</button>
                    <button className="px-4 py-1 mx-auto leading-loose bg-red-500 text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] ml-4 sm:ml-0" onClick={() => updateStatus({ qstatus: 'invalid' })} >{isInValid ? 'Wait...' : 'Set Invalid'}</button>
                </div>
                <div className="font-medium text-center sm:text-left space-y-4 sm:space-y-0 text-lg sm:flex flex-wrap items-center justify-around sm:space-x-4 p-5">
                    <div>
                        <h1>Creator Name</h1>
                        <h2 className="font-normal capitalize">{userInfo?.name || 'unknown'}</h2>
                    </div>
                    <div>
                        <h1>Creation Date &amp; Time</h1>
                        <h2 className="font-normal">{que?.createdAt && moment(que?.createdAt).format('lll')}</h2>

                    </div>
                    <div>
                        <h1>Open Date &amp; Time</h1>
                        <h2 className="font-normal">{que?.goLive && moment(que?.goLive).format('lll')}</h2>
                    </div>
                    <div>
                        <h1>Last Date &amp; Time</h1>
                        <h2 className="font-normal">{moment(que?.bidClosing).format('lll')}</h2>
                    </div>
                    <div>
                        <h1>Settlement Date &amp; Time</h1>
                        <h2 className="font-normal">{moment(que?.settlementClosing).format('lll')}</h2>
                    </div>
                </div>

                {que?.desc && <div className="p-5">
                    {
                        isQueEdit ?
                            <>
                                <h1 className="text-2xl font-semibold my-2">Question Description </h1>
                                <QuillNoSSRWrapper modules={modules} placeholder='Add description here ...' value={desc} onChange={setDesc} formats={formats} theme="snow" />
                            </>
                            :
                            <>
                                <h1 className="text-2xl font-semibold my-2">About the question</h1>
                                <div className="sm:text-lg que__desc" dangerouslySetInnerHTML={DESC()}></div>
                            </>
                    }
                </div>}

                {que?.reference && <div className="px-5 pb-5">
                    {
                        isQueEdit ?
                            <input
                                placeholder="Settlement Link"
                                type="text"
                                name="reference"
                                required
                                value={updatedQue?.reference}
                                onChange={handleChange}
                                className="w-full flex-1 h-12 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                            :
                            <>
                                <h1 className="text-2xl font-semibold my-2">Source of Settlement</h1>
                                <a href={que?.reference} className="my-2 text-blue-500 block text-lg" target="_blank" noreferer="true">{que?.reference}</a>
                            </>
                    }
                </div>}

                <> {isQueEdit ? <div className="px-5 pb-10">
                    <button className={`px-4 py-2 leading-loose shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 gradient-bg text-white cursor-pointer`} onClick={updateQuestion}>{isUpdating ? 'Wait...' : 'Update'}</button>
                    <button className={`px-4 py-2 leading-loose text-gray-800 hover:text-white hover:bg-gray-800 hover:border-none shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 cursor-pointer`} onClick={() => setIsQueEdit(false)}>Cancel</button>
                </div> :
                    <button className={`px-4 py-2 leading-loose shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 gradient-bg text-white cursor-pointer`} onClick={() => setIsQueEdit(true)}>Edit Question</button>
                }
                </>
            </motion.div>
        </div>
    )
}

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
    const [isQue, setIsQue] = useState();
    const [queList, setQueList] = useState(data ? [...data] : null);

    const updateQue = async (id) => {

        const index = queList.findIndex((q) => q._id == id)
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
                <div className="pt-28 pb-10">
                    {isQue && <Detail queData={isQue} onSelect={setIsQue} updateQue={updateQue} />}
                    <h1 className="text-xl sm:text-2xl 2xl:text-3xl text-gray-800 font-semibold max-w-5xl mx-auto p-5">Question List For Verification</h1>
                    {queList?.length > 0 ?
                        <>
                            {queList.map(que => (
                                <div key={que?._id} className="w-full max-w-5xl mx-auto text-lg sm:text-xl font-medium p-5 px-10 flex space-x-2 sm:space-x-4 items-center text-gray-700 relative rounded-lg gradient-shadow my-2">
                                    <img src={que?.image_url || `/images/que/${que?.category?.toLowerCase()}.jfif`} alt="" className="w-12 h-12 shadow-lg hover:scale-105 transition-md object-cover rounded-full" />
                                    <div className="my-3 sm:my-0 flex-1">
                                        <h1 className="flex-1 line-clamp-1"> {que?.question} </h1>
                                        <h2 className="flex-1 text-sm text-gray-500 capitalize"> {que?.category} </h2>
                                    </div>
                                    <button className="px-4 py-1 mx-auto leading-loose gradient-bg text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={() => setIsQue(que)}>View</button>
                                </div>
                            ))}
                        </>
                        :
                        <h1 className="text-lg sm:text-xl 2xl:text-2xl text-gray-700 font-medium max-w-5xl mx-auto p-5 rounded-lg gradient-shadow">No Questions Available</h1>

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
