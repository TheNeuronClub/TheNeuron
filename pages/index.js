import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OnBoard from '../components/OnBoard'
import Image from 'next/image'
import Accordion from '../components/Accordion'
import Question from '../components/Question';
import Blogs from '../components/Blogs';
import { ArrowNarrowRightIcon } from '@heroicons/react/solid'


const bids = [
    {
        no: 1,
        img: "/images/works/p1.svg",
        heading: "Choose a Topic",
        desc: "Make predictions on various entertainment topics like TV series, Movies, Celebrity lifestyle or gaming"
    },
    {
        no: 2,
        img: "/images/works/p2.svg",
        heading: "Predict the outcome",
        desc: "Get started for free with your Neuron Coins welcome bonus. No credit card details required"
    },
    {
        no: 3,
        img: "/images/works/p3.svg",
        heading: "Wait for settlement",
        desc: "Win on the predictions that come true. Easy and secure withdrawal of your winnings"
    }
]

const faq = [
    {
        title: 'How does Neuron Club work?',
        content: `Neuron Club provides a trading platform where users can trade on the outcome of events. Based on your opinion, you can choose to bet on how a specific event will turn out to be. Once the question is frozen for trading, no more trades are allowed. Thereafter, when the question is decided based on an independent source, the trading pool is distributed amongst those who predicted the correct outcome`
    },
    {
        title: `How is the winning payout decided?`,
        content: `The winner’s payout is proportional to the amount invested in the question. All the trades are combined to create a question prize pool. Once the question has been decided, the question pool is distributed amongst those with a correct prediction, in proportion to the amount invested`,
    }
]

const values = [
    {
        id: 1,
        imgSrc: "/images/values/easy.png",
        heading: "Easy",
        desc: "Easily make predictions through our intuitive interface"

    },
    {
        id: 2,
        imgSrc: "/images/values/fun.png",
        heading: "Fun",
        desc: "Compete against fans and even run your own contests with us"

    },
    {
        id: 3,
        imgSrc: "/images/values/unique.png",
        heading: "Unique",
        desc: "One of a kind prediction platform focused on entertainment events"

    },
    {
        id: 4,
        imgSrc: "/images/values/secure.png",
        heading: "Secure",
        desc: "Your deposits are securely maintained in Coinbase wallet"

    },
]

