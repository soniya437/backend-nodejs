const customerModel = require('../models/customerModel')
//const validation = require('../validation')

const uuid = require('uuid')





const getAllCustomers = async (req,res)=>{
    // Get all customers List with status ACTIVE [GET]

    try {
      const customers = await customerModel.find({ status: "ACTIVE" });
      res.status(200).json({ customers });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Delete customer. [DELETE]
const deleteCustomer = async (req, res) => {
    try {
      const customer = await customerModel.findByIdAndRemove(req.params.id);
      res.status(200).json({ message: "Customer deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  // Create new customer [POST]
const createCustomer = async (req, res) => {
    try {
        let data = req.body
        let {firstName, lastName, mobileNumber, DOB, emailID, address,customerID, status} = data
        if(Object.keys(data).length === 0) return res.status(400).send({status:false, message:"Provide data"})
        if(!validation.validString(firstName))return res.status(400).send({status:false, message: "firstName is not valid"})
        if(!validation.validString(lastName))return res.status(400).send({status:false, message: "lastName is not valid"})
        if(!validation.validString(mobileNumber))return res.status(400).send({status:false, message: "mobileNumber should be string"})
        if(!validation.isValidPhone(mobileNumber))return res.status(400).send({status:false, message: "mobileNumber should contains 10 digits"})

        if(!validation.validString(emailID))return res.status(400).send({status:false, message: "emailID should be string"})
        if(!validation.isValidEmail(emailID))return res.status(400).send({status:false, message: "emailID is not valid"})
        if(!validation.validString(address))return res.status(400).send({status:false, message: "address is not valid"})
        //if(!validation.validString(customerID))return res.status(400).send({status:false, message: "customerID is not valid"})

        data.customerID = uuid.v4()

        let presentId = await customerModel.findOne({customerID:customerID})
        if(presentId) return res.status(400).send({status:false, message: "customerID already exist!"})
        

        if(status){if(!validation.validString(status))return res.status(400).send({status:false, message: "status is not valid"})
       if(!["ACTIVE" , "INACTIVE"].includes(status))return res.status(400).send({status:false, message: "status shouild be ACTIVE or INACTIVE only"})}

      const customer = await customerModel.create(data);
      const result = await customer.save();
      res.status(200).json({ message: "Customer created successfully", data: data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


module.exports = {createCustomer, deleteCustomer, getAllCustomers}

