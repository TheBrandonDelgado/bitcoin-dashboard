import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
import axios from 'axios';
import './HistoricalData.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function HistoricalData() {
    const [ historicalData, setHistoricalData ] = useState(null);

    const fetchHistoricalData = async (days, points) => {
        try {
            const priceResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?days=365&vs_currency=usd&interval=daily`);
            const fearGreedResponse = await axios.get(`https://api.alternative.me/fng/?limit=365&date_format=us`);

            setHistoricalData({
                labels: priceResponse.data.prices.map(data => new Date(data[0]).toLocaleDateString()),
                // labels: fearGreedResponse.data.data.reverse().map(data => data.timestamp),
                datasets: [
                    {
                        label: 'Bitcoin Price',
                        data: priceResponse.data.prices.map(data => data[1]),
                        fill: false,
                        backgroundColor: 'white',
                        borderColor: 'white',
                        yAxisID: 'y',
                        pointStyle: false,
                        tension: .5,
                        borderWidth: 2
                    },
                    {
                        label: 'Fear/Greed Index',
                        data: fearGreedResponse.data.data.reverse().map(data => data.value),
                        fill: false,
                        backgroundColor: "gray",
                        borderColor: "gray",
                        yAxisID: 'y1',
                        pointStyle: false,
                        tension: .5,
                        borderWidth: 2
                    }
                ]
            });
        } catch (error) {
            console.error('Error fetching historical data:', error);
        }
    }

    useEffect(() => {
        fetchHistoricalData();
    });

    const options = {
        maintainAspectRatio: false,
        scales: {
            x: {
                display: false
            },
            y: {
                type: 'linear',
                display: false,
                position: 'left',
            },
            y1: {
                type: 'linear',
                display: false,
                position: 'right',
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show
                },
            },
        }
    }

    return (
        <div className="graph">
            {historicalData ? <Line data={historicalData} options={options} height="300%" /> : <p>Loading...</p>}
        </div>
    );
}

export default HistoricalData;