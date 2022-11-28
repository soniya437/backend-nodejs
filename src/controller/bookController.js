const moment = require('moment')

const bookModel = require("../model/bookModel")
const userModel = require('../model/userModel')

const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId


const  isbnRegex =   /^(?=(?:\D*\d){10,}(?:(?:\D*\d){3})?$)[\d-]+$/
const excerptRegex = /^([A-Za-z ]+){3,}$/



const {isValidEntry} = require('../validator/validator')



const createBook = async function (req, res) {
    try {
        let data = req.body;
        let {title, excerpt, userId, ISBN, category, subcategory } = data

        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, message: "Give some data for book" })
        }

        if (!title || !excerpt || !userId || !ISBN || !category || !subcategory ) return res.status(400).send({ status: false, message: "Mandatory fields are required." })

        if(!isValidEntry(title)) return res.status(400).send({status : false , message : "Tittle is not given."})
        if(!isValidEntry(userId) || !objectId.isValid(userId)) return res.status(400).send({status : false , message : "UserId is not given or Invalid. "})
        if(!isValidEntry(category)) return res.status(400).send({status : false , message : "Category is not given."})
        if(!isValidEntry(subcategory)) return res.status(400).send({status : false , message : "Subcategory is not given."})
        
        // if(! excerpt.match(excerptRegex)) return res.status(400).send({status : false , message : "Excerpt is not given or Not Invalid."})
        // if(!isValidEntry(ISBN) || isbnRegex.test(ISBN)) return res.status(400).send({status : false , message : "ISBN is not given or Not Invalid."})

        let allreadyBook = bookModel.find({$or : [ {title : data.title} , {ISBN : data.ISBN} ]})
        if(allreadyBook >= 0) return res.status(400).send({status: false, message: "Title of book or ISBN of book , already present."})


        let userCheck = userModel.findOne({userId : userId})
        if(!userCheck) returnres.status(400).send({status: false, message: "Invalid UserId , user not exist in DB"})


        const today = moment()        
        data.releasedAt =  today.format('YYYY-MM-DD')


        let saveData = await bookModel.create(data)
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
            if (key != "userId" && key !== "category" && key !== "subcategory") return res.status(400).send({ status: false, message: "Invalid key name in query params only userId , category , subcategory is allowed" })
        }

        let findObj = { isDeleted: false, ...query }

        
        let allBook = await bookModel.find(findObj).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1,  reviews: 1 , releasedAt : 1 }).sort({ title: 1 })
        
        if (allBook.length <= 0) return res.status(404).send({ status: false, message: "No book found (With given query)" })


        res.status(200).send({
            status: true,
            message: 'Books list',
            data: allBook
        })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}



module.exports = { createBook, getBooks }