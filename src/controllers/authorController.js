 const authorModel = require('../models/authorModel')
 const bookModel = require('../models/bookModel')

const createAuthor= async function (req, res) {
    let data= req.body
    let authorId = data.author_id
    if(! authorId) {return  res.send({status: false , msg : "author id must be present" })}
    let savedAuthor= await authorModel.create(data)
    res.send({msg: savedAuthor})
}


module.exports.authorId=createAuthor
    

