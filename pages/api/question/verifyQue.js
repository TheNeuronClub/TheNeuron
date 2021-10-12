import { verifyQuestion } from '../../../server/controllers/question';
import connectDB from '../../../server/db/mongodb'

export default connectDB(verifyQuestion);
