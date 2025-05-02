require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const axios = require('axios')
const app = express()
app.use(cors())
app.use(express.json())


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const API_KEY = process.env.OPENWEATHER_API_KEY;
const CITY_ID = "524901";

mongoose.connect(MONGO_URI)
    .then(() => console.log("We are connected with mongodb"))
    .catch((err) => console.log("Here is the error to not connect with mongo", err))

const userScheme = new mongoose.Schema({
    temperature: Number,
    humidity: Number,
    location: String,
}, { timestamps: true })

const Weather = mongoose.model('Weather', userScheme)

// Fetch Weather Data from OpenWeatherMap API and Save to MongoDB
app.get('/fetchWeather',async (req, res)=>{
    try {
        const url = `http://api.openweathermap.org/data/2.5/forecast?id=${CITY_ID}&appid=${API_KEY}`;
        const { data } = await axios.get(url);

        const weatherentry = new Weather({
            temperature: data.list[0].main.temp,
            humidity: data.list[0].main.humidity,
            location: data.city.name
        })
        await weatherentry.save()
        res.status(200).json(weatherentry)
    } catch (error) {
        res.status(500).json({'message': "error"})
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));