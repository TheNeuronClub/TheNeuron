import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 1000
    },
    isNewUser: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    country: {
        type: String,
    },
    lastVisit: {
        type: String,
    },
    admin: {
        type: Boolean
    },
    Tokens: [{
        token: {
            type: String,
            required: true
        }
    }
    ]
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
})

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id, username: this.username, name: this.name, email: this.email, isVerified: this.isVerified, country: this.country, admin: this.admin }, process.env.secret_key)
        this.Tokens = this.Tokens.concat({ token: token })
        await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }
}

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User;