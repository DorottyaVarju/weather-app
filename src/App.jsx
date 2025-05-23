import { useState, useEffect } from 'react'
import weatherService from './services/weather'
import Search from './components/Search'
import SumCard from './components/SumCard'
import ScrollFade from './components/ScrollFade'
import Footer from './components/Footer'
import './App.css'

const App = () => {

  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [search, setSearch] = useState('')
  const [renderedForecastItem, setRenderedForecastItem] = useState('')

  const optionsDate = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }

  const optionsDateTime = {
    ...optionsDate,
    hour: '2-digit',
    minute: '2-digit'
  }

  const dates = []

  for (let i = 0; i < 6; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)

    const formatted = i === 0
      ? date.toLocaleString('en-GB', optionsDateTime)
      : date.toLocaleDateString('en-GB', optionsDate)

    dates.push(formatted)
  }

  useEffect(() => {
    const trimmed = search.trim()
    if (trimmed.length >= 2) {
      weatherService
        .getWeather(trimmed)
        .then(rawWeather => {
          let formatted
          if (rawWeather !== null) {
            formatted = weatherService.formatFetchedData(rawWeather)
            weatherService.setBodyBackground(formatted)
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
          let formatted, renderedForecastItems
          if (rawWeather !== null) {
            const daily = rawWeather.list.filter(entry =>
              entry.dt_txt.includes("12:00:00")
            )
            formatted = weatherService.formatFetchedData(daily)
            renderedForecastItems = weatherService.setRenderedForecastItems(formatted)
          } else {
            formatted = null
          }
          setRenderedForecastItem(renderedForecastItems);
          setForecast(formatted)
        })
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
            <h2>Forecast</h2>
            <ScrollFade weather={renderedForecastItem[0]} date={dates[1]} isForecast={true} />
            <hr />
            <ScrollFade weather={renderedForecastItem[1]} date={dates[2]} isForecast={true} />
            <hr />
            <ScrollFade weather={renderedForecastItem[2]} date={dates[3]} isForecast={true} />
            <hr />
            <ScrollFade weather={renderedForecastItem[3]} date={dates[4]} isForecast={true} />
            <hr />
            <ScrollFade weather={renderedForecastItem[4]} date={dates[5]} isForecast={true} />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default App