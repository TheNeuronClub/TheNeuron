
import connectDB from '../../server/db/mongodb';
import Question from '../../server/db/models/question';
import Transaction from '../../server/db/models/transaction';
import QueCategory from '../../server/db/models/queCategory'

const update = async (req, res) => {
    try {
        // const ques = await Question.find()
        // await Promise.all(ques.map(async (que) => {
        //     console.log(que?._id, que?.Favour)
        //     if(que?.Favour > -1){
        //         await Question.updateOne({ _id: que._id }, { options: [{ name: 'Yes', value: que.Favour, optionId: Math.round(Date.now() / (Math.random() * 10)) }, { name: 'No', value: que.Against, optionId: Math.round(Date.now() / (Math.random() * 10)) }] }, { new: true })
        //     }
        // }))
        // const qu = await Question.find()
        
        // const ques = await Transaction.find({odd: 'Against'})
        // await Promise.all(ques.map(async (que) => {
        //     console.log(que?._id)
        //         await Transaction.updateOne({ _id: que._id }, {odd: 'No' }, { new: true })
            
        // }))
        // const qu = await Transaction.find()
        res.status(201).send('updated')

        // const ques = await Question.find()
        // await Promise.all(ques.map(async (que) => {
        //     console.log(que?.userId)
        //         await Question.updateOne({ _id: que._id }, {userId: que?.userId }, { new: true })
            
        // }))
        // const qu = await Question.find()
        // res.status(201).send('updated')
    }
    catch (error) {
        console.log(error)
    }
}

export default connectDB(update);
