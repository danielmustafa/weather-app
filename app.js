const yargs = require('yargs');
const geocode = require('./geocode/geocode.js')
const weather = require('./weather/weather.js')
const argv = yargs
    .options({
        address: {
            alias: 'a',
            demand: true,
            describe: 'Address to fetch weather',
            string: true
        }
    })
    .help()
    .alias('help','h')
    .argv;

geocode.geoCodeAddress(argv.address, (err, result) => {
    if (err){
        console.log(`Error obtaining location information: ${err}`);
    } else {
        getWeather(result)
    }
})

function getWeather(result) {
    weather.getWeather(result.lattitude, result.longitude, (err, response) => {
    if (err){
        console.log(`Error obtaining weather information: ${err}`)
    } else {
        console.log(`Current temperature for ${result.address}: ${response.temperature}`)
    }
})
}

