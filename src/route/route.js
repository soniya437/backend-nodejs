
const express = require('express')
const Router = express.Router()




Router.post("/vote",function(req,res){
    let persons= [
        {
        name: "PK",
        age: 10,
        votingStatus: false
     },
     {
        name: "SK",
        age: 20,
        votingStatus: false
     },
     {
        name: "AA",
        age: 70,
        votingStatus: false
     },
     {
        name: "SC",
        age: 5,
        votingStatus: false
     },
     {
        name: "HO",
        age: 40,
        votingStatus: false
     }
     ]
       
     let data = req.query.votInAge
     console.log(data)
     let newVotingaAge=[]
     console.log(newVotingaAge)
     persons.forEach((persons)=>{
      if(persons.age>data){
         persons.votingStatus=true
         newVotingaAge.push(persons)
         console.log(newVotingaAge)
      }
     })
     
     return res.send({newVotingaAge:newVotingaAge})
})


module.exports=Router