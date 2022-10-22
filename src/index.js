const express = require('express');
var bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose')

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://soniyayy:E9rQBe6yL9cT8G7q@cluster0.ltjt0u7.mongodb.net/firstDatabase",{
    useNewUrlParser:true
})
.then( ()=> console.log("Mongodb is connected"))
.catch( err => console.log(err) )

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

