
const result =function (){
    let word ="    functionup       " 
    return (word.trim())  
}
   
const lowerCase = function (){
    let word = "funCTionUp"
    return (word.toLowerCase())
}

const upperCase = function(){
    let word  = "funCTionUp"
    return (word.toUpperCase())
}

module.exports.endingPoint = {result, lowerCase, upperCase}