const express = require("express");
const router = express.Router()
const urlshorter = require('../controller/urlController')



router.post("/url/shorten", urlshorter.urlShorter)
router.get("/:urlCode", urlshorter.getUrl)


router.all("/*", function (req, res) {
    res.status(400).send({status: false,message: "The api you request is not available"})
})

module.exports = router;