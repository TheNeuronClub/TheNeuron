import moment from 'moment'
import User from '../db/models/user'
import Transaction from '../db/models/transaction';

const userData = async (req, res) => {
    const userFound = await User.findById({ _id: req.query._id });
    if (!userFound) {
        res.status(400).send('Problem in getting user');
    }
    else {
        const questions = await Transaction.find({ username: userFound.username }).sort({ _id: -1 })
        let { Tokens, password, ...other } = userFound._doc;
        other = { ...other, questions }
        res.status(200).send(other)
    }
}

const update_user = async (req, res) => {
    const updatedUser = await User.updateMany({}, { lastVisit: 'Wed Oct 06 2021' });
    if (updatedUser) {
        res.status(200).send(updatedUser)
    }
    else {
        res.status(400).send({ mg: "error" })
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

export { userData, update_user, dailyVisit }