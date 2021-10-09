import { update_user } from '../../../server/controllers/user';
import connectDB from '../../../server/db/mongodb'

export default connectDB(update_user);
