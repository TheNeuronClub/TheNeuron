
import { userSession } from "../../lib/user-session"
import { useState, useEffect } from 'react'
import QuestionGroup from "../../components/QuestionGroup";
import Loader from "../../components/Loader";
import Router from 'next/router'
import Head from 'next/head'
import Coin from "../../components/Coin";
import Notification from "../../components/Notification";
import { motion } from "framer-motion";
import { container, pageTransition, pageZoom } from "../../util";
import Row from "../../components/Row";

function portfolio() {
    const session = userSession();
    useEffect(() => {
        if (!session) {
            Router.push('/')
        }
    }, [session])
    const [userData, setUserData] = useState(null);
    const [investment, setInvestment] = useState({
        total: 0
    });
    const getUser = async () => {
        const res = await fetch(`/api/user/getUser?_id=${session?._id}`);
        console.log(res.status)
        const response = await res.json();
        setUserData(response)
    }
    useEffect(() => {
        getUser();
    }, []);

    function getTotal(items, prop) {
        if (items) {
            return items.reduce(function (a, b) {
                return a + b[prop];
            }, 0);
        }
    };

    useEffect(() => {
        setInvestment({
            total: getTotal(userData?.questions, 'amount')
        })
    }, [userData]);

    return (
        <div className="pt-28 pb-10 xl:px-10 w-full min-h-screen">
            <Head> <title>The Neuron | Portfolio</title> </Head>
            {userData ?
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto text-right max-w-7xl">
                        <motion.div initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageZoom}
                            transition={pageTransition} className="max-w-xs gradient-shadow rounded-xl p-6 m-2 space-y-2 border-b-4 invest__border">
                            <h1 className="font-semibold text-2xl text-gray-700">Investment</h1>
                            <h2 className="text-xl text-gray-600 inline-flex items-center"><Coin width="5" height="5" />{investment?.total}</h2>
                        </motion.div>
                        <motion.div initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageZoom}
                            transition={pageTransition} className="max-w-xs gradient-shadow rounded-xl p-6 m-2 space-y-2 border-b-4 win__border">
                            <h1 className="font-semibold text-2xl text-gray-700">Net Returns</h1>
                            <h2 className="text-xl text-gray-600 inline-flex items-center"><Coin width="5" height="5" />{userData?.earning || '0'}</h2>
                        </motion.div>
                        {/* <motion.div initial="hidden"
                            animate="visible"
                             variants={pageZoom}
                            transition={pageTransition} className="max-w-xs gradient-shadow rounded-xl p-6 m-2 space-y-2 border-b-4 lose__border">
                            <h1 className="font-semibold text-2xl text-gray-700">Loses</h1>
                            <h2 className="text-xl text-gray-600 inline-flex items-center"><Coin width="5" height="5" />{investment?.lose}</h2>
                        </motion.div> */}
                        <motion.div initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageZoom}
                            transition={pageTransition} className="max-w-xs gradient-shadow rounded-xl p-6 m-2 space-y-2 border-b-4 balance__border">
                            <h1 className="font-semibold text-2xl text-gray-700">Balance</h1>
                            <h2 className="text-xl text-gray-600 inline-flex items-center"><Coin width="5" height="5" />{userData?.balance}</h2>
                        </motion.div>
                        <div className="hidden xl:inline-block col-span-2 md:col-span-1 m-2">
                            <motion.div initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageZoom}
                                transition={pageTransition} className="max-w-[300px] mx-auto gradient-shadow rounded-xl p-6 space-x-4 flex items-center border-b-4 info__border">

                                <div className="w-16 h-16 mx-auto border-8 pb-1 border-white shadow-md hover:shadow-lg rounded-full gradient-bg font-bold text-4xl grid place-items-center text-white">
                                    {session?.image_url ?
                                        <img className="w-full h-full object-cover rounded-full" src={session?.image_url} alt="" />
                                        : session?.name?.[0]}
                                </div>
                                <div className="text-lg">
                                    <h2>{session?.name}</h2>
                                    {/* <h1 className="text-gray-500 text-base">{session?.country}</h1> */}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    {userData?.questions?.length > 0 ?
                        <>
                        <div className={`p-5 py-10 sm:p-10 xl:px-20 min-w-full mx-auto`}>
                            <div className="flex justify-start border-b-2 mb-4 pb-2 border-gray-200">
                                <h1 className="text-2xl sm:text-3xl font-semibold  text-gray-700">Question Transactions</h1>
                            </div>
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
                                            <th scope="col" className="p-4 text-sm sm:text-base text-gray-700 font-semibold uppercase tracking-wider text-center">
                                                Result
                                            </th>

                                        </tr>
                                    </thead>
                                    <motion.tbody
                                        initial="hidden"
                                        animate="visible"
                                        variants={container}
                                        transition={pageTransition} className="bg-white divide-y divide-gray-200 overflow-auto">
                                        {
                                            (userData?.questions && userData?.questions?.length > 0) ?
                                                <>
                                                    {userData?.questions.map((item, i) => (
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
                                    </motion.tbody>
                                </table>
                            </div>
                            </div>
                        </>
                        :
                        <div className="text-center p-5">
                            <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-semibold text-gray-700 my-6">You've not placed any bid yet.</h1>
                            <button onClick={() => Router.push('/question/')} className="px-5 py-3 gradient-bg text-lg lg:text-xl text-white rounded-xl font-semibold active:scale-95 transition-sm">Place a Bid</button>
                        </div>
                    }
                    <Notification notifications={userData?.notification} />
                </>
                :
                <Loader />
            }
        </div>
    )
}

export default portfolio
