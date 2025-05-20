import axios from 'axios'

const apiKey = import.meta.env.VITE_WEATHER_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (city) => {
    const request = axios.get(`${baseUrl}?q=${city}&appid=${apiKey}`)
    return request
        .then(response => response.data)
        .catch((error) => {
            return '';
        });
}

export default { getWeather }