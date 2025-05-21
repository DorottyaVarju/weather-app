import React, { useEffect, useRef, useState } from 'react';
import Card from './Card'

const ScrollFade = ({ weather }) => {
    const containerRef = useRef(null);
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(false);

    useEffect(() => {
        const container = containerRef.current;

        const checkFadeVisibility = () => {
            if (!container) return;
            const { scrollLeft, scrollWidth, clientWidth } = container;
            setShowLeftFade(scrollLeft > 0);
            setShowRightFade(scrollLeft + clientWidth < scrollWidth - 1);
        };

        container.addEventListener('scroll', checkFadeVisibility);
        window.addEventListener('resize', checkFadeVisibility);
        checkFadeVisibility();

        return () => {
            container.removeEventListener('scroll', checkFadeVisibility);
            window.removeEventListener('resize', checkFadeVisibility);
        };
    }, []);

    return (
        <div className="scroll-container" id="scrollContainer">
            <div className="card-container" ref={containerRef}>
                <Card data={weather.temperature} unit="°C" parameterName="Temperature" />
                <Card data={weather.feelsLike} unit="°C" parameterName="Feels like" />
                <Card data={weather.humidity} unit="%" parameterName="Humidity" />
                <Card data={weather.windSpeed} unit="m/s" parameterName="Windspeed" />
                <Card data={weather.windDeg} unit="°" parameterName="Wind direction" />
                <Card data={weather.pressure} unit="hPa" parameterName="Air pressure" />
                <Card data={weather.cloudiness} unit="%" parameterName="Cloud cover" />
                <Card data={weather.visibility} unit="km" parameterName="Visibility" />
                <Card data={weather.sunrise} unit="" parameterName="Sunrise" />
                <Card data={weather.sunset} unit="" parameterName="Sunset" />
            </div>
            {showLeftFade && <div className="scroll-fade-left" />}
            {showRightFade && <div className="scroll-fade-right" />}
        </div>
    );
};

export default ScrollFade;