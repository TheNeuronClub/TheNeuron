import { addCoins } from '../../../server/controllers/payment';
import connectDB from '../../../server/db/mongodb'

export default connectDB(addCoins);