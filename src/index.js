const express= require('express');
const bodyParser= require('body-parser');   
const mongoose= require('mongoose');
const route= require('./route/route')

const app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.use('/', route);

app.listen(3000,()=>{console.log("Express app running on port" + 3000  )})

