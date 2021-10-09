import { ArrowRightIcon, ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Question from "./Question";
import { useState } from 'react'
import Image from 'next/image'
import Row from "./Row";

function QuestionGroup({ questions, category, user }) {
    const [filter, setFilter] = useState('')
    return (
        <>
            <div className={`p-5 py-10 sm:p-10 xl:px-20 min-w-full mx-auto`}>
                <div className="flex justify-between border-b-2 mb-4 pb-2 border-gray-200">
                    <h1 className="text-2xl sm:text-3xl font-semibold  text-gray-700">{category}</h1>
                    {user ?
                        <div className="filter__item user">
                            <select
                                placeholder="Filter"
                                type="text"
                                name="filter"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="">All</option>
                                <option value="Win">Win</option>
                                <option value="Lose">Lose</option>
                                <option value="Active">Active</option>
                            </select>
                            <ChevronDownIcon className="absolute top-1/2 transform -translate-y-1/2 right-1 h-7 w-7" />
                        </div>
                        : <Link href='/question/'>
                            <h1 className="flex items-center text-base sm:text-lg cursor-pointer text-blue-500 sm:pr-4">View All <ArrowRightIcon className="h-7 mx-2" /></h1>
                        </Link>}
                </div>
                {user ?
                    <div className="flex flex-col w-full overflow-x-scroll max-w-[90vw]">
                        <table className="divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="p-4 text-sm sm:text-base text-gray-700 font-semibold uppercase tracking-wider text-center">
                                        Category
                                    </th>
                                    <th scope="col" className="p-4 text-sm sm:text-base text-gray-700 font-semibold uppercase tracking-wider text-center">
                                        Question
                                    </th>
                                    <th scope="col" className="p-4 text-sm sm:text-base text-gray-700 font-semibold uppercase tracking-wider text-center">
                                        Bid-Date
                                    </th>
                                    <th scope="col" className="p-4 text-sm sm:text-base text-gray-700 font-semibold uppercase tracking-wider text-center">
                                        Investment
                                    </th>
                                    <th scope="col" className="p-4 text-sm sm:text-base text-gray-700 font-semibold uppercase tracking-wider text-center">
                                        Status
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 overflow-auto">
                                {
                                    (questions && questions?.length > 0 && filter !== 'Win' && filter !== 'Lose') ?
                                        <>
                                            {questions.map((item, i) => (
                                                <Row question={item} key={i} />
                                            ))}
                                        </>
                                        :
                                        <>
                                            <td>
                                                <div className="p-5 mx-auto relative min-w-[350px] min-h-[350px]">
                                                    <Image src="/images/no-data.svg" layout="fill" objectFit="contain" className="w-full h-full drop-shadow" />
                                                </div>
                                            </td>
                                        </>
                                }
                            </tbody>
                        </table>
                    </div>
                    : <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 question__group">
                        {
                            (questions && questions?.length > 0 && filter !== 'Win' && filter !== 'Lose') ?
                                <>
                                    {questions.map((item, i) => (
                                        <Question question={item} key={i} user={user} />
                                    ))}
                                </>
                                :
                                <>
                                    {<div className="p-5 relative row-start-1 col-start-1 col-end-6 col-span-2 min-h-[500px]">
                                        <Image src="/images/no-data.svg" layout="fill" objectFit="contain" className="w-full h-full drop-shadow" />
                                    </div>}</>
                        }
                    </div>}
            </div>
        </>
    )
}

export default QuestionGroup
