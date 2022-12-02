const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

const bookSchema = new mongoose.Schema({

    title: {
        type : String ,
        required : true ,
        trim: true,
        unique : true
    } ,

    excerpt:{
        type : String ,
        trim: true,
        required : true
    },
    userId:{
        type : objectId ,
        required : true ,
        ref : "user" ,
        trim: true
    },
    ISBN : {
        type : String ,
        required : true ,
        unique : true
    },
    category:{
        type : String ,
        trim: true,
        required : true
    },
    subcategory :{
        type : String ,
        trim: true,
        required : true
    },
    reviews : {type : Number , default : 0} ,
    deletedAt : {
        type : Date,
        default : null
    } ,
    isDeleted:{type : Boolean , default : false} ,
    releasedAt:{
        type : String,
        required : true 
    }


} , { timestamps : true })



module.exports = mongoose.model("book" , bookSchema )