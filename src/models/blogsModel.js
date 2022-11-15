const mongoose = require("mongoose")
const moment = require("moment")
const objectId = mongoose.Schema.Types.ObjectId

const blogsSchema = new mongoose.Schema({
title: {
    type: String,
    required: true}, 
body: {
    type: String,
    required: true}, 
authorId: {
    type: objectId,
    ref: "Author",
    required: true
}, 
tags: [String], 
category:  {
    type: String,
    required: true}, 
subcategory: [String],

isDeleted: {
    type: Boolean, 
    default: false
},
deletedAt: {
    type :Date,
    default: console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
},

isPublished: {
    type: Boolean, 
    default: false
},
publishedAt:{
    type:Date,
    default: null
}
}, { timestamps: true})


module.exports = mongoose.model("Blog", blogsSchema )