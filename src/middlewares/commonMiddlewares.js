const moment =require('moment')


const localServer= function ( req, res, next) {
    let timeStamp=moment()
console.log(timeStamp.format("DD-MM-YYYY HH:MM:SS")+ " "+req.ip+ " "+req.path)
next()
}


module.exports.localServer=localServer

