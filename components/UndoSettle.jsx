import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { pageTransition, pageZoom } from '../util'

export const UndoSettle = ({ queId, finalResult, setIsUndoSettle, setQue }) => {
    const [reason, setReason] = useState('other')
    const [message, setMessage] = useState('')

    const invalidRef = useRef()

    const otherRef = useRef()

    const [isSending, setIsSending] = useState(false)
    const handleUndo = async () => {
        setIsSending(true)
        const res = await fetch(`/api/transaction/undoSettlement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: queId, result: finalResult, message: message, reason: reason })
        })
        console.log(res.status)
        const response = await res.json();
        if (res.status == 200) {
            setQue(response)
            setIsUndoSettle(false)
        }
        setIsSending(false)
    }
    return (
        <>
            {<motion.div initial="initial"
                animate="in"
                exit="out"
                variants={pageZoom}
                transition={pageTransition} className="fixed inset-0 w-full h-full grid place-items-center z-50 blur-black max_w_3xl" >
                <div className="relative max-w-sm md:max-w-md py-10 md:py-14 px-5 md:px-10 blur-gray text-white rounded-xl shadow-2xl m-4">
                    <h1 className="text-xl md:text-2xl my-4 text-center font-medium z-50 leading-tight">
                        Do you want to undo settlement for this question ?
                    </h1>
                    <div className="flex w-full items-center my-2 justify-around">
                        <input type="radio" value="invalid" id="invalid" className="hidden"
                            onChange={(e) => setReason(e.target.value)} ref={invalidRef} name="reason" />
                        <div onClick={() => invalidRef.current.click()} className={`px-6 py-1 inline-block text-center leading-loose blur-white hover:btn-red hover:border-none shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-max mx-4 ${reason == 'invalid' && 'btn-red text-white'} cursor-pointer`}>Invalid Question</div>

                        <input type="radio" value="other" id="other" className="hidden"
                            onChange={(e) => setReason(e.target.value)} ref={otherRef} name="reason" />
                        <div onClick={() => otherRef.current.click()} className={`px-6 py-1 inline-block text-center leading-loose blur-white hover:btn-red hover:border-none shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-max mx-4 ${reason == 'other' && 'btn-red text-white'} cursor-pointer`}>Other Reason</div>
                    </div>
                <h1 className="text-gray-50 text-lg lg:text-xl font-medium">Mention Reason for Undo Settlement</h1>
                    <textarea className="blur-gray rounded border border-gray-300 leading-normal resize-none w-full h-20 py-2 px-3 placeholder-gray-100 text-gray-50 focus:outline-none focus:bg-transparent sm:min-w-[300px]" name="message" value={message} placeholder='Reason, to be recieved by the users' minLength="1" required onChange={(e) => setMessage(e.target.value)}></textarea>
                    <div className="flex items-center justify-around mt-6">
                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose text-gray-50 border border-gray-50 hover:bg-gray-50 hover:text-gray-800 shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={() => setIsUndoSettle(false)}>{'Cancel'}</button>
                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose btn-blue text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={handleUndo} disabled={isSending}>{isSending ? 'Wait...' : 'Confirm'}</button>
                    </div>
                </div>
            </motion.div>}
        </>
    )
}