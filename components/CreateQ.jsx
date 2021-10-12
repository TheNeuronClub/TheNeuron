import { useState, useEffect } from 'react'
import Modal from './Modal'
import dynamic from 'next/dynamic'
import { formats, modules } from '../util'
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
    const [currentDate, setCurrentDate] = useState('')
    const [qImage, setQImage] = useState(null);
    const [data, setData] = useState({
        question: '',
        userId: session?.username || 'Ankit628792',
        category: '',
        bidClosing: '',
        goLive: '',
        options: ['Yes', 'No'],
        settlementClosing: '',
        qstatus: 'created',
    })
    const [desc, setDesc] = useState('')

    useEffect(() => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        // today = yyyy + '-' + mm + '-' + dd;
        today = `${yyyy}-${mm}-${dd}T${today.getHours()}:${today.getMinutes()}`
        setCurrentDate(today)
    }, [currentDate])

    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (qImage?.size < 500000) {
            setIsSending(true);
            const formData = new FormData();
            formData.append("image", qImage);
            formData.append("question", data.question);
            formData.append("userId", data.userId);
            formData.append("category", data.category);
            formData.append("bidClosing", data.bidClosing);
            formData.append("settlementClosing", data.settlementClosing);
            formData.append("options", data.options);
            formData.append("qstatus", data.qstatus);
            formData.append("desc", desc);
            formData.append("link", link);
            const res = await fetch(`/api/question/create_question`, {
                method: 'POST',
                body: formData
            })

            console.log(res.status)
            const response = await res.json(); 
            if (res.status === 201) {
                const cron = {_id: response?._id, qstatus: 'verified', goLive: data?.goLive}
                setIsSent(true)
                
                setData({...data,
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
                fetch(`/api/question/verifyQue`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cron)
                });
            }
            setIsSending(false)
        }
    }

    
    return (
        <>
            <div className="w-full pt-28 pb-16">
                <div className="bg-white rounded gradient-shadow mx-auto p-7 sm:p-10 max-w-xl">
                    <form onSubmit={handleSubmit}>
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
                            <input
                                placeholder="Question go live "
                                type="datetime-local"
                                name="goLive"
                                required
                                min={`${currentDate}`}
                                value={data.goLive}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="bidClosing" className="inline-block mb-1 font-medium">Bid Closing Date &amp; Time<span className="mx-1 text-red-500">*</span></label>
                            <input
                                placeholder="Bit Closing"
                                type="datetime-local"
                                name="bidClosing"
                                required
                                min={`${currentDate}`}
                                value={data.bidClosing}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="settlementClosing" className="inline-block mb-1 font-medium">Settlement Closing Date &amp; Time<span className="mx-1 text-red-500">*</span></label>
                            <input
                                placeholder="Settlement Closing"
                                type="datetime-local"
                                name="settlementClosing"
                                required
                                min={`${currentDate}`}
                                value={data.settlementClosing}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
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
                    </form>
                </div>
            </div>
            {isSent && <Modal state={isSent} text="Question created successfully" />}
        </>
    )
}

export default CreateQ
