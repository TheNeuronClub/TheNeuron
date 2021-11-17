import { undoSettlement } from '../../../server/controllers/transaction';
import connectDB from '../../../server/db/mongodb'

export default connectDB(undoSettlement);