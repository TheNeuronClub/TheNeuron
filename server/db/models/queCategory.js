import mongoose from 'mongoose';

const queCategory = new mongoose.Schema({
    category: {
        type: String,
    },
    hidden: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number
    }
}, { timestamps: true })

const QueCategory = mongoose.models.QueCategory || mongoose.model("QueCategory", queCategory);

export default QueCategory;