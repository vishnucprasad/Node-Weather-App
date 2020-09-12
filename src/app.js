const path = require('path');
const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vishnu C Prasad'
    });
});

app.get('/about', (req, res) => {
    res.render('about' , {
        title: 'About me',
        name: 'Vishnu C Prasad'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.'
    });
});

app.get('/weather', (req, res) => {
    res.send({
        location: 'New York',
        forecast: 'It is currently 30 degrees out. It feels like 26 degrees out.'
    });
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));