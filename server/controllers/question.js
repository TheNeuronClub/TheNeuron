import QComment from '../db/models/qcomment';
import Question from '../db/models/question'
import Transaction from '../db/models/transaction';

const verifyQuestion = async (req, res) => {
    const { _id, qstatus } = req.body;
    try {
        const data = await Question.findByIdAndUpdate({ _id: _id }, { qstatus }, { new: true });
        if (data) {
            res.status(200).send({ msg: 'question verified' })
        }
        else {
            res.status(300).send({ msg: 'unable to verify question' })
        }
    } catch (error) {
        console.log(error);
        res.status(403).send(error)
    }
}

const getQuestions = async (req, res) => {
    try {
        const filter = req.query.filter ? {qstatus: 'created'} : { goLive: { $lte: new Date(new Date().toISOString()) } }
        const getQuestions = await Question.find(filter).sort({ _id: -1 });
        res.status(200).send(getQuestions)
    } catch (error) {
        res.status(400).send({ msg: 'unable to get question' })
    }
}

const ques = async (req, res) => {
    try {
        const trending = await Question.find({ goLive: { $lte: new Date(new Date().toISOString()) }, qstatus: 'verified' }).sort({ Volume: -1 }).limit(8);
        const newest = await Question.find({ goLive: { $lte: new Date(new Date().toISOString()) }, qstatus: 'verified' }).sort({ _id: -1 }).limit(8);
        res.status(200).send({ trending, newest })
    } catch (error) {
        res.status(400).send({ msg: 'unable to get question' })
    }
}

const queDetail = async (req, res) => {
    const detail = await Question.findById({ _id: req.query._id });
    if (detail) {
        res.status(200).send(detail)
    }
    else {
        res.status(400).send({ mg: "error" })
    }
}

const update_que = async (req, res) => {
    const { _id, bidClosing, settlementClosing, desc, qstatus, question } = req.body
    const updatedq = await Question.findByIdAndUpdate({ _id: _id }, { bidClosing, settlementClosing, desc, qstatus, question }, { new: true });
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
    category && category.length > 2 ? (filter = { category, qstatus, goLive: { $lte: new Date(new Date().toISOString()) } }) : (filter = { qstatus, goLive: { $lte: new Date(new Date().toISOString()) } })
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

const comment = async (req, res) => {
    if (req.method == 'POST') {
        const postComment = new QComment(req.body);
        const commentSaved = await postComment.save();
        commentSaved ? res.status(201).send(commentSaved) : res.status(400).send(null);
    }
    else if(req.method == 'DELETE'){
        const delComments = await QComment.findByIdAndDelete({ _id: req.query._id });
        delComments ? res.status(200).send({msg: "comment deleted"}) : res.status(400).send({msg: 'unable to remove comment'});
    }
    else {
        const getComments = await QComment.find({ queId: req.query.queId });
        getComments ? res.status(200).send(getComments) : res.status(400).send(null);
    }
}

export { ques, getQuestions, filter, queDetail, update_que, verifyQuestion, comment }
