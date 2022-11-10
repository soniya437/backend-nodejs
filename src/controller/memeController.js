
const axios = require("axios")

let getMeme= async function(req,res){
    try{
        
        let options = {
            method: "post",
            url: "https://api.imgflip.com/caption_image?template_id=181913649&text0=FunctionUp-is-a-cohort&text1=Its-an-awesome-place-for-Backend-developer&username=Soniya592&password=Soniya5847"

        }
        let result = await axios(options)

        res.send({ data: result.data})


    }catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: " server error" })
    }
}


module.exports.getMeme = getMeme