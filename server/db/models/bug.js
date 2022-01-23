import mongoose from 'mongoose';

const bugSchema = new mongoose.Schema({
    userId: {
        type: mongoose.ObjectId
    },
    issue : {
        type: String,
        required: true
    },
    email : {
        type: String,
    },
    desc : {
        type: String,
    },
    image_url: {
        type: String
    }
})

const Bug = mongoose.models.Bug || mongoose.model("Bug", bugSchema);

export default Bug;