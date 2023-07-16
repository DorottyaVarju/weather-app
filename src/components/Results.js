import './css/Results.css';
import tempPic from '../pics/temperature.png';
import feelsPic from '../pics/feels.png';
import humidityPic from '../pics/humidity.png';
import windPic from '../pics/wind.png';

const Results = ({ city ,country, description, icon, temperature, feels, min, max, humidity, wind }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th colSpan="6" >Current weather in <span>{city}, {country}</span>: {description} <img src={`https://openweathermap.org/img/w/${icon}.png`} height="50" /></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Temperature: <br /><br /><span>{temperature} F</span><br /><br /><img src={tempPic} height="100" /></td>
                    <td>Feels like: <br /><br /><span>{feels} F</span><br /><br /><img src={feelsPic} height="100" /></td>
                    <td>Min: <br /><br /><span>{min} F</span><br /><br /><img src={tempPic} height="100" /></td>
                    <td>Max: <br /><br /><span>{max} F</span><br /><br /><img src={tempPic} height="100" /></td>
                    <td>Humidity: <br /><br /><span>{humidity} %</span><br /><br /><img src={humidityPic} height="100" /></td>
                    <td>Wind speed: <br /><br /><span>{wind} km/h</span><br /><br /><img src={windPic} height="80" style={{ paddingTop: '20px' }} /></td>
                </tr>
            </tbody>
        </table>
    )
}

export default Results;