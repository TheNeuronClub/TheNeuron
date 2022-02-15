import moment from 'moment'
import User from '../db/models/user'
import Question from '../db/models/question'
import Transaction from '../db/models/transaction'
import sendEMail from "../../lib/Mail/sendMail";

const question = async (req, res) => {
    const { question, _id, category, odd, bid, userId, optionId, settlementClosing, image_url } = req.body
    try {
        const createTransaction = new Transaction({ userId, amount: bid, questionId: _id, question, category, odd, settlementClosing, image_url });
        const transactionRegistered = await createTransaction.save();
        if (transactionRegistered) {
            // const getTransaction = await Transaction.find({ userId: userId }).countDocuments();
            // const thirdTransaction = getTransaction % 3 === 0 || getTransaction === 0;
            const thirdTransaction = false;
            const reductionAmount = thirdTransaction ? bid - 200 : bid;
            const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $inc: { balance: -reductionAmount }, $push: { notification: `You've spent, ${bid} coins on ${moment(transactionRegistered?.createdAt).format('ll')}` } }, { new: true });
            // if (thirdTransaction) {
            //     const updateUserNotification = await User.findOneAndUpdate({ _id: userId }, { $push: { notification: `You've earned 200 coins on ${moment(transactionRegistered?.createdAt).format('ll')} for making the golden transaction 🥳` } }, { new: true });
            // }
            if (updatedUser) {

                const up = await Question.findOne({ _id: _id, 'options.optionId': optionId });
                const updatedq = await Question.updateOne({ _id: _id, 'options.optionId': optionId }, { $inc: { "options.$[ele].value": +bid, Volume: +bid } }, { arrayFilters: [{ 'ele.optionId': optionId }] });
                // if (updatedq) {
                const updatedQuestion = await Question.findOne({ _id: _id });
                thirdTransaction ? res.status(203).send({ ...updatedQuestion, reductionAmount }) : res.status(201).send({ ...updatedQuestion, reductionAmount })
                // }
                // else {
                //     res.status(400).send({ mg: "error" })
                // }
            }
            else {
                res.status(400).send({ mg: "error" })
            }
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Transaction Failed' })
    }
}


const settleQue = async (req, res) => {
    const { _id, result } = req.body;
    try {
        const ques = await Question.findOneAndUpdate({ _id: _id }, { qstatus: 'closed', result: result }, { new: true });
        const { Volume, options } = ques;
        const trans = await Transaction.updateMany({ questionId: _id }, { qstatus: 'closed', result: result }, { multi: true });
        const transList = await Transaction.find({ questionId: _id }, { userId: 1, amount: 1, odd: 1, createdAt: 1 });
        const option = options.filter(item => item.name == result)?.[0]
        const winAmount = option?.value / Volume;
        let userData;
        await Promise.all(transList.map(async (element) => {
            (element.odd === result) ?
                userData = await User.findOneAndUpdate({ _id: element.userId }, { $inc: { balance: element.amount * winAmount, earning: element.amount * winAmount }, $push: { notification: `Congratulations, You've won ${element.amount * winAmount} coins on ${moment(element?.createdAt).format('ll')} by bidding question` } }, { new: true })
                :
                userData = await User.findOneAndUpdate({ _id: element.userId }, { $push: { notification: `You've lose ${element.amount} coins on ${moment(element?.createdAt).format('ll')} by bidding question. Better luck next time` } }, { new: true });

            const link = `${element.question}`;
            const data = { subject: `Settlement of question`, text: link, email: userData.email, html: `The Question "${element.question}" has been settled, check your portfolio for more info here <a href="${process.env.host}/question/${element.questionId}">View Portfolio</a>` };
            const result = await sendEMail(data);
            console.log(result);
        }))
        res.status(200).send(ques);
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: 'error in settlement' })
    }
}

const undoSettlement = async (req, res) => {
    const { _id, result, message, reason } = req.body;

    try {
        const ques = await Question.findOneAndUpdate({ _id: _id }, { qstatus: reason === 'invalid' ? 'invalid' : 'verified', result: 'null' }, { new: true });
        const { Volume, options } = ques;
        const transList = await Transaction.find({ questionId: _id }, { userId: 1, amount: 1, odd: 1, createdAt: 1 });
        // const trans = await Transaction.deleteMany({ questionId: _id });
        const option = options.filter(item => item.name == result)?.[0]
        const winAmount = option?.value / Volume;
        let userData;
        await Promise.all(transList.map(async (element) => {
            (element.odd === result)
                ? userData = await User.updateOne({ _id: element.userId }, { $inc: { balance: 0 - (element.amount * winAmount) + element.amount, earning: 0 - (element.amount * winAmount) }, $push: { notification: `we've undo the settlement due to ${message}` } }, { new: true })
                : userData = await User.updateOne({ _id: element.userId }, { $inc: { balance: element.amount }, $push: { notification: message || 'Settlement has been reverted due to some reason' } }, { new: true })

            const link = `${element.question}`;
            const data = { subject: `Undo Question Settlement`, text: link, email: userData.email, html: `The Question "${element.question}" has been un-settled due to ${message}` };
            const result = await sendEMail(data);
            console.log(result);

        }))
        res.status(200).send(ques);
    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: 'error in undo settlement' })
    }
}

export { question, settleQue, undoSettlement }