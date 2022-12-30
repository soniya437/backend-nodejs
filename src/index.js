const express = require('express')
const mongoose = require('mongoose')
const route = require('./route/route')

const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://soniyayy:Soniya123@cluster0.ltjt0u7.mongodb.net/customer-card")
.then(()=>{console.log("MongoDB is Connected")})
.catch((err)=>err.message)

app.use('/', route)



app.listen(5000, ()=>console.log("Express is running on 5000"))
