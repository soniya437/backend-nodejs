const bookModel = require('../Models/bookModel')

const createBook = async function (req, res) {
    try {
        let data = req.body;
        let { name, title, excerpt, userId, ISBN, catogory, subcategory } = data

        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, message: "Body is missing" })
        }




        let saveData = await bookModel.creat(data)
        return res.status(201).send({ status: true, data: result })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
};



module.exports.creatBook = creatBook;