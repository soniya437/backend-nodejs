
 let nameRegex = /^[a-z]+(([',. -][a-z])?[a-z]*)*$/
 let nameRegex1 = /^[a-zA-Z]+(([',. -][a-zA-Z])?[a-zA-Z]*)*$/
 const pattern=/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/

const collegeModel = require('../models/collegeModel')
const internModels=require('../models/internModel')

const college = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        const data = req.body
        const { name, fullName, logoLink} = data
        if (!name || !fullName || !logoLink) {
            return res.status(400).send({ status: false, msg: "All fields are required" })
        }

        if(!nameRegex.test(name)) {return res.status(400).send({status:false, message:"Name is not Valid, use lowercase alphabets only"})}

        let nameExist = await collegeModel.findOne({name:name})

        if(nameExist) { return res.status(400).send({status:false, message:" College is already exist"})}

        //if(!nameRegex1.test(fullName)) {return res.status(400).send({status:false, message:"fullName is not Valid, use Alphabets"})}
        
        if(!pattern.test(logoLink)){
            return res.status(400).send({status:false,msg:"Please provide a valid link"})
        }
        const create = await collegeModel.create(data)
        return res.status(201).send({ status: true, msg: create })
        }
    
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



const getcollegedetail = async (req, res) => {
    
    try {
        res.setHeader('Access-Control-Allow-Origin','*')
        let { collegeName } = req.query

        if (!collegeName) return res.status(400).send({ status: true, Message: "Please Enter College name" })

        let findnameindb = await collegeModel.findOne({ $or:[{name: collegeName}, {fullName:collegeName}] })
        console.log(findnameindb)
        if (!findnameindb) return res.status(404).send({ status: true, Message: "College Name not found, please enter valid name" })


        let findintern = await internModels.find({ collegeId: findnameindb._id, isDeleted: false })

        if (findintern.length > 0) findnameindb.interns = findintern
        if (findintern.length == 0) findnameindb.interns = "Intern not Found"

        let newobj = { name: findnameindb.name, fullName: findnameindb.fullName, logoLink: findnameindb.logoLink, interns: findnameindb.interns }

        res.status(200).send({ status: true, data: newobj })
    } catch (error) {
        res.status(500).send({ status: false, Message: error.message })
    }
}


module.exports.college = college
module.exports.getcollegedetail=getcollegedetail