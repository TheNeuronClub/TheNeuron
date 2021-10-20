import moment from 'moment'

import User from '../db/models/user'
import Question from '../db/models/question'
import Transaction from '../db/models/transaction'

const question = async (req, res) => {
    const { question, _id, category, odd, bid, username, userId, settlementClosing, image_url } = req.body
    try {
        const createTransaction = new Transaction({ username, userId, amount: bid, questionId: _id, question, category, odd, settlementClosing, image_url });
        const transactionRegistered = await createTransaction.save();
        if (transactionRegistered) {
            const getTransaction = await Transaction.find({ userId: userId }).countDocuments();
            const thirdTransaction = getTransaction % 3 === 0 || getTransaction === 0;
            const reductionAmount = thirdTransaction ? bid - 200 : bid;
            const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $inc: { balance: -reductionAmount }, $push: { notification: `You've spent, ${bid} coins on ${moment(transactionRegistered?.createdAt).format('ll')}` } }, { new: true });
            if (thirdTransaction) {
                const updateUserNotification = await User.findOneAndUpdate({ _id: userId }, { $push: { notification: `You've won 200 coins on ${moment(transactionRegistered?.createdAt).format('ll')} for making the golden transaction 🥳` } }, { new: true });
            }
            if (updatedUser) {
                const updatedq = odd == 'Favour' ? await Question.updateOne({ _id: _id }, { $inc: { Volume: bid, Favour: bid } }, { new: true }) : await Question.updateOne({ _id: _id }, { $inc: { Volume: bid, Against: bid } }, { new: true });
                if (updatedq) {
                    const updatedQuestion = await Question.findOne({ _id: _id });
                    thirdTransaction ? res.status(203).send({ ...updatedQuestion, reductionAmount }) : res.status(201).send({ ...updatedQuestion, reductionAmount })
                }
                else {
                    res.status(400).send({ mg: "error" })
                }
            }
            else {
                res.status(400).send({ mg: "error" })
            }
        }

    } catch (error) {
        res.status(400).json({ error: 'Transaction Failed' })
    }
}

export { question }