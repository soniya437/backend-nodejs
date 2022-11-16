const blogModel = require('../models/blogsModel')
const mongoose = require('mongoose')
const objectId = mongoose.isValidObjectId
const validator = require("../util/validator");
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
        let checkAuthorId = await blogModel.findById(authorId)
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
        let blogId = req.params.blogId;
        if (!objectId(blogId)) {
            return res.status(400).send({ status: false, msg: "Invalid blogId" })
        }
        let availableBlog = await blogModel.findById(blogId);

        if (!availableBlog) {
            return res.status(404).send({ status: false, msg: "No such data" });
        }
        if (availableBlog.isDeleted === true) {
            return res.status(404).send({ status: false, msg: "Blog not exists" })
        };

        let data = req.body;

        if (!Object.keys(data).length > 0) {
            res.status(400).send({ status: false, msg: "Provide Data for Updation" })
        };

        let updatedData = await blogModel.findOneAndUpdate({ _id: blogId }, {
            $set: { isPublished: true, title: data.title, body: data.body, publishedAt: new Date() },
            $push: { tags: data.tags, subcategory: data.subcategory }
        }, { new: true });
        return res.status(200).send({ status: true, data: updatedData })

    } catch (error) { res.status(500).send({ status: false, msg: error.message }) }
};


const deleteBlogs = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        if (!objectId(blogId)) {
            return res.status(400).send({ status: false, msg: "Invalid blogId" })
        }
        let availableBlog = await blogModel.findById(blogId);

        if (!availableBlog) {
            return res.status(404).send({ status: false, msg: "No such data" });
        }
        if (availableBlog.isDeleted === true) {
            return res.status(404).send({ status: false, msg: "Blog already deleted" })
        }

        await blogModel.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: new Date() } });
        return res.status(200).send({ status: true, msg: "Blog deleted successfully" })

    } catch (error) { res.status(500).send({ status: false, msg: error.message }) }
};


        //         const authorQuery = req.query
        //         const authorToken = req.authorId
        //         const filter = { isDeleted: false, deletedAt: null }
        
        //         if (!objectId(authorToken)) return res.status(400).send({ status: false, msg: "Not a valid author id from token." })
        //         //if (!isValidRequest(authorQuery)) return res.status(400).send({ status: false, message: "No input by user." })
        
        //         // if (isValidRequest(authorQuery)) {
        //         const { authorId, category, tags, subcategory, isPublished } = authorQuery
        
        //         if (authorId) {
        //             if (!objectId(authorId)) {
        //                 return res.send({ status: false, msg: "not valid Id" })
        //             }
        //             if (objectId(authorId)) {
        //                 filter['authorId'] = authorId
        //             }
        //         }
        //         if (isValid(category)) {
        //             filter['category'] = category
        //         }
        //         if (isValid(tags)) {

                    
        //             filter['tags'] = { $all: tagsArr }
        //         }
        //         if (isValid(subcategory)) {
        //             const subcatArr = subcategory.trim().split(',').map(s => s.trim())
        //             filter['subcategory'] = { $all: subcatArr }
        //         }
        //         if (isValid(isPublished)) {
        //             filter['isPublished'] = isPublished
        //         }
        
        
        //         const filterdBlogs = await blogModel.find(filter)
        //         if (Array.isArray(filterdBlogs) && filterdBlogs.length === 0) return res.status(404).send({ status: false, message: "No Blogs Found matching your query" })
        
        //         let blogToDelete = filterdBlogs.map(blog => {
        //             if (blog.authorId.toString() === authorToken)
        //                 return blog._id
        
        //         })
        //         if (blogToDelete[0] === undefined)
        //             return res.status(404).send({ status: false, message: "No blogs Found to delete." })
        
        //         let dlet = await blogModel.updateMany({ _id: { $in: blogToDelete } }, { $set: { isDeleted: true, deletedAt: new Date() } })
        //         res.status(200).send({ status: true, message: "Blogs Delete Succesfully.", data: dlet })
        //     }
        //     catch (err) {
        //         return res.status(500).send({ status: false, error: err.msg })
        //  { $set: { isDeleted: true, deletedAt: new Date() } })

        // const deleteByQuery = async function (req, res) {
        //     try {
        //         const data = req.query
        //         const category = req.query.category
        //         const authorId = req.query.authorId
        //         const tagName = req.query.tags
        //         const subcategory = req.query.subcategory
        //         const isPublished = req.query.isPublished
        
        
        //         //check if the query field is empty
        //         if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Enter the details of blog that you would like to delete" })
        
        //         //check if data already deleted or not
        //         const findDeleted = await blogModel.findOne(data)
        //         if (findDeleted.isDeleted == true) return res.status(404).send({ status: false, message: "blog is already deleted" })
        
        //         //finding document using query params
        //         const delectingBlog = await blogModel.updateMany({ $or: [{ category: category }, { authorId: authorId }, { tags: tagName }, { subcategory: subcategory }, { isPublished: isPublished }] },
        //             { $set: { isDeleted: true, deletedAt: new Date() } })
        
        
        //         if (delectingBlog == 0) return res.status(404).send({ status: false, message: "Blog not found" })
        
        
        //         return res.status(200).send({ status: true, message: "Blog has been deleted" })
        //     }
        //     catch (err) {
        //         return res.status(500).send({ status: false, message: err.message })
        //     }
        // }

        const deleteByQuery = async function (req, res) {
        try {
            let data = req.query
            if (!Object.keys(data).length)
                return res.status(400).send({ status: false, msg: "No user input" })
            let filter = { isDeleted: false, ...data }
    
            let findDocsById = await blogModel.find(filter).select({ _id: 1 })
            if (!findDocsById.length)
                return res.status(404).send({ status: false, msg: "Blog already deleted" })
    
            let deleteBlog = await blogModel.updateMany(
                { $set: { isDeleted: true, deletedAt: new Date( ) } }, { new: true })
            res.status(200).send({ status: true, msg:"Blog deleted successfully", deleteBlog })
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