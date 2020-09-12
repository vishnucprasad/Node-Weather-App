const path = require('path');
const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.get('/weather', (req, res) => {
    res.send({
        location: 'New York',
        forecast: 'It is currently 30 degrees out. It feels like 26 degrees out.'
    });
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));