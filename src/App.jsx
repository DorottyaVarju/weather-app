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
  const [dates, setDates] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const trimmed = search.trim()
    if (trimmed.length >= 2) {
      weatherService
        .getWeather(trimmed)
        .then(rawWeather => {
          let formatted, timezone
          if (rawWeather.data !== undefined && (rawWeather.message === undefined || rawWeather.message === 0 || rawWeather.message === null)) {
            formatted = weatherService.formatFetchedData(rawWeather.data)
            weatherService.setBodyBackground(formatted.icon, formatted.temperature)
            timezone = formatted.timezone
          } else {
            formatted = null
            timezone = null
          }
          setWeather(formatted)
          setDates(weatherService.getDates(timezone))
        })
        .catch(error => {
          console.error('An error occured:', error);
        })
    } else {
      let errorMsg = 'Please enter a city, town, or village name.'
      if (search !== '') {
        errorMsg = 'Please enter a valid city, town, or village name.'
      }
      setErrorMsg(errorMsg)
    }
  }, [search])

  useEffect(() => {
    const trimmed = search.trim()
    if (trimmed.length >= 2) {
      weatherService
        .getForecast(trimmed)
        .then(rawWeather => {
          let formatted, formattedAll, dailyForecastItems, chartDataAll, errorMsgText = ''
          if (rawWeather.data !== undefined && (rawWeather.message === undefined || rawWeather.message === 0 || rawWeather.message === null)) {
            const daily = rawWeather.data.list.filter(entry =>
              entry.dt_txt.includes("12:00:00")
            )
            formatted = weatherService.formatFetchedData(daily)
            dailyForecastItems = weatherService.getRenderedForecastItems(formatted)
            formattedAll = weatherService.formatFetchedData(rawWeather.data.list)
            chartDataAll = weatherService.getAllForecastItemsByDaysAndHours(formattedAll)
          } else {
            if (rawWeather.message !== undefined && rawWeather.message !== 0 && rawWeather.message !== null) {
              errorMsgText = String(rawWeather.message)
            }
            formatted = null
            formattedAll = null
          }
          setErrorMsg(errorMsgText)
          setDailyForecastItem(dailyForecastItems)
          setChartData(chartDataAll);
          setForecast(formatted)
        })
        .catch(error => {
          console.error('An error occured:', error);
        })
    } else {
      let errorMsg = 'Please enter a city, town, or village name.'
      if (search !== '') {
        errorMsg = 'Please enter a valid city, town, or village name.'
      }
      setErrorMsg(errorMsg)
    }
  }, [search])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
      <main>
        <h1>Weather App</h1>
        <Search search={search} handleSearch={handleSearch} />
        {errorMsg !== '' && <p>{errorMsg}</p>}
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
            <h2>Forecast For The Rest Of The Day</h2>
            <LineChart data={weatherService.getDataForChart(dates[0], chartData)} date={dates[0].split(', ').slice(0, 2).join(', ')} />
            <hr className="main-hr" />
            <h2>Forecast For The Next Few Days</h2>
            <ScrollFade weather={dailyForecastItem[1]} date={dates[1]} isForecast={true} city={search} />
            <LineChart data={weatherService.getDataForChart(dates[1], chartData)} date={dates[1]} />
            <hr />
            <ScrollFade weather={dailyForecastItem[2]} date={dates[2]} isForecast={true} city={search} />
            <LineChart data={weatherService.getDataForChart(dates[2], chartData)} date={dates[2]} />
            <hr />
            <ScrollFade weather={dailyForecastItem[3]} date={dates[3]} isForecast={true} city={search} />
            <LineChart data={weatherService.getDataForChart(dates[3], chartData)} date={dates[3]} />
            <hr />
            <ScrollFade weather={dailyForecastItem[4]} date={dates[4]} isForecast={true} city={search} />
            <LineChart data={weatherService.getDataForChart(dates[4], chartData)} date={dates[4]} />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default App