const blogModel = require('../models/blogsModel')
const authorModel = require('../models/authorModel');


const mongoose = require('mongoose')
const objectId = mongoose.isValidObjectId
const jwt = require("jsonwebtoken");
const { rawListeners } = require('../models/authorModel');

//-----------------Create Blog----------------------------------------------------------------------------------------------------------------
let createBlog = async (req, res) => {

    try {
        let { title, body, authorId, category, tags, subcategory } = req.body

        if (!Object.keys(req.body).length > 0) {
            return res.status(400).send({ status: false, msg: "Provide Details" })
        };

        let decodedToken = req.decodedTokenId

        //let checkAuthorId = await authorModel.findById(authorId)

        if(decodedToken.toString() !== authorId) {
            return res.status(403).send({status: false, msg: "Unauthorised user"})
        }

        //if (!checkAuthorId) {
          //  return res.status(404).send({ status: false, msg: "No such authorId" })}


        if (!title) {
            return res.status(400).send({ status: false, msg: "Title is required" })
        };
        if (typeof title !== "string" || title.trim().length === 0) {
            return res.status(400).send({ status: false, msg: "Enter valid title" })
        }

        let blogTitle = await blogModel.findOne({ title: req.body.title })// unique Title of Blog

        if (blogTitle) {
            return res.status(400).send({ status: false, msg: "Title already exist" })
        }
        if (!body) {
            return res.status(400).send({ status: false, msg: "Body is required" })
        };
        if (typeof body !== "string" || body.trim().length === 0) {
            return res.status(400).send({ status: false, msg: "Enter valid body" })
        }

        if (!authorId) {
            return res.status(400).send({ status: false, msg: "Author Id is required" })
        };
        if (!objectId(authorId)) {
            return res.status(400).send({ status: false, msg: "Invalid Author ID" })
        };

        

        //if (!checkAuthorId) {
           // return res.status(404).send({ status: false, msg: "No such authorId" })
        //};
        if (!category) {
            return res.status(400).send({ status: false, msg: "Category is required" })
        }

        if (typeof category !== "string" || category.trim().length === 0) {
            return res.status(400).send({ status: false, msg: "Enter valid category" })
        }

        if (typeof tags !== "string" || tags.trim().length === 0) {
            return res.status(400).send({ status: false, msg: "Enter valid tags" })
        }

        if (!subcategory) {
            return res.status(400).send({ status: false, msg: "Subcategory is required" })
        }
        if (typeof subcategory !== "string" || subcategory.trim().length === 0) {
            return res.status(400).send({ status: false, msg: "Enter valid subcategory" })
        }
        if(req.body.isPublished ==true){ req.body.publishedAt = new Date()}

        let savedData = await blogModel.create(req.body)
        return res.status(201).send({ status: true, data: savedData })
    } 
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}


//-----------------Get list of Blog--------------------------------------------------------------------------------------------------
const getBlogs = async function (req, res) {
    try {
        
              let queries = req.query;
              let dataInQuery = {isDeleted: false, isPublished: true}
          
              if (!Object.keys(queries).length>0) {
                let savedData = await blogModel.find(dataInQuery)

                if(!savedData.length>0)
                { return res.status(404).send({status: false, msg: "No data found"})}
                    return res.status(200).send({status:false, data:savedData})
                 }
            
              let data1 = await blogModel.find({        
               // $and: [ {isDeleted: false, isPublished: true }, queries]   })
                $and: [{ authorId: queries.authorId }, { category: queries.category },
                    { tags: queries.tags }, { subcategory: queries.subcategory },{ isDeleted: false, isPublished: true }]
                })
              if (!data1.length>0) {
                return res.status(404).send({ status: false, msg: " Blog is not present." })}

              return res.status(200).send({ status: true, data: data1 });
            } catch (error) {
              res.status(500).send({ status: false, error: error.message });
            }
          };

//----------------Update the Details of Blog-------------------------------------------------------------------------------------------
const updateBlogs = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        let availableBlog = await blogModel.findById(blogId);

        if (!availableBlog) {
            return res.status(404).send({ status: false, msg: "Blog Not Found" });
        }
        if (availableBlog.isDeleted == true) {
            return res.status(404).send({ status: false, msg: "Blog already deleted" });
        }
        //------------------------------------------Authorisation---------------------------------------------------------------//     
        let authorLoggedId =  req.decodedTokenId;
        if (availableBlog.authorId != authorLoggedId) {
            return res.status(403).send({ status: false, msg: "Unauthorized" })
        }
        //--------------------------------------------------------------------------------------------------------------------//
        let data = req.body;
        let updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId },
            {
                $set: { isPublished: true, publishedAt: new Date() },
                $push: { tags: data.tags, subcategory: data.subcategory }
            }, { new: true })

        return res.status(200).send({ status: true, data: updatedBlog });

    } catch (error) { res.status(500).send({ status: false, msg: error.message }) }
};

//----------------------Delete Blog with Blog Id in path params------------------------------
const deleteBlogs = async function (req, res) {
    try {
        let blogId = req.params.blogId
        let blog = await blogModel.findById(blogId)
        if (!blog) return res.status(404).send({ status: false, msg: "Blog document does not exists" })
        //------------------------------------------Authorisation---------------------------------------------------------------//     
        let authorLoggedId = req.decodedTokenId;
        if (blog.authorId != authorLoggedId) {
            return res.status(403).send({ status: false, msg: "Unauthorized user" })
        }
        //--------------------------------------------------------------------------------------------------------------------//

        if (blog.isDeleted == true) return res.status(404).send({ status: false, msg: "Blog is already deleted" })

        await blogModel.findOneAndUpdate(
            {_id:blogId},
            {
                $set: {isdeleted: true, deleteAt: new Date()}
                
            }
        )
        res.status(200).send({ msg: "Blog deleted Successfully" })

    } catch (error) { res.status(500).send({ status: false, msg: error.message }) }
};

//----Delete Blog with Specific filters------------------------------------------------------------------------------------
        
const deleteByQuery = async function (req, res) {
    try {
        let query = req.query
        if (Object.keys(query).length == 0) {
            return res.status(400).send({ status: false, msg: "input is required" });
        }

        if (query.authorId) {
            if (!objectId(query.authorId)) {
                return res.status(400).send({ status: false, msg: "Invalid authorId" })
            }
        }

        if(query.authorId!==req.decodedTokenId) {return res.status(403).send({ status: false, msg: "Unauthorised User" })}

        let blogDetails = await blogModel.find(query)
        
        //for (let i = 0; i < blogDetails.length; i++) {
            
            if (!blogDetails.length > 0) {
                return res.status(404).send({ status: false, message: "Blog not exist" });
            }

            if (blogDetails.isDeleted === true) {
                return res.status(404).send({ status: false, msg: "Blog already deleted" })
            }
            await blogModel.updateMany(query, { $set: { isDeleted: true, deletedAt: new Date() } })
            return res.status(200).send({ status: true, msg: "Blog deleted successfully" })


        


    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
   }
}

        


module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlogs = updateBlogs
module.exports.deleteBlogs = deleteBlogs
module.exports.deleteByQuery = deleteByQuery