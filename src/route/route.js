
const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middlewares/authMiddleware")

router.post( "/authors", authorController.createAuthor )

router.post( "/login", authorController.loginAuthor )

router.post( "/blogs", authMiddleware.authentication, blogController.createBlog );

router.get( "/blogs",authMiddleware.authentication, blogController.getBlogs );

router.put( "/blogs/:blogId", authMiddleware.authentication, authMiddleware.authorisation, blogController.updateBlogs)

router.delete( "/blogs/:blogId", authMiddleware.authentication, authMiddleware.authorisation, blogController.deleteBlogs)

router.delete( "/blogs",authMiddleware.authentication, blogController.deleteByQuery)

router.all("/*", function(req, res){
    return res.status(400).send({status: false, msg: "Path not found" })
})


module.exports = router;
