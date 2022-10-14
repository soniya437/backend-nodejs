
const oops = function daily(){
    const date = new Date();

const month = date.getMonth()+ 1;
console.log(`This month is ${month}`);

const todayDate = date.getDate()
console.log(`Today is ${todayDate}`)
 return "done"
}

const batch = {
    name: "Lithium",
    Week: "3W5D",
    topic:"Nodejs Module"
}

function getBatchInfo(){
return (`My Batch is ${batch.name}, this is ${batch.Week}, and the topic for today is  ${batch.topic}. `)
}


module.exports.batchInfo = getBatchInfo;
module.exports.dateMonth = oops;



