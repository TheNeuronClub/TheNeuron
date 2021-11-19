import connectDB from '../../server/db/mongodb';
import Contact from '../../server/db/models/contact';
import sendEMail from '../../lib/Mail/sendMail';

const contacts = async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;
        try {
            const userContact = new Contact({ name, email, message });
            const contactSaved = await userContact.save();
            const data = { subject: `Message From ${contactSaved.name}`, text: `${message} | Sent from: ${email}`, email: process.env.mail_to, html: `<div style="font-size:20px">${message}</div><br /><p style="font-weight: 600; font-size: 16px">Sent from: ${email}</p>` };
            const result = await sendEMail(data);
            console.log(result)
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