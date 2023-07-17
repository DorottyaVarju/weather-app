import './css/Results.css';
import Card from './Card';
import tempPic from '../pics/temperature.png';
import feelsPic from '../pics/feels.png';
import humidityPic from '../pics/humidity.png';
import windPic from '../pics/wind.png';

const Results = ({ city, country, description, icon, temperature, feels, min, max, humidity, wind }) => {
    return (
        <>
            { {city} !== "" ? <h2>Current weather in &nbsp;<span>{city}, {country}</span>: {description} <img src={`https://openweathermap.org/img/w/${icon}.png`} height="50" /></h2> : ""}
            <div className = "results">
            <Card infoName = "Temperature" info={temperature} image ={tempPic} unit="F" celsius = {Math.round((temperature - 32) / (9/5))}/>
            <Card infoName = "Feels like" info={feels} image ={feelsPic} unit="F" celsius = {Math.round((feels - 32) / (9/5))}/>
            <Card infoName = "Minimum temperature" info={min} image ={tempPic} unit="F" celsius = {Math.round((min - 32) / (9/5))}/>
            <Card infoName = "Maximum temperature" info={max} image ={tempPic} unit="F" celsius = {Math.round((max - 32) / (9/5))}/>
            <Card infoName = "Humidity" info={humidity} image ={humidityPic} unit="%" />
            <Card infoName = "Wind speed" info={wind} image ={windPic} unit="km/h" />
            </div>
            <p class="bottomparagraphs" >Sunrise in {city}, {country}: </p>
            <p class="bottomparagraphs" >Sunset in {city}, {country}: </p>
        </>
    )
}

export default Results;