import connectDB from '../../server/db/mongodb';
import Contact from '../../server/db/models/contact';
const nodemailer = require('nodemailer')

const sendMail = ({ name, email, message }) => {
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
            subject: `Message From ${name}`,
            text: message + " | Sent from: " + email,
            html: `<div>${message}</div><p>Sent from:
          ${email}</p>`
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

const contacts = async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;
        try {
            const userContact = new Contact({ name, email, message });
            const contactSaved = await userContact.save();
            if (contactSaved) {
                sendMail({ name, email, message })
            }
            res.status(201).send({ msg: "Message sent" })
        }
        catch (error) {
            console.log(error)
        }
    }
    else {
        res.status(422).send('req_method_not_supported');
    }
}

export default connectDB(contacts);