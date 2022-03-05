import connectDB from '../../../server/db/mongodb'
import QueCategory from '../../../server/db/models/queCategory'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.post(async (req, res) => {
    try {
        const newCategory = new QueCategory({ category: req.body, order: Date.now() });
        const saveCategory = await newCategory.save();
        if (!saveCategory) {
            res.status(400).send({ msg: 'Error' });
        }
        else {
            res.status(201).send(saveCategory)
        }
    } catch (error) {

    }
})

handler.get(async (req, res) => {
    try {
        const categoryData = await QueCategory.find();
        if (!categoryData) {
            res.status(400).send({ msg: 'Error' });
        }
        else {
            res.status(200).send(categoryData)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: 'Error' });
    }
})

handler.patch(async (req, res) => {
    const data = JSON.parse(req.body)
    if (data._id) {
        await QueCategory.findOneAndUpdate({ _id: data._id }, { hidden: data.hidden })
        res.status(200).send({ msg: 'updatde' })
    }
    else {
        try {
            data?.map(async (item) => {
                try {
                    await QueCategory.findOneAndUpdate({ _id: item._id }, { order: item.order })
                } catch (error) {
                    console.log(error)
                }
            })
            res.status(200).send({ msg: 'updatde' })
        } catch (error) {
            console.log(error)
            res.status(400).send({ msg: 'Error' });
        }
    }
})

handler.delete(async (req, res) => {
    try {
        const delCategory = await QueCategory.findByIdAndDelete({ _id: req.query._id })
        delCategory ? res.status(200).send({ msg: "category deleted" }) : res.status(400).send({ msg: 'unable to remove category' });
    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: 'unable to remove' })
    }
})


export default connectDB(handler)
