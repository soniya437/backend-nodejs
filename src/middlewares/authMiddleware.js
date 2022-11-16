const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const objectId = mongoose.isValidObjectId

const blogModel = require('../models/blogsModel') 


const authentication = function (req, res, next) {

    try {
        let token = req.headers["x-api-key"]
        if (!token) return res.status(401).send({ status: false, msg: "token is not present" })

        let decodedToken = jwt.verify(token, "group7")
        if (!decodedToken) {
            res.status(500).send({ status: false, msg: "Invalid Token" })
        }

        req.decodedToken = decodedToken.userId   //{userId: savedData1._id}
        next()
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}


const authorisation = async function(req, res, next){

let userTobeModified = req.params.blogId
if(!objectId(userTobeModified)){
    return res.status(400).send({status: true, msg: "BlogId is invalid"})
}
let availableBlog = await blogModel.findById(userTobeModified);

if (!availableBlog) {
    return res.status(404).send({ status: false, msg: "No such data" });
}
if (availableBlog.isDeleted === true) {
    return res.status(404).send({ status: false, msg: "Blog not exists" })
};



if(req.decodedToken !== userTobeModified ){
    return res.status(403).send({status: false, msg: "Unauthorised user"})
}

req.userTobeModified = userTobeModified


next()
}















module.exports.authentication = authentication
module.exports.authorisation = authorisation