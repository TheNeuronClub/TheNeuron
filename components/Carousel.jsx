import React, { useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from '@heroicons/react/solid'

const data = [
    { id: 0, imgSrc: '/images/works/o1.png' },
    { id: 1, imgSrc: '/images/works/o2.png' },
    { id: 2, imgSrc: '/images/works/o3.png' },
    { id: 3, imgSrc: '/images/works/o4.png' },
]

export const CarouselItem = ({ children, width }) => (
    <div className="carousel-item px-10 md:px-20" style={{ width: width }}>
        <img src={children} className="w-full h-full rounded-lg object-contain" alt="" />
    </div>
)

function Carousel(props) {
    const [activeIndex, setActiveIndex] = useState(0)
    return (
        <>
            {data?.[activeIndex] && <div className="h-screen top-0 left-0 absolute w-full bg-black bg-opacity-80 z-50">
                <div className="max_w_3xl carousel fixed top-1/2 transform -translate-y-1/2">
                    {activeIndex > 0 && <button className="absolute h-1/2 top-1/2 -translate-y-1/2 left-0" onClick={() => setActiveIndex(activeIndex - 1)}><ArrowLeftIcon className="w-10 h-10 p-1 opacity-50 text-gray-800 mx-2 bg-white rounded-full shadow-lg" /> </button>}
                    <div className="inner relative" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                        {
                            data.map((item, index) => (
                                <CarouselItem children={item.imgSrc} key={index} width="100%" />
                            ))
                        }
                    </div>
                    <button className="absolute h-1/2 top-1/2 -translate-y-1/2 right-0" onClick={() => activeIndex === data?.length - 1 ? props.onSelect() : setActiveIndex(activeIndex + 1)} ><ArrowRightIcon className="w-10 h-10 p-1 opacity-50 text-gray-800 mx-2 bg-white rounded-full shadow-lg" /> </button>
                </div>
                <button className="absolute top-5 right-8" onClick={() => props.onSelect()}><XIcon className="w-10 h-10 p-1 opacity-60 text-gray-800 mx-2 bg-white rounded-full shadow-lg" /> </button>
            </div>}
        </>
    )
}

export default Carousel
