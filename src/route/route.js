
const express = require('express')
const Router = express.Router()
const authorController = require('../authorController/authorController')



Router.post('/createAuthor',authorController.createAuthor)
Router.get('/getDetails',authorController.getAuthor)






module.exports=Router