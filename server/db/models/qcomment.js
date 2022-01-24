import mongoose from 'mongoose';

const queComment = new mongoose.Schema({
    queId: {
        type: mongoose.ObjectId
        required: true
    },
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    name : {
        type: String,
    },
    image_url : {
        type: String,
    },
    comment : {
        type: String,
        required: true
    },
}, { timestamps: true })

const QComment = mongoose.models.QComment || mongoose.model("QComment", queComment);

export default QComment;