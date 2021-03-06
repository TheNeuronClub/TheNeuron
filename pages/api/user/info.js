import connectDB from "../../../server/db/mongodb";
import User from '../../../server/db/models/user'

const info = async (req, res) => {
    try {
        const userFound = await User.findById({ _id: req.query._id });
        if (!userFound) {
            res.status(400).send('Problem in getting user');
        }
        else {
            let { Tokens, password, ...other } = userFound._doc;
            res.status(200).send(other)
        }
    } catch (error) {
        console.log(error);
        res.status(400).send('Problem in getting user');
    }
};

export default connectDB(info)

