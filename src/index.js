const express = require('express')
const bodyParser =require('body-parser')
const route = require('./route/route')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://soniyayy:Soniya123@cluster0.ltjt0u7.mongodb.net/soniUser")
.then(()=>{console.log("MongoDB is connected")})
.catch((err)=>{console.log(err.message)})

app.use('/',route)

app.listen(2000, ()=>{
    console.log("Express is running on port 2000")
})
