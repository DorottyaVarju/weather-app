import weatherService from '../services/weather'

const SumCard = ({ weather, date }) => {

    const containerStyle = weatherService.setContainerBackground(weather.icon);

    return (
        <div className="sum-container" style={containerStyle}>
            <div className="overlay"></div>
            <div className="content">
                <p className="no-margin-block-end smaller-text">{date}</p>
                <p className="no-margin-block-end smaller-text">{weather.name}</p>
                <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={`${weather.description}`}
                />
                <p className="no-margin bigger-text">
                    <strong>{weather.weather[0].main}, {weather.temperature}°C</strong>
                </p>
            </div>
        </div>
    )
}

export default SumCard