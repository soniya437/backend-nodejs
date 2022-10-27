
const express = require('express')
const Router = express.Router()
const bookController = require('../bookController/bookController')
const authorController = require('../controllers/authorController')



Router.post('/createBooks',bookController.createBook)
Router.post('/author',authorController.authorId)
Router.get('/listOfBook',bookController.listOfAllBook)
 Router.get('/findUpdate',bookController.findUpdate)
Router.get('/findBook',bookController.findBook)








module.exports=Router