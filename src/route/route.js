
const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middlewares/authMiddleware")

router.post( "/authors", authorController.createAuthor )

router.post( "/login", blogController.loginAuthor )

router.post( "/blogs", authMiddleware.authentication, blogController.createBlog );

router.get( "/blogs",authMiddleware.authentication, blogController.getBlogs );

router.put( "/blogs/:blogId", authMiddleware.authentication, authMiddleware.authorisation, blogController.updateBlogs)

router.delete( "/blogs/:blogId", authMiddleware.authentication, authMiddleware.authorisation, blogController.deleteBlogs)

router.delete( "/blogs", blogController.deleteByQuery)



module.exports = router;
