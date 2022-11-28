const express = require("express")
const router = express.Router()

const bookModel = require("../model/bookModel")

router.get("/test-me" , function (req,res){


    // let regex = /^[a-z]*$/gm

    // // const clgNmaeRegex = /^([a-z]{2,})*$/gm


    // let name = "aaaA"

    // // let mat = name.match(name)
    // let mat = regex.test(name)

    // console.log(mat)


    // const isValid = function (value) {
    //     if (typeof value === "undefined" || value === null) return false;
    
    //     if (typeof value === 'string' && value.trim().length === 0) return false
    
    //     return true;
    // }


    // let mat = isValid("null")


    res.status(200).send("Connection Done!")
})





module.exports = router