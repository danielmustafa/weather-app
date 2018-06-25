const request = require('request');

var geoCodeAddress = (reqAddress, callback) => {
    var encodedAddress = encodeURI(reqAddress)

    return request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    },(error, response, body) => {
        if (error){
            callback(`Unable to get location informatior: ${error}`)
        }

        if (body.status === 'ZERO_RESULTS'){
            callback('Invalid address or unknown location.')
        }

        if (body.status === 'OK'){
            var result = body.results[0]
            var location = result.geometry.location;
            var address = result.formatted_address;

            callback(undefined, {
                address: address,
                lattitude: location.lat,
                longitude: location.lng
            })
        }
    })
}

module.exports = {
    geoCodeAddress
}