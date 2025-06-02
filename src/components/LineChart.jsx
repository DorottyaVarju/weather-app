import { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
)

const getFontSize = (width) => {
    if (width < 600) return 12
    if (width < 1024) return 14
    return 16
}

const LineChart = ({ data, date }) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, []);

    const fontSize = getFontSize(windowWidth)

    const chartData = {
        labels: data.map(item => item.hour),
        datasets: [
            {
                label: 'Humidity (%)',
                data: data.map(item => item.humidity),
                borderColor: '#4c76d8',
                backgroundColor: 'transparent',
                tension: 0.3,
                pointRadius: 0,
                datalabels: {
                    display: true,
                    color: '#1e3975',
                    anchor: 'end',
                    align: 'center',
                    font: { weight: 'bold', size: fontSize-4 },
                    formatter: (value) => `${value}%`
                }
            },
            {
                label: 'Temperature (°C)',
                data: data.map(item => item.temperature),
                borderColor: 'rgb(249, 172, 30)',
                backgroundColor: 'transparent',
                tension: 0.3,
                pointRadius: 0,
                datalabels: {
                    display: true,
                    color: 'rgb(194, 127, 4)',
                    anchor: 'end',
                    align: 'center',
                    font: { weight: 'bold', size: fontSize-4 },
                    formatter: (value) => `${value}°C`
                }
            },
            {
                label: 'Windspeed (m/s)',
                data: data.map(item => item.windSpeed),
                borderColor: '#57ae3d',
                backgroundColor: 'transparent',
                tension: 0.3,
                pointRadius: 0,
                datalabels: {
                    display: true,
                    color: '#235e11',
                    anchor: 'end',
                    align: 'center',
                    font: { weight: 'bold', size: fontSize-4 },
                    formatter: (value) => `${value}m/s`
                }
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    pointStyle: 'line'
                }
            },
            title: { display: true, text: `Forecast For The Day (${date})`, color: '#4c76d8' },
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#4c76d8',
                    padding: 5,
                    font: { size: fontSize }
                }
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#4c76d8',
                    padding: 15,
                    font: { size: fontSize }
                }
            }
        }
    }

    return (
        <div className="chart-container">
            <Line options={options} data={chartData} />
        </div>
    )
}

export default LineChart
