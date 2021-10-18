import Image from 'next/image'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { pageTransition, pageZoom } from '../util'

export default function Custom404() {
    return (
        <>
            <Head>
                <title>404 | Page Not Found</title>
            </Head>
            <div className="w-full pt-28 min-h-[550px] grid place-items-center p-10">
                <motion.div initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageZoom}
                    transition={pageTransition} className="relative w-full h-full">
                    <Image src="/images/error.svg" layout="fill" objectFit="contain" />
                </motion.div>
            </div>
        </>
    )
}