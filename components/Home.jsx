import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeOut, pageTransition } from '../util'
import Image from 'next/image'

const bids = [
    {
        no: 1,
        img: "/images/works/p1.svg",
        heading: "Choose a Topic",
        desc: "Select a topic that matters to you that you're interested of"
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

const faq = [
    {
        title: 'What is the Neuron Club?',
        content: `Neuron Club is an application designed for those who are proud to have an opinion. This is a financial exchange for users to trade on opinions regarding the outcome of events of interest`
    },
    {
        title: `How does Neuron Club work?`,
        content: `Neuron Club provides a trading platform where users can trade on the outcome of events. Based on your opinion, you can choose to bet on how a specific event will turn out to be. Once the question is frozen for trading, no more trades are allowed. Thereafter, when the question is decided based on an independent source, the trading pool is distributed amongst those who predicted the correct outcome`
    },
    {
        title: `How is the winning payout decided?`,
        content: `The winner’s payout is proportional to the amount invested in the question. All the trades are combined to create a question prize pool. Once the question has been decided, the question pool is distributed amongst those with a correct prediction, in proportion to the amount invested`
    },
    {
        title: `How is Neuron different from a gambling or betting platform?`,
        content: `There are several fundamental differences between trading on a prediction market vs a gambling platform:`,
    }
]


function HomeSection() {
    const [data, setData] = useState();
    useEffect(() => {
        fetch('https://testimonialapi.toolcarton.com/api').then(res => res.json()).then(data => setData(data)).catch(e => console.log(e))
    }, [])
    return (
        <div className="max_w_3xl p-10">
            <div className='text-white'>
                <h1 className='text-4xl sm:text-5xl text-center mb-5 font-semibold '>How it Works ?</h1>
                <p className='text-lg text-center max-w-5xl mx-auto px-5 pb-10'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, cum laudantium. Repellat sapiente doloribus quasi doloremque optio provident iusto dolor. Quas hic ipsum aspernatur. In, corrupti nam?</p>
                <div className='flex flex-wrap py-5 justify-evenly items-stretch gap-8'>
                    {bids.map(item =>
                        <div key={item.no} className='max-w-[300px] min-w-[250px] p-8 rounded-md shadow-lg blur-blue opacity-90 rotate-[-1deg] hover:opacity-100 hover:rotate-[0deg] transition-all duration-200 ease-out' >
                            <div className="relative mx-auto w-20 sm:w-28 h-20 sm:h-28 xl:w-36 xl:h-36">
                                <Image src={item.img} layout="fill" objectFit="fill" className="rounded-xl drop-shadow-xl" />
                            </div>
                            <h2 className='text-2xl font-semibold my-2 text-center'>{item.heading}</h2>
                            <p className='text-lg text-gray-300 text-center'>{item.desc}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className='mt-5 lg:flex lg:items-center lg:justify-evenly p-10 gap-10'>
                <div className="relative p-5 max-w-lg min-w-max mx-auto mb-5 lg:mb-0">
                    <img src="/images/works/p2.svg" className='w-full flex-shrink-0 h-full object-cover drop-shadow-lg' alt="" />
                </div>
                <div className='max-w-lg text-center lg:text-left mx-auto'>
                    <h1 className='text-4xl sm:text-5xl text-white mb-2 font-semibold'>We Provide The Best</h1>
                    <p className='text-lg text-gray-200 my-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vitae iure expedita iste! Error, nobis! Unde maxime nisi consequatur praesentium numquam nesciunt facilis magni vel animi corrupti?</p>
                </div>
            </div>

            <div className='mt-5 lg:flex lg:flex-row-reverse lg:items-center lg:justify-evenly p-10 gap-10'>
                <div className="relative p-5 max-w-lg min-w-max mx-auto">
                    <img src="/images/works/p1.svg" className='w-full flex-shrink-0 h-full object-cover drop-shadow-lg' alt="" />
                </div>
                <div className='max-w-lg text-center lg:text-left mx-auto'>
                    <h1 className='text-4xl sm:text-5xl text-white mb-2 font-semibold'>Real Time Transaction Report</h1>
                    <p className='text-lg text-gray-200 my-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde maxime nisi consequatur praesentium numquam nesciunt facilis magni vel animi corrupti?</p>
                    <button className='btn-primary mt-2'>View Portfolio</button>
                </div>
            </div>

            <div className='py-10'>
                <h1 className='text-4xl text-white sm:text-5xl text-center mb-10 font-semibold '>Frequently Asked Questions</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 place-items-start justify-items-stretch gap-10 mx-auto max-w-7xl'>
                    {faq.map(item =>
                        <details key={item.title} className='max-w-lg p-5 blur-gray rounded-lg'>
                            <summary className='text-white text-lg 2xl:text-xl font-semibold'>{item.title}</summary>
                            <p className='text-gray-200 text-base my-2'>{item.content}</p>
                        </details>
                    )}
                </div>
            </div>

            <div className='p-10'>
                <h1 className='text-4xl text-white sm:text-5xl text-center mb-10 font-semibold '>What People Says</h1>
                <div className='flex gap-16 overflow-x-auto text-white'>
                    {
                        data?.map(item =>
                            <div key={item.id} className='min-w-[300px] shadow-lg text-center max-w-xs rounded-xl p-5 blur-blue'>
                                <img src={item.avatar} className='w-28 my-4 h-28 rounded-full shadow-lg border-4 mx-auto object-cover' alt="" />
                                <h2 className='text-xl font-semibold'>{item.name}</h2>
                                <h3 className='text-base font-medium text-yellow-300'>{item.designation}</h3>
                                <p className='line-clamp-10 text-lg text-gray-200'>{item.message}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className='mt-5 lg:flex lg:items-center lg:justify-evenly p-10 gap-10'>
                <div className='max-w-lg text-center lg:text-left mx-auto'>
                    <h1 className='text-4xl sm:text-5xl text-white mb-2 font-semibold'>Our Company Values Culture 💝</h1>
                    <p className='text-lg text-gray-200 my-2'>We specialize in creating Magnam vitae iure expedita iste! Error, nobis! Unde maxime nisi consequatur praesentium numquam nesciunt facilis magni vel animi corrupti?</p>
                </div>
                <div className="relative p-5 max-w-lg min-w-max mx-auto mb-5 lg:mb-0">
                    <div></div>
                </div>
            </div>

        </div>
    )
}

export default HomeSection
