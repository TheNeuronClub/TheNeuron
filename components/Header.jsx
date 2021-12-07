import Link from 'next/link'
import { userSession } from '../lib/user-session'
import { motion } from 'framer-motion'
import { fadeOut, pageSlide, pageTransition } from '../util'
import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("./Carousel"), {
    ssr: false,
    loading: () => <motion.div initial="initial"
        animate="in"
        exit="out"
        variants={fadeOut}
        transition={pageTransition} className="w-full mt-10 lg:mt-0 lg:w-1/2 xl:w-3/5 max-w-xl z-40 2xl:max-w-2xl h-full relative">
        <div className={`relative mx-auto shadow-xl w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[300px] lg:h-[300px] xl:w-[400px] xl:h-[400px] 2xl:w-[450px] 2xl:h-[450px] blur-black animate-pulse`}>
            <h1 className="absolute bottom-0 left-0 w-full h-32 blur-gray animate-pulse"></h1>
        </div>
    </motion.div>
});

function Header({ carouselList }) {
    const session = userSession()
    return (
        <>
            <div className="relative filter saturate-150 min-h-[650px] sm:min-h-[680px] md:min-h-[550px] lg:min-h-[650px] flex flex-col-reverse text-center lg:text-left lg:flex-row items-center justify-around px-5 sm:px-10 xl:px-20 text-white">
                <motion.div initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageSlide}
                    transition={pageTransition} className="lg:w-1/2 xl:w-2/5 lg:pr-5 my-10 lg:my-0">
                    <h1 className='text-[40px] font-bold leading-tight max-w-xl mx-auto lg:mx-0 lg:max-w-md sm:text-5xl md:text-6xl lg:text-7xl'>Predict future and win rewards!</h1>
                    <p className="py-4 text-base sm:text-lg max-w-2xl lg:max-w-lg xl:max-w-xl md:text-xl">The Neuron Club (TNC) is an online gaming platform that allows users to predict global events across categories and win rewards</p>
                    {session ?
                        <Link href="/question/">
                            <button className="btn-header mt-2"> Explore</button>
                        </Link>
                        :
                        <Link href="/account/register">
                            <button className="btn-header mt-2">Get Started</button>
                        </Link>
                    }
                </motion.div>
                {carouselList?.length > 0 && <Carousel carouselList={carouselList} />}
            </div>
        </>
    )
}

export default Header
