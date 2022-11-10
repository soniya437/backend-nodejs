const express = require('express')
const router = express.Router()
const controller = require('../controller/memeController')


router.post('/getMeme',controller.getMeme)

module.exports = router