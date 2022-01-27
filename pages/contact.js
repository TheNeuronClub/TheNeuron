import Head from 'next/head'
import { useState } from 'react'
import Modal from '../components/Modal'
import { motion } from 'framer-motion'
import { pageTransition, pageZoom } from '../util'

function contact() {
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [data, setData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const res = await fetch(`/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...data, email: data.email.toLowerCase()})
    })

    const response = await res.json();
    console.log(res.status)
    if (response) {
      setIsSent(true)
      setData({
        name: '',
        email: '',
        message: ''
      })
    }
    setIsSending(false)
  }
  return (
    <>
      <Head>
        <title>The Neuron Club | Contact</title>
      </Head>
      <div className="relative">
          <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col items-center justify-between lg:flex-row">
              <div className="w-full text-center max-w-xl mb-6 xl:mb-0 xl:pr-16 xl:w-7/12">
                <h1 className="max-w-lg mb-3 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl sm:leading-none">
                  Contact Us
                </h1>
                <p className="max-w-xl mb-4 text-lg font-medium text-gray-100 md:text-xl">
                  Reach out to us for any queries, partnerships or just a cup of virtual coffee. We love to hear from you.
                </p>

              </div>
              <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                <motion.div initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageZoom}
                  transition={pageTransition} className="blur-black text-white rounded gradient-shadow p-7 sm:p-10 m-2">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-1 sm:mb-2">
                      <label htmlFor="Name" className="inline-block mb-1 font-medium">Name<span className="mx-1 text-red-500">*</span></label>
                      <input
                        placeholder="John Doe"
                        required
                        minLength="2"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 blur-black border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-300 placeholder-gray-200 focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label htmlFor="email" className="inline-block mb-1 font-medium">E-mail<span className="mx-1 text-red-500">*</span></label>
                      <input
                        placeholder="john.doe@example.com"
                        required
                        type="email"
                        name="email"
                        value={data.email}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        onChange={handleChange}
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 blur-black border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-300 placeholder-gray-200 focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label htmlFor="message" className="inline-block mb-1 font-medium">Your Message<span className="mx-1 text-red-500">*</span></label>
                      <textarea
                        placeholder="Type Your Message Here ..."
                        required
                        minLength="2"
                        type="text"
                        name="message"
                        value={data.message}
                        onChange={handleChange}
                        className="flex-grow w-full resize-none py-2 h-24 px-4 mb-2 transition duration-200 blur-black border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-300 placeholder-gray-200 focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-2 sm:mb-3">
                      <button type="submit" className="px-5 py-2 btn-blue text-lg text-white rounded-xl font-semibold active:scale-95 transition-sm">{isSending ? `Sending...` : `Send Message`}</button>
                    </div>
                  </form>
                </motion.div>
              </div>
            </div>
        </div>
      </div>
      {isSent && <div onClick={() => setIsSent(false)}><Modal state={isSent} text="Thanks for contacting us. We’ll respond as soon as possible." /> </div>}
    </>
  )
}

export default contact
