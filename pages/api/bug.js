import connectDB from '../../server/db/mongodb'
import Bug from '../../server/db/models/bug'
import middleware from '../../lib/uploadFile/middleware'
import nextConnect from 'next-connect'
import DatauriParser from 'datauri/parser'
import { uploader, cloudinaryConfig } from '../../lib/config/cloudinaryConfig'

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
            const image_url = result.url
            const bugReportCreated = new Bug({ ...req.body, image_url });
            const saveBugData = await bugReportCreated.save();
            if (!saveBugData) {
                res.status(400).send('Error');
            }
            else {
                res.status(201).send(saveBugData)
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
