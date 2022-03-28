
import connectDB from '../../server/db/mongodb';
import Question from '../../server/db/models/question';
import Transaction from '../../server/db/models/transaction';
import User from '../../server/db/models/user';
import QueCategory from '../../server/db/models/queCategory'

const update = async (req, res) => {
    try {
        // const d = await User.aggregate([ // Table Name named as table1

        //     {
        //         $lookup:
        //         {
        //             from: 'transactions', // table name to join named as table2
        //             localField: '_id', // table1 common field
        //             foreignField: 'userId', // table2 common field
        //             // let: { category: 'oscars' },
        //             // pipeline: { category: 'oscars' },
        //             as: 'userTransaction' // new name of field where table2 data join as
        //         }
        //     },
        //     { // put 0 for the fields to hide or 1 to show (either use 0 or 1 fields)
        //         $project: {
        //             notification: 0,
        //             image_url: 0,
        //             password: 0,
        //             isNewUser: 0,
        //             isVerified: 0,
        //             referred_user: 0,
        //             referral_code: 0,
        //             type: 0,
        //             Tokens: 0
        //         }
        //     }
        // ]
        // )
        // console.log(d)
        // const ques = await Question.find()
        // // console.log(ques)
        // await Promise.all(ques.map(async (que) => {
        //     await Question.updateOne({ _id: que._id }, { tags: [que.category] }, { new: true })
        // }))
        // const qu = await Question.find()
        // console.log(qu)

        // const ques = await Transaction.find({ category: 'oscars' })
        // console.log(ques)
        // console.log(ques.length)
        // await Promise.all(ques.map(async (que) => {
        //     console.log(que?._id)
        //         await Transaction.updateOne({ _id: que._id }, {odd: 'No' }, { new: true })

        // }))

        // const qu = await Transaction.aggregate([
        //     { $match: { category: 'oscars', createdAt: { $gt: new Date('2022-03-12'), $lt: new Date('2022-03-28') } } },
        //     {
        //         $group:
        //         {
        //             _id: { userId: "$userId" },
        //             totalAmount: { $sum: "$amount" },
        //             count: { $sum: 1 },
        //         }
        //     }
        // ])
        res.status(201).send('updated')
    }
    catch (error) {
        console.log(error)
    }
}

export default connectDB(update);
