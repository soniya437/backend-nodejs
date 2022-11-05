const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const commonMW = require ("../middlewares/commonMiddlewares")



router.post("/createBook", commonMW.localServer, BookController.createBook  )


router.get("/getUsersData",commonMW.localServer, UserController.getUsersData)


router.get('/homePage',commonMW.localServer, UserController.basicCode)

router.get('/basicRoute', commonMW.localServer, UserController.basicCode)


module.exports = router;