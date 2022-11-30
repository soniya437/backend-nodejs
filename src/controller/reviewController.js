const reviewModel = require('../model/reviewModel')
const bookModel = require('../model/bookModel')

const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId


const nameValidation = (/^[a-zA-Z ]+([\s][a-zA-Z ]+)*$/);



const postReview = async function(req ,res){

    let bookId = req.params.bookId

    let body = req.body
    body.reviewedAt = Date.now()

    let {reviewedBy , rating } =  body

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


const updateReview = async function (req, res) {
    try {
      const booksId = req.params.bookId;
      const reviewId = req.params.reviewId;
      const bookData = await bookModel.findOne({ _id: booksId });
      if (!bookData) {
        return res.status(400).send({ status: false, msg: "Provide valid BookId" });
      }
      if (bookData.isDeleted == true) {
       return res
          .status(404)
          .send({ status: false, msg: "This book is no longer Exists" });
      }
      const reviewData = await reviewModel.findOne({ _id: reviewId }).select({__v:0});
      if (!reviewData) {
       return res.status(400).send({ status: false, msg: "provide valid reviewId" });
      }

      
      let update = req.body;
      if (update) {
        if (update.review) {
          reviewData.review = update.review;
        }
        if (update.rating) {
          reviewData.rating = update.rating;
        }
        if (update.reviewedBy) {
          reviewData.reviewedBy = update.reviewedBy;
        }
        reviewData.save(); //saving all data 
      } 
      else
       {
        return res.status(404).send({ status: false, msg: "Please provide data to update" });
      }
      return res.status(200).send({ status: true, msg: "SuccessFully Updated",bookData, reviewData });
    } catch (err) {
      return res.status(500).send({ status: false, msg: err.message });
    }
  };


  const deleteReview = async function (req, res) {
    try {

        const bookId = req.params.bookId
        const reviewId = req.params.reviewId

        if (!objectId.isValid(bookId)) return res.status(400).send({ status: false, message: "Please give a Valid bookId in path params" })

        if (!objectId.isValid(reviewId)) return res.status(400).send({ status: false, message: "Please give a Valid reviewId in path params" })

        const reviewbyReviewId = await reviewModel.findOne({_id : reviewId , isDeleted : false})
        if(!reviewbyReviewId) return res.status(404).send({ status: false, message: `No review found by ${reviewId} or review is already deleted.` });
        
        if (reviewbyReviewId.bookId != bookId) return res.status(400).send({ status: false, message: "review is not from this book" })
        
        const markReviewDelete = await reviewModel.findByIdAndUpdate(reviewId, { $set: { isDeleted: true } }, { new: true })

        const updateRviewCount = await bookModel.findByIdAndUpdate(bookId, { $inc: { reviews: -1 } }, { new: true })

        let resultObj = {
            ...updateRviewCount._doc,
            reviewData: markReviewDelete
        }

        return res.status(200).send({ status: true, message: "Review Deleted Successful" , data : resultObj })
    }

    catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports = {postReview, updateReview, deleteReview}