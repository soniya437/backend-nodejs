const jwt = require("jsonwebtoken")


// const blogModel = require("../model/blogModel")
// const mongoose = require('mongoose');


const authentication = function (req, res, next) {

    try {
        let token = req.headers['x-api-key']
        if (!token) return res.status(404).send({ status:false , message : "Token is not present in header"})

        
        let payloadData ;
        // console.log(token)
        let verifytoken = jwt.verify( token, "projectsecretcode" , function(err , decoded){
            if(err){
                return res.status(401).send({status : false , message : "Authentication failed."})
            }
            else{

                // // Set attri. in request --> Used in autherisation , this tokenAuthorId
                req.tokenUserId = decoded.userId
                // console.log(decoded)
                // console.log(decoded.userId)
            
                next()
            }
        })

       

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }   

}




// const authorisation = async function (req, res, next) {


//     try {

//         let tokenAuthorId = req.tokenAuthorId
//         let blogId = req.params.blogId
        
//         // console.log(tokenAuthorId)
//         // console.log()
//         if (!mongoose.Types.ObjectId.isValid(blogId)) return res.status(400).send({ Status: false, msg: "Invalid Blog Id." })

//         let blogData = await blogModel.findById(blogId)

//         if(! blogData ) return res.status(400).send({status : false , msg :"BlogId is not exist in DB."})

//         // console.log(blogData)

//         let authorInBlog = blogData.authorId

//         // console.log(authorInBlog, blogData.authorId)

//         if (authorInBlog.toString() !== tokenAuthorId.toString()) return res.status(403).send({ status: false, msg: "Unauthorize person , forbidden" })


//         next()

//     } catch (err) { 
//         // console.log(err.message)
//         res.status(500).send({ status: false, msg: err.message })
//     }


// }



module.exports = { authentication }