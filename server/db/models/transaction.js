import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.ObjectId
    },
    questionId: {
        type: mongoose.ObjectId
    },
    amount: {
        type: Number
    },
    question: {
        type: String
    },
    image_url: {
        type: String
    },
    category: {
        type: String
    },
    qstatus: {
        type: String,
        default: 'verified'
    },
    result: {
        type: String
    },
    odd: {
        type: String
    },
    settlementClosing: {
        type: Date
    }
}, { timestamps: true })


const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)

export default Transaction;