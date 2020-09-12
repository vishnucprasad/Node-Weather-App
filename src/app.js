const express = require('express');

const app = express();

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>');
});

app.get('/help', (req, res) => {
    res.send([{
        name: 'Vishnu',
        age: 20
    }, {
        name: 'Sreekutty',
        age: 20
    }]);
});

app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1>');
});

app.get('/weather', (req, res) => {
    res.send({
        location: 'New York',
        forecast: 'It is currently 30 degrees out. It feels like 26 degrees out.'
    });
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));