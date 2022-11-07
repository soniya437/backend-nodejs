const jwt = require('jsonwebtoken')


const tokencheck = async (req,res,next)=>{               
    try{let token =req.headers["x-auth-token"]
     if(!token) return res.send({msg:"x-auth-token is required!"})
     console.log(token)

      decodedToken= jwt.verify(token,"function-lithium" )
     if(!decodedToken) return res.status(401).send({msg:"Not a valid Token!"})
     logged = decodedToken.userId
     
     next()} catch(err){return res.status(500).send({error:err.message})}
 
 }

 const authorise = async (req,res,next)=>{
    try{let tokendetail =req.params.userId
     
     if( logged!== tokendetail ){

        return res.status(403).send({msg:"unauthorised"})
     }
    next()}catch(error){
      res.status(500).send({error:error.message})
    }
 }
 

 module.exports={tokencheck, authorise}