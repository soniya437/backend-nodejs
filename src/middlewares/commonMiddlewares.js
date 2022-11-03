
const letCheckIsFreeAppUser = async function(req,res,next){               
   
    let data=req.headers
    let validinfo=data["isfreeappuser"]
    if(validinfo){
        if(validinfo=="true"){
            req.isfreeappuser=true
        }else{
            req.isfreeappuser=false
        }
        next();
    }else{
        res.send({data:"header missing"})
    }
    }


// const letCheckIsFreeAppUser = async function(req,res,next){
//     req.header["isFreeAppUser"]=req.header.isFreeAppUser
//     let isFreeAppUser = req.header.isFreeAppUser
//     if(isFreeAppUser){
//         console.log(req.body)
//         next()
//     }
    
//     else{
//         res.send("request is missing a mandatory header")

//     }

// }
// const letCheckIsFreeAppUser= function ( req, res, next) {
//     let headers = req.headers
//     let appType = headers["isFreeAppUser"]
//     if(!appType) {
//         appType = headers["isfreeappuser"]
//     }
//     if(!appType) {
//         return res.send({status: false, message: "A mandatory header is missing"})
//     }

//     //let appTypeFree = Boolean(appType)//This works on truthy/falsy
//     if(appType == 'true') {
//         req.appTypeFree = true
//     } else {
//         req.appTypeFree = false
//     }

//     next()
// }


 module.exports.letCheckIsFreeAppUser=letCheckIsFreeAppUser


// const letCheckIsFreeAppUser = async function(req,res,next){
//     req.header["isFreeAppUser"]=req.header.isFreeAppUser
//     let isFreeAppUser = req.header.isFreeAppUser
//     if(isFreeAppUser){
//         console.log(req.body)
//         next()
//     }
    
//     else{
//         res.send("request is missing a mandatory header")

//     }

// }

// module.exports.mid1=letCheckIsFreeAppUser








// const mid1= function ( req, res, next) {
//     req.falana= "hi there. i am adding something new to the req object"
//     console.log("Hi I am a middleware named Mid1")
//     next()
// }

// const mid2= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid2")
//     next()
// }

// const mid3= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid3")
//     next()
// }

// const mid4= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid4")
//     next()
// }

// const myMiddleware = function(req, res, next){
//     req.month = "November"
//     console.log('I am inside a middleware!')
//     next()
// }

// const myOtherMiddleware = function(req, res, next){
//     // Setting an attribute 'wantsJson' in request
//     // The header value comparison is done once and
//     // the result can be used directly wherever required.
//     let acceptHeaderValue = req.headers["accept"]

//     if(acceptHeaderValue == "application/json") {
//         req.wantsJson = true
//     } else {
//         req.wantsJson = false
//     }
//     next()
// }

// module.exports.mid1= mid1
// module.exports.mid2= mid2
// module.exports.mid3= mid3
// module.exports.mid4= mid4
// module.exports.myMiddleware = myMiddleware
// module.exports.myOtherMiddleware = myOtherMiddleware
