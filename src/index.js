const express = require('express');
const bodyParser = require('body-parser');

const router = require('./router/route')

const app = express()

app.use(bodyParser.json());

app.use('/',router)

app.listen(process.env.PORT || 4000, function(){
    console.log("App is running on " + (process.env.PORT || 4000))
});
