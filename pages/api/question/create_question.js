import connectDB from '../../../server/db/mongodb'
import Question from '../../../server/db/models/question'
import middleware from '../../../lib/uploadFile/middleware'
import nextConnect from 'next-connect'
import DatauriParser from 'datauri/parser'
import { uploader, cloudinaryConfig } from '../../../lib/config/cloudinaryConfig'
import sendEMail from '../../../lib/Mail/sendMail'

const handler = nextConnect()
handler.use(middleware)
handler.use(cloudinaryConfig)

const dUri = new DatauriParser();

const dataUri = req => dUri.format(`.${req.file.originalname.split('.').pop()}`, req.file.buffer);

handler.post(async (req, res) => {
    if (req.file) {
        const file = dataUri(req).content;
        const result = await uploader.upload(file)
        if (result) {
            const image_url = result.secure_url
            const questionCreated = new Question({ ...req.body, image_url });
            const saveQuestion = await questionCreated.save();
            if (!saveQuestion) {
                console.log('unable to add question')
                res.status(400).send('Error');
            }
            else {
                const link = `${process.env.host}/question/${saveQuestion?._id}`;
                const data = { subject: `New Question added to The Neuron Club`, text: link, email: `${process.env.mail_to}`, html: `<p style="font-size:20px;font-weight: 500;font-family: 'Roboto'">${saveQuestion?.question} </p><p style="font-size:16px;font-weight: 400;font-family: 'Roboto'">Click to <a href="${link}" target="_blank">View Question Details</a></p>` };
                const result = await sendEMail(data);
                console.log(result)
                res.status(201).send(questionCreated)
            }
        }
    }
})
export const config = {
    api: {
        bodyParser: false
    }
}

export default connectDB(handler)
