import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Cookies from 'cookies'

import User from '../db/models/user'

import sendEMail from '../../lib/Mail/sendMail'

const host = process.env.HOST

const register = async (req, res) => {
    const { username, email, password, country } = req.body;
    try {
        const userEmail = await User.findOne({ email: email });
        if (userEmail) {
            return res.status(421).json({ error: "Email already exist" })
        }
        const userUsername = await User.findOne({ username: username });
        if (userUsername) {
            return res.status(422).json({ error: "Username already exist" })
        } else {
            const user = new User({ username, email, password, country });
            try {
                user.isVerified = false;
                const userRegistered = await user.save();
                if (userRegistered) {
                    const token = await userRegistered.generateAuthToken();
                    const link = `${host}/account/verify?token=${token}`;
                    const data = { subject: `Confirmation for TheNeuron.Club Account`, text: link, email: userRegistered.email, html: `Click <a href="${link}" target="_blank">Here</a>  to verify your account.` };
                    const result = await sendEMail(data);
                    console.log(result)
                    res.status(201).json({ message: "User registered successfully" });
                }

            } catch (error) {
                res.status(400).json({ error: 'Failed to register' })
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}

const verify = async (req, res) => {
    const { token } = req.query;
    const verifyToken = jwt.verify(token, process.env.secret_key);

    const userFound = await User.findById({ _id: verifyToken._id });
    if (!userFound) {
        res.status(400).send('Verification Link expired');
    }
    else {
        userFound.Tokens = []
        userFound.isVerified = true;
        await userFound.save();
        res.status(200).send({ msg: 'user verified' })
    }
}

const forgetPassword = async (req, res) => {
    const userFound = await User.findOne({ email: req.body }) || await User.findOne({ username: req.body })
    if (userFound) {
        const link = `${host}/account/reset_password?_id=${userFound._id}&username=${userFound.username}`;
        const data = { subject: `Reset Password request for TheNeuron.Club Account`, text: `Reset password`, email: userFound.email, html: `Click <a href="${link}" target="_blank">Here</a>  to reset password of your TheNeuron.Club account.` }
        const result = await sendEMail(data);
        console.log(result)
        res.status(200).send({ msg: 'Reset password request' })
    }
    else {
        res.status(400).send('Invalid User')
    }
}
const resetPassword = async (req, res) => {
    let { _id, username, password } = req.body;
    const userFound = await User.findOne({ _id: _id }) && await User.findOne({ username: username })
    if (userFound) {
        password = await bcrypt.hash(password, 12)
        const updateUser = await User.findByIdAndUpdate(_id, { password }, { new: true });
        updateUser.Tokens = []
        await updateUser.save();
        res.status(200).send({ msg: 'Password updated' })
    }
    else {
        res.status(400).send('Failed to update password')
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userLogin = await User.findOne({ email: email }) || await User.findOne({ username: email })
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)

            const token = await userLogin.generateAuthToken();
            const cookies = new Cookies(req, res)

            // Set a cookie
            cookies.set('neuron', token, {
                expires: new Date(Date.now() + 1000 * 60 * 10 * 6 * 24),
                httpOnly: true // true by default
            })
            if (!isMatch) {
                res.status(400).json({ error: 'Invalid Credentials' })
            } else {
                if (userLogin.isVerified === false) {
                    res.status(203).send({ msg: 'User unverified' })
                } else {
                    const newUser = userLogin.isNewUser
                    userLogin.isNewUser = false;
                    await userLogin.save();
                    res.status(200).send({ token, newUser });
                }
            }
        }
        else {
            res.status(401).json({ error: "User doesn't exist" })
        }
    } catch (error) {
        console.log(error)
    }

}

const logout = async (req, res) => {
    try {
        const cookies = new Cookies(req, res)    
        // Get a cookie
        const userFound = await User.findById({_id: req.body._id});
        if (!userFound) {
            res.status(400).send('Problem in Logout');
        }
        else {
            cookies.set('neuron')
            userFound.Tokens = []
            await userFound.save();
            res.status(200).send({ msg: 'Logout successfully' })
        }
    } catch (error) {
            res.status(400).send('Logout');
    }
}


export { register, login, verify, logout, forgetPassword, resetPassword }