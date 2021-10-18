import Head from 'next/head'
import { useState } from 'react'
import Modal from '../components/Modal'
import { userSession } from '../lib/user-session/index'
import { motion } from 'framer-motion'
import { pageTransition, pageZoom } from '../util';
function report_bug() {
    const session = userSession();
    const [isSending, setIsSending] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [bugImage, setBugImage] = useState();
    const [data, setData] = useState({
        issue: '',
        email: '',
        desc: ''
    })

    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (bugImage?.size < 1000000) {
            setIsSending(true);
            const formData = new FormData();
            formData.append("image", bugImage);
            formData.append("issue", data.issue);
            formData.append("email", data.email);
            formData.append("desc", data.desc);
            formData.append("userId", session?._id);
            const res = await fetch(`/api/bug`, {
                method: 'POST',
                body: formData
            })

            const response = await res.json();
            console.log(res.status)
            if (response) {
                setIsSent(true)
                setData({
                    email: '',
                    issue: '',
                    desc: ''
                })
                setBugImage(null)
            }
            setIsSending(false)
        }
    }
    return (
        <>
            <Head>
                <title>The Neuron | Report a Bug</title>
            </Head>
            <div className="relative pt-24 pb-10">

                <div className="w-full max-w-xl xl:px-8 xl:w-5/12 mx-auto">
                    <motion.div initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageZoom}
                        transition={pageTransition} className="bg-white rounded gradient-shadow p-7 sm:p-10 m-2">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-1 sm:mb-2">
                                <label htmlFor="email" className="inline-block mb-1 font-medium">Your E-mail<span className="mx-1 text-red-500">*</span> </label>
                                <input
                                    placeholder="john.doe@example.com"
                                    required
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                    onChange={handleChange}
                                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-1 sm:mb-2">
                                <label htmlFor="Name" className="inline-block mb-1 font-medium">Issue Name<span className="mx-1 text-red-500">*</span></label>
                                <input
                                    placeholder="Short description "
                                    required
                                    minLength="2"
                                    type="text"
                                    name="issue"
                                    value={data.issue}
                                    onChange={handleChange}
                                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-1 sm:mb-2">
                                <label htmlFor="attachment" className="inline-block mb-1 font-medium">Bug Screenshot</label>
                                <input type="file" required name="attachment" accept="image/*"
                                    onChange={(e) => setBugImage(e.target.files[0])}
                                    className="flex-grow w-full py-2 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                />
                                {(bugImage?.size > 1000000) && <p className="text-red-500 text-sm">Maximum image upload size is 1MB </p>}
                            </div>

                            <div className="mb-1 sm:mb-2">
                                <label htmlFor="message" className="inline-block mb-1 font-medium">Issue Description</label>
                                <textarea
                                    placeholder="Describe the issue here in more detail ..."
                                    minLength="2"
                                    type="text"
                                    name="desc"
                                    value={data.desc}
                                    onChange={handleChange}
                                    className="flex-grow w-full resize-none py-2 h-24 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-2 sm:mb-3">
                                <button type="submit" className="px-5 py-2 gradient-bg text-lg text-white rounded-xl font-semibold active:scale-95 transition-sm">{isSending ? `Sending...` : `Send Message`}</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
            {isSent && <div onClick={() => setIsSent(false)}><Modal state={isSent} text="Thanks for your feedback. We'll resolve the issue soon" /> </div>}
        </>
    )
}

export default report_bug
