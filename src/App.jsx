import { useState, useEffect } from 'react'
import weatherService from './services/weather'
import Search from './components/Search'
import ScrollFade from './components/ScrollFade'
import './App.css'

const App = () => {

  const [weather, setWeather] = useState('')
  const [search, setSearch] = useState('')
  const now = new Date();
  const date = now.toLocaleDateString();

  useEffect(() => {
    weatherService
      .getWeather(search)
      .then(rawWeather => {
        const formatted = formatFetchedData(rawWeather)
        setWeather(formatted)
      })
  }, [search])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  function formatFetchedData(raw) {
    return {
      ...raw,
      temperature: Math.round(raw.main.temp - 273.15),
      feelsLike: Math.round(raw.main.feels_like - 273.15),
      pressure: raw.main.pressure,
      humidity: raw.main.humidity,
      windSpeed: raw.wind.speed,
      windDeg: raw.wind.deg,
      cloudiness: raw.clouds.all,
      visibility: raw.visibility / 1000,
      description: raw.weather[0]?.description ?? '',
      sunrise: new Date(raw.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(raw.sys.sunset * 1000).toLocaleTimeString(),
      city: raw.name
    }
  }

  return (
    <>
      <h1>Weather App</h1>
      <Search search={search} handleSearch={handleSearch} />
      {weather !== '' && (
        <>
          <div className="sum-container">
            <p className="no-margin-block-end smaller-text">{weather.name}, {date}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={`${weather.weather.description}`}
            />
            <p className="no-margin bigger-text"><strong>{weather.weather[0].main}</strong></p>
          </div>
          <ScrollFade weather={weather}/>
        </>
      )}
    </>
  )
}

export default App;