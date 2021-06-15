'use strict';

require('dotenv').config(); // npm i dotenv
const express = require('express'); //npm i express
// const weatherData = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');

////////////////////////////////////////////////////////
const server = express();
server.use(cors()); //  make my server opened for anyone
const PORT = process.env.PORT || 3030;

///////////////////////////////////////////////////////

server.get('/',homeHandler)
server.get('/weather',getweather) // api weather endpoint
server.get('/movies',getmovie) // api movie endpoint

////////////////////////////////////////////////////////
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

///////////////////////////////////////////////

function getweather(req,res){
    // const latitude = request.query.lat;
    // const longitude = request.query.lon;
    const searchQuery = req.query.cityname;
    const KEY = process.env.WEATHER_API_KEY
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${KEY}`;

    axios.get(url).then(apiResult=>{
    const qaz=apiResult.data.data.map(item=>{
    return new ForeCast(item)
})
res.send(qaz)
    })
    // console.log(weatherData)
}

////////////////////////////////////////////////////////////////

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

// http://localhost:3030/test
function homeHandler(req,res){
    let str = 'hello from back end';
    res.send(str);
}

class ForeCast {
    constructor(object) {
        this.description = `Low of : ${object.low_temp} and a high of ${object.max_temp} with a ${object.weather.description} `
        this.date = object.valid_date;
    }
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


// http://localhost:3030/weather?lat=123&lon=123&cityname=cityname
// server.get('/weather', (request, response) => {
//     // console.log(weatherData);
//     // console.log(weatherData.lat);

//     const latitude = request.query.lat;
//     const longitude = request.query.lon;
//     const searchQuery = request.query.cityname;
//     // const searchQueryy = request.query.searchQuery;
//     const weatherArray = weatherData.find((item) => {
//         if ((longitude == item.lon && latitude == item.lat) || (searchQuery.toLowerCase() == item.city_name)) {
//             return item
//         }

//     });
//     // if (weatherArray) {
//     //     response.send(weatherArray.city_name)

//     // }
//     // else {
//     //     response.status(404).send('sorry, this page not found');
//     // }

//     try {

//         let forecasts = weatherArray.data.map(item => {

//             return new ForeCast(item);
//         });
//         response.send(forecasts);
//     }

//     catch {
//         response.status(500).send('OPS!! Your City Not Found');
//     }

// })


server.get('*',(req,res) =>{
    res.status(500).send('sorry, this page not found');
  });
