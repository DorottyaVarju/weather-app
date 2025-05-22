const SumCard = ( {weather, date} ) => {
    return (
        <div className="sum-container">
            <p className="no-margin-block-end smaller-text">{date}</p>
            <p className="no-margin-block-end smaller-text">{weather.name}</p>
            <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={`${weather.description}`}
            />
            <p className="no-margin bigger-text"><strong>{weather.weather[0].main}, {weather.temperature}°C</strong></p>
        </div>
    )
}

export default SumCard