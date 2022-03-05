import Withdraw from "../db/models/withdraw";
import User from "../db/models/user";
import sendEMail from "../../lib/Mail/sendMail";
const { Client, resources } = require('coinbase-commerce-node');
Client.init(process.env.COINBASE_API_KEY);
const { Charge } = resources;


const withdrawCoins = async (req, res) => {
    try {
        const data = JSON.parse(req.body)
        const userFound = await User.findByIdAndUpdate({ _id: data?.userId }, { $inc: { balance: -data?.coins } }, { new: true });
        if (!userFound) {
            res.status(400).send('Problem in getting user');
        }
        else {
            try {
                const requestPay = new Withdraw(JSON.parse(req.body));
                const saveRequest = await requestPay.save();
                const htmlData = ` <html>

                <head>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
                        integrity="sha512-wnea99uKIC3TJF7v4eKk4Y+lMz2Mklv18+r4na2Gn1abDRPPOeef95xTzdwGD9e6zXJBteMIhZ1+68QC5byJZw=="
                        crossorigin="anonymous" referrerpolicy="no-referrer" />
                    <style>
                        .bg {
                            background-image: radial-gradient(circle farthest-corner at 84% 100%, #ad00ab 0, #0f335c 90%);
                            color: white;
                            font-size: 20px;
                            padding: 10px;
                            border-radius: 20px;
                            width: 100%;
                            max-width: max-content;
                            min-width: 300px
                        }
            
                        td {
                            padding: 5px 10px;
                            color: white
                        }
                    </style>
                </head>
            
                <body>
                    <div class="z-0 shadow-lg bg-red-100 text-white rounded-xl bg relative">
                        <img style="z-index: -1;"
                            class="absolute w-full h-full m-0 object-contain filter saturate-200 max_w_3xl overflow-hidden"
                            src="https://neuron-club.vercel.app/ani.svg" alt="">
                        <div class="p-5 z-50 bg-transparent">
                            <table class="text-lg z-10">
                                <tr class="px-5">
                                    <td class="font-medium px-2">Name:</td>
                                    <td>${saveRequest?.name}</td>
                                </tr>
                                <tr class="py-2 px-5">
                                    <td class="font-medium px-2">User Type:</td>
                                    <td>${saveRequest?.type}</td>
                                </tr>
                                <tr class="py-2 px-5">
                                    <td class="font-medium px-2">UserId:</td>
                                    <td>${saveRequest?._id}</td>
                                </tr>
                                <tr class="py-2 px-5">
                                    <td class="font-medium px-2">Email:</td>
                                    <td>${saveRequest?.email}</td>
                                </tr>
            
                                <tr class="py-2 px-5">
                                    <td class="font-medium px-2">Available balance:</td>
                                    <td>${saveRequest?.balance}</td>
                                </tr>
                                <tr class="py-2 px-5">
                                    <td class="font-medium px-2">Requested coins:</td>
                                    <td>${saveRequest?.coins}</td>
                                </tr>
                                <tr class="py-2 px-5">
                                    <td class="font-medium px-2">Currency Type:</td>
                                    <td>${saveRequest?.crypto}</td>
                                </tr>
                                <tr class="py-2 px-5">
                                    <td class="font-medium px-2">Currency Type:</td>
                                    <td>${saveRequest?.cryptoValue}</td>
                                </tr>
                                <tr class="py-2 px-5">
                                    <td class="font-medium px-2">Wallet Address:</td>
                                    <td>${saveRequest?.wallet}</td>
                                </tr>
                            </table>
                        </div>
            
                    </div>
            
                </body>
            
                </html>`
                const link = `${saveRequest?.name} Requested for Withdrawal`;
                const data = { subject: `Request for Withdrawal`, text: link, email: process.env.MAIL_TO, html: htmlData };
                const result = await sendEMail(data);
                console.log(result);
                res.status(200).send({ message: 'Thank you for submitting your request. We have received your request and are working on it. Please give us up-to 72 hours to fulfil it. ', newBalance: userFound?.balance })
            } catch (error) {
                console.log(error)
                res.status(402).send('Problem in sending request')
            }
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('Problem in getting user');
    }
}


const addCoins = async (req, res) => {
    const { amount, coins, currency, userId, name, email } = JSON.parse(req.body);
    var chargeData = {
        name: 'The Neuron Club',
        description: 'The Neuron Club (TNC) is an online gaming platform that allows users to predict global events across categories and win rewards',
        logo_url: `${process.env.HOST}/favicon.png`,
        local_price: {
            amount,
            currency
        },
        pricing_type: 'fixed_price',
        metadata: {
            userId,
            coins,
            name,
            email,
            amount,
            currency
        }
    }
    try {
        const chg = await Charge.create(chargeData)
        // console.log(chg);
        res.status(201).send(chg)
    } catch (error) {
        console.log(error)
        res.status(400).send('Unable to create charge')
    }
}


export { withdrawCoins, addCoins }