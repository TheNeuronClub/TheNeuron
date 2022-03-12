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

const getTotal = obj => Object.values(obj).reduce((a, b) => a + b);

handler.post(async (req, res) => {
    if (req.file) {
        const file = dataUri(req).content;
        const result = await uploader.upload(file, { folder: 'question' })
        if (result) {
            const image_url = result.secure_url
            try {
                const questionCreated = new Question({ ...req.body, tags: JSON.parse(req.body.tags), options: JSON.parse(req.body.options), image_url });
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
            } catch (error) {
                console.log(error)
            }
        }
    }
})


handler.patch(async (req, res) => {
    console.log(req.body)
    if (req.file) {
        const file = dataUri(req).content;
        const result = await uploader.upload(file, { folder: "question" })
        if (result) {
            const imgSrc = result.secure_url
            const queData = await Question.findByIdAndUpdate({ _id: req.query._id }, { ...req.body, tags: JSON.parse(req.body.tags), image_url: imgSrc }, { new: true });
            const saveData = await queData.save();
            if (!saveData) {
                res.status(400).send({ msg: 'Error' });
            }
            else {
                res.status(201).send(saveData)
            }
        }
    }
    else {
        const queData = await Question.findByIdAndUpdate({ _id: req.query._id }, { ...req.body, tags: JSON.parse(req.body.tags) }, { new: true });
        const saveData = await queData.save();
        if (!saveData) {
            res.status(400).send({ msg: 'Error' });
        }
        else {
            res.status(201).send(saveData)
        }
    }
})

export const config = {
    api: {
        bodyParser: false
    }
}

export default connectDB(handler)
