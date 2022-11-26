const express = require('express');
const mongoose = require('mongoose');
const route = require('./routers/router')
const app = express();
const multer = require('multer')

app.use(express.json())
app.use(multer().any())

mongoose.connect("mongodb+srv://varinda:Flipkart@newproject.7qwzr8u.mongodb.net/group41Database")
.then(()=>{
    console.log("MongoDb is connected")
})
.catch( err => console.log(err) )

app.use('/',route)

app.listen(3001, ()=>{
    console.log("Server running on Port "+ 3001)
})
