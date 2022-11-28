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



} , { timestamps : true })



module.exports = mongoose.model("book" , blogSchema )