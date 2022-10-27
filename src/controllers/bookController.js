 const bookModel = require('../models/bookModel')
//  const{isValidRequestBody,isValid,isValidName, isNaNYear}=require('../validator/validator')
const authorModel = require('../models/authorModel')
const { authorId } = require('../controllers/authorController')


const createBook= async function (req, res) {
    let data= req.body  
     let savedData= await bookModel.create(data)
    res.send({msg: savedData})
}


const bookByCb= async function(req, res){
    let booksOfCb = await authorModel.find({author_name: "Chetan Bhagat"}).select("author_id")
    console.log(booksOfCb)
    let finalData = await bookModel.find({author_id:booksOfCb[0].author_id})
    console.log(finalData)
    res.send({msg:finalData})
}

const findAndUpdate = async function (req, res){
    let newValue = await bookModel.findOneAndUpdate({name: "Two states"},{$set: {prices: 200}},{new:true})
    let updatePrice = newValue.prices;
   let authorUpdate = await authorModel.find({author_id: {$eq: newValue.author_id}}).select({authorName:1, _id:0});
   res.send({msg: authorUpdate, updatePrice});
 }

 const findBook =async function(req, res){
    let allBook = await bookModel.find({prices:{$gte:50, $lte:100}});

    let result = allBook.map(x=>x.author_id);
    console.log(result)
    let newBooks = await authorModel.find({author_id:result}).select({authorName:1, _id:0});
    console.log(newBooks)
    res.send({msg: newBooks,allBook});
  }
 


    module.exports.createBook=createBook
    module.exports.listOfAllBook=bookByCb
    module.exports.findUpdate=findAndUpdate
    module.exports.findBook=findBook





 
