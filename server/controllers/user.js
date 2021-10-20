import moment from 'moment'
import User from '../db/models/user'
import Transaction from '../db/models/transaction';
import Question from '../db/models/question'

const userData = async (req, res) => {
    const userFound = await User.findById({ _id: req.query._id });
    if (!userFound) {
        res.status(400).send('Problem in getting user');
    }
    else {
        const questions = await Transaction.find({ userId: userFound._id }).sort({ _id: -1 });
        console.log(questions)
        let { Tokens, password, ...other } = userFound._doc;
        other = { ...other, questions }
        res.status(200).send(other)
    }
}

const dailyVisit = async (req, res) => {
    const { _id, currentDate } = req.body;
    const userFound = await User.findById({ _id: _id });
    if (userFound) {
        if (userFound.lastVisit !== currentDate) {
            const updatedUser = await User.findByIdAndUpdate({ _id: _id }, { $inc: { balance: 100 }, lastVisit: currentDate, $push: { notification: `You've won, 100 coins on ${moment(currentDate).format('ll')} for daily visit 😀` } }, { new: true });
            res.status(200).send({ balance: userFound.balance, msg: "new day visit" });
        }
        else {
            res.status(202).send({ msg: "same day visit" });
        }
    }
    else {
        res.status(400).send({ msg: "user not found" })
    }
}

const userQuestions = async (req, res) => {
    try {
        const getQuestions = await Question.find({userId: req.query.userId}).sort({ _id: -1 });
        res.status(200).send(getQuestions)
    } catch (error) {
        res.status(400).send({ msg: 'unable to get question' })
    }
}

export { userData, dailyVisit, userQuestions }