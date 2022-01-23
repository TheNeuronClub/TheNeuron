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
            desc: "Make predictions on a wide range of entertainment related topics, ranging from TV series, Movies, Celebrity lifestyle etc. Want us to start covering a new topic? Let us know and we will cover it"
        },
        {
            no: 2,
            img: "/images/works/p2.svg",
            heading: "Predict the outcome",
            desc: "Predict the expected outcome of the topic. Get started for free with you Neuron Coins welcome bonus. Need more, check out several ways to earn coins here and buy Neuron coins with Bitcoin"
        },
        {
            no: 3,
            img: "/images/works/p3.svg",
            heading: "Wait for settlement",
            desc: "Win on the predictions that come true . Monitor the topic as it unfolds, and wait for the final settlement. Easily withdraw your winnings to your Bitcoin wallet"
        }
    ]

    const coins = [
        {
            no: 1,
            img: "/images/works/c1.svg",
            heading: "Welcome Bonus",
            desc: "When you join, get 200 Neuron Coins as a welcome bonus. You can check your coin balance on top of the Portfolio page"
        },
        {
            no: 2,
            img: "/images/works/c2.svg",
            heading: "Predict the questions",
            desc: "Use coins in your balance to predict the outcome of topics. Grow your coin balance with every correct prediction"
        },
        {
            no: 3,
            img: "/images/works/c3.svg",
            heading: "Add coins to your wallet",
            desc: "You can buy more coins using Bitcoin. Checkout the deposit instructions here to add more coins to your wallet",
        },
        {
            no: 4,
            img: "/images/works/c3.svg",
            heading: "Withdraw your money",
            desc: "Easily withdraw money to your Bitcoin wallet. Checkout the instructions on how to withdraw",
        }
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
