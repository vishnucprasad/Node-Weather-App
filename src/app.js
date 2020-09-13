const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vishnu C Prasad'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vishnu C Prasad'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Vishnu C Prasad',
        helpText: 'This is some helpful text.'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                location,
                forecast: forecastData
            });
        });
    });

});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    }

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'ERROR 404',
        name: 'Vishnu C Prasad',
        error: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: 'ERROR 404',
        name: 'Vishnu C Prasad',
        error: 'Page not found.'
    });
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));