import { useState, useEffect } from 'react'
import weatherService from './services/weather'
import Search from './components/Search'
import SumCard from './components/SumCard'
import ScrollFade from './components/ScrollFade'
import Footer from './components/Footer'
import LineChart from './components/LineChart'
import './App.css'

const App = () => {

  const [search, setSearch] = useState('')
  const [data, setData] = useState({
    weather: null,
    forecast: null,
    dailyForecastItem: '',
    chartData: null,
    dates: null,
    errorMsg: ''
  })

  const fetchWeatherData = (isForecast, fetchMethod) => {
    const trimmed = search.trim()
    if (trimmed.length >= 2) {
      weatherService.getData('/data/city-min.json')
        .then(cities => {
          const lowerCaseSearch = trimmed.toLowerCase()
          const matchedCity = cities.data.find(city =>
            city.name.toLowerCase() === lowerCaseSearch
          )
          if (matchedCity) {
            fetchMethod(matchedCity.id)
              .then(rawWeather => {
                let formatted = null
                let timezone = null
                let formattedAll = null
                let dailyForecastItems = null
                let chartDataAll = null
                let errorMsgText = ''

                if (rawWeather.data !== undefined &&
                  (rawWeather.message === undefined || rawWeather.message === 0 || rawWeather.message === null)) {

                  let daily
                  if (isForecast) {
                    daily = rawWeather.data.list.filter(entry =>
                      entry.dt_txt.includes("12:00:00")
                    )
                  } else {
                    daily = rawWeather.data
                  }

                  formatted = weatherService.formatFetchedData(daily)

                  if (isForecast) {
                    formattedAll = weatherService.formatFetchedData(rawWeather.data.list)
                    dailyForecastItems = weatherService.getRenderedForecastItems(formatted)
                    chartDataAll = weatherService.getAllForecastItemsByDaysAndHours(formattedAll)
                  } else {
                    weatherService.setBodyBackground(formatted.icon, formatted.temperature)
                    timezone = formatted.timezone
                  }

                } else {
                  if (isForecast && rawWeather.message !== undefined && rawWeather.message !== 0 && rawWeather.message !== null) {
                    errorMsgText = String(rawWeather.message)
                  }
                }

                if (isForecast) {
                  setData(prevData => ({
                    ...prevData,
                    forecast: formatted,
                    dailyForecastItem: dailyForecastItems,
                    chartData: chartDataAll,
                    errorMsg: errorMsgText
                  }))
                } else {
                  setData(prevData => ({
                    ...prevData,
                    weather: formatted,
                    dates: weatherService.getDates(timezone)
                  }))
                }
              })
              .catch(error => {
                console.error('An error occurred:', error)
              })
          } else {
            setData(prevData => ({
              ...prevData,
              weather: null,
              forecast: null,
              errorMsg: weatherService.getErrorMsgText(search)
            }))
          }
        })
    } else {
      setData(prevData => {
        const updatedData = {
          ...prevData,
          errorMsg: weatherService.getErrorMsgText(search),
        }
        if (data.weather !== null) {
          updatedData.weather = null
          updatedData.forecast = null
        }
        return updatedData
      })
    }
  }

  useEffect(() => {
    fetchWeatherData(false, weatherService.getCurrentWeather)
    fetchWeatherData(true, weatherService.getForecast)
  }, [search])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
      <main>
        <h1>Weather App</h1>
        <Search search={search} handleSearch={handleSearch} />
        {data.errorMsg !== '' && <p>{data.errorMsg}</p>}
        {data.weather !== null && data.forecast !== null && (
          <>
            <SumCard weather={data.weather} date={data.dates[0]} />
            <h2>Current Weather Details</h2>
            <ScrollFade weather={data.weather} date={null} isForecast={false} />
            <hr className="main-hr" />
            <h2>Forecast For The Rest Of The Day</h2>
            <LineChart data={weatherService.getDataForChart(data.dates[0], data.chartData)} date={data.dates[0].split(' ').slice(0, 4).join(' ')} />
            <hr className="main-hr" />
            <h2>Forecast For The Next Few Days</h2>
            <ScrollFade weather={data.dailyForecastItem[1]} date={data.dates[1]} isForecast={true} city={search} />
            <LineChart data={weatherService.getDataForChart(data.dates[1], data.chartData)} date={data.dates[1]} />
            <hr />
            <ScrollFade weather={data.dailyForecastItem[2]} date={data.dates[2]} isForecast={true} city={search} />
            <LineChart data={weatherService.getDataForChart(data.dates[2], data.chartData)} date={data.dates[2]} />
            <hr />
            <ScrollFade weather={data.dailyForecastItem[3]} date={data.dates[3]} isForecast={true} city={search} />
            <LineChart data={weatherService.getDataForChart(data.dates[3], data.chartData)} date={data.dates[3]} />
            <hr />
            <ScrollFade weather={data.dailyForecastItem[4]} date={data.dates[4]} isForecast={true} city={search} />
            <LineChart data={weatherService.getDataForChart(data.dates[4], data.chartData)} date={data.dates[4]} />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default App