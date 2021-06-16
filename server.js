'use strict';

require('dotenv').config(); // npm i dotenv
const express = require('express'); //npm i express
const cors = require('cors');
const axios = require('axios');

////////////////////////////////////////////////////////
const server = express();
server.use(cors()); //  make my server opened for anyone
const PORT = process.env.PORT || 3030;

///////////////////////////////////////////////////////


////////////////////////////////////////////////////////
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

///////////////////////////////////////////////
const getweather = require('./weather');
const getmovie = require('./movies');

// routes

server.get('/',homeHandler)
server.get('/weather',getweather) // api weather endpoint
server.get('/movies',getmovie) // api movie endpoint


////////////////////////////////////////////////////////////////


// http://localhost:3030/test
function homeHandler(req,res){
    let str = 'hello from back end';
    res.send(str);
}




server.get('*',(req,res) =>{
    res.status(500).send('sorry, this page not found');
  });
