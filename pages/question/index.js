import { ChevronDownIcon } from "@heroicons/react/solid";
import Question from "../../components/Question";
import { useState, useEffect } from 'react'
import Head from "next/head";
import Image from 'next/image'
import ScrollToTop from "../../components/ScrollToTop";
import Loader from "../../components/Loader";
import { queFilter, updatedFilter } from "../../slices/filter";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { pageSlide, pageTransition } from "../../util";
import { useRouter } from "next/router";

function index({ data }) {
    const router = useRouter()
    const [questions, setQuestions] = useState(data)
    const savedFilter = useSelector(queFilter);
    const dispatch = useDispatch();
    const [isData, setIsData] = useState(true)
    const [isLoader, setIsLoader] = useState(false)
    const [filter, setFilter] = useState({...savedFilter, category: router.query.category || ''})

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
                <title>The Neuron | Questions</title>
            </Head>
            <motion.div initial="initial"
                animate="in"
                exit="out"
                variants={pageSlide}
                transition={pageTransition} className="px-5 sm:px-10 pt-28 pb-20 w-full">
                <div className="filter max-w-2xl sm:ml-auto">
                    <div className="flex items-center">
                        <div className="filter__item">
                            <select
                                placeholder="Category"
                                type="text"
                                name="category"
                                value={filter.category}
                                onChange={handleChange}
                            >
                                <option value="">All</option>
                                <option value="politics">Politics</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="sports">Sports</option>
                                <option value="economics">Economics</option>
                                <option value="climate">Climate</option>
                                <option value="coronavirus">Coronavirus</option>
                                <option value="crypto">Crypto</option>
                                <option value="business">Business</option>
                                <option value="crime">Crime</option>
                                <option value="arts">Arts</option>
                                <option value="technology">Technology</option>
                            </select>
                            <ChevronDownIcon className="absolute top-1/2 transform -translate-y-1/2 right-1 h-7 w-7" />
                        </div>
                        <div className="filter__item">
                            <select
                                placeholder="Sort"
                                type="text"
                                name="sort"
                                value={filter.sort}
                                onChange={handleChange}
                            >
                                <option value="recent">Newest First</option>
                                <option value="volume">Top Trending</option>
                                <option value="closing">Closing Soon</option>
                                <option value="oldest">Oldest First</option>
                                <option value="closed">Closed</option>
                            </select>
                            <ChevronDownIcon className="absolute top-1/2 transform -translate-y-1/2 right-1 h-7 w-7" />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="filter__item w-full">
                            <input
                                placeholder="Search in Question"
                                type="text"
                                name="search"
                                value={filter.search}
                                onChange={handleChange}
                                className="h-10 w-full px-4 appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <button className="btn-invert" onClick={searchFilter}>Apply Filter</button>
                    </div>

                </div>
                {isLoader ? <Loader /> :
                    <div className="question__group grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {questions && questions?.length > 0 &&
                            questions.map((item, i) => item.question.toLowerCase().includes(filter.search.toLowerCase()) && <Question key={i} question={item} />)
                        }
                        {!isData && <div className="p-5 relative row-start-1 col-start-1 col-end-6 col-span-2 min-h-[500px]">
                            <Image src="/images/no-data.svg" layout="fill" objectFit="contain" className="w-full h-full drop-shadow" />
                        </div>}
                    </div>
                }
            </motion.div>
            <ScrollToTop />
        </>
    )
}

export default index

export async function getServerSideProps() {
    const data = await fetch(`${process.env.HOST}/api/question/get_questions`).then(res => res.json());
    return {
        props: {
            data
        }
    }
}