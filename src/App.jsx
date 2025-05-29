import { useState, useEffect } from 'react'
import weatherService from './services/weather'
import Search from './components/Search'
import SumCard from './components/SumCard'
import ScrollFade from './components/ScrollFade'
import Footer from './components/Footer'
import LineChart from './components/LineChart'
import './App.css'

const App = () => {

  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [search, setSearch] = useState('')
  const [dailyForecastItem, setDailyForecastItem] = useState('')
  const [chartData, setChartData] = useState(null)
  const dates = weatherService.getDates()

  useEffect(() => {
    const trimmed = search.trim()
    if (trimmed.length >= 2) {
      weatherService
        .getWeather(trimmed)
        .then(rawWeather => {
          let formatted
          if (rawWeather !== null) {
            formatted = weatherService.formatFetchedData(rawWeather)
            weatherService.setBodyBackground(formatted.icon, formatted.temperature)
          } else {
            formatted = null
          }
          setWeather(formatted)
        })
    }
  }, [search])

  useEffect(() => {
    const trimmed = search.trim()
    if (trimmed.length >= 2) {
      weatherService
        .getForecast(trimmed)
        .then(rawWeather => {
          let formatted, formattedAll, dailyForecastItems, chartDataAll
          if (rawWeather !== null) {
            const daily = rawWeather.list.filter(entry =>
              entry.dt_txt.includes("12:00:00")
            )
            formatted = weatherService.formatFetchedData(daily)
            dailyForecastItems = weatherService.getRenderedForecastItems(formatted)
            formattedAll = weatherService.formatFetchedData(rawWeather.list)
            chartDataAll = weatherService.getAllForecastItemsByDaysAndHours(formattedAll)
          } else {
            formatted = null
            formattedAll = null
          }
          setDailyForecastItem(dailyForecastItems)
          setChartData(chartDataAll);
          setForecast(formatted)
        })
    }
  }, [search])
  console.log(forecast)
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
      <main>
        <h1>Weather App</h1>
        <Search search={search} handleSearch={handleSearch} />
        {weather !== null && (
          <>
            <SumCard weather={weather} date={dates[0]} />
            <h2>Current Weather Details</h2>
            <ScrollFade weather={weather} date={null} isForecast={false} />
          </>
        )}
        {forecast !== null && (
          <>
            <hr className="main-hr" />
            <h2>Forecast For Today</h2>
            <LineChart data={weatherService.getDataForChart(dates[0], chartData)} date={dates[0].split(', ').slice(0, 2).join(', ')} />
            <hr className="main-hr" />
            <h2>Forecast</h2>
            <ScrollFade weather={dailyForecastItem[0]} date={dates[1]} isForecast={true} city={search} />
            <LineChart data={weatherService.getDataForChart(dates[1], chartData)} date={dates[1]} />
            <hr />
            <ScrollFade weather={dailyForecastItem[1]} date={dates[2]} isForecast={true} city={search} />
            <LineChart data={weatherService.getDataForChart(dates[2], chartData)} date={dates[2]} />
            <hr />
            <ScrollFade weather={dailyForecastItem[2]} date={dates[3]} isForecast={true} city={search} />
            <LineChart data={weatherService.getDataForChart(dates[3], chartData)} date={dates[3]} />
            <hr />
            <ScrollFade weather={dailyForecastItem[3]} date={dates[4]} isForecast={true} city={search} />
            <LineChart data={weatherService.getDataForChart(dates[4], chartData)} date={dates[4]} />
            <hr />
            <ScrollFade weather={dailyForecastItem[4]} date={dates[5]} isForecast={true} city={search} />
            <LineChart data={weatherService.getDataForChart(dates[5], chartData)} date={dates[5]} />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default App