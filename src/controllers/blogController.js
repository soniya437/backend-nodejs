const blogModel = require('../models/blogsModel')
const mongoose = require('mongoose')
const objectId = mongoose.isValidObjectId
let createBlog = async (req, res) => {

    try {
        let { title, body, authorId, category } = req.body

        if (!Object.keys(req.body).length > 0) {
            return res.status(400).send({ status: false, msg: "Provide Details" })
        };
        if (!title) {
            return res.status(400).send({ status: false, msg: "Title is required" })
        };
        if (!body) {
            return res.status(400).send({ status: false, msg: "Body is required" })
        };
        if (!authorId) {
            return res.status(400).send({ status: false, msg: "Author Id is required" })
        };
        if (!objectId(authorId)) {
            return res.status(400).send({ status: false, msg: "Invalid Author ID" })
        };
        if (!category) {
            return res.status(400).send({ status: false, msg: "Category is required" })
        }

        let savedData = await blogModel.create(req.body)
        return res.status(201).send({ status: true, data: savedData })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}



const getBlogs = async function (req, res) {

    try {
        const query = req.query
        let { authorId, category, subcategory, tags } = query

        const savedData = await blogModel.find({ isPublished: true, isDeleted: false })
        if (!savedData.length > 0) {
            return res.status(404).send({ status: false, msg: "No details found" })
        }
        if (!query) {
            return res.status(200).send({ status: true, data: savedData })
        }
        const filter = {}
        if (authorId) {

            if (!objectId(authorId)) {
                return res.status(400).send({ status: false, msg: "Enter valid authorId" })
            }
            filter.authorId = authorId
        }
        if (category) {
            if (!category.match(/([A-Z,a-z])\w+/g)) {
                return res.status(400).send({ status: false, msg: "Enter valid category" })
            }
            filter.category = category
        }

        if (tags) {
            try {
                tags = JSON.parse(tags)
            }
            catch (error) {
                return res.status(400).send({ status: false, msg: "Please enter tags in array" })
            }
            for (let i = 0; i < tags.length; i++) {
                // if (typeof (tags[i]) !== String) {
                //     return res.status(400).send({ status: false, msg: "Please enter response in string" })
                // }
                if (!tags[i].match(/([A-Z,a-z])\w+/g)) {
                    return res.status(400).send({ status: false, msg: "Enter valid category" })
                }
            }
            filter.tags = tags
        }


        if (subcategory) {
            try {
                subcategory = JSON.parse(subcategory)
            }
            catch (error) {
                return res.status(400).send({ status: false, msg: "Please enter subcategory in array" })
            }
            for (let i = 0; i < subcategory.length; i++) {
                // if (typeof (subcategory[i]) !== String) {
                //     return res.status(400).send({ status: false, msg: "Please enter response in string" })
                //  }
                if (!subcategory[i].match(/([A-Z,a-z])\w+/g)) {
                    return res.status(400).send({ status: false, msg: "Enter valid subcategory" })
                }
            }
            filter.subcategory = subcategory
        }

        let savedData1 = await blogModel.find(filter)
        if(!savedData1.length > 0){
            return res.status(400).send({status: false, msg: "No such data"})
        }
        return res.send({ status: true, data: savedData1 })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs