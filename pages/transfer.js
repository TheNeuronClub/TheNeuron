import { useRouter } from 'next/router';
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { userSession } from '../lib/user-session';
import CoinbaseCommerceButton from 'react-coinbase-commerce';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
import Modal from '../components/Modal';

const cryptoApi = [
    { id: "Qwsogvtv82FCd", name: 'Bitcoin (BTC)', symbol: 'BTC' },
    { id: "razxDUgYGNAdQ", name: 'Ethereum (ETH)', symbol: 'ETH' },
    { id: "aKzUVe4Hh_CON", name: 'USD Coin', symbol: 'USDC' },
    { id: "a91GCGd_u96cF", name: 'Dogecoin (DOGE)', symbol: 'DOGE' },
    { id: "D7B1x_ks7WhV5", name: 'Litecoin (LTC)', symbol: 'LTC' },
    { id: "MoTuySvg7", name: 'Dai (Dai)', symbol: 'Dai' },
    { id: "ZlZpzOJo43mIo", name: 'Bitcoin Cash (BCH)', symbol: 'BCH' },
]

function transfer() {
    const router = useRouter()
    const session = userSession()
    useEffect(() => {
        if (!session) {
            router.push('/')
        }
    }, [session])
    const [amount, setAmount] = useState(1);
    const [currency, setCurrency] = useState('Qwsogvtv82FCd');
    const [data, setData] = useState();
    const [charge, setCharge] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const cryptoData = () => {
        const i = cryptoApi.findIndex((value) => value.id == currency)
        if (i >= 0) {
            return cryptoApi[i]
        }
    }
    const createCharge = async () => {
        const res = await fetch('/api/payment/addCoins', {
            method: 'POST',
            body: JSON.stringify({ amount: amount, currency: 'USD', userId: session?._id, name: session?.name, email: session?.email })
        })
        const data = await res.json()
        // console.log(data.metadata)
        setCharge(data)
    }
    useEffect(() => {
        setCharge(null)
        fetch(`https://coinranking1.p.rapidapi.com/coin/yhjMzLPhuIDl/price?referenceCurrencyUuid=${currency}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coinranking1.p.rapidapi.com",
                "x-rapidapi-key": "5c40381fc0msh7880c0810bb8aa0p134a9ajsne3214a4398a4"
            }
        }).then(response => response.json())
            .then(response => {
                setData(response?.data)
            })
            .catch(err => {
                console.error("Cannot get Crypto data");
            });
        createCharge();
    }, [currency, amount])



    return (
        <>
            <Head><title>The Neuron Club | Payment</title></Head>
            <div className='text-white text-center max-w-5xl mx-auto p-5 mt-10 min-h-[350px]'>
                <h1 className='text-4xl sm:text-5xl xl:text-6xl text-white mb-2 font-semibold'>Add More Neuron Coins</h1>
                <p className='text-lg xl:text-xl 2xl:text-2xl text-gray-200 max-w-3xl mx-auto my-2'>Now you can easily purchase Neuron Coins with Bitcoin. Please enter the amount of coins that you would like to purchase</p>
                {cryptoApi && <div className="my-2 lg:my-4 flex justify-center items-center space-x-10">
                    <input
                        placeholder="Enter Amount in USD"
                        type="number"
                        value={amount}
                        onChange={(e) => { e.target.value > 0 && setAmount(e.target.value) }}
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 text-center text-gray-800 font-medium max-w-[150px] sm:max-w-xs rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                    />
                    <select
                        placeholder="Curency"
                        type="text"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className=" h-12 px-4 mb-2 transition duration-200 text-gray-800 font-medium bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                    >
                        {cryptoApi?.map(item => <option key={item.id} value={item.id} className="capitalize">{item.symbol}</option>)}
                    </select>
                </div>}
                {data && <h1 className='text-xl xl:text-2xl max-w-xl mx-auto text-center font-medium text-white'> {amount || 1} USD =  {(amount || 1) * (+data?.price)?.toFixed(10)} {cryptoData()?.symbol}</h1>}
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

export default transfer
