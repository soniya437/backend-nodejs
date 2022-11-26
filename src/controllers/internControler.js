
const collegeModels = require("../models/collegeModel");
const internModels = require("../models/internModel");
let nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z])?[a-zA-Z]*)*$/
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const mobileRegex =/^(\+\d{1,3}[- ]?)?\d{10}$/;


const createInterns = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        let { name, email, mobile, collegeId, collegeName, isDeleted} = req.body;

        if (Object.keys(req.body) == 0) return res.status(400).send({ status: false, msg: "Please provide required details only" })

        if (!name || !email || !mobile || !collegeName) return res.status(400).send({ status: false, msg: "Mandatory fields are Required" })

        if(!nameRegex.test(name)) {return res.status(400).send({status:false, message: "Name is not valid, give alphabets only"})}

        if (email) {
            if (!emailRegex.test(email)) return res.status(400).send({ status: false, msg: "Invalid Emailid" })
        }

        let findemail = await internModels.find({ email: email })
        if (findemail.length > 0) return res.status(400).send({ status: false, msg: "email id is already exist" })

        if (mobile) {
            if (!mobileRegex.test(mobile)) return res.status(400).send({ status: false, msg: "Invalid Mobile number" })
        }
        let findnumber = await internModels.find({ mobile: mobile })
        if (findnumber.length > 0) return res.status(400).send({ status: false, msg: "mobile no. is already exist" })
        

        const collegeNames = await collegeModels.findOne({ $or: [{ fullName: collegeName }, { name: collegeName }] })
        if (!collegeNames) return res.status(404).send({ status: false, msg: "College not exist" })

        if(collegeNames.isDeleted == true) {return res.status(404).send({ status: false, msg: "College not found" })
    }

        collegeId = collegeNames._id

        let data1 = { name, email, mobile, collegeId, isDeleted }

        const internData = await internModels.create(data1);

        res.status(201).send({ status: true, message: "Registration Successfull", data: internData })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })

    }
}



module.exports.createInterns = createInterns