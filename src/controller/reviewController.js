const reviewModel = require('../model/reviewModel')
const bookModel = require('../model/bookModel')

const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId


const nameValidation = (/^[a-zA-Z ]+([\s][a-zA-Z ]+)*$/);



const postReview = async function(req ,res){

    let bookId = req.params.bookId

    let body = req.body
    body.reviewedAt = Date.now()

    let {reviewedBy , rating , review} =  body

    // // Validation may be here--->(Like manage => name , rating , given bookId in path params should match with body bookId )

    if(!nameValidation.test(reviewedBy))  return res.status(400).send({ status: false, message: "Please give right name in reviewedBy,ex->'John cena' "})

    if(rating < 1 || rating > 5) return res.status(400).send({ status: false, message: "Please give a rating in b/w 1 to 5"})


    if (!objectId.isValid(bookId)) return res.status(400).send({ status: false, message: "Please give a Valid bookId in path params" })
    if (!objectId.isValid(body.bookId)) return res.status(400).send({ status: false, message: "Please give a Valid bookId in request body." })

    if(bookId !== body.bookId) return res.status(400).send({status : false , message : "bookId in path params is not matched with bookId given in request body."})


    let bookPresent = await bookModel.findById(bookId)

    if(! bookPresent) return res.status(404).send({status : false , message : "No Book found with given bookId."})

    if(bookPresent.isDeleted === true) return res.status(404).send({status : false , message : "Book is deleted you can't add review."})


    let createReview = await reviewModel.create(body)

    let incBookReview =await  bookModel.findByIdAndUpdate({_id : bookId} , {$inc : {reviews : 1}})

    let resultObj = {
        ...incBookReview._doc,
        reviewData : createReview 
    }

    res.status(201).send({status : true , message : "Review created." , data : resultObj})

}





module.exports = {postReview}