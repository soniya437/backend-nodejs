const express = require("express")
const router = express.Router()

//------------------------- Models import -----------------//
const userController = require('../controller/userController')
const bookController = require('../controller/bookController')

//------------------------- MiddleWare for Authentication and Auhorisation import  ----------------------------//
const {authentication, authorisation} = require('../middleware/middleware')


//-----------------------*** User API's ***----------------------------------------------------//
router.post("/register" , userController.createUser)

router.post("/login",userController.loginUser)


//-----------------------*** Book API's ***----------------------------------------------------//
router.post("/books" ,authentication , bookController.createBook)

router.get("/books" ,authentication ,bookController.getBooks)

router.get("/books/:bookId" ,authentication , bookController.getBooksById)

router.put("/books/:bookId" , authentication, authorisation, bookController.updateBookById)

router.delete("/books/:bookId", authentication , authorisation , bookController.deleteBookById)

//-----------------------*** Review API's ***----------------------------------------------------//




module.exports = router