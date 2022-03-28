
import connectDB from '../../server/db/mongodb';
import Transaction from '../../server/db/models/transaction';
import User from '../../server/db/models/user';

const result = async (req, res) => {

    try {
        let data = await Transaction.aggregate([
            { $match: { category: 'oscars', createdAt: { $gt: new Date('2022-03-12'), $lt: new Date('2022-03-28') } } },
            {
                $group:
                {
                    _id: { userId: "$userId" },
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 },
                }
            }
        ])
        data = data.sort(function (a, b) { return b?.totalAmount - a?.totalAmount });
        res.status(200).send(data)
    }
    catch (error) {
        console.log(error)
    }
}

export default connectDB(result);
