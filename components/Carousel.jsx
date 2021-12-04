import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';

export default function Carousel({ carouselList }) {
    const data = [...carouselList]
    const [active, setActive] = useState(0)
    const [item, setItem] = useState(data[0])
    const [Size, setSize] = useState(window?.innerWidth < 1024 ? 'sm' : 'lg')

    useEffect(() => {
        function handleResize() {
            window.innerWidth < 1024 ? setSize('sm') : setSize('lg')
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const prev = () => {
        active > 0 ? setActive(active - 1) : setActive(data?.length - 1)
        setItem(data[active])
    }

    const next = () => {
        active < data?.length - 1 ? setActive(active + 1) : setActive(0)
        setItem(data[active])
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            active < data?.length - 1 ? setActive(active + 1) : setActive(0)
        }, 5000);
        setItem(data[active])
        return () => clearTimeout(timer);
    }, [active]);

    return (
        <>
            <div className="flex flex-col-reverse mt-10 lg:mt-0 items-center justify-center lg:flex-row lg:w-1/2 xl:w-3/5 max-w-xl z-40 2xl:max-w-2xl h-full relative">
                <div className="p-5 h-full flex flex-row lg:flex-col items-center justify-between space-x-10 lg:space-x-0 lg:space-y-10">
                    <button onClick={prev} className="p-1 border rounded-full w-7 h-7 sm:w-10 sm:h-10 text-sm sm:text-base grid place-items-center hover:bg-white hover:text-gray-800 font-medium scale-110 ease-out">
                        {Size == 'lg' ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>}
                    </button>
                    <button onClick={next} className="p-1 border rounded-full w-7 h-7 sm:w-10 sm:h-10 text-sm sm:text-base grid place-items-center hover:bg-white hover:text-gray-800 font-medium scale-110 ease-out">
                        {Size == 'lg' ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>}
                    </button>
                </div>
                <div className="relative flex-1">
                    {item && <CarouselItem key={item._id} item={item} Size={Size} />}
                </div>
            </div>

        </>
    )
}


const CarouselItem = ({ item, Size }) => {
    return (
        <motion.div
            key={item._id}
            initial={Size == 'sm' ? { opacity: 0, translateX: '400px' } : { opacity: 0, translateY: '400px' }}
            animate={Size == 'sm' ? { opacity: 1, translateX: '0px' } : { opacity: 1, translateY: '0px' }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 50,
            }}
            className={`relative shadow-xl w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] 2xl:w-[550px] 2xl:h-[550px]`} key={item.id}>
                <Image src={item?.imgSrc} layout="fill" className="w-full h-full object-cover rounded-md" objectFit="cover" placeholder="blur" blurDataURL={item?.imgSrc} alt="" />
            <div className="carousel__scroll absolute left-0 overflow-x-hidden bottom-0 w-full text-white p-5 sm:px-7 xl:px-10 z-10">
                <motion.div
                    initial={{ opacity: 0, width: '0px' }}
                    animate={{ opacity: 1, width: '100%' }}
                    transition={{
                        delay: 1,
                        type: "spring",
                        stiffness: 260,
                        damping: 50,
                    }} className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">

                </motion.div>
                <motion.h1
                    initial={Size == 'sm' ? { opacity: 0.5, translateX: '1000px' } : { opacity: 0.5, translateY: '1000px' }}
                    animate={Size == 'sm' ? { opacity: 1, translateX: '0px' } : { opacity: 1, translateY: '0px' }}
                    transition={{
                        delay: 1.5,
                        type: "spring",
                        stiffness: 200,
                        damping: 35,
                    }} className="font-semibold capitalize text-4xl sm:text-5xl">{item.heading}</motion.h1>
                <motion.p
                    initial={Size == 'sm' ? { opacity: 0.5, translateX: '1000px' } : { opacity: 0.5, translateY: '1000px' }}
                    animate={Size == 'sm' ? { opacity: 1, translateX: '0px' } : { opacity: 1, translateY: '0px' }}
                    transition={{
                        delay: 1.8,
                        type: "spring",
                        stiffness: 200,
                        damping: 40,
                    }} className='text-lg lg:text-xl line-clamp-2 font-medium my-2 2xl:mt-3 max-w-lg'>{item.desc}</motion.p>
            </div>
        </motion.div>
    )
}
