import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import './RealTimePrice.css';
import 'react-loading-skeleton/dist/skeleton.css';

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
                price ? <p>${price.toLocaleString()}</p> : <Skeleton count={1} height={25} width={100} baseColor="#333" highlightColor="#444" />
            }
            {
                percentage ? <p className="percentage">{ percentage > 0 && "+"}{percentage}% YTD</p> : <Skeleton count={1} height={20} width={60} baseColor="#333" highlightColor="#444" />
            }
            <p className="info">Provided by CoinGecko</p>
        </div>
    );
}

export default RealTimePrice;