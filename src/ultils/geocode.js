const request = require('request');

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)  + '.json?access_token=pk.eyJ1Ijoic29vbmExMjM0NSIsImEiOiJja2F6YW5hcXcwN3Y2MnNsb295aXh2Z284In0.DVZTG9V6Wpix06z9S93-nQ&limit=1'
    request({url,json:true},(error, {body}) => {
        if (error) {
            callback('Unable to connect to mapbox service!',undefined)
        } else if (body.features.length === 0){
            callback('Unable to find location!',undefined)
        } else {
            const data = {
                longtitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name  
            }
            callback(undefined,data)
        }
    })
}

module.exports = geocode