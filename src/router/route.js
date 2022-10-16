const express = require('express')

const router = express.Router()

const introduction = require('../introduction/intro')


router.get('/check-this', function(req,res){
res.send(introduction.batchIntro()+ " its dummy response")
    
    res.send('Dummy response')

})

module.exports = router