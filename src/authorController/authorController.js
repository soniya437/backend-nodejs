 const bookModel = require('../bookModel/bookModel')
//  const{isValidRequestBody,isValid,isValidName, isNaNYear}=require('../validator/validator')


 
const createAuthor = async function (req,res){
    let requestBody = req.body

    let Author = await bookModel.create(requestBody)    
    res.send({data:Author , status:true})
}

const getAuthorDetails = async function(req ,res){
    
let newDetalis =  await bookModel.find()
    res.send({data:newDetalis , status:true})
}


module.exports.createAuthor=createAuthor
module.exports.getAuthor=getAuthorDetails

