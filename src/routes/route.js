const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const middleware= require("../middleware/auth")


router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)
router.put("/updateUser/:userId",middleware.tokencheck, middleware.authorise, userController.updateUser)
router.delete("/deleteUser/:userId",middleware.tokencheck,middleware.authorise, userController.deleteUser)

router.get('/userDetail/:userId',middleware.tokencheck, middleware.authorise, userController.userDetail)


module.exports = router;