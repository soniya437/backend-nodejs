const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,
    authorId: {
        type: ObjectId,
        ref: "newAuthor"
    }, 
    price: Number,
    ratings: Number,
    publisherId:{
        type: ObjectId,
        ref: "NewPublisher"},

    isHardCover:{
        type: Boolean,
        default: false
    }

    }
, { timestamps: true });


module.exports = mongoose.model('newBook', bookSchema)
