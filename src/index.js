const express = require('express');
const mongoose = require('mongoose');
const route = require('./route/route')

const app = express();

app.use(express.json());


mongoose.connect("mongodb+srv://soniyayy:Soniya123@cluster0.ltjt0u7.mongodb.net/group7Database")
.then(function(){
    console.log("MongoDB is connected")
})
.catch(function(errors){
    console.log({errors: errors.message})
})


app.use('/', route);

app.listen(3000,()=>{console.log("Express app running on port " + 3000  )})

