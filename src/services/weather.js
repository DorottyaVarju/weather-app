import axios from 'axios'

const apiKey = import.meta.env.VITE_WEATHER_KEY
const baseUrlWeather = 'https://api.openweathermap.org/data/2.5/weather'
const baseUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast'

const getData = (place, baseUrl) => {
    const request = axios.get(`${baseUrl}?q=${place}&appid=${apiKey}`)
    return request
        .then(response => response.data)
        .catch((error) => {
            return null
        })
}

const getWeather = (place) => getData(place, baseUrlWeather)

const getForecast = (place) => getData(place, baseUrlForecast)

const formatFetchedData = ((raw) => {
    const isCurrent = 'coord' in raw

    if (isCurrent) {
        const { main, wind, clouds, visibility, weather, sys, name } = raw

        return {
            ...raw,
            temperature: Math.round(main.temp - 273.15),
            feelsLike: Math.round(main.feels_like - 273.15),
            pressure: main.pressure,
            humidity: main.humidity,
            windSpeed: wind.speed,
            windDeg: wind.deg,
            cloudiness: clouds.all,
            visibility: visibility / 1000,
            description: weather[0]?.description ?? '',
            icon: weather[0]?.icon ?? '',
            sunrise: new Date(sys.sunrise * 1000).toLocaleTimeString('en-GB', {
                minute: '2-digit',
                second: '2-digit'
            }),
            sunset: new Date(sys.sunset * 1000).toLocaleTimeString('en-GB', {
                minute: '2-digit',
                second: '2-digit'
            }),
            city: name
        }
    } else {
        const formatArray = (fn) => raw.map(fn)

        return {
            ...raw,
            name: formatArray(item => item.weather[0].main),
            temperature: formatArray(item => Math.round(item.main.temp - 273.15)),
            feelsLike: formatArray(item => Math.round(item.main.feels_like - 273.15)),
            pressure: formatArray(item => item.main.pressure),
            humidity: formatArray(item => item.main.humidity),
            windSpeed: formatArray(item => item.wind.speed),
            windDeg: formatArray(item => item.wind.deg),
            cloudiness: formatArray(item => item.clouds.all),
            visibility: formatArray(item => item.visibility / 1000),
            description: formatArray(item => item.weather[0]?.description ?? ''),
            icon: formatArray(item => item.weather[0]?.icon ?? '')
        }
    }
})

const setRenderedForecastItems = ((forecast) => {
    const renderedForecastItems = forecast.temperature.map((_, i) => ({
        name: forecast.name[i],
        temperature: forecast.temperature[i],
        feelsLike: forecast.feelsLike[i],
        pressure: forecast.pressure[i],
        humidity: forecast.humidity[i],
        windSpeed: forecast.windSpeed[i],
        windDeg: forecast.windDeg[i],
        cloudiness: forecast.cloudiness[i],
        visibility: forecast.visibility[i],
        description: forecast.description[i],
        icon: forecast.icon[i]
    }))

    return renderedForecastItems
})

const setBodyBackground = ((weather) => {
    if (weather.icon === '01d' || weather.icon === '02d' || weather.icon === '10d') {
        document.body.classList.add('sunny-background')
    } else {
        document.body.classList.remove('sunny-background')
    }
})

export default { getWeather, getForecast, formatFetchedData, setRenderedForecastItems, setBodyBackground }