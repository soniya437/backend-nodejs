const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    firstName: {
        type:String,
        required:true
    },
    lastName: String,
    mobile: {
        type: Number,
        required: true
    },
    emailId: {type:String,
        required:true},
    password:{type:String,
        required:true},
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    age: Number,

}, { timestamps: true });

module.exports = mongoose.model('UserCollection', userSchema)
