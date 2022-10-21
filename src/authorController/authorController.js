 const bookModel = require('../bookModel/bookModel')



const createAuthor = async function (req,res){
    let newAuthor = req.body
    let Author = await bookModel.create(newAuthor)
    res.send({data:Author , status:true})
}

const getAuthorDetails = async function(req ,res){
    let newDetalis = await bookModel.find()
    res.send({data:newDetalis , status:true})
}

module.exports.createAuthor=createAuthor
module.exports.getAuthor=getAuthorDetails

