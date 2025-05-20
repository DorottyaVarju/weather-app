import { FaDroplet, FaTemperatureHalf } from "react-icons/fa6";
import { BsPersonFill } from "react-icons/bs";
import { FiWind } from "react-icons/fi";

const Card = ({ data, unit, parameterName }) => {

    let icon;

    switch (parameterName) {
        case 'Temperature':
            icon = <FaTemperatureHalf className="temperature"/>;
            break;
        case 'Feels like':
            icon = <BsPersonFill className="feels_like"/>;
            break;
        case 'Humidity':
            icon = <FaDroplet className="humidity"/>;
            break;
        case 'Windspeed':
            icon = <FiWind className="windspeed"/>;
            break;
        default:
            icon = <FaDroplet className="humidity"/>;
            break;
    }

    return (
        <div className="card">
            {icon}
            <p>{parameterName}</p>
            <p>{data} {unit}</p>
        </div>
    )
}

export default Card