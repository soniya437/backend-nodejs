let films= ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]

function movieList(req,res){
    return films
}

function filmIndex (req,res){
    let movieId = req.params.movieId
    if (movieId > films.length-1|| movieId < 0 ){
        res.send("Use Valid Id")
    }
res.send(films[movieId])
}

 let movieArray = [ 
    { "id": 1,
    "name": "The Shining"}, 
    { "id": 2,
    "name": "Incendies"}, 
    { "id": 3,
    "name": "Rang de Basanti"},
    { "id": 4,
    "name": "Finding Nemo"
   }]
   

function dataOfMovie(req,res){
    return movieArray
}

function indexOfMovie(req,res){
    const index = req.params.filmId
    if(index > movieArray.length-1 || index<0){
        res.send("No movie exists with this id")
    }
res.send(movieArray[index])
}


module.exports.listOfMovie= movieList
module.exports.movieId= filmIndex
module.exports.movieData= dataOfMovie
module.exports.movieIndex= indexOfMovie
