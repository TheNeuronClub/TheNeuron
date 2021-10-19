import { useState, useEffect } from 'react'
import Modal from './Modal'
import dynamic from 'next/dynamic'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays'
import { motion } from 'framer-motion'
import { formats, modules, pageTransition, pageZoom } from '../util'
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

// const [createObjectURL, setCreateObjectURL] = useState(null);

// setImage(i);
// setCreateObjectURL(URL.createObjectURL(i));

// img src=""

function CreateQ({ session }) {
    const [isSending, setIsSending] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [link, setLink] = useState('')
    const [currentDate, setCurrentDate] = useState(new Date())
    const [goLiveDate, setGoLiveDate] = useState(currentDate)
    const [bidClosingDate, setBidClosingDate] = useState(addDays(goLiveDate, 1))
    const [settlementClosingDate, setSettlementClosingDate] = useState(addDays(bidClosingDate, 1))
    const [qImage, setQImage] = useState(null);
    const [data, setData] = useState({
        question: '',
        userId: session?.username || 'Unknown',
        category: '',
        bidClosing: '',
        goLive: '',
        options: ['Yes', 'No'],
        settlementClosing: '',
        qstatus: 'verified',
    })
    const [desc, setDesc] = useState('')

    useEffect(() => {
        setBidClosingDate(addDays(goLiveDate, 1))
    }, [goLiveDate])

    useEffect(() => {
        setSettlementClosingDate(addDays(bidClosingDate, 1))
    }, [bidClosingDate])

    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (qImage?.size < 500000 && qImage.size > 10) {
            setIsSending(true);
            const formData = new FormData();
            formData.append("image", qImage);
            formData.append("question", data.question);
            formData.append("userId", data.userId);
            formData.append("category", data.category);
            formData.append("goLive", goLiveDate.toISOString());
            formData.append("bidClosing", bidClosingDate.toISOString());
            formData.append("settlementClosing", settlementClosingDate.toISOString());
            formData.append("options", data.options);
            formData.append("qstatus", data.qstatus);
            formData.append("desc", desc);
            formData.append("link", link);
            const res = await fetch(`/api/question/create_question`, {
                method: 'POST',
                body: formData
            })

            console.log(res.status)
            if (res.status === 201) {
                setIsSent(true)

                setData({
                    ...data,
                    question: '',
                    category: '',
                    bidClosing: '',
                    goLive: '',
                    settlementClosing: '',
                })
                setQImage(null);
                setLink('');
                setDesc('');
                setIsSending(false)
            }
            setIsSending(false)
        }
    }


    return (
        <>
            <div className="w-full pt-28 pb-16">
                <div className="bg-white rounded gradient-shadow mx-auto p-7 sm:p-10 max-w-xl">
                    <motion.form initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageZoom}
                        transition={pageTransition} onSubmit={handleSubmit}>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="Question" className="inline-block mb-1 font-medium">Question<span className="mx-1 text-red-500">*</span></label>
                            <input
                                placeholder="Question"
                                required
                                minLength="2"
                                type="text"
                                name="question"
                                value={data.question}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="Question Image" className="inline-block mb-1 font-medium">Question Image<span className="mx-1 text-red-500">*</span></label>
                            <input type="file" required name="image" accept="image/*"
                                onChange={(e) => setQImage(e.target.files[0])}
                                className="flex-grow w-full py-2 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                            {(qImage?.size > 500000) && <p className="text-red-500 text-sm">Maximum image upload size is 500KB </p>}
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="category" className="inline-block mb-1 font-medium">Question Category<span className="mx-1 text-red-500">*</span></label>
                            <select
                                placeholder="category"
                                type="text"
                                name="category"
                                required
                                value={data.category}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            >
                                <option value="" disabled>Choose a category</option>
                                <option value="politics">Politics</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="sports">Sports</option>
                                <option value="economics">Economics</option>
                                <option value="climate">Climate</option>
                                <option value="coronavirus">Coronavirus</option>
                                <option value="crypto">Crypto</option>
                                <option value="business">Business</option>
                                <option value="crime">Crime</option>
                                <option value="arts">Arts</option>
                                <option value="technology">Technology</option>
                            </select>
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="goLive" className="inline-block mb-1 font-medium">Go Live Date &amp; Time<span className="mx-1 text-red-500">*</span></label>
                            <DatePicker className="inline-block flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline" selected={goLiveDate} dateFormat="MM/dd/yyyy hh:mm" minDate={currentDate} showTimeSelect timeFormat="HH:mm" withPortal onChange={(date) => setGoLiveDate(date)} placeholderText="Question go live date and time" />
                            {/* <input
                                placeholder="Question go live "
                                type="datetime-local"
                                name="goLive"
                                required
                                min={`${currentDate}`}
                                value={data.goLive}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            /> */}
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="bidClosing" className="inline-block mb-1 font-medium">Bid Closing Date &amp; Time<span className="mx-1 text-red-500">*</span></label>
                            <DatePicker className="inline-block flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline" selected={bidClosingDate} dateFormat="MM/dd/yyyy hh:mm" minDate={addDays(goLiveDate, 7)} showTimeSelect timeFormat="HH:mm" withPortal onChange={(date) => setBidClosingDate(date)} placeholderText="Bit closing date and time" />
                            {/* <input
                                placeholder="Bit Closing"
                                type="datetime-local"
                                name="bidClosing"
                                required
                                min={`${currentDate}`}
                                value={data.bidClosing}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            /> */}
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="settlementClosing" className="inline-block mb-1 font-medium">Settlement Closing Date &amp; Time<span className="mx-1 text-red-500">*</span></label>
                            <DatePicker className="inline-block flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline" selected={settlementClosingDate} dateFormat="MM/dd/yyyy hh:mm" minDate={addDays(bidClosingDate, 3)} showTimeSelect timeFormat="HH:mm" withPortal onChange={(date) => setSettlementClosingDate(date)} placeholderText="Settlement closing date and time" />
                            {/* <input
                                placeholder="Settlement Closing"
                                type="datetime-local"
                                name="settlementClosing"
                                required
                                min={`${currentDate}`}
                                value={data.settlementClosing}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            /> */}
                        </div>
                        <div className="mb-3">
                            <label className="inline-block mb-1 font-medium">Settlement Link</label>
                            <input
                                placeholder="Settlement Link ..."
                                type="text"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                className="flex-grow w-full resize-none py-2 h-12 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="inline-block mb-1 font-medium">Question Description</label>
                            <QuillNoSSRWrapper modules={modules} placeholder='Add description here ...' value={desc} onChange={setDesc} formats={formats} theme="snow" />
                        </div>
                        <div className="my-2 sm:my-3">
                            <button type="submit" className="btn-primary">{isSending ? `Adding` : `Add Question`}</button>
                        </div>
                    </motion.form>
                </div>
            </div>
            {isSent && <Modal state={isSent} text="Question created successfully" />}
        </>
    )
}

export default CreateQ
