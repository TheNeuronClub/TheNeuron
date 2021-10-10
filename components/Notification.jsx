import { BellIcon, GiftIcon, TagIcon, XIcon } from '@heroicons/react/solid'
import Coin from './Coin'
import { useState } from 'react'
function Notification({ notifications }) {
    const [isActive, setIsActive] = useState(false)
    return (
        <>
            {isActive && <div className="max-w-sm bg-white gradient-shadow-md pt-5 rounded-lg rounded-br-3xl border-gray-700 fixed z-40 right-5 bottom-5 min-w-[300px]">
                <div className="w-full text-gray-800 leading-loose text-xl font-semibold mb-2 text-center rounded">
                    Notifications <BellIcon className="w-6 h-6 mx-1 text-gray-800 inline-block" />
                </div>
                <div className="p-4 max-h-96 overflow-auto border border-r-0 border-l-0">
                    {
                        notifications?.length > 0 && notifications.reverse()?.map((item, i) =>
                            <div key={i} className="rounded-md flex justify-between items-center border border-gray-200 text-gray-700 px-4 py-2 text-sm my-2">
                                <h1>{item}</h1>
                                {item.includes('won') ?
                                    <GiftIcon className="w-8 h-5 text-green-500 cursor-pointer ml-3" />
                                    :
                                    <TagIcon className="w-8 h-5 text-blue-500 cursor-pointer ml-3" />
                                }
                            </div>
                        )
                    }
                </div>
                <XIcon className="w-12 h-12 text-gray-700 gradient-shadow-lg border border-gray-500 rounded-full float-right p-2 m-3 cursor-pointer" onClick={() => setIsActive(false)} />
            </div>}
            {!isActive && <BellIcon className="w-12 h-12 text-white gradient-bg gradient-shadow-lg rounded-full float-right p-2 m-3 cursor-pointer fixed bottom-3 right-3 sm:bottom-5 sm:right-5 btn__float" onClick={() => setIsActive(true)} />}

        </>
    )
}

export default Notification
