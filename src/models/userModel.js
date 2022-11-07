const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    firstName: String,
    lastName: String,
    mobile: {
        type: String,
        required: true
    },
    emailId: {type:String,
        required:true},
    password: {type:String,
        required:true},
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    age: Number,
    posts: {type: [], deafult: []}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)
