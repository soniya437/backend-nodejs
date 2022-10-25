const mongoose = require('mongoose')
// const xyz = require ('../validator/validator')



let bookSchema = new mongoose.Schema({
 
bookName: {
    type:String,
    require: [true, "bookName name is required"],
    unique : true,
  
},                           
authorName:{
        type:String,
        require:[true, "authorName name is required"],
    
    },
category:{
        type:[String],
        require:[true, "category name is required"]
    },

year: {
        type:Number,
        require:[true, "year name is required"]
    }
      },{ timestamps: true })
module.exports = mongoose.model('Book Model',bookSchema)

