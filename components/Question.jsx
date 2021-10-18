import { ClockIcon } from '@heroicons/react/solid'
import Router from 'next/router'
import moment from 'moment';
import { motion } from 'framer-motion';
import { pageTransition, pageZoom } from '../util';

function Question({ question }) {
    const handleClick = () => {
        Router.push({
            pathname: `/question/${question._id}`,
        })
    }
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageZoom}
            transition={pageTransition}
            className="question max-w-xs min-h-[175px] mx-auto p-4 rounded-lg bg-white flex flex-col transition-sm hover:scale-[1.01] active:scale-[0.99] cursor-pointer" onClick={handleClick}>
            <div className="flex space-x-2 flex-col-reverse sm:flex-row">
                <h1 className="line-clamp-4 text-gray-800 text-base font-medium mt-1 sm:mt-0">{question?.question}</h1>
                <img src={question?.image_url || `/images/que/${question?.category.toLowerCase()}.jfif`} layout="fill" className="w-10 h-10 border-4 border-white hover:scale-105 transition-md object-cover rounded-full -translate-x-3 sm:-translate-x-0" />
            </div>
            <div className="h-4 w-full"></div>
            <div className="flex items-center justify-between mt-auto">
                <div className="text-sm">
                    <h1 className="text-gray-400">Category</h1>
                    <h2 className="capitalize">{question?.category}</h2>
                </div>
                <div className="text-right flex flex-col items-end text-sm">
                    <ClockIcon className="h-6 sm:h-7 text-blue-500" /> <span className="">
                        {moment(question?.settlementClosing).fromNow() || moment(question?.bidClosing).fromNow()}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}

export default Question
