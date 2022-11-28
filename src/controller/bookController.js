const bookModel = require('../Models/bookModel')
const moment = require('moment')


const createBook = async function (req, res) {
    try {
        let data = req.body;
        let { name, title, excerpt, userId, ISBN, catogory, subcategory } = data

        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, message: "Give some data for book" })
        }

        if (!name || !title || !excerpt || !userId || !ISBN || !catogory || !subcategory) return res.status(400).send({ status: false, message: "Mandatory fields are required" })

        data.releasedAt = moment().format("YYYY-MM-DD")

        let saveData = await bookModel.creat(data)
        return res.status(201).send({ status: true, data: saveData })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
};


const getBooks = async function (req, res) {

    try {


        let query = req.query

        for (let key in query) {
            if (key != "userId" && key !== "category", key !== "") return res.status(400).send({ status: false, message: "Invalid key name in query params only userId , category , subcategory is allowed" })
        }

        let findObj = { isDeleted: false, ...query }

        let allBook = await bookModel.find(findObj).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 })

        if (allBook.length === 0) return res.status(404).status({ status: false, message: "No book found (With given query)" })

        res.status(200).send({
            status: true,
            message: 'Success',
            data: allBook
        })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}



module.exports = { createBook, getBooks }