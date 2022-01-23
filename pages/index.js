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
        title: 'What is the Neuron Club?',
        content: `Neuron Club is an application designed for those who are proud to have an opinion. This is a financial exchange for users to trade on opinions regarding the outcome of events of interest`
    },
    {
        title: `How is Neuron different from a gambling or betting platform?`,
        content: `There are several fundamental differences between trading on a prediction market vs a gambling platform:`,
    },
    {
        title: `How do i withdraw money?`,
        content: `Simply fill the withdrawal request form with your details. Withdrawals are processed within 2 working days. 97% requests are fulfilled within 24 hours`
    },
    {
        title: `How is the winning payout decided?`,
        content: `The winner’s payout is proportional to the amount invested in the question. All the trades are combined to create a question prize pool. Once the question has been decided, the question pool is distributed amongst those with a correct prediction, in proportion to the amount invested`
    }
]

const values = [
    {
        id: 1,
        imgSrc: "https://res.cloudinary.com/theneuron/image/upload/v1642946293/easy_uqulak.jpg",
        heading: "Easy",
        desc: "Easily make predictions through our intuitive interface"

    },
    {
        id: 2,
        imgSrc: "https://res.cloudinary.com/theneuron/image/upload/v1642946953/network-ge3c64f90e_1920_fyfabb.jpg",
        heading: "Secure",
        desc: "Your deposits are securely maintained in Coinbase wallet"

    },
    {
        id: 3,
        imgSrc: "https://res.cloudinary.com/theneuron/image/upload/v1642946255/uni_tdslly.jpg",
        heading: "Unique",
        desc: "One of a kind prediction platform focused on entertainment events"

    },
    {
        id: 4,
        imgSrc: "https://res.cloudinary.com/theneuron/image/upload/v1642946216/fun_ubwpom.jpg",
        heading: "Fun",
        desc: "Compete against fans and even run your own contests"

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
            {/* <div className="w-full flex flex-col pb-10"> */}
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

                {/* <div className='py-5'>
                    <div className='relative lg:flex lg:items-center lg:justify-evenly p-10 gap-10'>
                        <div className="relative p-5 max-w-lg min-w-max mx-auto mb-5 lg:mb-0">
                            <img src="/images/works/p2.svg" className='w-full flex-shrink-0 h-full object-cover drop-shadow-lg' alt="" />
                        </div>
                        <div className='max-w-lg text-center lg:text-left mx-auto'>
                            <h1 className='text-4xl sm:text-5xl xl:text-6xl text-white mb-2 font-semibold'>We Provide The Best</h1>
                            <p className='text-lg xl:text-xl 2xl:text-2xl text-gray-200 my-2'>Lorem ipsum dolor sit, amet adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicin consequatur praesentium numquam nesciunt facilis magni vel animi corrupti?</p>
                            {session ?
                                <button className='btn-primary mt-2' onClick={() => router.push('/crypto')}>Checkout</button>
                                :
                                <button className='btn-primary mt-2' onClick={() => router.push('/account/login')}>Login</button>
                            }
                        </div>
                    </div>
                </div> */}

                {/* <div className='py-5'>
                    <div className='lg:flex lg:flex-row-reverse lg:items-center lg:justify-evenly p-10 gap-10'>
                        <div className="relative p-5 max-w-lg min-w-max mx-auto">
                            <img src="/images/works/p1.svg" className='w-full flex-shrink-0 h-full object-cover drop-shadow-lg' alt="" />
                        </div>
                        <div className='max-w-lg text-center lg:text-left mx-auto'>
                            <h1 className='text-4xl sm:text-5xl xl:text-6xl text-white mb-2 font-semibold'>Real Time Transaction Report</h1>
                            <p className='text-lg xl:text-xl 2xl:text-2xl text-gray-200 my-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde maxime nisi consequatur praesentium numquam nesciunt facilis magni vel animi corrupti?</p>
                            {session ?
                                <button className='btn-primary mt-2' onClick={() => router.push('/account/portfolio')}>View Portfolio</button>
                                :
                                <button className='btn-primary mt-2' onClick={() => router.push('/account/login')}>Login</button>
                            }
                        </div>
                    </div>
                </div> */}

                <div className='p-5 py-10 flex items-center justify-evenly flex-wrap gap-10 lg:gap-y-20'>
                    {values?.map(item => <div key={item.id} className={`relative shadow-xl w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] 2xl:w-[550px] 2xl:h-[550px] blur-black rounded-xl`} key={item.id}>
                        <Image src={item?.imgSrc} layout="fill" className="w-full h-full object-cover rounded-md" objectFit="cover" placeholder="blur" blurDataURL={item?.imgSrc} alt="" />
                        <div className="carousel__scroll absolute left-0 overflow-x-hidden bottom-0 w-full text-white p-5 sm:px-7 xl:px-10 z-10 blur-black rounded-br-lg rounded-bl-lg">
                            {/* <div className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">

                        </div> */}
                            <h1 className="font-semibold capitalize text-4xl sm:text-5xl">{item.heading}</h1>
                            <p className='text-lg lg:text-xl line-clamp-2 font-medium my-2 2xl:mt-3 max-w-lg'>{item.desc}</p>
                        </div>
                    </div>)}
                </div>

                <QuestionGroup questions={questions?.trending} category={"Trending Topics"} />

                <div className='p-5'>
                    <h1 className='text-4xl sm:text-5xl text-white text-center mb-10 font-semibold '>Frequently Asked Questions</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 place-items-start justify-items-stretch gap-10 mx-auto max-w-7xl'>
                        {faq.map(item =>
                            <details key={item.title} className='max-w-lg p-5 blur-gray rounded-lg'>
                                <summary className='text-white text-lg 2xl:text-xl font-semibold'>{item.title}</summary>
                                <p className='text-gray-200 text-base 2xl:text-lg my-2'>{item.content}</p>
                            </details>
                        )}
                    </div>
                </div>

                {/* <div className='p-10'>
                    <h1 className='text-4xl sm:text-5xl text-white text-center mb-10 font-semibold '>What People Says</h1>
                    <div className='flex gap-16 overflow-x-auto testimonial text-white'>
                        {
                            data?.map(item =>
                                <div key={item.id} className='min-w-[300px] shadow-lg text-center max-w-xs rounded-xl p-5 blur-blue'>
                                    <img src={item.avatar} className='w-28 my-4 h-28 rounded-full shadow-lg border-4 mx-auto object-cover' alt="" />
                                    <h2 className='text-xl font-semibold'>{item.name}</h2>
                                    <h3 className='text-base font-medium text-yellow-300'>{item.designation}</h3>
                                    <p className='line-clamp-10 text-lg xl:text-xl text-gray-200'>{item.message}</p>
                                </div>
                            )
                        }
                    </div>
                </div> */}
                {/* 
                <div className='my-5 py-10'>
                    <h1 className='text-4xl sm:text-5xl xl:text-6xl text-white max-w-3xl mx-auto p-5 text-center mb-5 font-semibold capitalize'>We have support of ______ more than 30 ______ around the world</h1>
                    <iframe src="https://globe.gl/example/world-cities" className='mx-auto w-[100%] xl:w-[80%] opacity-80 hover:opacity-100' height="500" scrolling='no'></iframe>
                </div> */}


                {/* <div className='mt-5 lg:flex lg:items-center lg:justify-evenly p-10 gap-10'>
                    <div className='max-w-lg text-center lg:text-left mx-auto'>
                        <h1 className='text-4xl sm:text-5xl xl:text-6xl text-white mb-2 font-semibold'>Our Company Values Culture 💝</h1>
                        <p className='text-lg xl:text-xl 2xl:text-2xl text-gray-200 my-2'>We specialize in creating Magnam vitae iure expedita iste! Error, nobis! Unde maxime nisi consequatur praesentium numquam nesciunt facilis magni vel animi corrupti?</p>
                    </div>
                    <div className="relative max-w-lg mx-auto mb-5 lg:mb-0 flex items-center flex-wrap justify-center lg:justify-start">
                        <div className='py-2 px-4 font-semibold m-4 text-gray-800 text-base sm:text-lg xl:text-xl 2xl:text-2xl bg-white rounded-3xl min-w-max max-w-min'>👍🏻</div>
                        <div className='py-2 px-4 font-semibold m-4 text-gray-800 text-base sm:text-lg xl:text-xl 2xl:text-2xl bg-white rounded-3xl min-w-max max-w-min'>Strong 💪🏻</div>
                        <div className='py-2 px-4 font-semibold m-4 text-gray-800 text-base sm:text-lg xl:text-xl 2xl:text-2xl bg-white rounded-3xl min-w-max max-w-min'>Keep it simple</div>
                        <div className='py-2 px-4 font-semibold m-4 text-gray-800 text-base sm:text-lg xl:text-xl 2xl:text-2xl bg-white rounded-3xl min-w-max max-w-min'>Cryptography</div>
                        <div className='py-2 px-4 font-semibold m-4 text-gray-800 text-base sm:text-lg xl:text-xl 2xl:text-2xl bg-white rounded-3xl min-w-max max-w-min'>Keep up</div>
                        <div className='py-2 px-4 font-semibold m-4 text-gray-800 text-base sm:text-lg xl:text-xl 2xl:text-2xl bg-white rounded-3xl min-w-max max-w-min'>Cryptography</div>
                    </div>
                </div> */}

                {/* </div> */}
                <Head>
                    <title>The Neuron</title>
                    <link rel="icon" href="/favicon.png" />
                </Head>
                {/* <HomeSection /> */}
                {/* <QuestionGroup questions={questions?.newest} category={"New Topics"} /> */}
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

