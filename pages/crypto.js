import { useRouter } from 'next/router';
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { userSession } from '../lib/user-session';
import CoinbaseCommerceButton from 'react-coinbase-commerce';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
import Modal from '../components/Modal';

function crypto() {
    const router = useRouter()
    const session = userSession()
    useEffect(() => {
        if (!session) {
            router.push('/')
        }
    }, [session])
    const [coins, setCoins] = useState(100);
    const [charge, setCharge] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);


    const createCharge = async () => {
        const res = await fetch('/api/payment/addCoins', {
            method: 'POST',
            body: JSON.stringify({ amount: coins / 100, coins: coins, currency: 'USD', userId: session?._id, name: session?.name, email: session?.email })
        })
        const data = await res.json()
        // console.log(data.metadata)
        setCharge(data)
    }
    useEffect(() => {
        setCharge(null)
        createCharge();
    }, [coins])


    return (
        <>
            <Head><title>The Neuron Club | Payment</title></Head>
            <div className='text-white text-center max-w-5xl mx-auto p-5 mt-10 min-h-[350px]'>
                <h1 className='text-4xl sm:text-5xl xl:text-6xl text-white mb-2 font-semibold'>Add More Neuron Coins</h1>
                <p className='text-lg xl:text-xl 2xl:text-2xl text-gray-200 max-w-3xl mx-auto my-2'>Now you can easily purchase Neuron Coins with Cryptocurrencies. Please enter the number of coins that you would like to purchase</p>
                {<div className="my-2 lg:my-4 flex justify-center items-center space-x-10">
                    <input
                        placeholder="Enter number of coins"
                        type="number"
                        value={coins}
                        min={100}
                        max={100000}
                        onChange={(e) => { e.target.value > 0 && setCoins(e.target.value) }}
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 text-center text-gray-800 font-medium max-w-[150px] sm:max-w-xs rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                    />
                </div>}
                <h1 className='text-xl xl:text-2xl max-w-xl mx-auto text-center font-medium text-white'> {coins} Coins = ${(coins / 100).toFixed(2)} </h1>
                {charge &&
                    <CoinbaseCommerceButton className='btn-primary my-4 capitalize' chargeId={charge?.code} onChargeSuccess={() => setPaymentSuccess(true)} onModalClosed={() => setCharge(null)} customMetadata={JSON.stringify(charge?.metadata)}>Pay now</CoinbaseCommerceButton>
                }
                {/* <button onClick={createCharge} className='btn-primary my-4 capitalize disabled:!bg-gray-400'>Initialize Payment</button> */}
            </div>
            <div className='text-white text-center max-w-5xl mx-auto p-5 min-h-[350px]'>
                <h1 className='text-4xl sm:text-5xl xl:text-6xl text-white mb-2 font-semibold'>Withdraw Neuron Coins</h1>
                <p className='text-lg xl:text-xl 2xl:text-2xl text-gray-200 max-w-3xl mx-auto my-2'>visit withdrawal page and fill out some details to withdraw coins</p>
                <button className='btn-primary mt-4 capitalize' onClick={() => router.push('/withdraw')}>Withdraw Coins</button>
            </div>
            {paymentSuccess && <div onClick={() => setPaymentSuccess(false)} ><Modal state={paymentSuccess} text="Payment Successful!" /> </div>}

        </>
    )
}

export default crypto
