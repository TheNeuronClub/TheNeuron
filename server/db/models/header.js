import mongoose from 'mongoose';

const headerSchema = new mongoose.Schema({
    heading: {
        type: String
    },
    desc : {
        type: String,
    },
    imgSrc: {
        type: String
    }
})

const Header = mongoose.models.Header || mongoose.model("Header", headerSchema);

export default Header;