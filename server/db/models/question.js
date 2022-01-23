import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
    },
    userId: {
        type: mongoose.ObjectId,
        required: true,
    },
    category: {
        type: String,
    },
    bidClosing: {
        type: Date,
    },
    settlementClosing: {
        type: Date,
    },
    goLive: {
        type: Date,
    },
    result: {
        type: String,
    },
    Volume: {
        type: Number,
        default: 0
    },
    Favour: {
        type: Number,
        default: 0
    },
    Against: {
        type: Number,
        default: 0
    },
    qstatus: {
        type: String,
    },
    options: {
        type: Object
    },
    reference: {
        type: String
    },
    desc: {
        type: String
    },
    image_url: {
        type: String
    }
}, { timestamps: true })


const Question = mongoose.models.Question || mongoose.model('Question', questionSchema)

export default Question;