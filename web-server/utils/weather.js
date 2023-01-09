const axios = require('axios');

const apiKey = 'd21a53ad73104dd4597a43a201433180';


const current_weather = async (city, country, callback) => {
    const url_current = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;
    const result = await axios.get(url_current)
        .then(({data}) => {
            callback(undefined, data);
        })
        .catch((error) => {
            callback(error, undefined);
        })        
};


const forecast_weather = async (city, country, callback) => {
    const url_forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apiKey}&units=metric`;
    const result = await axios.get(url_forecast)
        .then(({data}) => {
                callback(undefined, data);  
        })
        .catch((error) => {
            callback(error, undefined);
        })
}

module.exports = {
    current_weather : current_weather,
    forecast_weather : forecast_weather
}

