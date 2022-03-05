const { Webhook } = require('coinbase-commerce-node');
import User from '../../../server/db/models/user';
import sendEMail from '../../../lib/Mail/sendMail';
import Deposit from '../../../server/db/models/deposit';

export default async (req, res) => {
    const rawBody = req.rawBody;
    const signature = req.headers['x-cc-webhook-signature']
    const sharedSecret = process.env.COINBASE_API_SECRET;

    try {
        const event = Webhook.verifyEventBody(rawBody, signature, sharedSecret);
        console.log(event)
        const eventData = { subject: `Payment Successful at The Neuron Club`, text: link, email: 'ankit628792@gmail.com', html: `${event}` };
        const response = await sendEMail(eventData);
        console.log(response);

        if (event.type === 'charge:confirmed') {
            const { userId, name, email, amount, currency, coins } = event.data.metadata;
            const requestPay = new Deposit({ userId, name, email, amount, currency, coins });
            const saveRequest = await requestPay.save();
            if (saveRequest) {
                const link = `${saveRequest?.name} Deposit the ${saveRequest?.amount} ${saveRequest?.currency}`;
                const data = { subject: `Payment Successful at The Neuron Club`, text: link, email: saveRequest?.email, html: `You've succesfully deposited ${saveRequest?.amount} ${saveRequest?.currency} at The Neuron Club, ${coins} neuron coins are added to your account` };
                const result = await sendEMail(data);
                console.log(result);
                const user = await User.findByIdAndUpdate({ _id: userId }, { $inc: { balance: coins }, $push: { notification: `Your Payment was successful, ${coins} neuron coins are been added to your account` } });
                res.status(200).send({ msg: 'payment recieved and user data is updated' })
            }
        }

    } catch (error) {
        console.log('Failed');
        console.log(error);
        res.status(400).send({ msg: 'error' })
    }
}