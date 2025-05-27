import axios from 'axios'
import clearImg from '../../public/images/clear.jpg'
import cloudsImg from '../../public/images/clouds.jpg'
import fewCloudsImg from '../../public/images/few_clouds.jpg'
import mistImg from '../../public/images/mist.jpg'
import rainyImg from '../../public/images/rainy.jpg'
import scatteredCloudsImg from '../../public/images/scattered_clouds.jpg'
import snowyImg from '../../public/images/snowy.jpg'
import stormImg from '../../public/images/storm.jpg'
import clearImgN from '../../public/images/clear_n.jpg'
import cloudsImgN from '../../public/images/clouds_n.jpg'
import fewCloudsImgN from '../../public/images/few_clouds_n.jpg'
import mistImgN from '../../public/images/mist_n.jpg'
import rainyImgN from '../../public/images/rainy.jpg'
import scatteredCloudsImgN from '../../public/images/scattered_clouds_n.jpg'
import snowyImgN from '../../public/images/snowy_n.jpg'
import stormImgN from '../../public/images/storm_n.jpg'

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

const setBodyBackground = ((weather, className) => {
    if (weather.icon === '01d' || weather.icon === '02d' || weather.icon === '10d') {
        document.body.classList.add(className)
    } else {
        document.body.classList.remove(className)
    }
})

const setContainerBackground = ((icon) => {
    let backgroundImg, backgroundPosition

    switch (icon) {
        case '01d': backgroundImg = clearImg; backgroundPosition = 'center'
            break
        case '02d': backgroundImg = fewCloudsImg; backgroundPosition = 'center'
            break
        case '03d': backgroundImg = scatteredCloudsImg; backgroundPosition = 'bottom'
            break
        case '04d': backgroundImg = cloudsImg; backgroundPosition = 'center'
            break
        case '09d': backgroundImg = rainyImg; backgroundPosition = 'center'
            break
        case '10d': backgroundImg = rainyImg; backgroundPosition = 'top'
            break
        case '11d': backgroundImg = stormImg; backgroundPosition = 'center'
            break
        case '13d': backgroundImg = snowyImg; backgroundPosition = 'top'
            break
        case '50d': backgroundImg = mistImg; backgroundPosition = 'center'
            break
        case '01n': backgroundImg = clearImgN; backgroundPosition = 'bottom'
            break
        case '02n': backgroundImg = fewCloudsImgN; backgroundPosition = 'center'
            break
        case '03n': backgroundImg = scatteredCloudsImgN; backgroundPosition = 'bottom'
            break
        case '04n': backgroundImg = cloudsImgN; backgroundPosition = 'top'
            break
        case '09n': backgroundImg = rainyImgN; backgroundPosition = 'center'
            break
        case '10n': backgroundImg = rainyImgN; backgroundPosition = 'left'
            break
        case '11n': backgroundImg = stormImgN; backgroundPosition = 'center'
            break
        case '13n': backgroundImg = snowyImgN; backgroundPosition = 'top'
            break
        case '50n': backgroundImg = mistImgN; backgroundPosition = 'top'
            break
        default: backgroundImg = ''; backgroundPosition = 'center'
    }

    const containerBackground = {
        backgroundImage: `url(${backgroundImg})`,
        backgroundPosition: backgroundPosition
    }

    return containerBackground
})

export default { getWeather, getForecast, formatFetchedData, setRenderedForecastItems, setBodyBackground, setContainerBackground }