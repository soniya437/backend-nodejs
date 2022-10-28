const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook = async function (req, res) {

    let data = req.body
    let { authorId, publisherId } = data
    if (!authorId) return res.send("please provide authorId")
    if (!publisherId) return res.send("please provide publisherId")

    let checkAuthor = await authorModel.findById(data.authorId)
    if (!checkAuthor) return res.send("no data authors found")

    let checkPublisher = await publisherModel.findById(data.publisherId)
    if (!checkPublisher) return res.send("no data publishers found")

    let saveData = await bookModel.create(data)
    res.send({ msg: saveData, status: true })

}


const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}

const getBooksWithAuthorandPublisherDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('authorId').populate('publisherId')
    res.send({data: specificBook})

}

// const updateSpecificBooks = async function (req, res) {
//     let publisherId = await publisherModel
//       .find({ name: ["Penguin", "HapperCollins"] }).select({ _id:1});
      
    
//     let book1 = await bookModel.updateMany({publisher: publisherId}, //condition
//        {isHardCover: true}   //update
//        );
       
//     //    let authorIds=await authorModel.find({rating:{$gt:3.5}}).select({_id:1})
//     //    let book2=await bookModel.updateMany({author:authorIds},{$inc:{price:10}})
  
   
  
//      return res.send({book1});
//   };
  const updateSpecificBooks = async function(req,res){
    let publisherUpdate = req.body.NewPublisher
     let PublisherData = await publisherModel.find({name: ["Penguin","HarperCollins"]}).select({_id:1})
     let BookDataUpdate = await bookModel.updateMany({publisherId:PublisherData},
      {$set:{isHardCover:true,new:true}},{upsert:true})
    res.send({data:BookDataUpdate, publisherUpdate})
     }

     const  UpdateAuthorRating= async function(req, res){
        let AuthorUpdate = req.body.NewAuthor
        let authorData = await authorModel.find({rating:{$gt: 4}}).select({_id:1})
        
        let updatedBook = await bookModel.updateMany({authorId: authorData},{$inc:{price:10}},{new:true})
        res.send({data:authorData,updatedBook})
       }
// const updateSpecificBooks = async function(req,res){
    

//     //Without populate
//     let findIdByPublisher = await publisherModel.find({ name: { $in: ["Penguin", "HarperCollins"] } }).select({ _id: 1 })
//     let findIdByRating = await authorModel.find({ ratings: { $gt: 3.5 } }).select({ _id: 1 })

//     //Using loop
//     const arrOfPublisherId = []
//     for (let i = 0; i < findIdByPublisher.length; i++) {
//         arrOfPublisherId.push(findIdByPublisher[i]._id)
//     }

//     //Using higher order function map
//     let arrOfAuthorId = findIdByRating.map(element => element._id)

//     let setHardCover = await bookModel.updateMany({ publisherId: { $in: arrOfPublisherId } }, { isHardCover: true }, { new: true })
//     let updatePrice = await bookModel.updateMany({ authorId: { $in: arrOfAuthorId } }, { $inc: { price:10 } }, { new: true })
    


//    res.send({ status: true, setHardCover: setHardCover, updatePice: updatePrice })}


module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorandPublisherDetails
module.exports.updateSpecificBooks = updateSpecificBooks
module.exports.UpdateAuthorRating = UpdateAuthorRating
