import { ChevronDownIcon } from "@heroicons/react/solid";
import Question from "./Question";
import { useState, useEffect } from 'react'
import Head from "next/head";
import Image from 'next/image'
import ScrollToTop from "./ScrollToTop";
import Loader from "./Loader";
import { queFilter, updatedFilter } from "../slices/filter";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { pageSlide, pageTransition } from "../util";


function QuestionList({ categories, category, contest }) {
    const [questions, setQuestions] = useState(null)
    const savedFilter = useSelector(queFilter);
    const dispatch = useDispatch();
    const [isData, setIsData] = useState(true)
    const [isLoader, setIsLoader] = useState(false)
    const [filter, setFilter] = useState({ ...savedFilter, category: category })

    const handleChange = (e) => {
        e.preventDefault();
        setFilter({ ...filter, [e.target.name]: e.target.value })
    }

    const checkData = async () => {
        const checkData = empty();
        checkData === false ? setIsData(false) : setIsData(checkData.some(element => element));
    }

    const empty = () => {
        if (questions && questions?.length > 0) {
            const result = questions.map(item => item.question.toLowerCase().includes(filter.search.toLowerCase()));
            return result
        }
        else {
            return false
        }
    }

    useEffect(() => {
        checkData()
    }, [questions])

    useEffect(() => {
        searchFilter()
    }, [filter]);

    const searchFilter = async (e) => {
        if (e) {
            e.preventDefault();
        }
        setIsLoader(true);
        const res = await fetch(`/api/question/filter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filter)
        })
        const response = await res.json();
        if (res.status === 200) {
            dispatch(updatedFilter(filter))
            setQuestions(response)
        }
        setIsLoader(false)
    }
    return (
        <>
            <Head>
                <title>The Neuron Club | Questions</title>
            </Head>
            <motion.div initial="initial"
                animate="in"
                exit="out"
                variants={pageSlide}
                transition={pageTransition} className="px-5 sm:px-10 pt-10 pb-20 2xl:px-20 w-full">
                {!contest &&
                    <>
                        <div className="flex items-center justify-end gap-x-4">
                            <input
                                placeholder="Search in Question"
                                type="text"
                                name="search"
                                value={filter.search}
                                onChange={handleChange}
                                className="h-10 w-full max-w-max px-4 bg-white rounded focus:bg-white appearance-none focus:outline-none focus:shadow-outline"
                            />
                            <div className="h-10 rounded-md bg-white relative pl-2 pr-3.5">
                                <select
                                    placeholder="Sort"
                                    type="text"
                                    name="sort"
                                    value={filter.sort}
                                    className='w-full bg-transparent h-10 outline-none border-none min-w-max'
                                    onChange={handleChange}
                                >
                                    <option value="recent">Newest First</option>
                                    <option value="volume">Top Trending</option>
                                    <option value="closing">Closing Soon</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="closed">Closed</option>
                                </select>
                                <ChevronDownIcon className="absolute top-1/2 transform -translate-y-1/2 right-1 h-6 w-6 bg-white" />
                            </div>
                        </div>
                        <div className="flex items-center my-5 p-2 gap-x-4 md:gap-x-8 max-w-7xl mx-auto overflow-x-auto scroll-hidden rounded-full">
                            <div className={`capitalize relative min-w-max max-w-max py-2 px-4 rounded-full bg-white text-gray-900 font-medium transform hover:scale-105 cursor-pointer transition-sm shadow-md ${filter.category == '' ? 'scale-105 border-2 border-blue-500 gradient-shadow' : 'border-2 border-gray-200'}`} onClick={() => setFilter({ ...filter, category: '' })}>All</div>
                            {categories?.sort((a, b) => a.order - b.order)?.map(item => !item.hidden && <div key={item._id} value={item.category} className={`capitalize relative min-w-max max-w-max py-2 px-4 rounded-full bg-white text-gray-900 font-medium transform hover:scale-105 cursor-pointer transition-sm shadow-md ${filter.category == item.category ? 'scale-105 border-2 border-yellow-500 bg-yellow-200 gradient-shadow' : 'border-2 border-gray-200'}`} onClick={() => setFilter({ ...filter, category: item.category })}>{item.category}</div>)}
                        </div>
                    </>
                }
                {isLoader ? <Loader /> :
                    <div className="question__group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-8 place-items-center items-stretch">
                        {questions && questions?.length > 0 &&
                            questions.map((item, i) => item.question.toLowerCase().includes(filter.search.toLowerCase()) && <Question key={i} question={item} />)
                        }
                        {!isData && <div className="p-5 relative row-start-1 col-start-1 col-end-6 col-span-2 min-h-[500px] min-w-[380px]">
                            <Image src="/images/no-data.svg" layout="fill" objectFit="contain" className="w-full h-full drop-shadow" />
                        </div>}
                    </div>
                }
            </motion.div>
            <ScrollToTop />
        </>
    )
}

export default QuestionList

