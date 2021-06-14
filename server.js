'use strict';

require('dotenv').config(); // npm i dotenv
const express = require('express'); //npm i express
const weatherData = require('./data/weather.json');
const cors = require('cors');
// const { response } = require('express');

const server = express();
server.use(cors()); //  make my server opened for anyone


const PORT = 3030;

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

// http://localhost:3030/test
server.get('/test', (request, response) => {
    let str = 'hello from back end';
    response.send(str);
})

class ForeCast {
    constructor(object) {
        this.description = `Low of : ${object.low_temp} and a high of ${object.max_temp} with a ${object.weather.description} `
        this.date = object.valid_date;
    }
}


// http://localhost:3030/weather?lat=123&lon=123&cityname=cityname
server.get('/weather', (request, response) => {
    // console.log(weatherData);
    // console.log(weatherData.lat);

    const latitude = request.query.lat;
    const longitude = request.query.lon;
    const searchQuery = request.query.cityname;
    // const searchQueryy = request.query.searchQuery;
    const weatherArray = weatherData.find((item) => {
        if ((longitude == item.lon && latitude == item.lat) || (searchQuery ==item.city_name)) {
            return item
        }

    });
    // if (weatherArray) {
    //     response.send(weatherArray.city_name)

    // }
    // else {
    //     response.status(404).send('sorry, this page not found');
    // }

    try {

        let forecasts = weatherArray.data.map(item => {

            return new ForeCast(item);
        });
        response.send(forecasts);
    }

    catch {
        response.status(404).send('OPS!! Your City Not Found');
    }

})

