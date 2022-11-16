const jwt = require("jsonwebtoken")


const authentication = function(req, res, next){

try{
  let token = req.headers["x-api-key"]
if(!token) return res.status(401).send({status: false, msg: "token is not present"})

let decodedToken = jwt.verify(token, "group7" )
if(!decodedToken){
    res.status(500).send({status: false, msg: "Invalid Token"})
}

authorId = decodedToken.userId



next()
}catch(error){
return res.status(500).send({status: false, msg: error.message})
}
}


module.exports.authentication = authentication