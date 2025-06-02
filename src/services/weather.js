import axios from 'axios'
import { DateTime } from 'luxon'
import clearImg from '../../src/images/clear.jpg'
import cloudsImg from '../../src/images/clouds.jpg'
import fewCloudsImg from '../../src/images/few_clouds.jpg'
import mistImg from '../../src/images/mist.jpg'
import rainyImg from '../../src/images/rainy.jpg'
import scatteredCloudsImg from '../../src/images/scattered_clouds.jpg'
import snowyImg from '../../src/images/snowy.jpg'
import stormImg from '../../src/images/storm.jpg'
import clearImgN from '../../src/images/clear_n.jpg'
import cloudsImgN from '../../src/images/clouds_n.jpg'
import fewCloudsImgN from '../../src/images/few_clouds_n.jpg'
import mistImgN from '../../src/images/mist_n.jpg'
import rainyImgN from '../../src/images/rainy.jpg'
import scatteredCloudsImgN from '../../src/images/scattered_clouds_n.jpg'
import snowyImgN from '../../src/images/snowy_n.jpg'
import stormImgN from '../../src/images/storm_n.jpg'

const apiKey = import.meta.env.VITE_WEATHER_KEY
const baseUrlWeather = 'https://api.openweathermap.org/data/2.5/weather'
const baseUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast'

const handleError = (error) => {
    let message = 'An unknown error occurred.'

    if (error.response) {
        if (error.response.status === 404) {
            message = "Please enter a valid city, town, or village name."
        } else {
            message = `Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`
            console.error("Server responded with error:", error.response.status)
        }
    } else if (error.request) {
        console.error("No response received:", error.request)
        message = "No response from server."
    } else {
        console.error("Error setting up the request:", error.message)
        message = `Request error: ${error.message}`
    }

    return { success: false, message }
}

const getData = (place, baseUrl) => {
    return axios.get(`${baseUrl}?q=${place}&appid=${apiKey}`)
        .then(response => {
            return { success: true, data: response.data }
        })
        .catch((error) => {
            return handleError(error)
        })
}

const getWeather = (place) => getData(place, baseUrlWeather)

const getForecast = (place) => getData(place, baseUrlForecast)

const getDates = (timezoneOffsetSeconds = 0) => {
    const optionsDate = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour12: false,
    }

    const optionsDateTime = {
        ...optionsDate,
        hour: '2-digit',
        minute: '2-digit',
    }

    const dates = []
    let now = DateTime.utc()

    for (let i = 0; i < 6; i++) {
        const localDate = now.plus({ seconds: timezoneOffsetSeconds })

        const formatted = i === 0
            ? localDate.toFormat('ccc, dd MMM yyyy HH:mm')
            : localDate.toFormat('ccc, dd MMM yyyy')

        dates.push(formatted)
        now = now.plus({ days: 1 })
    }

    return dates
}

const getWindDirectionText = (deg) => {
    if (deg > 0 && deg < 45) {
        return 'NE'
    } else if (deg >= 45 && deg < 90) {
        return 'E'
    } else if (deg >= 90 && deg < 135) {
        return 'SE'
    } else if (deg >= 135 && deg < 180) {
        return 'S'
    } else if (deg >= 180 && deg < 225) {
        return 'SW'
    } else if (deg >= 225 && deg < 270) {
        return 'W'
    } else if (deg >= 270 && deg < 315) {
        return 'NW'
    } else {
        return 'NW'
    }
}

const formatFetchedData = ((raw) => {
    const isCurrent = 'coord' in raw
    let windDegText

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
            windDegText: getWindDirectionText(wind.deg),
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
            windDegText: raw.map(item => getWindDirectionText(item.wind.deg)),
            cloudiness: formatArray(item => item.clouds.all),
            visibility: formatArray(item => item.visibility / 1000),
            description: formatArray(item => item.weather[0]?.description ?? ''),
            icon: formatArray(item => item.weather[0]?.icon ?? ''),
            time: formatArray(item => item.dt_txt ?? ''),
            pop: formatArray(item => item.pop * 100 ?? '')
        }
    }
})

