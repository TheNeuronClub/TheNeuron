import { BellIcon, GiftIcon, TagIcon, XIcon } from '@heroicons/react/solid'
import moment from 'moment'
import Coin from './Coin'
import { useState } from 'react'
function Notification({ bids }) {
    const [isActive, setIsActive] = useState(false)
    return (
        <>
            {isActive && <div className="max-w-sm bg-white gradient-shadow-md pt-5 rounded-lg rounded-br-3xl border-gray-700 fixed z-40 right-5 bottom-5 min-w-[300px]">
                <div className="w-full text-gray-800 leading-loose text-xl font-semibold mb-2 text-center rounded">
                    Notifications
                </div>
                <div className="p-4 max-h-96 overflow-auto border border-r-0 border-l-0">
                    {bids?.length > 0 && bids?.map(item =>
                        <div key={item?._id} className="rounded-md flex justify-between items-center border border-gray-200 text-gray-700 px-4 py-2 text-sm my-2">
                            <div className="flex">You've spent &nbsp; <div className="flex items-center justify-center"><Coin width="4" height="4" />{item?.amount},</div>&nbsp; {moment(item?.createdAt).fromNow()} </div>
                            <TagIcon className="w-8 h-5 text-blue-500 cursor-pointer" />
                        </div>
                    )}
                    <div className="rounded-md flex justify-between border border-gray-200 px-4 py-2 text-sm my-2 text-gray-700 items-center">
                        <p>You've won 1000 Neuron coins! 🥳</p>
                        <GiftIcon className="w-8 h-5 text-green-500 cursor-pointer" />
                    </div>
                </div>
                <XIcon className="w-12 h-12 text-gray-700 gradient-shadow-lg border border-gray-500 rounded-full float-right p-2 m-3 cursor-pointer" onClick={() => setIsActive(false)} />
            </div>}
            {!isActive && <BellIcon className="w-12 h-12 text-white gradient-bg gradient-shadow-lg rounded-full float-right p-2 m-3 cursor-pointer fixed bottom-3 right-3 sm:bottom-5 sm:right-5 btn__float" onClick={() => setIsActive(true)} />}

        </>
    )
}

export default Notification
