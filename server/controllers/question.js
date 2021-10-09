import Question from '../db/models/question'
import Transaction from '../db/models/transaction';

const createQuestion = async (req, res) => {
    const questionCreated = new Question(req.body);
    const saveQuestion = await questionCreated.save();
    if (!saveQuestion) {
        res.status(400).send('Error');
    }
    else {
        res.status(201).send(questionCreated)
    }
}

const getQuestions = async (req, res) => {
    try {
        const getQuestions = await Question.find().sort({ _id: -1 });
        res.status(200).send(getQuestions)
    } catch (error) {
        res.status(400).send({ msg: 'unable to get question' })
    }
}

const ques = async (req, res) => {
    try {
        const trending = await Question.find({qstatus: 'verified'}).sort({ Volume: -1 }).limit(8);
        const newest = await Question.find({qstatus: 'verified'}).sort({ _id: -1 }).limit(8);
        res.status(200).send({ trending, newest })
    } catch (error) {
        res.status(400).send({ msg: 'unable to get question' })
    }
}

const queDetail = async (req, res) => {
    console.log(req.query)
    const detail = await Question.findById({ _id: req.query._id });
    if (detail) {
        res.status(200).send(detail)
    }
    else {
        res.status(400).send({ mg: "error" })
    }
}


const update_que = async (req, res) => {
    const { _id, bidClosing, settlementClosing, desc, qstatus } = req.body
    const updatedq = await Question.findByIdAndUpdate({ _id: _id }, { bidClosing, settlementClosing, desc, qstatus }, { new: true });
    if (updatedq) {
        const updatetq = await Transaction.updateMany({ questionId: _id }, { qstatus }, { new: true });
        res.status(200).send(updatedq)
    }
    else {
        res.status(400).send({ mg: "error" })
    }
}


const filter = async (req, res) => {
    const { category, sort, qstatus } = req.body;
    let sorting, filter;
    category && category.length > 2 ? (filter = { category, qstatus }) : (filter = { qstatus })
    if (sort === 'volume') {
        sorting = { Volume: -1 }
    }
    else if (sort === 'oldest') {
        sorting = { createdAt: 0 }

    } else if (sort === 'closing') {
        sorting = { bidClosing: 0 }
    }
    else {
        sorting = { createdAt: -1 }
    }
    try {
        const getQuestions = await Question.find(filter).sort(sorting);
        res.status(200).send(getQuestions)
    } catch (error) {
        res.status(400).send({ msg: 'unable to get question' })
    }
}


export { createQuestion, ques, getQuestions, filter, queDetail, update_que }