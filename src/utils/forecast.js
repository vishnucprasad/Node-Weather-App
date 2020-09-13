const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=faeeb68e9b8ce6ecc3f6620398b5785b&query=${latitude},${longitude}&units=f`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unabale to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`);
        }
    });
};

module.exports = forecast;