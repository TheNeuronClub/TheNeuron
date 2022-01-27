import connectDB from '../../server/db/mongodb'
import Header from '../../server/db/models/header'
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
        const result = await uploader.upload(file, { folder: 'carousel' })
        if (result) {
            const imgSrc = result.secure_url
            const carouselData = new Header({ ...req.body, imgSrc });
            const saveData = await carouselData.save();
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
        const result = await uploader.upload(file, { folder: "carousel" }, function (error, result) { console.log(result, error); })
        if (result) {
            const imgSrc = result.secure_url
            const carouselData = await Header.findByIdAndUpdate({ _id: req.query._id }, { ...req.body, imgSrc }, { new: true });
            const saveData = await carouselData.save();
            if (!saveData) {
                res.status(400).send({ msg: 'Error' });
            }
            else {
                res.status(201).send(saveData)
            }
        }
    }
    else {
        const carouselData = await Header.findByIdAndUpdate({ _id: req.query._id }, { ...req.body }, { new: true });
        const saveData = await carouselData.save();
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
        const carouselData = await Header.find();
        if (!carouselData) {
            res.status(400).send({ msg: 'Error' });
        }
        else {
            res.status(200).send(carouselData)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: 'Error' });
    }
})

handler.delete(async (req, res) => {
    try {
        const delCarousel = await Header.findByIdAndDelete({ _id: req.query._id })
        delCarousel ? res.status(200).send({ msg: "carousel deleted" }) : res.status(400).send({ msg: 'unable to remove carousel' });

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
