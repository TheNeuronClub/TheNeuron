
import connectDB from '../../server/db/mongodb';
import Transaction from '../../server/db/models/transaction';
import Question from '../../server/db/models/question';
import User from '../../server/db/models/user';
var flag = 0;
const result = async (req, res) => {
    try {
        // let data = await Transaction.aggregate([
        //     { $match: { $expr: { $eq: ["$odd", "$result"] }, category: 'oscars', createdAt: { $gt: new Date('2022-03-12'), $lt: new Date('2022-03-28') } } },
        //     {
        //         $group:
        //         {
        //             _id: { userId: "$userId" },
        //             totalAmount: { $sum: "$amount" },
        //             count: { $sum: 1 },
        //         }
        //     }
        // ])
        // data = data.sort(function (a, b) { return b?.totalAmount - a?.totalAmount });

        let dataList = []

        let transactionList = await Transaction.find({ $expr: { $eq: ["$odd", "$result"] }, category: 'oscars', createdAt: { $gt: new Date('2022-03-12'), $lt: new Date('2022-03-28') } }, { createdAt: 0, updatedAt: 0, settlementClosing: 0, __v: 0 })
        await Promise.all(transactionList.map(async (element) => {
            const question = await Question.findById({ _id: element?.questionId }, { Volume: 1, _id: 1, options: 1 })
            const option = question.options.filter(item => item.name == element.result)?.[0]
            const winAmount = Math.round((option?.value / question.Volume) * element.amount)
            for (let i = 0; i < dataList.length; i++) {
                if (dataList[i].userId.toString() == element.userId.toString()) {
                    flag = 1;
                }
            }
            if (flag) {
                dataList.map((item, i) => {
                    if (item.userId.toString() == element.userId.toString()) {
                        dataList[i].winAmount += winAmount;
                        flag = 0
                    }
                })
            }
            else {
                dataList.push({
                    userId: element.userId,
                    winAmount: winAmount
                })
            }
        }))

        const data = dataList.sort(function (a, b) { return b?.winAmount - a?.winAmount });
        let userList = await Promise.all(data.map(async (element, i) => {
            const user = await User.findById({ _id: element.userId }, { name: 1, image_url: 1, email: 1, _id: 1 })
            return {
                ...user?._doc,
                winAmount: element.winAmount,
                rank: i + 1
            }
        }))

        res.status(200).send(userList)
    }
    catch (error) {
        console.log(error)
    }
}

export default connectDB(result);