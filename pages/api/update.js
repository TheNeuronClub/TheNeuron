
import connectDB from '../../server/db/mongodb';

const update = async (req, res) => {
    try {
        
        res.status(201).send('updated')
    }
    catch (error) {
        console.log(error)
    }
}

export default connectDB(update);