const getRenderedForecastItems = ((forecast) => {
    const renderedForecastItems = forecast.temperature.map((_, i) => ({
        name: forecast.name[i],
        temperature: forecast.temperature[i],
        feelsLike: forecast.feelsLike[i],
        pressure: forecast.pressure[i],
        humidity: forecast.humidity[i],
        windSpeed: forecast.windSpeed[i],
        windDeg: forecast.windDeg[i],
        windDegText: forecast.windDegText[i],
        cloudiness: forecast.cloudiness[i],
        visibility: forecast.visibility[i],
        description: forecast.description[i],
        icon: forecast.icon[i],
        pop: forecast.pop[i]
    }))
    return renderedForecastItems
})

const getAllForecastItemsByDaysAndHours = ((forecast) => {
    const result = {}
    const startTime = new Date(forecast.time[0].replace(" ", "T"))

    for (let index = 0; index < forecast.name.length; index++) {
        const currentTime = new Date(startTime.getTime() + index * 3 * 60 * 60 * 1000)
        const day = currentTime.toISOString().slice(0, 10)
        const hour = currentTime.toISOString().slice(11, 16)

        if (!result[day]) {
            result[day] = {}
        }

        result[day][hour] = {
            name: forecast.name[index],
            temperature: forecast.temperature[index],
            feelsLike: forecast.feelsLike[index],
            pressure: forecast.pressure[index],
            humidity: forecast.humidity[index],
            cloudiness: forecast.cloudiness[index] ?? 43,
            description: forecast.description[index] ?? "scattered clouds",
            icon: forecast.icon[index] ?? "03d",
            visibility: forecast.visibility[index] ?? 10,
            windDeg: forecast.windDeg[index] ?? 0,
            windSpeed: forecast.windSpeed[index] ?? 0
        }
    }

    return result
})

const getIsoDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    const isoDate = `${year}-${month}-${day}`

    return isoDate
}

const getDataForChart = (dateStr, chartData) => {
    const now = new Date()
    const isoDateNow = getIsoDate(now)
    const timeNow = now.toTimeString().slice(0, 5)

    const selectedDate = new Date(dateStr)
    const isoDateSelectedDate = getIsoDate(selectedDate)

    const rawData = chartData[isoDateSelectedDate]

    const dataForChart = Object.entries(rawData)
        .map(([hour, values]) => {
            if ((isoDateNow === isoDateSelectedDate && timeNow < hour || isoDateNow !== isoDateSelectedDate)) {
                return {
                    hour: hour,
                    temperature: values.temperature,
                    humidity: values.humidity,
                    windSpeed: values.windSpeed
                }
            } else {
                return null
            }
        })
        .filter(entry => entry !== null)

    return dataForChart
}

const setBodyBackground = (icon, temperature) => {
    const isNight = icon.includes('n')
    const isSunny = ['01d', '02d', '10d'].includes(icon)
    const isWarm = ((temperature > 24) ? true : false)
    const isBetween10and25 = ((temperature > 10 && temperature < 25) ? true : false)
    document.body.classList.remove('night-theme', 'sunny-theme', 'sunny-warm-theme', 'between-10-and-25-theme')

    if (isNight) {
        document.body.classList.add('night-theme')
    } else if (isSunny && isWarm) {
        document.body.classList.add('sunny-warm-theme')
    } else if (isSunny) {
        document.body.classList.add('sunny-theme')
    } else if (isBetween10and25) {
        document.body.classList.add('between-10-and-25-theme')
    }
}

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

export default { getWeather, getForecast, getDates, formatFetchedData, getDataForChart, getRenderedForecastItems, getAllForecastItemsByDaysAndHours, setBodyBackground, setContainerBackground }