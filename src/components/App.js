import './css/App.css';
import { useState } from 'react';
import Results from './Results.js';


const App = () => {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [enteredCity, setEnteredCity] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');
    const [temperature, setTemperature] = useState('');
    const [feels, setFeels] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [humidity, setHumidity] = useState('');
    const [wind, setWind] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');

      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const apiKey = process.env.REACT_APP_API_KEY;
          const api = `https://api.openweathermap.org/data/2.5/weather?q=${enteredCity}&appid=${apiKey}&units=imperial`;
          const response = await fetch(api);
          const jsonData = await response.json();
    
          setCity(jsonData.name);
          setCountry(jsonData.sys.country);
          setDescription(jsonData.weather[0].description);
          setIcon(jsonData.weather[0].icon);
          setTemperature(jsonData.main.temp);
          setFeels(jsonData.main.feels_like);
          setMin(jsonData.main.temp_min);
          setMax(jsonData.main.temp_max);
          setHumidity(jsonData.main.humidity);
          setWind(jsonData.wind.speed);
          setSunrise(jsonData.sys.sunrise);
          setSunset(jsonData.sys.sunset);
          setIsSubmitted(true);
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Enter a city:</label>&nbsp;
                <input type="text"
                    value={enteredCity}
                    onChange={(e) => setEnteredCity(e.target.value)} placeholder="e.g. New York" />
            </form>
            {enteredCity == city ? <Results city={city} country={country} description={description} icon={icon} temperature={temperature} feels={feels} min={min} max={max} humidity={humidity} wind={wind} sunrise={sunrise} sunset={sunset} isSubmitted={isSubmitted}/> : null}
        </>
    )
}

export default App;