const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    cardNumber: String,
    cardType: String,
    customerName: String,
    status :{type: String,
        default:"ACTIVE"},
    vision :String,
    customerID :{type:String,
            ref : "customer"}

}, {timestamps:true})

module.exports = mongoose.model('Card', cardSchema)