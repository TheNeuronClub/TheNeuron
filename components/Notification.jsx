import { BellIcon, EmojiHappyIcon, GiftIcon, TagIcon, ThumbUpIcon, XIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { container, item, pageSlide, pageTransition } from '../util'

function Notification({ notifications }) {
    const [isActive, setIsActive] = useState(false)
    return (
        <>
            {isActive && <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageSlide}
                transition={pageTransition} className="max-w-sm blur-black gradient-shadow-md pt-5 rounded-lg rounded-br-3xl fixed z-40 right-5 bottom-5 min-w-[300px]">
                <div className="w-full text-white leading-loose text-xl font-semibold mb-2 text-center rounded">
                    Notifications <BellIcon className="w-6 h-6 mx-1 text-gray-50 inline-block" />
                </div>
                <motion.div initial="hidden"
                    animate="visible"
                    variants={container}
                    transition={pageTransition} className="p-4 max-h-96 overflow-auto border border-r-0 border-l-0">
                    {
                        notifications?.length > 0 && notifications.reverse()?.map((message, i) =>
                            <motion.div variants={item} key={i} className="rounded-md flex justify-between items-center border border-gray-200 text-gray-700 px-4 py-2 text-sm my-2 bg-white">
                                <h1>{message}</h1>
                                {message.includes('won') ?
                                    <EmojiHappyIcon className="w-8 h-5 text-yellow-400 cursor-pointer ml-3" />
                                    :
                                    message.includes('lose') && <ThumbUpIcon className="w-8 h-5 text-pink-400 cursor-pointer ml-3" />
                                }
                                {message.includes('earned') ?
                                    <GiftIcon className="w-8 h-5 text-green-500 cursor-pointer ml-3" />
                                    :
                                    message.includes('spent') && <TagIcon className="w-8 h-5 text-blue-500 cursor-pointer ml-3" />
                                }
                            </motion.div>
                        )
                    }
                </motion.div>
                <XIcon className="w-12 h-12 text-gray-700 gradient-shadow-lg bg-white border border-gray-500 rounded-full float-right p-2 m-3 cursor-pointer" onClick={() => setIsActive(false)} />
            </motion.div>}
            {!isActive && <BellIcon className="w-12 h-12 text-white btn-blue gradient-shadow-lg rounded-full float-right p-2 m-3 cursor-pointer fixed bottom-3 right-3 sm:bottom-5 sm:right-5 btn__float" onClick={() => setIsActive(true)} />}

        </>
    )
}

export default Notification
