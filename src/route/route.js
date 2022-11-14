
const express=require('express');

const route=express.Router();

route.get('/test-me',()=>{res.send({status: true})});


module.exports=route;
