var path = require('path')
const express = require('express')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
// To use fecth in node...
const fetch = require('node-fetch');
// Env Variables.
dotenv.config();


const app = express()

// For JSON
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Folder to find files
app.use(express.static('dist'))

console.log(__dirname)
// Get Requests

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


app.get('/getData', async (req, res) => {
    const cityData = await getCityDetails("bath", "england");
    const date = new Date('2021-11-02');
    console.log(cityData.lng);
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Server Listening on port 8080')
})


// Geo Name for api call
const geo = process.env.GEONAME;

// Calls the geoName api and returns data on the city.
const getCityDetails = async (city, country) => {
    const response = await fetch(`http://api.geonames.org/searchJSON?q=${city}&countryName=${country}&maxRows=1&username=${geo}`)
    const details = await response.json()
    if (details.totalResultsCount > 0) {
        return { lng: details.geonames[0].lng, lat: details.geonames[0].lat }
    }
    else {
        return false
    }
}



const isWithinWeek = (date) => {
    const now = new Date();
    let endOfWeek = new Date()
    endOfWeek.setDate(endOfWeek.getDate() + 7);
    if (date > now && date < endOfWeek) {
        return true
    }
    else {
        return false
    }
}