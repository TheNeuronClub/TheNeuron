import { comment } from '../../../server/controllers/question';
import connectDB from '../../../server/db/mongodb'

export default connectDB(comment);
