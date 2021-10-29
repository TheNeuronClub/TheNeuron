import { useState, useEffect } from 'react'
import Coin from './Coin';
import moment from 'moment'
import { motion } from 'framer-motion'
import { container, item, pageTransition } from '../util'

function UserTransaction({ queId, userId }) {
    const [transaction, setTransaction] = useState(null)
    const getUser = async () => {
        const res = await fetch(`/api/user/getUser?_id=${userId}&quesId=${queId}`);
        if (res.status === 200) {
            const response = await res.json();
            setTransaction(response?.questions)
        }
    }
    console.log(transaction)
    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            {transaction && <motion.div initial="hidden"
                animate="visible"
                variants={container}
                transition={pageTransition} className="mx-auto lg:mx-1 lg:max-w-max p-5 rounded-lg gradient-shadow max-h-[500px] overflow-y-auto">
                <h1 className="text-xl md:text-2xl font-semibold inline-block leading-relaxed text-gray-700 mt-3 mb-2">My Transactions </h1>
                {
                    transaction?.map(data => (
                        <motion.div variants={item} key={data._id} className="flex items-center p-2 my-1">
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
