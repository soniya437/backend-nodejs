const express = require('express')
const bodyparser = require ('body-parser')
const route = require('./route/route')
const app = express();
const mongoose = require('mongoose')

app.use(bodyparser.json())

// mongoose.connect("mongodb+srv://Adityakunta:5Gt6USYl5iwirBf3@aditya.4payvyl.mongodb.net/?retryWrites=true&w=majority",{
//     useNewUrlParser:true
// })

// .then(()=>console.log("mongoDB is connected"))
// .catch(err=> console.log(err))
app.use('/',route)

app.listen(process.env.Port||3000,function(){
    console.log("Express app is running ")+ (process.env.Port||3000)
    
})