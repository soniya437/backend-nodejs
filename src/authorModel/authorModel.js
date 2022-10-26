const mongoose = require('mongoose');


const authorSchema =new mongoose.Schema({
    authorName:{type: String},
    author_id:{
        type:Number,
        required:true

    },
    
    age:Number,
    address:String 

},{ timestamps: true })

 
module.exports = mongoose.model('AuthorCollection', authorSchema) 
