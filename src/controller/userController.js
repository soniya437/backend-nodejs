const userModel = require('../model/userModel');

    let nameValidation = (/^[a-zA-Z]+([\s][a-zA-Z]+)*$/.test(name));
    const validateEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
    const validatePassword = (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(password))
    const validatePhone = ((/^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone)))
    //----------------------------------------vallidationPassword-----------------------
    const isValidpass = function (value) { // function for password validation

        if (typeof value == 'undefined' || value == 'null')
            return false
        let nameCheck = /^[a-zA-Z0-9@#!$%^&*_-]{3,10}$/.test(value)
        if (nameCheck == false) {
            return false
        }
        if (typeof value == 'string' && value.trim().length >= 1)
            return true
    
    }

const createUser = async function  (req, res) {
    try {
        let data = req.body
        let { title, name, email, phone, password } = data

        
        if (!title) return res.status(400).send({ status: false, msg: "title is mandatory" })
        if  ((title !== "Mr" && title !== "Mrs" && title !== "Miss")) return res.status(400).send({ status: false, msg: "give title only ['Mr'/ 'Mrs'/'Miss']" });

        if (!name || !email || !phone || !password ) return res.status(400).send({ status: false, msg: "Mandatory fields are required" })
        
       

        if (typeof name !== "string"|| !nameValidation) 
        return res.status(400).send({ status: false, msg: "please enter a valid name" })

        if (!validatePhone) return res.status(400).send({ status: false, msg: "Please enter valid Phone Number" })
        if (!validateEmail) return res.status(400).send({ status: false, msg: "Email is invalid, Please check your Email address" });
        if (!validatePassword) return res.status(400).send({ status: false, msg: "use a strong password at least =>  one special, one Uppercase, one lowercase (character) one numericValue and password must be eight characters or longer)" });

       
        let findnumber = await userModel.find({ phone: phone })

        let findemail = await userModel.find({ email: email })

        if (findnumber.length > 0) return res.status(400).send({ status: false, msg: "mobile no. is already exist" })
        if (findemail.length > 0) return res.status(400).send({ status: false, msg: "email id is already exist" })

            let saveData = await userModel.create(data)
            res.status(201).send({  status: true, msg: saveData  })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}
const loginUser = async function (req, res) {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).send({ status: false, msg: "mail id or password is required" })
        }
        if (!isValidpass(password)) {
            return res.status(400).send({ status: false, msg: "Please provide a valid password." })
        }
        const userData = await userModel.findOne({ email: email, password: password })
        if (!userData) {
            return res.status(400).send({ status: false, msg: "incorrect email or password" })
        }
        const token = jwt.sign({ userId: userData._id.toString() }, "projectsecretcode")
        return res.status(200).send({ status: true, msg: "succesfull logged in",token:token })
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports.loginUser=loginUser

module.exports.createUser =createUser