import mongoose from 'mongoose';

const earlySignup = new mongoose.Schema({
    email : {
        type: String,
        required: true,
    },
})

const EarlySignup = mongoose.models.EarlySignup || mongoose.model("EarlySignup", earlySignup);

export default EarlySignup;