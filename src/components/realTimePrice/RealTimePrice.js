import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RealTimePrice.css';

function RealTimePrice() {
    const [ price, setPrice ] = useState(null);
    const [ percentage, setPercentage ] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
                setPrice(response.data.bitcoin.usd);

                const percentageResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?days=365&vs_currency=usd&interval=daily`);
                setPercentage(Math.floor(((price - percentageResponse.data.prices[0][1]) / Math.abs(percentageResponse.data.prices[0][1])) * 100));
            } catch (error) {
                console.error('Error fetching real-time price:', error);
            }
        };

        fetchData();
    });

    return (
        <div className="price">
            <h2>Bitcoin Price</h2>
            {
                price ? <p>${price.toLocaleString()}</p> : <p>Loading...</p>
            }
            {
                percentage ? <p className="percentage">{ percentage > 0 && "+"}{percentage}% YTD</p> : <p>Loading...</p>
            }
            <p className="info">Provided by CoinGecko</p>
        </div>
    );
}

export default RealTimePrice;