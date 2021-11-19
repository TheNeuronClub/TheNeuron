import Image from "next/image"
import { motion } from "framer-motion"
import { pageSlide, pageTransition } from "../util"

function Steps({ step, type }) {
    return (
        <motion.div layoutId={step.no}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageSlide}
            transition={pageTransition} className={`md:mx-5 sm:max-w-3xl lg:max-w-5xl md:flex items-center sm:mx-auto p-5 sm:py-10 ${step.no % 2 !== 0 ? type === 'bid' ? 'flex-row-reverse' : 'flex-row' : type === 'coin' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="relative mx-auto w-80 sm:w-96 md:min-w-[350px] h-72">
                <Image src={step.img} layout="fill" objectFit="fill" className="rounded-xl" />
            </div>
            <div className="p-5 sm:px-10 lg:px-20">
                <h1 className="text-gray-50 text-2xl font-medium">Step {step?.no}</h1>
                <h1 className="text-3xl lg:text-5xl font-bold my-2 md:my-3 text-white">{step.heading}</h1>
                <p className="text-lg text-gray-50">{step?.desc}</p>
                {step?.sub_desc && <ul>
                    {step?.sub_desc?.map((item, i) => (
                        <li key={i} className="mt-2"><p className="text-gray-50 leading-normal"><b>Tip: </b> <i> {item} </i></p></li>
                    ))}
                </ul>}
                {step?.other && <ul className="mt-2 text-gray-50">
                    {
                        step?.other?.map((item, i) => (
                            <li key={i}><p>{i + 1}. {item}</p></li>
                        ))
                    }
                </ul>}
            </div>
        </motion.div>
    )
}

export default Steps
