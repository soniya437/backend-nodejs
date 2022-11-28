const express = require("express")
const router = express.Router()
const userController = require('../controller/userController')
const bookController = require('../controller/bookController')

const {authentication} = require('../middleware/middleware')


router.post("/register" , userController.createUser)

router.post("/login",userController.loginUser)

router.post("/books" ,authentication , bookController.createBook)

router.get("/books" ,authentication ,bookController.getBooks)


module.exports = router