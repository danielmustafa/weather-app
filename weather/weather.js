const apiKey = '688cf0ed92cfbf1e6dcc6ad68e6f3378'
const request = require('request');

var getWeather = (lattitude,longitude, callback) => {
    request(
    {
        url: `https://api.darksky.net/forecast/${apiKey}/${lattitude},${longitude}`,
        json: true
    },(error, response, body) => {
    if (error){
        callback(`Unable to get weather information.`)
    } else if (response.statusCode === 400 || response.statusCode === 404) {
        callback(`No weather information found for provided location`)
    } else if (!error && response.statusCode === 200)
        callback(undefined, body.currently)
})}

module.exports = {
    getWeather
}