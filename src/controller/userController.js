const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken')



const nameValidation = (/^[a-zA-Z]+([\s][a-zA-Z]+)*$/);
const validateEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const validatePassword = (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/)
const validatePhone = (/^(\+\d{1,3}[- ]?)?\d{10}$/)


const {isValidEntry} = require('../validator/validator')



const createUser = async function (req, res) {
    try {
        let data = req.body
        let { title, name, email, phone, password } = data


        if (!title) return res.status(400).send({ status: false, msg: "title is mandatory" })
        if ((title !== "Mr" && title !== "Mrs" && title !== "Miss")) return res.status(400).send({ status: false, message: "give title only ['Mr'/ 'Mrs'/'Miss']" });

        // if (!name || !email || !phone || !password) return res.status(400).send({ status: false, message: "Mandatory fields are required" })


        if (!isValidEntry(phone) || !validatePhone.test(phone)) return res.status(400).send({ status: false, message: "Please enter valid Phone Number" })
        if (!isValidEntry(email) || !validateEmail.test(email)) return res.status(400).send({ status: false, message: "Email is invalid, Please check your Email address" });
        if (!isValidEntry(name) || !nameValidation.test(name)) return res.status(400).send({ status: false, message: "please enter a valid name" })
        if (!isValidEntry(password) || !validatePassword.test(password)) return res.status(400).send({ status: false, message: "use a strong password at least =>  one special, one Uppercase, one lowercase (character) one numericValue and password must be eight characters or longer)" });


        let uniqueData = await userModel.findOne({ $or : [{phone: phone} , {email: email }] })

        if (uniqueData) return res.status(400).send({ status: false, message: "Mobile Number or Email is already exist" })
     

        let saveData = await userModel.create(data)
        res.status(201).send({ status: true, message: saveData })

    } catch (error) {
        console.log(error.message)
        res.status(500).send({ status: false, message: error.message });
    }
}


const loginUser = async function (req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).send({ status: false, message: "Mail id or password is required" })
        }

        const userData = await userModel.findOne({ email: email, password: password })

        if (!userData) return res.status(400).send({ status: false, message: "incorrect email or password" })
        
        const token = jwt.sign({ userId: userData._id.toString() }, "projectsecretcode" , { expiresIn: '1h' })

        return res.status(200).send({ status: true, message: "succesfull logged in", token: token })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}





module.exports = {createUser , loginUser}