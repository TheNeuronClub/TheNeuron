import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';
import Router from 'next/router';
import React, { useState, useEffect } from 'react'

const data = [
    { id: 0, heading: 'Science', desc: 'Explore major advances across the sciences that have transformed our understanding of the world and our universe, and our lives.', imgSrc: 'https://source.unsplash.com/1600x700/?science', category: 'science' },
    { id: 1, heading: 'Politics', desc: "Latest politics news of different countries, current affairs politics news, political standard brings you all the Latest news, election news", imgSrc: 'https://source.unsplash.com/1600x700/?politics', category: 'politics' },
    { id: 2, heading: 'Entertainment', desc: 'Latest entertainment news and gossip from the world of bollywood, Hollywood and regional film and music industries.', imgSrc: 'https://source.unsplash.com/1600x700/?entertaiment', category: 'entertaiment' },
    { id: 3, heading: 'Crypto', desc: 'Current and upcoming Crypto market stocks, NFT related market, market place of different cypto currencies', imgSrc: 'https://source.unsplash.com/1600x700/?crypto', category: 'crypto' },
    { id: 4, heading: 'Coronoavirus', desc: 'Cases in country, vaccination ratio, vaccine availabilty, covid affect on different categories', imgSrc: 'https://source.unsplash.com/1600x700/?coronavirus', category: 'coronavirus' },
]

export const CarouselItem = ({ children }) => (
    <div className="inline-flex items-start justify-start w-full h-full relative bg-black">
        {/* <picture>
            <source media="(max-width: 640px)" srcSet={imgSrc} />
            <source media="(min-width: 640px)" srcSet={imgSrc} />
            <img src={children.imgSrc} layout="fill" className="w-full h-[600px] lg:h-[650px] object-cover" />
        </picture> */}
        <img src={children.imgSrc} className="w-full h-[600px] lg:h-[650px] object-cover" alt="" />
        <div className="absolute max-w-xl bottom-5 left-4 px-5 py-10 md:p-10 lg:max-w-3xl lg:p-16 z-30">
            <h1 className="text-4xl md:text-5xl 2xl:text-6xl pb-2 font-semibold whitespace-normal text-white line-clamp-1">{children.heading}</h1>
            <p className="text-white text-xl 2xl:text-2xl font-medium lg:leading-relaxed whitespace-normal line-clamp-2 mb-3">{children.desc}</p>
            <button className="inline-block cursor-pointer bg-white text-blue-600 py-3 text-xl px-5 rounded-2xl font-semibold active:scale-95 transition duration-100 ease-in-out focus:outline-none focus:border-none" onClick={() => Router.push(`/question?category=${children.category}`)}>Explore</button>
        </div>
        <div className="z-20 w-full h-80 bg-gradient-to-t from-black to-transparent absolute bottom-0"> </div>
        <div className="z-20 w-full h-20 bg-gradient-to-b from-gray-900 to-transparent absolute top-0"> </div>
    </div>
)

function Header2() {
    const [activeIndex, setActiveIndex] = useState(0)
    useEffect(() => {
        const timer = setTimeout(() => {
            activeIndex < data.length - 1 ? setActiveIndex(activeIndex + 1) : setActiveIndex(0)
        }, 5000);
        return () => clearTimeout(timer);
    }, [activeIndex]);
    return (
        <>
            {data?.[activeIndex] && <div className="h-[600px] lg:h-[650px] carousel w-full max_w_3xl relative">
            {<button className="absolute h-1/2 top-1/2 -translate-y-1/2 left-0 z-40" onClick={() => activeIndex==0 ? setActiveIndex(data?.length -1) : setActiveIndex(activeIndex - 1)}><ArrowLeftIcon className="w-10 h-10 p-1 opacity-20 text-gray-800 mx-2 bg-white rounded-full shadow-lg" /> </button>}
                <div className="inner" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                    {
                        data.map((item, index) => (
                            <CarouselItem children={item} key={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                        ))
                    }
                </div>
                <button className="absolute h-1/2 top-1/2 -translate-y-1/2 right-0 z-40" onClick={() => activeIndex === data?.length - 1 ? setActiveIndex(0) : setActiveIndex(activeIndex + 1)} ><ArrowRightIcon className="w-10 h-10 p-1 opacity-20 text-gray-800 mx-2 bg-white rounded-full shadow-lg" /> </button>
                <div className="absolute w-full h-12 bottom-0 z-40 flex justify-center items-center p-2">
                    {data.map((_, i) => (
                        <span key={i} className={`w-3.5 h-3.5 bg-white border-2 rounded-full mx-2 cursor-pointer ${activeIndex == i && 'bg-gray-700 border-8 border-white'}`} onClick={() => setActiveIndex(i)}></span>
                    ))}
                </div>
            </div>}
        </>
    )
}

export default Header2
