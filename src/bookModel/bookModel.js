const mongoose = require('mongoose')
// const xyz = require ('../validator/validator')



let bookSchema = new mongoose.Schema({
  
        bookName: {type:String,
        require:true},
        price: {
            indianPrice: String,
            europePrice: String,
        },
        year:{
            type:Number,
            default:2021
        }, 
        tags: [String],
        authorName: String,
        totalPages:Number,
        isPublished:Boolean,
        stockAvailable: Boolean,
    
    
      },{ timestamps: true })
module.exports = mongoose.model('Book Model',bookSchema)

