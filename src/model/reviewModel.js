const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

const reviewSchema = new mongoose.Schema({


    bookId:{
        type : objectId ,
        required : true ,
        ref : "book"
    },
    reviewedBy : {
        type :String ,
        default : "Guest",
        trim:true
    },
    reviewedAt:{
        type : Date,
        required :true 
    },
    rating :{
        type : Number ,
        required : true,
        min:1,
        max:5
    },
    review : String ,
    isDeleted : {
        type : Boolean ,
        default : false
    }


} , { timestamps : true })



module.exports = mongoose.model("review" , reviewSchema )