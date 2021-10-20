import connectDB from "../../../server/db/mongodb";
import { User } from '../../../server/db/models/user'

const info = async (req, res) => {
    const userFound = await User.findById({ _id: req.query._id });
    if (!userFound) {
        res.status(400).send('Problem in getting user');
    }
    else {
        let { Tokens, password, ...other } = userFound._doc;
        other = { ...other, questions }
        res.status(200).send(other)
    }
};

export default connectDB(info)

