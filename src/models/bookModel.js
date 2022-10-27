const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema( {
    name: String, 
    author_id:{
        type:Number,
        required:true
    }, 
    prices:{
        type: String
    },
    ratings: Number
   
}, { timestamps: true });



module.exports = mongoose.model('BookCollection', bookSchema)     

