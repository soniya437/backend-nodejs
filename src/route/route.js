const express = require("express");
const router = express.Router()
const {urlshorter} = require('../controller/urlController')


router.post("/url/shorten", urlshorter)

module.exports = router;