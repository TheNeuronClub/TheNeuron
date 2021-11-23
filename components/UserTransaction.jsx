import { useState, useEffect } from 'react'
import Coin from './Coin';
import moment from 'moment'
import { motion } from 'framer-motion'
import { container, item, pageTransition } from '../util'

function UserTransaction({ queId, userId }) {
    const [transaction, setTransaction] = useState(null)
    const getUser = async () => {
        const res = await fetch(`/api/user/getUser?_id=${userId}&queId=${queId}`);
        if (res.status === 200) {
            const response = await res.json();
            setTransaction(response?.questions)
        }
    }
    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            {transaction?.length > 0 && <motion.div initial="hidden"
                animate="visible"
                variants={container}
                transition={pageTransition} className="mx-auto hidden lg:inline-block max-w-max mt-10 p-5 gradient-shadow blur-black rounded-md max-h-screen overflow-y-auto">
                <h1 className="text-xl md:text-2xl font-semibold inline-block leading-relaxed text-white mt-3 mb-2">My Transactions </h1>
                {
                    transaction?.map(data => (
                        <motion.div variants={item} key={data._id} className="flex items-start blur-white rounded-md text-gray-100 p-2 my-1">
                            <div className="flex items-center mr-1">
                                <Coin width="4" height="4" />{data.amount}
                            </div>
                            &nbsp;bid in {data.odd} on {moment(data.createdAt).format('lll')}
                        </motion.div>
                    ))
                }
            </motion.div>}
        </>
    )
}

export default UserTransaction
