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

//commonMW.mid1, commonMW.mid2, commonMW.mid3, commonMW.mid4, 

module.exports = router;