import { useState, useEffect } from 'react'
import weatherService from './services/weather'
import Search from './components/Search'
import Card from './components/Card'

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
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={`${weather.weather.description}`}
          />
          <p>{weather.weather[0].description}</p>
          <Card data={weather.main.temp} />
          <Card data={weather.main.feels_like} />
          <Card data={weather.main.humidity} />
          <Card data={weather.wind.speed} />
        </div>
      )}
    </>
  )
}

export default App;