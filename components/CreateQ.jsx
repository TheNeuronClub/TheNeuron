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
    loading: () => <p className="text-gray-100">Loading ...</p>,
})

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
        userId: session?._id,
        category: '',
        bidClosing: '',
        goLive: '',
        options: ['Yes', 'No'],
        settlementClosing: '',
        qstatus: 'created',
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
            <div className="w-full py-16">
                <div className="blur-white rounded gradient-shadow mx-auto p-7 sm:p-10 md:px-20 max-w-xl md:max-w-3xl">
                    <motion.form initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageZoom}
                        transition={pageTransition} onSubmit={handleSubmit}>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="Question" className="inline-block mb-1 text-white font-medium">Question<span className="mx-1 text-red-500">*</span></label>
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
                            <label htmlFor="Question Image" className="inline-block mb-1 text-white font-medium">Question Image<span className="mx-1 text-red-500">*</span></label>
                            <input type="file" required name="image" accept="image/*"
                                onChange={(e) => setQImage(e.target.files[0])}
                                className="flex-grow w-full py-2 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                            {(qImage?.size > 1000000) && <p className="text-red-500 text-sm">Maximum image upload size is 1MB </p>}
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="category" className="inline-block mb-1 text-white font-medium">Question Category<span className="mx-1 text-red-500">*</span></label>
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
                            <label htmlFor="goLive" className="inline-block mb-1 text-white font-medium">Go Live Date &amp; Time<span className="mx-1 text-red-500">*</span></label>
                            <DatePicker className="inline-block flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline" selected={goLiveDate} dateFormat="MM/dd/yyyy hh:mm" minDate={currentDate} showTimeSelect timeFormat="HH:mm" withPortal onChange={(date) => setGoLiveDate(date)} placeholderText="Question go live date and time" />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="bidClosing" className="inline-block mb-1 text-white font-medium">Bid Closing Date &amp; Time<span className="mx-1 text-red-500">*</span></label>
                            <DatePicker className="inline-block flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline" selected={bidClosingDate} dateFormat="MM/dd/yyyy hh:mm" minDate={addDays(goLiveDate, 1)} showTimeSelect timeFormat="HH:mm" withPortal onChange={(date) => setBidClosingDate(date)} placeholderText="Bit closing date and time" />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="settlementClosing" className="inline-block mb-1 text-white font-medium">Settlement Closing Date &amp; Time<span className="mx-1 text-red-500">*</span></label>
                            <DatePicker className="inline-block flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline" selected={settlementClosingDate} dateFormat="MM/dd/yyyy hh:mm" minDate={addDays(bidClosingDate, 1)} showTimeSelect timeFormat="HH:mm" withPortal onChange={(date) => setSettlementClosingDate(date)} placeholderText="Settlement closing date and time" />
                        </div>
                        <div className="mb-3">
                            <label className="inline-block mb-1 text-white font-medium">Settlement Link</label>
                            <input
                                placeholder="Settlement Link ..."
                                type="text"
                                value={link}
                                required
                                onChange={(e) => setLink(e.target.value)}
                                className="flex-grow w-full resize-none py-2 h-12 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="inline-block mb-1 text-white font-medium">Question Description</label>
                            <QuillNoSSRWrapper modules={modules} placeholder='Add description here ...' value={desc} onChange={setDesc} formats={formats} className="bg-white" theme="snow" />
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
