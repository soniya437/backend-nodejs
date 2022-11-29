


const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

const reviewSchema = new mongoose.Schema({

    // // ALL Keys

    bookId:{
        type : objectId ,
        required : true ,
        ref : "book"
    },
    reviewedBy : {
        type :String ,
        default : "Guest"
    },
    reviewedAt:{
        type : Date,
        required :true 
    },
    rating :{
        type : Number ,
        required : true
    },
    review :{
        type : String
    },
    isDeleted : {
        type : Boolean ,
        default : false
    }


    // {
    //     bookId: {ObjectId, mandatory, refs to book model},
    //     reviewedBy: {string, mandatory, default 'Guest', value: reviewer's name},
    //     reviewedAt: {Date, mandatory},
    //     rating: {number, min 1, max 5, mandatory},
    //     review: {string, optional}
    //     isDeleted: {boolean, default: false},
    //   }


} , { timestamps : true })



module.exports = mongoose.model("review" , reviewSchema )