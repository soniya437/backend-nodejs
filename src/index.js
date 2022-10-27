const express = require('express')
const bodyparser = require ('body-parser')
const route = require('./route/route')
const app = express();
const mongoose = require('mongoose')

app.use(bodyparser.json())

 mongoose.connect("mongodb+srv://soniyayy:GYOymNkW8GUtoOFJ@cluster0.ltjt0u7.mongodb.net/soni",{
    // useNewUrlParser:true
})

.then(()=>console.log("MongoDb is connected"))
.catch(err=> console.log(err))

app.use('/',route)

app.listen(process.env.Port||3000,function(){
    console.log("Express is runnig on  "+ (process.env.Port||3000))
    
})