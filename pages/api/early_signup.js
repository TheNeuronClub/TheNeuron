import connectDB from '../../server/db/mongodb';
import EarlySignup from '../../server/db/models/earlySignup';
const nodemailer = require('nodemailer')

const sendMail = (email) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.in',
            secure: true,
            port: 465,
            auth: {
                user: process.env.mail_user,
                pass: process.env.mail_pass,
            },
        })
        const mailData = {
            from: process.env.mail_user,
            to: process.env.mail_to,
            subject: `New Signup`,
            text:   " Sent from: " + email,
            html: `<div>${email} recently Sign Up The Neuron club</div>`
        }

        transporter.sendMail(mailData, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info)
        })
       
    }
    catch (error) {
        console.log(error)
    }
}

const early_signup = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const earlySignup = new EarlySignup({ email:req.body});
            const emailRegistered = await earlySignup.save();
            if(emailRegistered){
                sendMail(req.body)
            }
            res.status(201).send(emailRegistered)
        }
        catch (error) {
            console.log(error)
        }
    }
    else {
        res.status(422).send('req_method_not_supported');
    }
}

export default connectDB(early_signup);