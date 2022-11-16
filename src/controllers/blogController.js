const blogModel = require('../models/blogsModel') 
const validator = require("../util/validator");
const authorModel = require('../models/authorModel');


const mongoose = require('mongoose')
const objectId = mongoose.isValidObjectId
const jwt = require("jsonwebtoken")


let createBlog = async (req, res) => {

    try {
        let { title, body, authorId, category } = req.body

        if (!Object.keys(req.body).length > 0) {
            return res.status(400).send({ status: false, msg: "Provide Details" })
        };
        if (!title) {
            return res.status(400).send({ status: false, msg: "Title is required" })
        };
        let blogTitle = await blogModel.findOne({title: req.body.title})
        if(blogTitle){
          return res.status(400).send({status: false, msg: "Title already exist"})
        }
        if (!body) {
            return res.status(400).send({ status: false, msg: "Body is required" })
        };
        if (!authorId) {
            return res.status(400).send({ status: false, msg: "Author Id is required" })
        };
        if (!objectId(authorId)) {
            return res.status(400).send({ status: false, msg: "Invalid Author ID" })
        };
        let checkAuthorId = await authorModel.findById(authorId)
        if(!checkAuthorId){
          return res.status(404).send({status: false, msg: "No such authorId"})
        }
        
        if (!category) {
            return res.status(400).send({ status: false, msg: "Category is required" })
        }

        let savedData = await blogModel.create(req.body)
        return res.status(201).send({ status: true, data: savedData })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}



const getBlogs = async function (req, res) {
    try {
        let filterQuery = { isDeleted: false, deletedAt: null, isPublished: true };
        let queryParams = req.query;
        const { authorId, category, tags, subcategory } = queryParams;

        if (!validator.isValidString(authorId)) {
            return res
                .status(400)
                .send({ status: false, message: "Author id is required" });
        }
        if (authorId) {
            if (!validator.isValidObjectId(authorId)) {
                return res.status(400).send({
                    status: false,
                    message: `authorId is not valid.`,
                });
            }
        }

        if (!validator.isValidString(category)) {
            return res.status(400).send({
                status: false,
                message: "Category cannot be empty while fetching.",
            });
        }

        if (!validator.isValidString(tags)) {
            return res.status(400).send({
                status: false,
                message: "tags cannot be empty while fetching.",
            });
        }
        if (!validator.isValidString(subcategory)) {
            return res.status(400).send({
                status: false,
                message: "subcategory cannot be empty while fetching.",
            });
        }

        if (validator.isValidRequestBody(queryParams)) {
            const { authorId, category, tags, subcategory } = queryParams;
            if (validator.isValid(authorId) && validator.isValidObjectId(authorId)) {
                filterQuery["authorId"] = authorId;
            }
            if (validator.isValid(category)) {
                filterQuery["category"] = category.trim();
            }
            if (validator.isValid(tags)) {
                const tagsArr = tags
                    .trim()
                    .split(",")
                    .map((x) => x.trim());
                filterQuery["tags"] = { $all: tagsArr };
            }
            if (validator.isValid(subcategory)) {
                const subcatArr = subcategory
                    .trim()
                    .split(",")
                    .map((subcat) => subcat.trim());
                filterQuery["subcategory"] = { $all: subcatArr };
            }
        }
        const blog = await blogModel.find(filterQuery);
        console.log(blog)

        if (Array.isArray(blog) && blog.length === 0) {
            return res.status(404).send({ status: false, message: "No blogs found" });
        }
        res.status(200).send({ status: true, message: "Blogs list", data: blog });
    } catch (error) {
        res.status(500).send({ status: false, Error: error.message });
    }
};

const updateBlogs = async function (req, res) {
    try {

    
        let data = req.body;

        if (!Object.keys(data).length > 0) {
            res.status(400).send({ status: false, msg: "Provide Data for Updation" })
        };
        let blogId = req.params.blogId

        if(!objectId(blogId)){
            return res.status(400).send({status: true, msg: "BlogId is invalid"})
        }
        let availableBlog = await blogModel.findById(blogId)

        if (!availableBlog) {
            return res.status(404).send({ status: false, msg: "No such data" });
        }
        if (availableBlog.isDeleted === true) {
            return res.status(404).send({ status: false, msg: "Blog not exists" })
        };

let authorId = availableBlog.authorId

        let updatedData = await blogModel.findOneAndUpdate({ authorId: authorId }, {
            $set: { isPublished: true, title: data.title, body: data.body, publishedAt: new Date() },
            $push: { tags: data.tags, subcategory: data.subcategory }
        }, { new: true });
        return res.status(200).send({ status: true, data: updatedData })

    } catch (error) { res.status(500).send({ status: false, msg: error.message }) }
};


const deleteBlogs = async function (req, res) {
    try {
        const authorId = req.authorId
        await blogModel.findOneAndUpdate({ authorId: authorId }, { $set: { isDeleted: true, deletedAt: new Date() } });
        return res.status(200).send({ status: true, msg: "Blog deleted successfully" })

    } catch (error) { res.status(500).send({ status: false, msg: error.message }) }
};

const deleteByQuery = async function (req, res) {
    try {
        let data = req.query
         if (!Object.keys(data).length)
           return res.status(400).send({ status: false, msg: "No user input" })

        //let filter = { isDeleted: false, isPublished: true, ...data }
        //let tokenId = req.decodedToken
        
        let data1 = {
            isDeleted: false,
            authorId: req.decodedToken//authorLoggedIn is present in request that we have set in authorization middleware it contains loggedIn AuthorId
        }
        data1['$or'] = [
            { title: data.title },
            { isPublished: data.isPublished },
            { authorId: data.authorId },
            { category: data.category },
            { subcategory: data.subcategory },
            { tags: data.tags }
        ]

        let modification = await blogModel.find(data1)
        if (modification.length == 0) {
            return res.status(404).send({ status: true, msg: "No such blog present or user is not authorised" })
        }
        // let blogDetail = await blogModel.findOne(filter)
        
        // console.log(blogDetail)//.authorId.toString())
        // if( !blogDetail) {return res.status(400).send({status:false, msg: "Blog not exist"})}
        // //-----------------------------------Authorisation ----------------------------------
        // if(blogDetail.authorId.toString() !== tokenId){
        //     console.log(tokenId)
        //     return res.status(403).send({status:false,msg: "Unauthorised"})
        // }
        //-----------------------------------------------------------------------------------
        // let findDocsById = await blogModel.find(filter).select({ _id: 1 })
        // if (!findDocsById.length){
        //     return res.status(404).send({ status: false, msg: "Blog already deleted" })}

        let deleteBlog = await blogModel.updateMany(
            { $set: { isDeleted: true, deletedAt: new Date( ) } }, { new: true })
            res.status(200).send({ status: true, msg:"Blog deleted successfully" })



    // let query = req.query;
    // let data = {isPublished: true, isDeleted: false, ...query}
    // let tokensId = req.decodedToken;
    
    // if (Object.keys(query) == 0) {
    //   return res.status(404).send({ status: false, msg: "input is required" });
    // }

    
    // let blogDetails = await blogModel.findOne(data)
    
    // if ( !blogDetails ) {
    //   return res
    //   .status(400)
    //   .send({ status: false, message: `Blog not exist`});
    // }
    // if ( blogDetails.authorId.toString() !== tokensId) {
    //   return res
    //   .status(401)
    //   .send({ status: false, message: `Unauthorized access` });
    // }
    
    // let deleteBlogs = await blogModel.updateMany(data, {
    //   $set: { isdeleted: true  },
    // });

    // if (deleteBlogs["matchedCount"] === 0) {
    //   return res.status(404).send({ status: false, msg: "Blog not exist" });
    // }

    // res.status(200).send({ status: false, msg: "Blog deleted successfully" });
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, error: err.msg })
    }}
    

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlogs = updateBlogs
module.exports.deleteBlogs = deleteBlogs
module.exports.deleteByQuery = deleteByQuery