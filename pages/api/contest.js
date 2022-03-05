import connectDB from '../../server/db/mongodb'
import Contest from '../../server/db/models/contest'
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
        const result = await uploader.upload(file, { folder: 'contest' })
        if (result) {
            const imgSrc = result.secure_url
            const contestData = new Contest({ ...req.body, imgSrc });
            const saveData = await contestData.save();
            if (!saveData) {
                res.status(400).send({ msg: 'Error' });
            }
            else {
                res.status(201).send(saveData)
            }
        }
        else {
            res.status(400).send({ msg: 'Error' });
        }
    }
})

handler.patch(async (req, res) => {
    if (req.file) {
        const file = dataUri(req).content;
        const result = await uploader.upload(file, { folder: "contest" }, function (error, result) { console.log(result, error); })
        if (result) {
            const imgSrc = result.secure_url
            const contestData = await Contest.findByIdAndUpdate({ _id: req.query._id }, { ...req.body, imgSrc }, { new: true });
            const saveData = await contestData.save();
            if (!saveData) {
                res.status(400).send({ msg: 'Error' });
            }
            else {
                res.status(201).send(saveData)
            }
        }
    }
    else {
        const contestData = await Contest.findByIdAndUpdate({ _id: req.query._id }, { ...req.body }, { new: true });
        const saveData = await contestData.save();
        if (!saveData) {
            res.status(400).send({ msg: 'Error' });
        }
        else {
            res.status(201).send(saveData)
        }
    }
})


handler.get(async (req, res) => {
    try {
        const contestData = await Contest.find();
        if (!contestData) {
            res.status(400).send({ msg: 'Error' });
        }
        else {
            res.status(200).send(contestData)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: 'Error' });
    }
})

handler.delete(async (req, res) => {
    try {
        const delContest = await Contest.findByIdAndDelete({ _id: req.query._id })
        delContest ? res.status(200).send({ msg: "contest deleted" }) : res.status(400).send({ msg: 'unable to remove contest' });

    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: 'unable to remove' })
    }
})

export const config = {
    api: {
        bodyParser: false
    }
}

export default connectDB(handler)
