import { ArrowRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Question from "./Question";

function QuestionGroup({ questions, category }) {
    const items = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <>
            <div className={`p-5 py-10 sm:p-10 xl:px-20 min-w-full mx-auto text-white`}>
                <div className="flex justify-between border-b-2 mb-4 pb-2 border-gray-200">
                    <h1 className="text-2xl sm:text-3xl font-semibold">{category}</h1>
                    <Link href='/question/'>
                        <h1 className="flex items-center text-base sm:text-lg cursor-pointer hover:text-yellow-400 sm:pr-4">View All <ArrowRightIcon className="h-7 mx-2" /></h1>
                    </Link>
                </div>
                <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-8 place-items-center items-stretch question__group">
                    {
                        questions && questions?.length > 0 ?
                            <>
                                {questions?.map((item, i) => (
                                    <Question question={item} key={i} />
                                ))}
                            </>
                            :
                            <>
                                {
                                    items.map(item => (
                                        <div key={item} className="max-w-xs min-w-[75%] p-5 shadow-lg relative blur-black animate-pulse rounded-lg">
                                            <div className="w-full h-48 rounded-lg bg-gray-500 bg-opacity-70"></div>
                                            <div className="py-5 h-full">
                                                <h1 className="mb-4 h-[80px] bg-gray-600 bg-opacity-50"></h1>
                                                <div className="h-16 w-full bg-gray-700 bg-opacity-60">
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default QuestionGroup
