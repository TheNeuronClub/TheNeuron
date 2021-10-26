import { ArrowRightIcon, ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Question from "./Question";
import { useState } from 'react'
import Image from 'next/image'
import Row from "./Row";
import { motion } from "framer-motion";
import { container, pageTransition } from "../util";

function QuestionGroup({ questions, category }) {
    return (
        <>
            <div className={`p-5 py-10 sm:p-10 xl:px-20 min-w-full mx-auto`}>
                <div className="flex justify-between border-b-2 mb-4 pb-2 border-gray-200">
                    <h1 className="text-2xl sm:text-3xl font-semibold  text-gray-700">{category}</h1>
                    <Link href='/question/'>
                        <h1 className="flex items-center text-base sm:text-lg cursor-pointer text-blue-500 sm:pr-4">View All <ArrowRightIcon className="h-7 mx-2" /></h1>
                    </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 question__group">
                    {
                        questions && questions?.length > 0 ?
                            <>
                                {questions.map((item, i) => (
                                    <Question question={item} key={i} />
                                ))}
                            </>
                            :
                            <div className="p-5 relative row-start-1 col-start-1 col-end-6 col-span-2 min-h-[500px]">
                                <Image src="/images/no-data.svg" layout="fill" objectFit="contain" className="w-full h-full drop-shadow" />
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default QuestionGroup
