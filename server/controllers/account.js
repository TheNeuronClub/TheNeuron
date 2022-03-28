import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Cookies from 'cookies'

import User from '../db/models/user'

import sendEMail from '../../lib/Mail/sendMail'

const host = process.env.HOST

const register = async (req, res) => {
    const { email, password, name, referral_code, image_url, isVerified } = req.body;
    try {
        const userEmail = await User.findOne({ email: email });
        if (userEmail) {
            return res.status(421).json({ error: "Email already exist" })
        }
        else {
            try {
                const user = new User({ email, password, name, image_url, isVerified, referral_code: Math.random().toString(36).slice(-6).toUpperCase() });
                const userRegistered = await user.save();

                if (userRegistered) {
                    if (referral_code) {
                        try {
                            const refer = await User.findOneAndUpdate({ referral_code: referral_code }, { $push: { notification: `Congratulations, You've won 500 neuron coins for refer user`, referred_user: userRegistered._id }, $inc: { balance: 500 } }, { new: true });
                            if (refer) {
                                const referredThrough = await User.findByIdAndUpdate({ _id: userRegistered._id }, { referred_through: `${referral_code}` }, { new: true });
                            }
                        } catch (error) {
                            console.log('Wrong Referral Code')
                        }
                    }

                    const token = await userRegistered.generateAuthToken();
                    // const link = `${host}/account/verify?token=${token}`;
                    // const data = { subject: `Confirmation for TheNeuron.Club Account`, text: link, email: userRegistered.email, html: `Click <a href="${link}" target="_blank">Here</a>  to verify your account.` };
                    // if (!isVerified) {
                    //     const result = await sendEMail(data);
                    //     console.log(result);
                    // }
                    res.status(200).send({ token: token, newUser: true });
                }
            } catch (error) {
                console.log(error)
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
    const userFound = await User.findOne({ email: req.body })
    if (userFound) {
        const link = `${host}/account/reset_password?_id=${userFound._id}&code=${userFound.referral_code}`;
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
    let { _id, code, password } = req.body;
    const userFound = await User.findOne({ _id: _id }) && await User.findOne({ referral_code: code })
    if (userFound) {
        password = await bcrypt.hash(password, 12)
        const updateUser = await User.findByIdAndUpdate({ _id: _id }, { password: password }, { new: true });
        updateUser.Tokens = []
        await updateUser.save();
        res.status(200).send({ msg: 'Password updated' })
    }
    else {
        res.status(400).send('Failed to update password')
    }
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

const loginSuccess = async (req, res, user) => {
    const newUser = user.isNewUser
    user.isNewUser = false;
    await user.save();

    const token = await user.generateAuthToken();
    const cookies = new Cookies(req, res)

    // Set a cookie
    cookies.set('neuron', token, {
        expires: new Date(Date.now() + 1000 * 60 * 10 * 6 * 24),
        httpOnly: true // true by default
    })
    res.status(200).send({ token, newUser });
}
const login = async (req, res) => {
    const { type } = req.query;
    const { email, password } = req.body;
    try {
        const userLogin = await User.findOne({ email: email })
        if (userLogin && type !== 'social') {
            const isMatch = await bcrypt.compare(password, userLogin.password)

            if (!isMatch) {
                res.status(400).json({ error: 'Invalid Credentials' })
            } else {
                if (userLogin.isVerified === false) {
                    res.status(203).send({ msg: 'User unverified' })
                } else {
                    await loginSuccess(req, res, userLogin)
                }
            }
        }
        else if (userLogin && type === 'social') {
            await loginSuccess(req, res, userLogin)
        }
        else {
            if (!userLogin && type === 'social') {
                try {
                    const { referral_code, name, email } = req.body;
                    const user = new User({ name: name, email: email, image_url: req.body.image, isVerified: true, referral_code: Math.random().toString(36).slice(-6).toUpperCase() });
                    const userRegistered = await user.save();
                    if (userRegistered && referral_code) {
                        try {
                            const refer = await User.findOneAndUpdate({ referral_code: referral_code }, { $push: { notification: `Congratulations, You've earned 500 neuron coins for refer user`, referred_user: userRegistered._id }, $inc: { balance: 500 } }, { new: true });
                            if (refer) {
                                const referredThrough = await User.findByIdAndUpdate({ _id: userRegistered._id }, { referred_through: `${referral_code}` }, { new: true });
                            }
                        } catch (error) {
                            console.log('Wrong Referral Code')
                        }
                    }
                    await loginSuccess(req, res, userRegistered);
                } catch (error) {
                    res.status(400).json({ error: 'Failed to Social Sigin' })
                }
            }
            else {
                res.status(401).json({ error: "User doesn't exist" })
            }
        }
    } catch (error) {
        console.log(error)
    }

}

const logout = async (req, res) => {
    try {
        const cookies = new Cookies(req, res)
        // Get a cookie
        const userFound = await User.findById({ _id: req.body._id });
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