export default function Home({ carouselList }) {
    const [onBoard, setOnBoard] = useState(false)
    const [questions, setQuestions] = useState([])

    async function getQue() {
        const ques = await fetch(`${process.env.host}/api/question/ques`).then((res) => res.json());
        if (ques) {
            setQuestions(ques)
        }

    }

    useEffect(() => {
        getQue()
    }, [])

    useEffect(() => {
        const data = JSON.parse(window.localStorage.getItem('neuron-newUser'));
        if (data === true) {
            toast("🦄 Wow, You've won 200 Neuron coins! 🥳", {
                position: "top-center",
                autoClose: 100000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setOnBoard(true);
        }
        window.localStorage.setItem('neuron-newUser', false)
    }, [])


    const closeOnboard = () => {
        setOnBoard(false);
    }

    return (
        <>
            {onBoard && <OnBoard onSelect={closeOnboard} />}
            <div className="max_w_3xl pb-10 space-y-24">
                <Header carouselList={carouselList} />

                <div className='text-white py-10'>
                    <h1 className='text-4xl sm:text-5xl xl:text-6xl text-center mb-5 font-semibold '>How it Works ?</h1>
                    <p className='text-lg xl:text-xl 2xl:text-2xl text-center max-w-5xl mx-auto px-5 pb-10 text-gray-100'>Join TheNeuron.club to make predictions about your favourite entertainment topics and win with every correct prediction</p>
                    <div className='flex flex-wrap py-5 justify-evenly items-stretch gap-10'>
                        {bids.map(item =>
                            <div key={item.no} className='max-w-[300px] 2xl:max-w-[350px] min-w-[250px] p-8 rounded-md shadow-lg blur-blue opacity-90 rotate-[-1deg] hover:opacity-100 hover:rotate-[0deg] transition-all duration-200 ease-out' >
                                <div className="relative mx-auto w-28 h-28 md:w-32 md:h-32 xl:w-36 xl:h-36 2xl:w-48 2xl:h-48">
                                    <Image src={item.img} layout="fill" objectFit="fill" className="rounded-xl drop-shadow-xl" />
                                </div>
                                <h2 className='text-2xl lg:text-3xl 2xl:text-4xl font-semibold my-2 text-center'>{item.heading}</h2>
                                <p className='text-lg lg:text-xl 2xl:text-2xl text-gray-300 text-center'>{item.desc}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className='py-5 xl:py-10'>
                    <h1 className='text-4xl sm:text-5xl xl:text-6xl text-center mb-5 font-semibold text-white capitalize'>What we offer ?</h1>
                    <p className='text-lg xl:text-xl 2xl:text-2xl text-center max-w-5xl mx-auto px-5 pb-10 text-gray-100'>An unparalleled experience to immerse and interact with other fans</p>

                    <div className='p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 place-items-center items-center justify-evenly md:max-w-4xl xl:max-w-7xl mx-auto flex-wrap gap-12 lg:gap-y-16'>
                        {values?.map(item => <div key={item.id} className='blur-blue rounded-xl p-8 text-white max-w-xs flex flex-col items-center justify-center'>
                            <img src={item.imgSrc} className='w-32 h-32 sm:w-36 sm:h-36 md:w-36 md:h-36 xl:w-28 xl:h-28 p-2' alt="" />
                            <h1 className='text-3xl font-semibold mb-2 mt-4'>{item.heading}</h1>
                            <p className='text-lg md:text-xl text-center text-gray-200'>{item.desc}</p>
                        </div>)}
                    </div>
                </div>

                <div className='max-w-7xl mx-auto p-5'>
                    <h1 className='text-4xl sm:text-5xl xl:text-6xl text-center my-5 font-semibold text-white'>Trending Topics</h1>
                    <div className="p-10 flex items-center justify-evenly gap-10 flex-wrap">
                        {
                            questions?.trending?.length > 0 ?
                                <>
                                    {questions?.trending?.map((item, i) => (
                                        <Question question={item} key={i} />
                                    ))}
                                </>
                                :
                                <>
                                    {
                                        [0, 1, 2].map(item => (
                                            <div key={item} className="max-w-xs min-w-[300px] p-5 shadow-lg relative blur-black animate-pulse rounded-lg">
                                                <div className="w-full h-48 rounded-lg bg-gray-500 bg-opacity-70"></div>
                                                <div className="py-5 h-full">
                                                    <h1 className="mb-4 h-[80px] bg-gray-600 bg-opacity-50"></h1>
                                                    <div className="h-16 w-full bg-gray-700 bg-opacity-60">
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                        }
                    </div>

                    <Link href='/question/'>
                        <button className="btn-blue mt-5 cursor-pointer px-6 py-3 text-xl font-semibold rounded-full mx-auto flex items-center min-w-max">View All <ArrowNarrowRightIcon className='h-7 ml-2 hover:scale-x-125 hover:transform origin-left transition-sm' /></button>
                    </Link>
                </div>

                <div className='p-5 xl:py-10'>
                    <h1 className='text-4xl sm:text-5xl xl:text-6xl text-white text-center mb-10 font-semibold '>Frequently Asked Questions</h1>
                    <div className=' mx-auto max-w-7xl py-2'>
                        {faq.map((item, i) => (
                            <Accordion key={i} title={item.title} content={item.content} desc={item?.desc} />
                        ))}
                    </div>
                    <Link href='/faq'>
                        <button className="btn-blue mt-5 cursor-pointer px-6 py-3 text-xl font-semibold rounded-full mx-auto flex items-center min-w-max">View All <ArrowNarrowRightIcon className='h-7 ml-2 hover:scale-x-125 hover:transform origin-left transition-sm' /></button>
                    </Link>
                </div>

                <Blogs home />

                <Head>
                    <title>The Neuron Club | Predict Future and Win Rewards</title>
                    <link rel="icon" href="/favicon.png" />
                </Head>
            </div>
            <ToastContainer style={{ textAlign: 'center', zIndex: '49' }} />
        </>
    )
}

export async function getServerSideProps(context) {
    const carouselList = await fetch(`${process.env.HOST}/api/carousel`).then((res) => res.json());
    return {
        props: {
            carouselList
        }
    }
}

