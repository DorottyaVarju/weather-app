import './css/Results.css';
import temperature from '../pics/temperature.png';
import feels from '../pics/feels.png';
import humidity from '../pics/humidity.png';
import wind from '../pics/wind.png';

const Results = () => {
    return (
        <table>
            <thead>
                <tr>
                    <th colSpan="4" >Current weather in <span>NEW YORK</span> city:</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Temperature: <br/><br/><span>76 F</span><br/><br/><img src={temperature} height="100"/></td>
                    <td>Feels like: <br/><br/><span>75 F</span><br/><br/><img src={feels} height="100"/></td>
                    <td>Humidity: <br/><br/><span>72 %</span><br/><br/><img src={humidity} height="100"/></td>
                    <td>Wind speed: <br/><br/><span>8 km/h</span><br/><br/><img src={wind} height="80" style={{paddingTop: '20px'}}/></td>
                </tr>
            </tbody>
        </table>
    )
}

export default Results;