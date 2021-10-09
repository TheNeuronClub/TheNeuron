import mongoose from 'mongoose';

const userComment = new mongoose.Schema({
    userId: {
        type: String
    },
    fullname : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
    },
    comment : {
        type: String,
        required: true
    },
})

const Comment = mongoose.models.Comment || mongoose.model("Comment", userComment);

export default Comment;