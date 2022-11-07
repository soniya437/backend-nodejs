const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const commonMW= require("../middleware/auth")



router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",commonMW.tokencheck, commonMW.authorise, userController.getUserData)

router.put("/updateUser/:userId",commonMW.tokencheck, commonMW.authorise, userController.updateUser)
router.delete('/users/:userId',commonMW.tokencheck, commonMW.authorise, userController.deleteUser)

module.exports = router;