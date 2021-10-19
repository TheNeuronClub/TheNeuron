import connectDB from '../../../server/db/mongodb'
import User from '../../../server/db/models/user'
import middleware from '../../../lib/uploadFile/middleware'
import nextConnect from 'next-connect'
import DatauriParser from 'datauri/parser'
import { uploader, cloudinaryConfig } from '../../../lib/config/cloudinaryConfig'

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
            const { _id, ...other } = req.body;
            const userUpdated = await User.findByIdAndUpdate({ _id: _id }, { ...other, image_url }, { new: true });
            if (!userUpdated) {
                console.log('unable to update user')
                res.status(400).send('Error');
            }
            else {
                const token = await userUpdated.generateAuthToken();
                res.status(200).send({ token: token });
            }
        }
    }
    else {
        const { _id, ...other } = req.body;
        const updatedUser = await User.findByIdAndUpdate({ _id: _id }, { ...other }, { new: true });
        if (!updatedUser) {
            console.log('unable to update user')
            res.status(400).send('Error');
        }
        else {
            const token = await updatedUser.generateAuthToken();
            res.status(200).send({ token: token });
        }
    }
})
export const config = {
    api: {
        bodyParser: false
    }
}

export default connectDB(handler)
