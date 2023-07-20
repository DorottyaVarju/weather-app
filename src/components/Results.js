import './css/Results.css';
import Card from './Card';
import tempPic from '../pics/temperature.png';
import maxPic from '../pics/max.png';
import minPic from '../pics/min.png';
import humidityPic from '../pics/humidity.png';
import windPic from '../pics/wind.png';
import feelsPic from '../pics/feels.png';

const Results = ({ city, country, description, icon, temperature, feels, min, max, humidity, wind, sunrise, sunset, isSubmitted }) => {
    const sunsetMs = new Date(sunset * 1000);
    const sunsetDate = sunsetMs.toLocaleString();

    const sunriseMs = new Date(sunrise * 1000);
    const sunriseDate = sunriseMs.toLocaleString();

    if (isSubmitted === true) {
        return (
            <>
                {{ city } !== "" ? <h2>Current weather in &nbsp;<span>{city}, {country}</span>: {description} <img src={`https://openweathermap.org/img/w/${icon}.png`} id="weatherIcon" height="50" /></h2> : ""}
                <div className="results">
                    <Card infoName="Temperature" info={temperature} image={tempPic} unit="F" celsius={Math.round((temperature - 32) / (9 / 5))} />
                    <Card infoName="Feels like" info={feels} image={feelsPic} unit="F" celsius={Math.round((feels - 32) / (9 / 5))} />
                    <Card infoName="Minimum temperature" info={min} image={minPic} unit="F" celsius={Math.round((min - 32) / (9 / 5))} />
                    <Card infoName="Maximum temperature" info={max} image={maxPic} unit="F" celsius={Math.round((max - 32) / (9 / 5))} />
                    <Card infoName="Humidity" info={humidity} image={humidityPic} unit="%" />
                    <Card infoName="Wind speed" info={wind} image={windPic} unit="km/h" />
                </div>
                <div className="bottomparagraphs">
                    <p>Sunrise in {city}, {country}: {sunriseDate}</p>
                    <p>Sunset in {city}, {country}: {sunsetDate}</p>
                </div>
            </>
        )
    } else {
        return (
            <>
            </>
        )
    }
}

export default Results;