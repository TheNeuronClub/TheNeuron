import Head from 'next/head'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import QuestionGroup from '../components/QuestionGroup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OnBoard from '../components/OnBoard'
import Image from 'next/image'
import { userSession } from '../lib/user-session/index'
import { useRouter } from 'next/router';
import Accordion from '../components/Accordion'


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
    },
    {
        title: `How is Neuron different from a gambling or betting platform?`,
        content: `There are several fundamental differences between trading on a prediction market vs a gambling platform:`,
        desc: [`On the Neuron platform, you are competing against other players who have a different opinion than you on the events of interest. However, on a gambling platform, you are competing against the booker (sports betting website). So betting websites are incentivized to tweak the odds against you while The Neuron club team remains a neutral market observer and doesn’t take a stake on any side`, `Trading on the Neuron platform is a game of skill. In a game of skill, you can increase your odds of winning by doing research, strategizing, and selectively picking the questions. However, on a betting platform, luck plays a very important role in deciding the winner and anyone can make a bet and get lucky.`, `In a game of skill, players are seen to get better with time as they learn more about the strategies to maximize your winning. However, in a gambling platform, players do not necessarily get better with time`]
    },
    {
        title: `How is Neuron different from a stock trading platform?`,
        content: `Our vision for TheNeruon.club is to develop it along the lines of a stock trading platform and offer users similar functionalities. The Neuron platform allows users to trade on the outcome of events beyond the business domain, thus offering a much wider scope of services`
    }, ,
    {
        title: `What is a Neuron coin?`,
        content: `Neuron.club points is currency which you can use on Neuron.club to invest. 100 coins are equivalent of 1$`
    },
    {
        title: `How can I convert coins to money?`,
        content: `We will soon begin supporting converting coins to money. Meanwhile, please continue to bet and earn more coins`
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
    const session = userSession();
    const router = useRouter();
    const [onBoard, setOnBoard] = useState(false)
    const [questions, setQuestions] = useState([])
    const [data, setData] = useState();
    useEffect(() => {
        fetch('https://testimonialapi.toolcarton.com/api').then(res => res.json()).then(data => setData(data)).catch(e => console.log(e))
    }, [])

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
            <div className="max_w_3xl pb-10 space-y-20">
                <Header carouselList={carouselList} />

                <div className='text-white py-10'>
                    <h1 className='text-4xl sm:text-5xl xl:text-6xl text-center mb-5 font-semibold '>How it Works ?</h1>
                    <p className='text-lg xl:text-xl 2xl:text-2xl text-center max-w-5xl mx-auto px-5 pb-10'>Join TheNeuron.club to make predictions about your favourite entertainment topics and win with every correct prediction</p>
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


                <div className='p-5 flex items-center justify-evenly max-w-5xl mx-auto flex-wrap gap-12 lg:gap-y-16'>
                    {values?.map(item => <div key={item.id} className='blur-blue rounded-xl p-8 text-white max-w-xs flex flex-col items-center justify-center'>
                        <img src={item.imgSrc} className='w-32 h-32 sm:w-36 sm:h-36 md:w-36 md:h-36 p-2' alt="" />
                        <h1 className='text-3xl font-semibold mb-2 mt-4'>{item.heading}</h1>
                        <p className='text-lg md:text-xl text-center text-gray-200'>{item.desc}</p>
                    </div>)}
                </div>

                <QuestionGroup questions={questions?.trending} category={"Trending Topics"} />

                <div className='p-5'>
                    <h1 className='text-4xl sm:text-5xl text-white text-center mb-10 font-semibold '>Frequently Asked Questions</h1>
                    <div className=' mx-auto max-w-7xl'>
                        {faq.map((item, i) => (
                            <Accordion key={i} title={item.title} content={item.content} desc={item?.desc} />
                        ))}
                    </div>
                </div>

                <Head>
                    <title>The Neuron</title>
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

