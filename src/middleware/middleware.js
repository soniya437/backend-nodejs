const jwt = require("jsonwebtoken")


const bookModel = require('../model/bookModel')
const mongoose = require('mongoose');


const authentication = function (req, res, next) {

    try {
        let token = req.headers['x-api-key']
        if (!token) return res.status(400).send({ status: false, message: "Token is not present in header" })

        let verifytoken = jwt.verify(token, "projectsecretcode", function (err, decoded) {
            if (err) {
                return res.status(401).send({ status: false, message: "Authentication failed.(or token is valid for only 24H)" })
            }
            else {

                // // Set attri. in request --> Used in autherisation , this tokenAuthorId
                req.tokenUserId = decoded.userId
                // console.log(decoded)
                // console.log(decoded.userId)

                next()
            }
        })



    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}




const authorisation = async function (req, res, next) {


    try {

        let tokenUserId = req.tokenUserId
        let bookId = req.params.bookId

        if (!mongoose.Types.ObjectId.isValid(bookId)) return res.status(400).send({ Status: false, message: "Invalid Book Id." })

        let bookData = await bookModel.findById(bookId)

        if (!bookData) return res.status(404).send({ status: false, message: "BookId is not exist in DB." })

        let userInBook = bookData.userId

        if (tokenUserId.toString() !== userInBook.toString()) return res.status(403).send({ status: false, message: "Unauthorized person , forbidden" })


        next()

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }


}



module.exports = { authentication, authorisation }