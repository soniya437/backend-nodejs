const express = require('express');
const router = express.Router();///test-you
//importing a custom module
const log = require('../logger/logger')
//importing external package
const lodash2 = require('../lodash/lodash') 


const validators = require('../validator/formatter')
const helperr = require('../util/helper')

router.get('/test-mee', function (req, res) {
    console.log(log.Welcome())
    console.log(validators.endingPoint.result())
    console.log(validators.endingPoint.lowerCase())
    console.log(validators.endingPoint.upperCase())

    //To be tried what happens if we send multiple response
    res.send('My second api!')
});

router.get('/test-lodash', function (req,res){
res.send(lodash2.myLodash())
});

router.get('/test-me', function (req, res) {

    console.log(helperr.dateMonth())

    res.send(helperr.batchInfo())

    //To be tried what happens if we send multiple response

});

module.exports = router;

