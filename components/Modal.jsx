import { XIcon } from "@heroicons/react/solid"
import Router from "next/router"
import { useState } from 'react'
import { motion } from "framer-motion"
import { pageTransition, pageZoom } from "../util"

function Modal({ state, text, link }) {
    const [isActive, setIsActive] = useState(state)
    return (
        <>
            {isActive && <motion.div initial="initial"
                animate="in"
                exit="out"
                variants={pageZoom}
                transition={pageTransition} className="fixed top-0 left-0 right-0 bottom-0 w-full h-full grid place-items-center blur-black z-50" onClick={() => setIsActive(false)} >
                <div className="relative max-w-sm md:max-w-md py-10 md:py-14 px-5 md:px-10 blur-white rounded-xl shadow-2xl m-4 text-center">
                    <XIcon className="h-8 w-8 md:w-10 md:h-10 absolute top-4 right-4 cursor-pointer active:scale-95 transition-sm text-white" onClick={() => setIsActive(false)} />
                    <h1 className="text-xl md:text-2xl my-4 text-center font-medium text-white z-50 leading-tight">
                        {text}
                    </h1>
                    {link && <button className="btn-orange py-2 px-5 font-medium text-xl rounded-xl mx-auto w-[100px] " onClick={() => Router.push(`${link}`)}>Login</button>}
                </div>
            </motion.div>}
        </>
    )
}

export default Modal
