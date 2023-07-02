import './css/Results.css';

const Results = () => {
    return(
        <table>
            <tr>
                <th colspan="4" >Current weather in New York city:</th>
            </tr>
            <tr>
                <td>Temperature:</td>
                <td>Feels like:</td>
                <td>Humidity:</td>
                <td>Wind speed:</td>
            </tr>
            <tr>
                <td>76 F</td>
                <td>75 F</td>
                <td>72 %</td>
                <td>8 km/h</td>
            </tr>
        </table>
    )
}

export default Results;