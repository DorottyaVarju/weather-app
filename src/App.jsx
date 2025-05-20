import { useState, useEffect } from 'react'
import weatherService from './services/weather'
import Search from './components/Search'
import Card from './components/Card'
import './App.css'

const App = () => {

  const [weather, setWeather] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    weatherService
      .getWeather(search)
      .then(weather => {
        setWeather(weather)
      })
  }, [search])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
      <Search search={search} handleSearch={handleSearch} />
      {weather !== '' && (
        <>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={`${weather.weather.description}`}
          />
          <p>{weather.weather[0].description}</p>
          <div className="card-container">
            <Card data={weather.main.temp} unit="K" parameterName="Temperature" />
            <Card data={weather.main.feels_like} unit="K" parameterName="Feels like" />
            <Card data={weather.main.humidity} unit="%" parameterName="Humidity" />
            <Card data={weather.wind.speed} unit="m/s" parameterName="Windspeed" />
          </div>
        </>
      )}
    </>
  )
}

export default App;