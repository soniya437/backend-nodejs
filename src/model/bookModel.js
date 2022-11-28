const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

const blogSchema = new mongoose.Schema({

    // // ALL Keys

    title: {
        type : String ,
        required : true ,
        unique : true
    } ,

    excerpt:{
        type : String ,
        required : true
    },
    userId:{
        type : objectId ,
        required : true ,
        ref : ""
    },
    ISBN : {
        type : String ,
        required : true ,
        unique : true
    },
    category:{
        type : String ,
        required : true
    },
    subcategory :{
        type : [string] ,
        required : true
    },
    reviews : {type : Number , default : 0} ,
    deletedAt : null ,
    isDeleted:{type : Boolean , default : false} ,
    releasedAt:{
        type : date ,
        required : true 
    }




} , { timestamps : true })



module.exports = mongoose.model("book" , blogSchema )