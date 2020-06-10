const request = require('request');

const forcast = (lat,lon,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ef64ff5dab6dfe171b56fad95fc66252&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(lon) + '&units=f'
    request({url,json:true},(error,{body}) => {
        if (error) {
            callback('Unable to start the service!', undefined)
        } else if (body.error){
            callback('Unable to start the service!', undefined)
        } else {
            const forcastData = body.current.weather_descriptions[0] + ". It is currenty " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out."
            callback(undefined, forcastData);
        }
    })
    
}

module.exports = forcast