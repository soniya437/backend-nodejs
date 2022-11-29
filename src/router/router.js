const express = require("express")
const router = express.Router()
const userController = require('../controller/userController')
const bookController = require('../controller/bookController')

const {authentication, authorisation} = require('../middleware/middleware')


router.post("/register" , userController.createUser)

router.post("/login",userController.loginUser)

router.post("/books" ,authentication , bookController.createBook)

router.get("/books" ,authentication ,bookController.getBooks)


router.get("/books/:bookId" ,authentication , bookController.getBooksById)

router.put("/books/:bookId" , authentication, authorisation, bookController.updateBookById)

router.delete("/books/:bookId", authentication , authorisation , bookController.deleteBookById)



module.exports = router