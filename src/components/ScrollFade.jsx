import { useEffect, useRef, useState } from 'react'
import weatherService from '../services/weather'
import Card from './Card'
import { FaDroplet, FaTemperatureHalf, FaCloud, FaEye, FaCloudRain } from "react-icons/fa6"
import { BsPersonFill } from "react-icons/bs"
import { FiWind, FiSunrise, FiSunset } from "react-icons/fi"
import { CgCompress } from "react-icons/cg"
import { TiWeatherWindy } from "react-icons/ti"

const ScrollFade = ({ weather, date, isForecast, city }) => {
    const containerRef = useRef(null)
    const [showLeftFade, setShowLeftFade] = useState(false)
    const [showRightFade, setShowRightFade] = useState(false)
    const weatherElementIconClass = 'weather-element-icon'
    const containerStyle = weatherService.setContainerBackground(weather.icon)
    let classNameForCardContainer = 'card-container'

    if (isForecast) {
        classNameForCardContainer += ' forecast-card-container'
    }

    useEffect(() => {
        const container = containerRef.current

        const checkFadeVisibility = () => {
            if (!container) return
            const { scrollLeft, scrollWidth, clientWidth } = container
            setShowLeftFade(scrollLeft > 0)
            setShowRightFade(scrollLeft + clientWidth < scrollWidth - 1)
        }

        container.addEventListener('scroll', checkFadeVisibility)
        window.addEventListener('resize', checkFadeVisibility)
        checkFadeVisibility()

        return () => {
            container.removeEventListener('scroll', checkFadeVisibility)
            window.removeEventListener('resize', checkFadeVisibility)
        }
    }, [])

    return (
        <>
            {isForecast && <h3 className="no-margin-block-end">{date}, 12:00 <br />{city}</h3>}
            <div className="scroll-container" id="scrollContainer">
                <div className={classNameForCardContainer} ref={containerRef}>
                    {isForecast && <Card data={weather.temperature} unit="°C" parameterName={weather.name} containerStyle={containerStyle} hasImg={true} icon={<img
                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                        alt={`${weather.description}`}
                    />} addition='' />}
                    <Card data={weather.temperature} unit="°C" parameterName="Temperature" icon={<FaTemperatureHalf className={weatherElementIconClass} />} hasImg={false} addition='' />
                    <Card data={weather.feelsLike} unit="°C" parameterName="Feels like" icon={<BsPersonFill className={weatherElementIconClass} />} hasImg={false} addition='' />
                    {isForecast && <Card data={weather.pop} unit="%" parameterName="POP" icon={<FaCloudRain className={weatherElementIconClass} />} hasImg={false} addition='' />}
                    <Card data={weather.humidity} unit="%" parameterName="Humidity" icon={<FaDroplet className={weatherElementIconClass} />} hasImg={false} addition='' />
                    <Card data={weather.windSpeed} unit="m/s" parameterName="Windspeed" icon={<FiWind className={weatherElementIconClass} />} hasImg={false} addition='' />
                    <Card data={weather.windDegText} unit="" parameterName="Wind direction" icon={<TiWeatherWindy className={weatherElementIconClass} />} hasImg={false} addition={`(${weather.windDeg})°`} />
                    <Card data={weather.pressure} unit="hPa" parameterName="Air pressure" icon={<CgCompress className={weatherElementIconClass} />} hasImg={false} addition='' />
                    <Card data={weather.cloudiness} unit="%" parameterName="Cloud cover" icon={<FaCloud className={weatherElementIconClass} />} hasImg={false} addition='' />
                    <Card data={weather.visibility} unit="km" parameterName="Visibility" icon={<FaEye className={weatherElementIconClass} />} hasImg={false} addition='' />
                    {weather.sunrise && <Card data={weather.sunrise} unit="" parameterName="Sunrise" icon={<FiSunrise className={weatherElementIconClass} />} hasImg={false} addition='' />}
                    {weather.sunset && <Card data={weather.sunset} unit="" parameterName="Sunset" icon={<FiSunset className={weatherElementIconClass} />} hasImg={false} addition='' />}
                </div>
                {showLeftFade && <div className="scroll-fade-left" />}
                {showRightFade && <div className="scroll-fade-right" />}
            </div>
        </>
    )
}

export default ScrollFade