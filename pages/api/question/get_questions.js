import { getQuestions } from '../../../server/controllers/question';
import connectDB from '../../../server/db/mongodb'

export default connectDB(getQuestions);
