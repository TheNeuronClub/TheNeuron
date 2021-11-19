import Image from 'next/image'
import Link from 'next/link'
import { userSession } from '../lib/user-session'
import { motion } from 'framer-motion'
import { pageSlide, pageTransition } from '../util'
// import Carousel from './Carousel'
import dynamic from "next/dynamic";

const Carousel = dynamic(
  () => {
    return import("./Carousel");
  },
  { ssr: false }
);

function Header({carouselList}) {
    const session = userSession()
    return (
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
    )
}

export default Header
