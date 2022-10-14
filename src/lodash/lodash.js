const lodash = require('lodash');

function lodash1(){
    let month1 = [
        "January","February","March","April","May","June","july", "August","September","October","November","December",
      ];
      console.log(lodash.chunk(month1, 4));
    
      const oddNum = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
      console.log(lodash.tail(oddNum, 9));
      
    
      const Num = [2, 5, 4, 2, 7];
      console.log(lodash.union(Num));
    
      const keyValue = [
        ["horror", "The Shining"],
        ["drama", "Titanic"],
        ["thriller", "Shutter Island"],
        ["fantasy", "Pans Labyrinth"],
      ];
    
      console.log(lodash.fromPairs(keyValue));

      return "successfully"
    }
    
    module.exports.myLodash = lodash1;
    
