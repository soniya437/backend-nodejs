
const express = require('express')
const Router = express.Router()
const bookController = require('../bookController/bookController')



Router.post('/createAuthor',bookController.createAuthor)
Router.get('/getDetails',bookController.getAuthor)
Router.post('/allListOf',bookController.allListOf)
Router.get('/books',bookController.books)
Router.get('/indian',bookController.getInRs)
Router.get('/getRandomsBooks/',bookController.randomsBooks)







module.exports=Router