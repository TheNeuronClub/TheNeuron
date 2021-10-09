import {register} from '../../../server/controllers/account'
import connectDB from '../../../server/db/mongodb'

export default connectDB(register);
