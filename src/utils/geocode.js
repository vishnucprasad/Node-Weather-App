const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidmlzaG51Y3ByYXNhZCIsImEiOiJja2V3NzAxYnIyNWtrMnhtcmN2dG43Ynd3In0.PjtuWzKhZ2IOs-2rjNCcXQ&limit=1`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;