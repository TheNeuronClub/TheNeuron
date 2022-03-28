import User from "../../server/db/models/user";
import connectDB from "../../server/db/mongodb";

const getUser = async (req, res) => {
    const _id = req.query
    if (_id) {
        const user = await User.findById(_id, { _id: 1, name: 1, image_url: 1 })
        res.status(200).send(user);
    }
}

export default connectDB(getUser)