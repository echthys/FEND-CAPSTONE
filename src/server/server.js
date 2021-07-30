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


app.post('/getData', async (req, res) => {
    const data = {}
    const city = req.body.city
    const country = req.body.country
    const date = new Date(req.body.date)
    const cityData = await getCityDetails(city, country);
    if (cityData) {
        if (isWithinWeek(date)) {
            const cityWeather = await getCurrentWeather(cityData.lat, cityData.lng)
            data["weather"] = cityWeather
        }
        else {
            const cityWeather = await getForecastedWeather(cityData.lat, cityData.lng)
            data["weather"] = cityWeather
        }
        const imageUrl = await getImage(city, country)
        data["image"] = imageUrl
        data["until"] = daysUntil(date)
        console.log(data)
        res.send(data)
    }
    else {
        console.log("Could not find city");
    }

});


// app.post("/postTest", async (req, res) => {
//     console.log(req.body.city)
// })

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

// Get Forecasted Weather
const getForecastedWeather = async (lat, lng) => {
    const weatherAPI = process.env.WEATHER
    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${weatherAPI}&units=M`)
    const weather = await response.json()
    const firstThree = weather.data.splice(0, 3)
    const forecast = {}
    for (const day of firstThree) {
        forecast[day.valid_date] = {
            date: day.valid_date,
            temp: day.temp,
            decription: day.weather.description
        }
    }
    return forecast
}

// Get Current Weather
const getCurrentWeather = async (lat, lng) => {
    const weatherAPI = process.env.WEATHER
    const response = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${weatherAPI}&units=M`)
    const weather = await response.json()
    const forecast = { temp: weather.data[0].temp, description: weather.data[0].weather.description }
    return forecast
}

//Get Image of provided place name
const getImage = async (placeName, country) => {

    const pix = process.env.PIX
    const response = await fetch(`https://pixabay.com/api/?key=${pix}&q=${placeName}+${country}&image_type=photo`)
    const image = await response.json()
    if (image.total > 0) {
        return image.hits[0].webformatURL
    }
    else {

        try {
            const response = await fetch(`https://pixabay.com/api/?key=${pix}&q=${country}&image_type=photo`)
            const image = await response.json()
            return image.hits[0].webformatURL
        } catch (error) {
            console.log("No image found")
        }
    }
}

// Checks if holiday is within week
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

// Gets days until holiday
const daysUntil = (date) => {
    const holidayDay = Math.ceil((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const now = new Date();
    const currentDay = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return holidayDay - currentDay
}


