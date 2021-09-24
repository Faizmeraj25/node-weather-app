const request = require('request')


const forecast = (lattitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4f984e9285f81cf520d98b71c78be944&query=${lattitude},${longitude}`
    request({url, json: true}, (error, response) => {
        if(error){
            callback('Not able to reach out to Weather API !',undefined)
        }else if(response.body.error){
            callback('Not able to fetch data from weather API !',undefined)
        }else{
            callback(undefined,{
                weather_desc: response.body.current.weather_descriptions[0],
                current_temp: response.body.current.temperature,
                location_name: response.body.location.name,
                rain_prob : response.body.current.precip * 100,
                feels_like: response.body.current.feelslike 
            })
        }
    })
}

module.exports = forecast