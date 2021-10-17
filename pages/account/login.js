import { userSession } from "../../lib/user-session"
import { useState, useEffect } from 'react'
import QuestionGroup from "../../components/QuestionGroup";
import Loader from "../../components/Loader";
import Router from 'next/router'
import Head from 'next/head'
import Coin from "../../components/Coin";
import Notification from "../../components/Notification";

function index() {
    const session = userSession();
    useEffect(() => {
        if (!session) {
            Router.push('/')
        }
    }, [session])
    const [userData, setUserData] = useState(null);
    const [investment, setInvestment] = useState({
        total: 0,
        win: 0,
        lose: 0
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
            total: getTotal(userData?.questions, 'amount'),
            win: 0,
            lose: 0
        })
    }, [userData]);

    return (
        <div className="pt-28 pb-10 xl:px-10 w-full min-h-screen">
            <Head> <title>The Neuron | Portfolio</title> </Head>
            {userData ?
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto text-right">
                        <div className="max-w-xs gradient-shadow rounded-xl p-6 m-2 space-y-2 border-b-4 invest__border">
                            <h1 className="font-semibold text-2xl text-gray-700">Investment</h1>
                            <h2 className="text-xl text-gray-600 inline-flex items-center"><Coin width="5" height="5" />{investment?.total}</h2>
                        </div>
                        <div className="max-w-xs gradient-shadow rounded-xl p-6 m-2 space-y-2 border-b-4 win__border">
                            <h1 className="font-semibold text-2xl text-gray-700">Net Returns</h1>
                            <h2 className="text-xl text-gray-600 inline-flex items-center"><Coin width="5" height="5" />{investment?.win - investment?.lose}</h2>
                        </div>
                        {/* <div className="max-w-xs gradient-shadow rounded-xl p-6 m-2 space-y-2 border-b-4 lose__border">
                            <h1 className="font-semibold text-2xl text-gray-700">Loses</h1>
                            <h2 className="text-xl text-gray-600 inline-flex items-center"><Coin width="5" height="5" />{investment?.lose}</h2>
                        </div> */}
                        <div className="max-w-xs gradient-shadow rounded-xl p-6 m-2 space-y-2 border-b-4 balance__border">
                            <h1 className="font-semibold text-2xl text-gray-700">Balance</h1>
                            <h2 className="text-xl text-gray-600 inline-flex items-center"><Coin width="5" height="5" />{userData?.balance}</h2>
                        </div>
                        <div className="hidden xl:inline-block col-span-2 md:col-span-1 m-2">
                            <div className="max-w-[300px] mx-auto gradient-shadow rounded-xl p-6 space-x-4 flex items-center border-b-4 info__border">

                                <div className="w-16 h-16 mx-auto border-8 pb-1 border-white shadow-md hover:shadow-lg rounded-full gradient-bg font-bold text-4xl grid place-items-center text-white">
                                    {session?.image_url ?
                                        <img className="w-8 h-8 object-cover" src="https://img.icons8.com/pastel-glyph/2x/facebook-messenger--v2.png" alt="" />
                                        : session?.name?.[0]}
                                </div>
                                <div className="text-lg">
                                    <h2>{session?.name}</h2>
                                    <h1 className="text-gray-500 text-base">{session?.country}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <QuestionGroup questions={userData?.questions} category={"Question Transaction"} user={true} />
                    <Notification notifications={userData?.notification} />
                </>
                :
                <Loader />
            }
        </div>
    )
}

export default index
