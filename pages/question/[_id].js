import Head from 'next/head'
import { useState, useEffect } from 'react'
import { MinusIcon, PencilIcon, PlusIcon, ShareIcon, XIcon } from '@heroicons/react/solid'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import { userSession } from '../../lib/user-session'
import Modal from '../../components/Modal'
import { FacebookIcon, LinkedinIcon, PinterestIcon, RedditIcon, TelegramIcon, TwitterIcon, WhatsappIcon } from "react-share";
import Coin from '../../components/Coin'
import { balance, updateBalance } from '../../slices/userBalance'
import { useDispatch, useSelector } from 'react-redux'
import { modules, formats, getCurrentDate } from '../../util'
import dynamic from 'next/dynamic'
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

function QuestionDetail({ questionData }) {
    const session = userSession();
    const amount = useSelector(balance)
    const currentDate = getCurrentDate();
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isBidPlaced, setIsBidPlaced] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [lowBalance, setLowBalance] = useState(false)
    const [bid, setBid] = useState(50)
    const [bidData, setBidData] = useState({
        Volume: questionData?.Volume,
        Favour: questionData?.Favour,
        Against: questionData?.Against,
    })
    const [odd, setOdd] = useState('Favour')
    const [isShare, setIsShare] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [que, setQue] = useState(questionData);
    const [isDescEdit, setIsDescEdit] = useState(false)
    const [isDateEdit, setIsDateEdit] = useState(false)
    const [desc, setDesc] = useState(que?.desc)
    const urlSrc = `https://neuron-club.vercel.app/question/${que?._id}`

    let { Volume, Favour, Against } = bidData
    const handleBet = async () => {
        if (session) {
            const { username } = session;
            setIsActive(false)
            setIsSending(true)
            if (amount > 0 && amount >= bid) {
                Volume = Volume + bid
                odd == 'Favour' ? Favour = Favour + bid : Against = Against + bid;

                const { _id, question, category, settlementClosing } = que
                const res = await fetch(`/api/transaction/question`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, bid, _id, question, category, odd, settlementClosing })
                })
                console.log(res.status)
                const response = await res.json();
                if (res.status == 201 || res.status == 203) {
                    dispatch(updateBalance(amount - response?.reductionAmount))
                    setIsBidPlaced(true)
                    setQue(response?._doc)
                    setBidData({
                        Volume: response?._doc?.Volume,
                        Favour: response?._doc?.Favour,
                        Against: response?._doc?.Against
                    })
                    if (res.status === 203) {
                        toast("You've won 200 Neuron coins for this transaction! 🥳", {
                            position: "top-center",
                            autoClose: 20000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                }
            }
            else {
                setLowBalance(true)
            }
            setIsSending(false)
        }
        else {
            setIsLoggedIn(true)
        }
    }

    const validate = () => {
        if (que.qstatus == 'verified') {
            (session && bid > 0) ? setIsActive(true) : setIsLoggedIn(true)
        }
    }

    const handleChange = (e) => {
        setQue({ ...que, [e.target.name]: e.target.value });
    }

    const setQuestionStatus = () => {
        setQue({ ...que, qstatus: (que.qstatus === 'verified') ? 'closed' : 'verified' });
    }

    const updateQuestion = async () => {
        const { _id, bidClosing, settlementClosing, qstatus } = que;
        const res = await fetch(`/api/question/update_que`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id, bidClosing, settlementClosing, desc, qstatus })
        })
        console.log(res.status)
        const response = await res.json();
        if (res.status == 200) {
            setIsDescEdit(false);
            setIsDateEdit(false);
            setQue(response)
        }
    }

    const cancelUpdate = () => {
        setIsDescEdit(false);
        setIsDateEdit(false);
    }

    function DESC() {
        return { __html: que?.desc };
    }
    return (
        <>
            <Head>
                <title>Question: {que?.question}</title>
            </Head>
            <div className="pt-28 pb-10">
                {
                    que && que?.category ?
                        <>
                            <div className="w-full max-w-5xl gradient-shadow mx-auto rounded-lg lg:p-10 text-xl md:text-2xl font-medium mb-2 sm:mb-4 p-5 px-10 sm:flex sm:space-x-4 items-center text-gray-700 relative">
                                <img src={que?.image_url || `/images/que/${que?.category?.toLowerCase()}.jfif`} alt="" className="w-12 h-12 shadow-lg hover:scale-105 transition-md object-cover rounded-full" />
                                <h1 className="my-3 sm:my-0 flex-1"> {que?.question} </h1>
                                <div className="w-12 h-12 absolute top-5 right-6 sm:top-0 sm:right-0 sm:relative pt-1 grid place-items-center">
                                    {!isShare ?
                                        <ShareIcon title="Share this Question" className="w-8 h-8 sm:w-10 sm:h-10 text-gray-700 cursor-pointer" onClick={() => setIsShare(true)} />
                                        : <div className="w-12 h-auto flex flex-col items-center justify-center space-y-2 z-20">
                                            <XIcon className="w-10 h-10 bg-white cursor-pointer rounded-full text-gray-700" onClick={() => setIsShare(false)} />
                                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                                <FacebookIcon size={40} round={true} />
                                            </a>
                                            <a href={`https://twitter.com/share?text=${que?.question}&url=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                                <TelegramIcon size={40} round={true} />
                                            </a>
                                            <a href={`https://web.whatsapp.com/send?text=${que?.question}%20${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                                <WhatsappIcon size={40} round={true} />
                                            </a>
                                            <a href={`https://www.pinterest.com/pin/create/button/?url=${urlSrc}&description=${que?.question}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                                <PinterestIcon size={40} round={true} />
                                            </a>
                                            <a href={`https://telegram.me/share/url?url=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                                <TelegramIcon size={40} round={true} />
                                            </a>
                                            <a href={`https://www.reddit.com/submit?url=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                                <RedditIcon size={40} round={true} />
                                            </a>
                                            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                                <LinkedinIcon size={40} round={true} />
                                            </a>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="max-w-5xl gradient-shadow mx-auto rounded-lg p-5 lg:p-10 z-10">
                                <div className="flex flex-col-reverse md:flex-row w-full bet text-lg justify-around">
                                    <div className="bet__container">
                                        <div>
                                            <input type="radio" value="Favour" id="Favour" className="hidden"
                                                onChange={(e) => setOdd(e.target.value)} name="odd" />
                                            <label htmlFor="Favour" className={`px-6 py-3 leading-loose text-gray-800 hover:text-white hover:gradient-bg hover:border-none shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 ${odd == 'Favour' && 'gradient-bg text-white'} cursor-pointer`}>Yes</label>

                                            <input type="radio" value="Against" id="Against" className="hidden"
                                                onChange={(e) => setOdd(e.target.value)} name="odd" />
                                            <label htmlFor="Against" className={`px-6 py-3 leading-loose text-gray-800 hover:text-white hover:gradient-bg hover:border-none shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 ${odd == 'Against' && 'gradient-bg text-white'} cursor-pointer`}>No</label>
                                        </div>
                                        <div className="my-4 flex flex-col items-center">
                                            <h1 className="font-medium">Amount to Bid : <span className="text-blue-600 inline-flex items-center"><Coin width="4" height="4" />{bid}</span> </h1>
                                            <div className="relative flex items-center space-x-4 mt-4">
                                                <MinusIcon className="w-7 h-7 p-1 font-semibold bg-gray-800 text-white rounded-full cursor-pointer shadow-lg hover:scale-[1.03] active:scale-[0.99]" onClick={() => { bid > 50 && setBid(bid - 50); setLowBalance(false) }} />
                                                <input type="number" min="1" minLength="1" maxLength="1000" max="1000" value={bid} onChange={(e) => { setBid(e.target.value); setLowBalance(false) }} className="border border-gray-600 font-semibold text-blue-500 text-center rounded focus:outline-none" />
                                                <PlusIcon className="w-7 h-7 p-1 font-semibold bg-gray-800 text-white rounded-full cursor-pointer shadow-lg hover:scale-[1.03] active:scale-[0.99]" onClick={() => { bid < 951 && setBid(+bid + +50); setLowBalance(false) }} />
                                            </div>
                                        </div>
                                        {isSending ? <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose gradient-bg text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]">{'Wait...'}</button>
                                            : <button className={`px-3 py-1 mt-2 mb-2 mx-auto leading-loose text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] disabled:text-gray-800 disabled:cursor-not-allowed ${que.qstatus === 'verified' ? 'gradient-bg' : 'bg-gray-200'}`} onClick={validate} disabled={que.qstatus !== 'verified'}>{'Apply Bid'}</button>
                                        }
                                        {bid > 0 === 'false' && <p className="text-red-500 text-base mb-4"> Bid amount is low </p>}
                                        {lowBalance && <p className="text-red-500 text-base mb-4"> Not enough balance to bet </p>}
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>% Bet {`in ${odd}`}</td>
                                                    <td>{Volume > 0 ? (odd == 'Favour') ? (Favour * 100 / Volume).toFixed(2) : (Against * 100 / Volume).toFixed(2) : 0}%</td>
                                                </tr>
                                                <tr>
                                                    <td>Amount {`in ${odd}`}</td>
                                                    <td className="inline-flex items-center">
                                                        <div className="flex items-center">
                                                            <Coin width="4" height="4" />{odd == 'Favour' ? Favour : Against}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Likely earnings</td>
                                                    <td className="inline-flex items-center">
                                                        <div className="flex items-center">
                                                            <Coin width="4" height="4" />{Volume > 0 ? (odd == 'Favour') ? ((bid) * Volume / (Favour + bid)).toFixed(2) : ((bid) * Volume / (Against + bid)).toFixed(2) : bid}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="bet__container">
                                        {session?.admin && <span className="flex space-x-1 items-center text-gray-600 hover:text-gray-800 cursor-pointer text-base font-medium absolute top-5 right-5" onClick={() => setIsDateEdit(true)}><PencilIcon className="w-5 h-5" /> Edit </span>}
                                        <table className="min-h-[250px]">
                                            <tbody>
                                                <tr>
                                                    <td>Volume</td>
                                                    <td>
                                                        <div className="flex items-center">
                                                            <Coin width="4" height="4" />{Volume}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Open Date &amp; Time</td>
                                                    <td>{moment(que?.createdAt).format('lll')}</td>
                                                </tr>
                                                {isDateEdit ?
                                                    <>
                                                        <tr><td>
                                                            <label htmlFor="bidClosing" className="inline-block mb-1 font-medium">Bid Closing Date &amp; Time<span className="mx-1 text-red-500">*</span></label>
                                                        </td><td>  <input
                                                            placeholder="Bit Closing"
                                                            type="datetime-local"
                                                            name="bidClosing"
                                                            required
                                                            min={currentDate}
                                                            value={que?.bidClosing}
                                                            onChange={handleChange}
                                                            className=" w-52 h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                                        />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label htmlFor="settlementClosing" className="inline-block mb-1 font-medium">Settlement Closing Date &amp; Time<span className="mx-1 text-red-500">*</span></label>
                                                            </td><td>  <input
                                                                placeholder="Settlement Closing"
                                                                type="datetime-local"
                                                                name="settlementClosing"
                                                                required
                                                                min={currentDate}
                                                                value={que?.settlementClosing}
                                                                onChange={handleChange}
                                                                className=" w-52 h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                                            />
                                                            </td>
                                                        </tr>
                                                    </>
                                                    :
                                                    <>
                                                        <tr>
                                                            <td>Last Date &amp; Time</td>
                                                            <td>{moment(que?.bidClosing).format('lll')}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Settlement Date &amp; Time</td>
                                                            <td>{moment(que?.settlementClosing).format('lll')}</td>
                                                        </tr>
                                                    </>
                                                }
                                                <tr>
                                                    <td>Creator</td>
                                                    <td>{que?.userId}</td>
                                                </tr>
                                                {isDateEdit && <tr>
                                                    <td></td>
                                                    <td>
                                                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose gradient-bg text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={setQuestionStatus}>{que.qstatus === 'closed' ? 'Active' : 'Close'}&nbsp;this Question</button>
                                                    </td>
                                                </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                                <div className="p-5">
                                    {
                                        isDescEdit ?
                                            <>
                                                <h1 className="text-2xl font-semibold my-2">Question Description </h1>
                                                <QuillNoSSRWrapper modules={modules} placeholder='Add description here ...' value={desc} onChange={setDesc} formats={formats} theme="snow" />
                                            </>
                                            :
                                            <>
                                                <h1 className="text-2xl font-semibold my-2">About the question{session?.admin && <span className="inline-flex ml-2 text-gray-600 hover:text-gray-800 cursor-pointer space-x-1 items-center text-base font-medium" onClick={() => setIsDescEdit(true)}><PencilIcon className="w-5 h-5" /> Edit </span>} </h1>
                                                <div className="sm:text-lg que__desc" dangerouslySetInnerHTML={DESC()}>
                                                </div>
                                            </>
                                    }
                                </div>
                                {que?.reference && <div className="p-5 pt-0">
                                    <h1 className="text-2xl font-semibold my-2">Source of Settlement</h1>
                                    <a href={que?.reference} className="my-2 text-blue-500 block text-lg" target="_blank" noreferer="true">{que?.reference}</a>
                                </div>}
                                {(isDescEdit || isDateEdit) && <div className="px-5 pb-10">
                                    <button className={`px-4 py-2 leading-loose shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 gradient-bg text-white cursor-pointer`} onClick={updateQuestion}>Update</button>
                                    <button className={`px-4 py-2 leading-loose text-gray-800 hover:text-white hover:bg-gray-800 hover:border-none shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 cursor-pointer`} onClick={cancelUpdate}>Cancel</button>
                                </div>}
                            </div>
                        </>
                        :
                        <Loader />
                }
            </div>
            {isActive && <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full grid place-items-center z-50" >
                <div className="relative max-w-sm md:max-w-md py-10 md:py-14 px-5 md:px-10 bg-white rounded-xl shadow-2xl m-4">
                    <h1 className="text-xl md:text-2xl my-4 text-center font-medium text-gray-800 z-50 leading-tight">
                        Please confirm that you want to place a bid of <div className="flex items-center justify-center">
                            <Coin width="4" height="4" />{bid}
                        </div>
                    </h1>
                    <div className="flex items-center justify-around mt-6">
                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose text-gray-800 border border-gray-900 hover:bg-gray-800 hover:text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={() => setIsActive(false)}>{'Cancel'}</button>
                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose gradient-bg text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={handleBet}>{'Place Bid'}</button>
                    </div>
                </div>
            </div>}
            {isBidPlaced && <div onClick={() => setIsBidPlaced(false)} ><Modal state={isBidPlaced} text="Bid Placed Successfully" /> </div>}
            {isLoggedIn && <div onClick={() => setIsLoggedIn(false)}><Modal state={isLoggedIn} text="Please login to place a bid" link={'/account/login'} /> </div>}

        </>
    )
}

export default QuestionDetail

export async function getServerSideProps({ params }) {
    const questionData = await fetch(`${process.env.HOST}/api/question/${params._id}`).then(res => res.json())
    if (!questionData) {
        return {
            redirect: {
                destination: '/page_not_found',
                parmanent: false
            }
        }
    }
    return {
        props: {
            questionData
        }
    }
}

