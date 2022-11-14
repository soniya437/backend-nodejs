const blogModel = require('../models/blogsModel')
const mongoose =require('mongoose')
const objectId = mongoose.isValidObjectId
let createBlog = async (req,res)=>{

    try{let {title, body, authorId, Category} = req.body

    if(!Object.keys(req.body).length>0){
        return res.status(400).send({status: false, msg : "Provide Details"})
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
    if(!objectId(authorId)){
        return res.status(400).send({status :false, msg: "Invalid Author ID"})
    };
    if (!Category) {
        return res.status(400).send({ status: false, msg: "Category is required" })
    }

    let savedData = await blogModel.create(req.body)
    return res.status(201).send({status:true, msg:savedData})
}catch(error){
        return res.status(500).send({status:false, msg: error.message})}
}