const express = require('express')
const router = express.Router()
const customerController = require('../controller/customerController')
const cardController = require('../controller/cardController')

   
router.get('/getAllCustomer', customerController.getAllCustomers)
router.delete("/customers/:id", customerController.deleteCustomer)
router.post("/customer",customerController.createCustomer)
router.get("/cards",cardController.getCard)
router.post('/cards', cardController.createCard)


module.exports = router
