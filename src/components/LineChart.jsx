import React from 'react'
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const LineChart = ({ data, date }) => {
    const chartData = {
        labels: data.map(item => item.hour),
        datasets: [
            {
                label: 'Temperature (°C)',
                data: data.map(item => item.temperature),
                borderColor: 'rgb(254, 196, 87)',
                backgroundColor: 'transparent',
                tension: 0.3,
            },
            {
                label: 'Humidity (%)',
                data: data.map(item => item.humidity),
                borderColor: '#4c76d8',
                backgroundColor: 'transparent',
                tension: 0.3,
            },
            {
                label: 'Windspeed (m/s)',
                data: data.map(item => item.windSpeed),
                borderColor: '#57ae3d',
                backgroundColor: 'transparent',
                tension: 0.3,
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
                    color: '#4c76d8'
                }
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#4c76d8'
                }
            }
        }
    }

    return <Line options={options} data={chartData} />
}

export default LineChart
