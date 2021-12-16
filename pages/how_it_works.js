import Head from "next/head";
import Steps from "../components/Steps";
import { useState } from 'react'
import ScrollToTop from "../components/ScrollToTop";
import { motion } from 'framer-motion'
import { pageSlide, pageTransition } from '../util'

function how_it_works() {
    const bids = [
        {
            no: 1,
            img: "/images/works/p1.svg",
            heading: "Choose a Topic",
            desc: "Select a topic that matters to you. At TheNeuron.club (TNC) you get an opportunity to predict across wide range of topics curated by us everyday"
        },
        {
            no: 2,
            img: "/images/works/p2.svg",
            heading: "Predict the outcome",
            desc: "Predict the expected outcome of the topic."
        },
        {
            no: 3,
            img: "/images/works/p3.svg",
            heading: "Wait for settlement",
            desc: "Monitor the topic as it unfolds, and wait for the final settlement."
        }
    ]

    const coins = [
        {
            no: 1,
            img: "/images/works/c1.svg",
            heading: "Welcome Bonus",
            desc: "When you join, we gift you 1000 coins (worth $10) as a welcome bonus. You can use these coins on TheNeuron.club to invest in questions. You can check your coin balance on top of the page. 1 US Dollar is equivalent to 100 Neuron coins"
        },
        {
            no: 2,
            img: "/images/works/c2.svg",
            heading: "Predict the questions",
            desc: "Use coins in your balance to invest and predict outcome of questions on Theneuron.club"
        },
        {
            no: 3,
            img: "/images/works/c3.svg",
            heading: "Continue to earn",
            desc: "Earn more coins when you predict the outcome correctly. You also earn coins for many more activities as below.",
            other: ['You earn 100 coins every day you visit TheNeuron.club',
                'You earn 200 coins when you do your first investment on any question',
                'You earn 500 coins everytime you invest in at least 3 questions in a week']
        },
    ]

    const [active, setActive] = useState('bid')

    return (
        <>
            <Head>
                <title>The Neuron | How it Works</title>
            </Head>
            <div className="py-20 relative">
                <h1 className="text-5xl font-bold text-center text-white">Get Started with {active === 'bid' ? 'Bid' : 'Coins'}</h1>
                <div className="h-1 w-60 mx-auto my-4 bg-gray-50"></div>

                <div className=" flex mx-auto w-full justify-center mt-10">
                    <button className={`px-4 py-2 text-lg font-medium blur-blue border border-b-0 mx-2 text-gray-50 rounded-t-md min-w-[100px] shadow-sm ${active === 'bid' && 'btn-white gradient-shadow border-none'}`} onClick={() => setActive('bid')}>Place a Bid </button>
                    <button className={`px-4 py-2 text-lg font-medium blur-blue border border-b-0 mx-2 text-gray-50 rounded-t-md min-w-[100px] shadow-sm ${active === 'coin' && 'btn-white gradient-shadow border-none'}`} onClick={() => setActive('coin')}>Coins </button>
                </div>
                <motion.div initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageSlide}
                    transition={pageTransition} className="min-h-screen py-5 blur-blue relative max-w-max mx-auto rounded-lg border">
                    {
                        active === 'bid' ?
                            bids.map(item => (<Steps key={item.no} step={item} type={"bid"} />))
                            : coins.map(item => (<Steps key={item.no} step={item} type={"coin"} />))
                    }
                </motion.div>
            </div>
            <ScrollToTop />
        </>
    )
}

export default how_it_works
