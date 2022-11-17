const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const objectId = mongoose.isValidObjectId

const blogModel = require('../models/blogsModel') 

//------------------Authentication--------------------------------------------------------------------------------------------------------------
const authentication = function (req, res, next) {

    try {
        let token = req.headers["x-api-key"]
        if (!token) return res.status(401).send({ status: false, msg: "token is not present" })

        let decodedToken = jwt.verify(token, "group7")
        if (!decodedToken){
           return res.status(401).send({ status: false, msg: "Invalid Token" })
        }

        req.decodedToken = decodedToken.userId
        next()
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

// --------------------Authorisation---------------------------------------------------------------------------------------------------------------
const authorisation = async function(req, res, next){

let blogId = req.params.blogId
if(!objectId(blogId)){
    return res.status(400).send({status: true, msg: "BlogId is invalid"})
}
let availableBlog = await blogModel.findById(blogId)

if (!availableBlog) {
    return res.status(404).send({ status: false, msg: "No such data" });
}
if (availableBlog.isDeleted === true) {
    return res.status(404).send({ status: false, msg: "Blog not exists" })
};

let authorId = availableBlog.authorId
console.log(authorId)

let decodedToken = req.decodedToken
console.log(decodedToken)

if(decodedToken !== authorId.toString() ){
    return res.status(403).send({status: false, msg: "Unauthorised user"})
}

req.authorId = authorId


next()
}



module.exports.authentication = authentication
module.exports.authorisation = authorisation