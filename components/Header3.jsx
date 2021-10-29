import Link from 'next/link'
import {motion} from 'framer-motion'
import { userSession } from '../lib/user-session'
import { pageSlide, pageTransition } from '../util'
function Header3() {
    const session = userSession()
    return (
        <>
            <motion.div initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageSlide}
                    transition={pageTransition} className="mx-3 my-14 md:my-20 py-10 md:py-14 px-5 text-center max-w-xl md:max-w-4xl sm:mx-auto gradient-shadow rounded-xl">
                    <h1 className='text-4xl font-bold mb-1 md:text-5xl text-gray-800'>Predict future and win rewards!</h1>
                    <p className="py-2 text-lg md:text-xl text-gray-600">The Neuron Club (TNC) is an online gaming platform that allows users to predict global events across categories and win rewards</p>
                    {session ?
                        <Link href="/question/">
                            <button className="min-w-[100px] px-5 py-1 leading-loose gradient-bg text-xl text-white rounded font-semibold active:scale-95 transition duration-100 ease-in-out focus:outline-none focus:border-none mt-2"> Explore</button>
                        </Link>
                        :
                        <Link href="/account/register">
                            <button className="min-w-[100px] px-5 py-1 leading-loose gradient-bg text-xl text-white rounded font-semibold active:scale-95 transition duration-100 ease-in-out focus:outline-none focus:border-none mt-2">Get Started</button>
                        </Link>
                    }
                    </motion.div>
        </>
    )
}

export default Header3
