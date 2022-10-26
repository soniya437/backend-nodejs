 const authorModel = require('../authorModel/authorModel')
 const bookModel = require('../bookModel/bookModel')

const createAuthor= async function (req, res) {
    let data= req.body
    let authorId = data.author_id
    if(! authorId) {return  res.send({status: false , msg : "author id must be presenrt" })}
    let savedAuthor= await authorModel.create(data)
    res.send({msg: savedAuthor})
}


module.exports.authorId=createAuthor
    

