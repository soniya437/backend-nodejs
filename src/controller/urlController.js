const model = require('../model/model')
const shortid = require('shortid')
const axios = require('axios')


const checkInputsPresent = (value) => { return (Object.keys(value).length > 0) }

const isValid = function (value) {
    if (typeof value == "number" || typeof value == 'undefined' || value == 'null') { return false }
    if (typeof value == "string" && value.trim().length == 0) {
        return false
    }
    return true
};


const urlShorter = async (req, res) => {

    try {

        let originalURL = req.body

        let { longUrl, ...rest } = originalURL

        if (!checkInputsPresent(originalURL)) return res.status(400).send({ status: false, message: "Please Provide Data" })
        if (checkInputsPresent(rest)) return res.status(400).send({ status: false, message: "You can input only longUrl." })

        if (!isValid(longUrl)) { return res.status(400).send({ status: false, message: 'Please Provide Valid longUrl' }) }

        let option = {
            method: 'get',
            url: longUrl
        }

        let urlValidate = await axios(option)
            .then(() => longUrl) // axios is 
            .catch(() => null)

        if (!urlValidate) { return res.status(400).send({ status: false, message: `This Link: ${longUrl} is not valid URL` }) }

        let isPresent = await model.findOne({ longUrl: longUrl })

        if (isPresent) {

            let isPresentObj = {
                longUrl: isPresent.longUrl,
                shortUrl: isPresent.shortUrl,
                urlCode: isPresent.urlCode
            }

            return res.status(200).send({ status: true, message: `For this LongUrl use this ShortUrl: ${isPresent.shortUrl}`, data: isPresentObj })
        }


        let baseUR1 = "http://localhost:3000/"
        originalURL.urlCode = shortid.generate().toLowerCase()
        originalURL.shortUrl = baseUR1 + originalURL.urlCode

        let createURL = await model.create(originalURL)

        return res.status(201).send({ status: true, data: createURL })

    } catch (error) {

        return res.status(500).send({ status: 'error', error: error.message })
    }
}



const getUrl = async function (req, res) {
    try {
        let urlCode = req.params.urlCode


        if (!isValid(urlCode)) {
            return res.status(400).send({ status: false, msg: "Please Enter Valid UrlCode" })
        }


        let findUrlCode = await model.findOne({ urlCode: urlCode }).select({ longUrl: 1, _id: 0})
        if (!findUrlCode) {
            return res.status(404).send({ status: false, msg: "No URL Found OR Url is Incorrect" })
        }

        
        return res.status(200).send({status:true, data:findUrlCode.longUrl})


    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })

    }

}

module.exports ={urlShorter, getUrl}