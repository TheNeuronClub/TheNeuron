import mongoose from 'mongoose';

const queCategory = new mongoose.Schema({
    category: {
        type: String,
    },
}, { timestamps: true })

const QueCategory = mongoose.models.QueCategory || mongoose.model("QueCategory", queCategory);

export default QueCategory;