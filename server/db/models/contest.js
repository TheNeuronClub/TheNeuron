import mongoose from 'mongoose';

const contestSchema = new mongoose.Schema({
    category : {
        type: String,
    },
    imgSrc: {
        type: String
    }
}, { timestamps: true })

const Contest = mongoose.models.Contest || mongoose.model("Contest", contestSchema);

export default Contest;