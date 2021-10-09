import { question } from '../../../server/controllers/transaction';
import connectDB from '../../../server/db/mongodb'

export default connectDB(question);
