const express = require("express")
const mongoose = require("mongoose")
const multer = require('multer')

const route = require('./router/router')
const app = express()

app.use(express.json())
app.use(multer().any())

mongoose.connect("mongodb+srv://ashishkuldeep23:l6eq3otW5yV5NOYM@newprojectbyak.qfak24h.mongodb.net/Project-3-Book-Management" , {
    useNewUrlParser: true
})
.then( ()=>console.log("MongoDB is connected."))
.catch(err=>console.log(err))


app.use("/" , route)

app.listen( 3000 , ()=>{
    console.log("Express app running on port 3000")
})



