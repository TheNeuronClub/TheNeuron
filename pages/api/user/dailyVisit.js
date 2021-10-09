import { dailyVisit } from '../../../server/controllers/user';
import connectDB from '../../../server/db/mongodb'

export default connectDB(dailyVisit);
