import Question from '../../server/db/models/question';
import Header from '../../server/db/models/header'

import connectDB from '../../server/db/mongodb';

const update = async (req, res) => {
    try {
        var imgUrl = ''
        const updatedq = await Question.find();
        updatedq.map(async (que) => {
            if (que?.image_url?.includes('httpss')) {
                imgUrl = que.image_url.replace('httpss', 'https');
                const updatedq = await Question.findByIdAndUpdate({ _id: que._id }, { image_url: imgUrl }, { new: true });
            }
        })
        res.status(201).send('updated')
    }
    catch (error) {
        console.log(error)
    }
}

export default connectDB(update);
