let axios = require("axios")
// 2.  GOTO  cc => “subscribe” current weather data ==> get api key for Free version ==> create new account and Verify your emailId( Must verify to avoid issues) => go to My APi keys under your account name(top right corner) or https://home.openweathermap.org/api_keys => save the key/appid somewhere. Now proceed further
// Create API's to do each of the following:
//                     - get weather of London from http://api.openweathermap.org/data/2.5/weather?q=London&appid=<useYourOwnAppId>  (NOTE: must use HTTP infront of the url else axios will attempt to hit localhost and give error  ..also use HTTP only and not HTTPS)
//                     - then change the above to get the temperature only( of London)
//                     - Sort the cities  ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"] in order of their increasing temperature
//                     result should look something like this
//                     [
//                     {city:"London", temp: 280},
//                     {city:"Moscow", temp: 290},
//                     {city:"Bangalore", temp: 301.2},
//                     .......
//                     ]



let getSortedCities = async function(req,res){
try{
let cities=["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
let cityObjArray=[]

for(i=0;i<cities.length;i++){
let obj={city:cities[i]}
let resp=await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=526d3cc55ceea1dd39ca56cff5d00426`)

console.log(resp.data.main.temp)

obj.temp= resp.data.main.temp //city :bangluru, temp:301.2
cityObjArray.push(obj)
}

let sorted = cityObjArray.sort(function(a,b){return a.temp-b.temp})
console.log(sorted)
res.status(200).send({status:true,data:sorted})

}
catch (error) {
            console.log(error)
            res.status(500).send({ msg: error.message })
        }
    }
   






































































































// let getStates = async function (req, res) {

//     try {
//         let options = {
//             method: 'get',
//             url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
//         }
//         let result = await axios(options);
//         console.log(result)
//         let data = result.data
//         res.status(200).send({ msg: data, status: true })
//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).send({ msg: err.message })
//     }
// }


// let getDistricts = async function (req, res) {
//     try {
//         let id = req.params.stateId
//         let options = {
//             method: "get",
//             url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
//         }
//         let result = await axios(options);
//         console.log(result)
//         let data = result.data
//         res.status(200).send({ msg: data, status: true })
//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).send({ msg: err.message })
//     }
// }

// let getByPin = async function (req, res) {
//     try {
//         let pin = req.query.pincode
//         let date = req.query.date
//         console.log(`query params are: ${pin} ${date}`)
//         var options = {
//             method: "get",
//             url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
//         }
//         let result = await axios(options)
//         console.log(result.data)
//         res.status(200).send({ msg: result.data })
//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).send({ msg: err.message })
//     }
// }

// let getOtp = async function (req, res) {
//     try {
//         let blahhh = req.body
        
//         console.log(`body is : ${blahhh} `)
//         var options = {
//             method: "post",
//             url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
//             data: blahhh
//         }

//         let result = await axios(options)
//         console.log(result.data)
//         res.status(200).send({ msg: result.data })
//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).send({ msg: err.message })
//     }
// }


// module.exports.getStates = getStates
// module.exports.getDistricts = getDistricts
// module.exports.getByPin = getByPin
// module.exports.getOtp = getOtp
module.exports.getSortedCities=getSortedCities