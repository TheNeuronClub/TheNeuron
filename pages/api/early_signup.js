import connectDB from '../../server/db/mongodb';
import EarlySignup from '../../server/db/models/earlySignup';
import sendEMail from '../../lib/Mail/sendMail';

const early_signup = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const earlySignup = new EarlySignup({ email: req.body });
            const emailRegistered = await earlySignup.save();
            const data = { subject: `New Signup for The Neuron Club`, text: `The Neuron Club`, email: process.env.mail_to, html: `<div style="style="font-size:20px">${emailRegistered.email} recently Sign Up The Neuron club</div>` };
            const result = await sendEMail(data);
            console.log(result)
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
