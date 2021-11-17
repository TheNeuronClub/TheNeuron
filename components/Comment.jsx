import { DotsVerticalIcon } from "@heroicons/react/solid"
import moment from "moment"
import { motion } from 'framer-motion'
import { pageTransition, pageZoom } from "../util"
import { useState, useEffect } from 'react'

function Comment({ user, comment, onSelect }) {
    const [isMenu, setIsMenu] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMenu(false)
        }, 2500);
        return () => clearTimeout(timer);
    }, [isMenu]);

    return (
        <>
            <motion.div initial="initial"
                animate="in"
                exit="out"
                variants={pageZoom}
                transition={pageTransition} className="flex space-x-2 sm:space-x-3 items-center max-w-max justify-start z-10 relative">
                {comment?.image_url ?
                    <img src={comment?.image_url} alt="" className="w-10 sm:w-12 h-10 sm:h-12 border-4 border-gray-100 rounded-full" />
                    :
                    <div className="MuiAvatar-root MuiAvatar-circle btn-blue text-white capitalize">
                        {comment?.name?.[0]}
                    </div>
                }
                <div className="comment__box py-2 pl-4 pr-10 sm:pl-6 sm:pr-14" onClick={() => setIsMenu(false)}>
                    <h2 className="text-gray-50 font-medium text-sm">{comment?.name}</h2>
                    <h2 className="text-gray-300 text-xs">{moment(comment?.createdAt).fromNow()}</h2>
                    <div className="leading-normal text-gray-50 my-1 text-base break-words break-all">{comment?.comment}</div>
                </div>
                {user == comment?.userId && <DotsVerticalIcon className="absolute top-5 right-2 cursor-pointer text-gray-50 w-4 h-4 z-20" onClick={() => setIsMenu(true)} />}
                {isMenu && <div className="absolute bg-white top-1 -right-5 rounded-md cursor-pointer text-red-500 shadow-lg py-1 px-2 z-30" onClick={() => onSelect(comment?._id)}>Remove </div>}
            </motion.div>
        </>
    )
}

export default Comment
