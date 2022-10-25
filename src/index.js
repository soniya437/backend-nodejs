const express = require('express')
const bodyparser = require ('body-parser')
const route = require('./route/route')
const app = express();
const mongoose = require('mongoose')

app.use(bodyparser.json())

mongoose.connect("mongodb+srv://Adityakunta:IPSyBcf7uKmQrNcH@aditya.4payvyl.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true
})

.then(()=>console.log("Hukum mere aakaa  🪁  batao kya krna ab mujko  😄   "))
.catch(err=> console.log(err))
app.use('/',route)

app.listen(process.env.Port||20,function(){
    console.log("Aupn Chalne Ko Tyar Hai "+ (process.env.Port||"bangayibaat"+  " Mongoose Tum Ko Tumhra Maalik Yaad Kar Rha Hai   😃  "))
    
})