import { useState } from 'react'
import { motion } from 'framer-motion'
import { pageTransition, pageZoom } from '../util'

export const ConfirmBox = ({ queId, finalResult, setConfirm, setIsSettle, setQue }) => {
    const [isSending, setIsSending] = useState(false)
    const handleSettlement = async () => {
        setIsSending(true)
        const res = await fetch(`/api/transaction/settleQue`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: queId, result: finalResult })
        })
        console.log(res.status)
        const response = await res.json();
        if (res.status == 200) {
            setQue(response)
            setConfirm(false);
            setIsSettle(false)
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
                        Do you want to settle this question with the choosen option ?
                    </h1>
                    <div className="flex items-center justify-around mt-6">
                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose text-gray-50 border border-gray-50 hover:bg-gray-50 hover:text-gray-800 shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={() => setConfirm(false)}>{'Cancel'}</button>
                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose btn-blue text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={handleSettlement} disabled={isSending}>{isSending ? 'Wait...' : 'Confirm'}</button>
                    </div>
                </div>
            </motion.div>}
        </>
    )
}

function Settlement({ isSettle, setIsSettle, que, setQue }) {
    const [result, setResult] = useState('')
    const [confirm, setConfirm] = useState(false)

    return (
        <>

            {isSettle && <motion.div initial="initial"
                animate="in"
                exit="out"
                variants={pageZoom}
                transition={pageTransition} className="fixed inset-0 w-full h-full grid place-items-center z-50 blur-black max_w_3xl" >
                <div className="relative max-w-sm md:max-w-md py-10 px-5 md:px-10 blur-gray text-white rounded-xl shadow-2xl m-4">
                    <h1 className="text-xl md:text-2xl my-4 text-center font-medium z-50 leading-tight">
                        Please Choose one of the option for settlement
                    </h1>
                    <div className="w-full text-center">
                        {que?.options?.map(item => 
                        <button onClick={() => setResult(`${item.name}`)} className={`px-4 py-2 leading-loose text-white hover:btn-blue hover:border-none shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 ${result == item.name && 'btn-blue text-white'} cursor-pointer`}>{item.name}</button>
                            )}
                    </div>
                    <div className="flex items-center justify-around mt-10">
                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose text-gray-50 border border-gray-50 hover:bg-gray-50 hover:text-gray-800 shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={() => setIsSettle(false)}>{'Cancel'}</button>
                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose btn-blue text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={() => setConfirm(true)}>Next</button>
                    </div>
                </div>
            </motion.div>}

            {
                confirm && <ConfirmBox queId={que?._id} finalResult={result} setConfirm={setConfirm} setIsSettle={setIsSettle} setQue={setQue} />
            }
        </>
    )
}

export default Settlement
