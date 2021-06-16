const axios= require('axios');

function getmovie(req,res){
    const searchQuery = req.query.cityname;
    const KEY = process.env.MOVIE_API_KEY;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${searchQuery}`;

    axios.get(url).then(apiResult=>{
        const movieData=apiResult.data.results.map(item=>{
        return new Movies(item)
    })
    res.send(movieData)
})
.catch((err) => {
    res.status(500).send("movies not found in this city");
  });

}


class Movies {
    constructor(object){
        this.title= object.title
        this.overview = object.overview,
        this.average_votes= object.vote_average
        this.total_votes= object.vote_count
        this.poster_path= `https://image.tmdb.org/t/p/w500${object.poster_path}`
        this.popularity= object.popularity
        this.released_on= object.release_date
    }
}

module.exports = getmovie;
