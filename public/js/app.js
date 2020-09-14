console.log('Client Side javaScript is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const icon = document.querySelector('#icon');
const description = document.querySelector('#description');
const locationAndTime = document.querySelector('#location');
const forecast = document.querySelector('#forecast');
const windSpeed = document.querySelector('#wind-speed');
const pressure = document.querySelector('#pressure');
const humidity = document.querySelector('#humidity');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    description.textContent = 'Loading...';
    icon.src = '';
    locationAndTime.textContent = '';
    forecast.textContent = '';
    windSpeed.textContent = '';
    pressure.textContent = '';
    humidity.textContent = '';

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {                
                description.textContent = '';
                locationAndTime.textContent = data.error;
                forecast.textContent = '';
                windSpeed.textContent = '';
                pressure.textContent = '';
                humidity.textContent = '';
            } else {
                icon.src = data.forecast.icon[0];
                description.textContent = data.forecast.description;
                locationAndTime.textContent = `${data.location}, ${data.forecast.localtime}`;
                forecast.textContent = data.forecast.forecast;
                windSpeed.textContent = `Wind speed is ${data.forecast.windSpeed}`;
                pressure.textContent = `Pressure is ${data.forecast.pressure}`;
                humidity.textContent = `Humidity is ${data.forecast.humidity}`;
            }
        });
    });
});