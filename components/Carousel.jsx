import React, { useState } from 'react'
import { ArrowCircleLeftIcon, ArrowCircleRightIcon, ArrowLeftIcon, ArrowRightIcon, XCircleIcon, XIcon } from '@heroicons/react/solid'

const data = [
    { id: 0, imgSrc: 'https://images.unsplash.com/photo-1605165566807-508fb529cf3e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80' },
    { id: 1, imgSrc: 'https://images.unsplash.com/photo-1526933970935-5b59e720c628?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80' },
    { id: 2, imgSrc: 'https://images.unsplash.com/photo-1558698872-5950d0ecf27c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80' },
    { id: 3, imgSrc: 'https://images.unsplash.com/photo-1615561916422-7014e1078997?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80' },
    { id: 4, imgSrc: 'https://images.unsplash.com/photo-1544197059-edf033171da5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1190&q=80' }
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
            {data?.[activeIndex] && <div className="h-screen top-0 left-0 absolute z-50 w-full bg-black bg-opacity-50">
                <div className="max_w_3xl carousel fixed top-1/2 transform -translate-y-1/2">
                    {activeIndex > 0 && <button className="absolute h-1/2 top-1/2 -translate-y-1/2 left-0 z-50" onClick={() => setActiveIndex(activeIndex - 1)}><ArrowLeftIcon className="w-10 h-10 p-1 opacity-50 text-gray-800 mx-2 bg-white rounded-full shadow-lg" /> </button>}
                    <div className="inner relative" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>

                        {
                            data.map((item, index) => (
                                <CarouselItem children={item.imgSrc} key={index} width="100%" />
                            ))
                        }

                    </div>
                    <button className="absolute h-1/2 top-1/2 -translate-y-1/2 right-0 z-50" onClick={() => activeIndex === data?.length - 1 ? props.onSelect() : setActiveIndex(activeIndex + 1)} ><ArrowRightIcon className="w-10 h-10 p-1 opacity-50 text-gray-800 mx-2 bg-white rounded-full shadow-lg" /> </button>
                </div>
                <button className="absolute top-5 right-8" onClick={() => props.onSelect()}><XIcon className="w-10 h-10 p-1 opacity-60 text-gray-800 mx-2 bg-white rounded-full shadow-lg" /> </button>
            </div>}
        </>
    )
}

export default Carousel
