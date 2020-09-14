const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=faeeb68e9b8ce6ecc3f6620398b5785b&query=${latitude},${longitude}&units=m`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unabale to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                localtime: body.location.localtime,
                icon: body.current.weather_icons,
                description: body.current.weather_descriptions[0],
                windSpeed: `${body.current.wind_speed} Kilometers/Hour`,
                pressure: `${body.current.pressure} Millibar`,
                humidity: `${body.current.humidity} g.m-3`,
                forecast: `It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`
            });
        }
    });
};

module.exports = forecast;