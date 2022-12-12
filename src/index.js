const express= require('express');
const mongoose=require("mongoose");
const app=express();
const route= require("./route/route")
app.use(express.json());

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://abhinav-4:1ZYhXB8aYitPd1cm@project-4.xsjm8tr.mongodb.net/?retryWrites=true&w=majority",
{useNewUrlParser:true})
.then(()=>{
    console.log("Project4 MongoDb is connected")
})
.catch((err) => {
    console.log(err.message)
})

app.use("/", route)

app.listen(process.env.PORT || 3000, function(){
    console.log("Express app running on PORT " + (process.env.PORT || 3000))
})