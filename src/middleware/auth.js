const jwt = require('jsonwebtoken')


const tokencheck = async (req,res,next)=>{               
    let token =req.headers["x-auth-token"]
     if(!token) return res.send({msg:"x-auth-token is required!"})
     console.log(token)

     let decodedToken= jwt.verify(token,"function-lithium" )
     if(!decodedToken) return res.send({msg:"Not a valid Token!"})
     logged = decodedToken.userId
     
     next()
 
 }

 const authorise = async (req,res,next)=>{
    let tokendetail =req.params.userId
     //if(!token) return res.send({msg:"x-auth-token is required!"})
     if(logged !== tokendetail ){

        return res.send({msg:"unauthorised"})
     }
    next()
 }
 

 module.exports={tokencheck, authorise}