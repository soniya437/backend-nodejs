const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


// Register User
const createUser = async function (req, res) {

  try{let data = req.body;
  if(Object.keys(data).length ==0){return res.status(400).send({msg:"Please provide Data"})}

  let savedData = await userModel.create(data);
  console.log(req.newAtribute);
  res.status(201).send({ msg: savedData });
} catch(err){return res.status(500).send({status:false, error:err.message})

}
};

//login user
const loginUser = async function (req, res) {
  try{let {emailId, password} = req.body;
  
  if(!emailId || !password){
    return res.status(404).send("User name and Password are Mandatory")}
  
  let user = await userModel.findOne({emailId, password} );
  if (!user) return res.status(401).send({status: false, msg: "username or the password is not corerct",});

  // token Create
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "lithium",
      organisation: "FUnctionUp",
    },
    "function-lithium"
  );
  res.setHeader("x-auth-token", token);
  res.status(201).send({ status: true, data: token });
  
} catch(err){return res.status(500).send({error:err.message})}
};


// get details of User
const getUserData = async function (req, res) {

  try{let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.status(400).send({ status: false, msg: "No such user exists" });

  res.status(200).send({ status: true, data: userDetails });
}catch(err){
res.status(500).send({status: false, error:err.message})
}
};


//Update the data of User
const updateUser = async function (req, res) {

  try{let userId = req.params.userId;
  let user = await userModel.findById(userId);

  if (!user) {
    return res.send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.status(200).send({ status: updatedUser, data: updatedUser });
} catch(err){return res.status(500).send({sstatus:false, error:err.message})}
};

//delete User Data(mark dirty)
const deleteUser = async (req, res) => {
  try{let userId = req.params.userId
  let user = await userModel.findById(userId)
  if (!user) {
    return res.send({ status: false, message: "no such user exists" })
  }
  let updatedUser = await userModel.findOneAndUpdate({ userId: userId }, { isDeleted: true }, { new: true })
  res.status(200).send({ status: true, data: updatedUser })
} catch(err){return res.status(500).send({status:false, error:err.message})}
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
