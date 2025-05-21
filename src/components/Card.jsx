import { FaDroplet, FaTemperatureHalf, FaCloud, FaEye } from "react-icons/fa6";
import { BsPersonFill } from "react-icons/bs";
import { FiWind, FiSunrise, FiSunset } from "react-icons/fi";
import { CgCompress } from "react-icons/cg";
import { TiWeatherWindy } from "react-icons/ti";

const Card = ({ data, unit, parameterName }) => {

    let icon;
    const weatherElementIconClass = 'weather-element-icon'

    switch (parameterName) {
        case 'Temperature':
            icon = <FaTemperatureHalf className={weatherElementIconClass} />;
            break;
        case 'Feels like':
            icon = <BsPersonFill className={weatherElementIconClass} />;
            break;
        case 'Humidity':
            icon = <FaDroplet className={weatherElementIconClass} />;
            break;
        case 'Windspeed':
            icon = <FiWind className={weatherElementIconClass} />;
            break;
        case 'Wind direction':
            icon = <TiWeatherWindy className={weatherElementIconClass} />;
            break;
        case 'Air pressure':
            icon = <CgCompress className={weatherElementIconClass} />;
            break;
        case 'Cloud cover':
            icon = <FaCloud className={weatherElementIconClass} />;
            break;
        case 'Visibility':
            icon = <FaEye className={weatherElementIconClass} />;
            break;
        case 'Sunrise':
            icon = <FiSunrise className={weatherElementIconClass} />;
            break;
        case 'Sunset':
            icon = <FiSunset className={weatherElementIconClass} />;
            break;
        default:
            icon = <FaDroplet className={weatherElementIconClass} />;
            break;
    }

    return (
        <div className="card">
            {icon}
            <p className="smaller-text">{parameterName}</p>
            <p>{data} {unit}</p>
        </div>
    )
}

export default Card