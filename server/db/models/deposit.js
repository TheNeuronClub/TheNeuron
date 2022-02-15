import mongoose from 'mongoose';

const depositSchema = new mongoose.Schema({
    userId: {
        type: mongoose.ObjectId
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
    },
    currency: {
        type: String
    }
}, { timestamps: true })


const Deposit = mongoose.models.Deposit || mongoose.model('Deposit', depositSchema)

export default Deposit;