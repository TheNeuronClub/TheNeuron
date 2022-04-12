import { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import { motion } from 'framer-motion';
import { modules, formats, pageTransition, pageZoom } from '../util'
import { XIcon } from '@heroicons/react/solid';
import DatePicker from "react-datepicker";
import addDays from 'date-fns/addDays'
import dynamic from 'next/dynamic'
const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p className="text-gray-100">Loading ...</p>,
})

const EditQue = (props) => {
    const [isVerify, setIsVerify] = useState(false)
    const [isInValid, setIsInValid] = useState(false)
    const [userInfo, setUserInfo] = useState()
    const [que, setQue] = useState(props.queData);
    const [updatedQue, setUpdatedQue] = useState(props.queData);
    const [desc, setDesc] = useState(que?.desc)
    const [isQueEdit, setIsQueEdit] = useState(props.from === 'queDetail')
    const [isUpdating, setIsUpdating] = useState(false)
    const [goLiveDate, setGoLiveDate] = useState(new Date(que?.goLive))
    const [bidClosingDate, setBidClosingDate] = useState(new Date(que?.bidClosing))
    const [settlementClosingDate, setSettlementClosingDate] = useState(new Date(que?.settlementClosing))
    const [categories, setCategories] = useState(null)

    const [tags, setTags] = useState(que?.tags || []);
    const [category, setCategory] = useState(que?.category)


    useEffect(() => {
        if (new Date(goLiveDate) > new Date(bidClosingDate)) {
            setBidClosingDate(addDays(goLiveDate, 1))
        }
    }, [goLiveDate])

    useEffect(() => {
        if (new Date(settlementClosingDate) < new Date(bidClosingDate)) {
            setSettlementClosingDate(addDays(bidClosingDate, 1))
        }
    }, [bidClosingDate])

    const getUser = async () => {
        if (que?.userId?.length === 24 || que?.userId?.length === 12) {
            const res = await fetch(`/api/user/info?_id=${que?.userId}`)
            if (res.status == 200) {
                const response = await res.json();
                setUserInfo(response)
            } else {
                setUserInfo(null)
            }
        }
    }
    useEffect(() => {
        (async () => {
            const data = await fetch(`${process.env.host}/api/question/queCategory`).then((res) => res.json());
            setCategories(data)
        })()
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
            props.updateQues(que)
            props.setIsQue(null);
        }
        qstatus == 'verified' ? setIsVerify(false) : setIsInValid(false)
        setIsVerify(false)
    }

    useEffect(() => {
        if (tags?.length > 0) {
            setCategory(tags[0])
        }
    }, [tags])

    const handleChange = (e) => {
        setUpdatedQue({ ...updatedQue, [e.target.name]: e.target.value });
    }
    const handleTags = (e) => {
        e.preventDefault();
        let value = e.target.value;
        if (!category) {
            setCategory(value);
        }
        else if (category != value && value) {
            if (tags.length === 0) {
                setTags([value])
            }
            else if (tags.length > 0 && !tags?.includes(value)) {
                setTags([...tags, value])
            }
        }
    }


    const [image, setImage] = useState();
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef();

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(image)
        } else {
            setPreview(null)
        }
    }, [image])


    const updateQuestion = async () => {
        setIsUpdating(true)
        const { _id, question, reference } = updatedQue;
        const formData = new FormData();
        formData.append("image", image);
        formData.append("question", question);
        formData.append("userId", que?.userId);
        formData.append("category", category);
        formData.append("tags", JSON.stringify([... new Set([...tags, category])]));
        formData.append("goLive", goLiveDate.toISOString());
        formData.append("bidClosing", bidClosingDate.toISOString());
        formData.append("settlementClosing", settlementClosingDate.toISOString());
        formData.append("desc", desc);
        formData.append("reference", reference);
        const res = await fetch(`/api/question/create_question?_id=${_id}`, {
            method: 'PATCH',
            body: formData
        })
        const response = await res.json();
        console.log(res.status)
        if (res.status == 201) {
            setIsQueEdit(false);
            setQue(response);
            if (props.from === 'queDetail') {
                props.updateQues(response)
                props.setIsQue(null)
            }
        }
        setIsUpdating(false);
    }
    const delTag = async (item) => {
        const index = tags.findIndex((data) => data == item)
        if (index >= 0) {
            tags.splice(index, 1)
            if (category == item)
                setCategory('')
        } else {
            console.warn(`Can't remove category`)
        }
        setTags([...tags]);
    }

    function DESC() {
        return { __html: que?.desc };
    }
    return (
        <div className="fixed top-0 left-0 grid place-items-center blur-black w-full h-screen p-1 z-50">
            <XIcon className="bg-white text-gray-700 w-12 h-12 cursor-pointer rounded-full p-1 absolute top-5 right-6 z-[55] gradient-shadow" onClick={() => props.setIsQue(null)} />
            <motion.form initial="initial"
                animate="in"
                exit="out"
                variants={pageZoom}
                transition={pageTransition} className="details__div w-full max-w-5xl blur-gray rounded-lg py-5">
                <div className="w-full max-w-5xl mx-auto text-xl font-medium p-5 px-10 sm:flex sm:space-x-4 items-center text-gray-50 relative">
                    {
                        isQueEdit ?
                            <>
                                <input type="file" name="image" className="hidden" ref={fileInputRef} accept="image/*" onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file && file.type.substring(0, 5) === 'image') {
                                        setImage(file)
                                    } else if (!file) {
                                    }
                                    else {
                                        window.alert('Only Image allowed')
                                    }
                                }} />
                                <div className='blur-blue text-sm rounded-xl p-1 inline-block text-center cursor-pointer' onClick={() => (fileInputRef.current.click())} >
                                    {preview ? <img className='w-12 h-12 border border-white shadow-lg hover:scale-105 transition-md object-cover rounded-full' src={preview} alt='' /> : <>Change <br /> Image</>}
                                </div>
                            </>
                            :
                            <img src={que?.image_url || `/images/que/${que?.category?.toLowerCase()}.jfif`} alt="" className="w-12 h-12 border border-white shadow-lg hover:scale-105 transition-md object-cover rounded-full" />
                    }

                    <div className="my-3 sm:my-0 flex-1">
                        {isQueEdit ? <input
                            placeholder="Question"
                            type="text"
                            name="question"
                            required
                            value={updatedQue?.question}
                            onChange={handleChange}
                            className="w-full flex-1 h-12 px-4 mb-2 text-lg transition duration-200 bg-white border border-gray-300 text-gray-800 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                        /> : <h1 className="flex-1"> {que?.question} </h1>
                        }
                        {isQueEdit ?
                            <>
                                <select
                                    placeholder="category"
                                    type="text"
                                    name="category"
                                    required
                                    value={category}
                                    onChange={handleTags}
                                    className="flex-grow w-full h-10 max-w-max capitalize px-4 mb-2 text-lg transition duration-200 bg-white text-gray-800 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                >
                                    <option value="" disabled selected>Choose one or more category</option>
                                    {categories?.map(item => <option key={item._id} value={item.category} className="capitalize">{item.category}</option>)}
                                </select>
                                <div className='flex flex-wrap items-center gap-2 max-w-xl'>
                                    {category?.length > 0 && <p className='text-white m-1 blur-blue py-1 px-3 rounded-3xl text-lg font-medium min-w-max flex items-center'>{category}<XIcon className='w-4 h-4 ml-1 cursor-pointer text-gray-100' onClick={() => setCategory('')} /></p>}
                                    {tags?.length > 0 && tags.map(item => item != category && item?.length > 1 && <p key={item} className='text-white m-1 blur-blue py-1 px-3 rounded-3xl text-lg font-medium min-w-max flex items-center'>{item}<XIcon className='w-4 h-4 ml-1 cursor-pointer text-gray-100' onClick={() => delTag(item)} /></p>)}
                                </div>
                            </>
                            : <h2 className="flex-1 text-sm text-gray-100 capitalize"> {que?.tags?.map(item => `${item},`)} </h2>}
                    </div>
                    {props.from === 'queVerification' && <> <button className="px-4 py-1 mx-auto leading-loose btn-blue text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={() => updateStatus({ qstatus: 'verified' })}>{isVerify ? 'Wait...' : 'Set Verified'}</button>
                        <button className="px-4 py-1 mx-auto leading-loose bg-red-500 text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] ml-4 sm:ml-0" onClick={() => updateStatus({ qstatus: 'invalid' })} >{isInValid ? 'Wait...' : 'Set Invalid'}</button> </>}
                    {props.from === 'user' && <button className="btn-orange px-4 py-1 mx-auto leading-loose text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] ml-4 sm:ml-0" onClick={() => updateStatus({ qstatus: 'created' })} >{isInValid ? 'Wait...' : 'Re-Post'}</button>}
                </div>
                <div className="font-medium text-white text-center sm:text-left space-y-4 sm:space-y-0 text-lg sm:flex flex-wrap items-center justify-around sm:space-x-4 p-5">
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
                        {isQueEdit ? <DatePicker className="inline-block w-52 h-12 px-4 mb-2 transition duration-200 text-gray-900 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline" selected={goLiveDate} dateFormat="MM/dd/yyyy hh:mm" minDate={new Date()} showTimeSelect timeFormat="HH:mm" withPortal onChange={(date) => setGoLiveDate(date)} placeholderText="Go Live date and time" />
                            : <h2 className="font-normal">{que?.goLive && moment(que?.goLive).format('lll')}</h2>
                        }
                    </div>
                    <div>
                        <h1>Closing Date &amp; Time</h1>
                        {isQueEdit ? <DatePicker className="inline-block w-52 h-12 px-4 mb-2 transition duration-200 text-gray-900 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline" selected={bidClosingDate} dateFormat="MM/dd/yyyy hh:mm" minDate={new Date()} showTimeSelect timeFormat="HH:mm" withPortal onChange={(date) => setBidClosingDate(date)} placeholderText="Bit closing date and time" />
                            : <h2 className="font-normal">{moment(que?.bidClosing).format('lll')}</h2>}
                    </div>
                    <div>
                        <h1>Settlement Date &amp; Time</h1>
                        {isQueEdit ? <DatePicker className="inline-block w-52 h-12 px-4 mb-2 transition duration-200 text-gray-900 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline" selected={settlementClosingDate} dateFormat="MM/dd/yyyy hh:mm" minDate={addDays(bidClosingDate, 1)} showTimeSelect timeFormat="HH:mm" withPortal onChange={(date) => setSettlementClosingDate(date)} placeholderText="Settlement closing date and time" />
                            : <h2 className="font-normal">{moment(que?.settlementClosing).format('lll')}</h2>}
                    </div>
                </div>

                {
                    isQueEdit ?
                        <div className="px-5">
                            <h1 className="text-2xl text-white font-semibold my-2">Question Description </h1>
                            <QuillNoSSRWrapper modules={modules} placeholder='Add description here ...' value={desc} onChange={setDesc} formats={formats} theme="snow" className="bg-white" />
                        </div>

                        :
                        <>{
                            que?.desc &&
                            <div className="p-5 text-white">
                                <h1 className="text-2xl font-semibold my-2">About the question</h1>
                                <div className="sm:text-lg que__desc" dangerouslySetInnerHTML={DESC()}></div>
                            </div>}
                        </>
                }

                {
                    isQueEdit ?
                        <>  <div className="px-5 pb-5">
                            <h1 className="text-2xl font-semibold text-white my-2">Source of Settlement</h1>
                            <input
                                placeholder="Settlement Link"
                                type="text"
                                name="reference"
                                value={updatedQue?.reference}
                                onChange={handleChange}
                                className="w-full flex-1 h-12 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        </>
                        :
                        <>
                            {que?.reference &&
                                <div className="px-5 pb-5">
                                    <h1 className="text-2xl font-semibold text-white my-2">Source of Settlement</h1>
                                    <a href={que?.reference} className="my-2 text-blue-500 block text-lg break-all" target="_blank" noreferer="true">{que?.reference}</a>
                                </div>
                            }
                        </>
                }

                <> {isQueEdit ? <div className="px-5 pb-10">
                    <button className={`px-4 py-2 leading-loose shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 btn-blue text-white cursor-pointer`} type="submit" onClick={updateQuestion}>{isUpdating ? 'Wait...' : 'Update'}</button>
                    <button className={`px-4 py-2 leading-loose text-gray-50 border border-white hover:text-gray-800 hover:bg-gray-50 hover:border-none shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 cursor-pointer`} onClick={() => { setIsQueEdit(false); if (props.from === 'queDetail') { props.setIsQue(null) } }}>Cancel</button>
                </div> :
                    <button className={`px-4 py-2 leading-loose shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 btn-blue text-white cursor-pointer`} onClick={() => setIsQueEdit(true)}>Edit Question</button>
                }
                </>
            </motion.form >
        </div >
    )
}

export default EditQue
