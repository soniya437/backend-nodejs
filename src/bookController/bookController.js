 const bookModel = require('../bookModel/bookModel')
//  const{isValidRequestBody,isValid,isValidName, isNaNYear}=require('../validator/validator')


 
const createAuthor = async function (req,res){
    let requestBody = req.body
    console.log(requestBody);
let Author = await bookModel.create(requestBody)    
    res.send({data:Author , status:true})
}

const getAuthorDetails = async function(req ,res){ 
    let newDetalis =  await bookModel.find().select({bookName:1 , authorName:1 , _id:0})
    res.send({data:newDetalis , status:true})
}

// const getBooksInYear = async function (req , res ){
//     let Year = req.body.year
//   let year1 = await bookModel.find({year:Year})
//   res.send({msg:year1})
// }3

let bookListInYear=async function(req,res){
    let data= req.body.year
    let allBookYear=await bookModel.find({year:data})
    res.send({msg:allBookYear,status:true})
}

const getParticularBooks = async function(req,res){
    let books = await bookModel.find({bookName:/^The/i}) 
    res.send({data:books , status:true})
}

// let getParticularBook=async function(req,res){
//     let data=req.body
//    let getAll=await BookModel.find(data)
//    res.send({msg:getAll,status:true})
// }

// const getXINRBooks = async function (req,res){
// let indian = await bookModel.find({$or:[{indianPrice:100},{indianPrice:200},{indianPrice:500}]})
//     res.send({data:indian})
// }
let getXINRBooks=async function(req,res){
    let allXINR=await bookModel.find({indianPrice: { $in: ["100INR", "200INR", "500INR"] } }    )
    res.send({msg:allXINR,status:true})
}

const getRandomBooks = async function(req,res){
    let RandomBooks = await bookModel.find({$or:[{stockAvailable:true},{totalPages:{$gt:500}}]})
        res.send({msg:RandomBooks})
}



module.exports.createAuthor=createAuthor
module.exports.getAuthor=getAuthorDetails
module.exports.allListOf=bookListInYear
module.exports.books=getParticularBooks
module.exports.getInRs=getXINRBooks
module.exports.randomsBooks=getRandomBooks

