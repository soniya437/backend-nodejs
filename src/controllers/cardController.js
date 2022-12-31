const cardModel = require('../models/cardModel');
const customerModel = require('../models/customerModel');
//const validation = require('../validation')
const uuid = require('uuid')


// Get all Card List[GET]
 const getCard = async (req, res) => {
    try {
      const cards = await cardModel.find({});
      res.status(200).json({ cards });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Create new card [POST]
 const createCard =  async (req, res) => {
    try {
        let cardData = req.body
      let {cardNumber, cardType, customerName, status, vision, customerID} = cardData;
      
      if(Object.keys(cardData).length ==0) return res.status(400).send({status:false, message:"Provide data"}) 
     

      const cardCount = await cardModel.find()

        //FETCH DATA AND COUNT LENGTH TO CREATE SERIAL costumerNO.

        cardData.cardNumber = "C00" + (cardCount.length + 1)
      
        if(!["SPECIAL" ,"REGULAR"].includes(cardType))return res.status(400).send({status:false, message: "cardType shouild be SPECIAL or REGULAR only"})
        if(!customerName || !validation.validString(customerName)) return res.status(400).send({message: " customerName is not present or valid"})
        if(!["ACTIVE" , "INACTIVE"].includes(status))return res.status(400).send({status:false, message: "status shouild be ACTIVE or INACTIVE only"})
       
        const customerId = customerID.toString()
        
        let customerIDCheck = uuid.validate(customerId)
        
        if (!customerIDCheck) { return res.status(400).send({ status: false, message: 'Invalid CustomerId.' }) }
        
        let presentCustomerId = await customerModel.findOne({customerID:customerID})
        if(!presentCustomerId) return res.status(400).send({ status: false, message: 'Invalid CustomerId.' })

      const result = await cardModel.create(cardData);
      res.status(200).json({ message: "Card created successfully", data : cardData });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  module.exports = {getCard,createCard }


