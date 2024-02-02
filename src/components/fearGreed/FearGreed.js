import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FearGreed.css'

function FearGreed() {
    const [ fearGreedIndex, setFearGreedIndex ] = useState(null);
    const [ sentiment, setSentiment ] = useState(null);

    useEffect(() => {
        const fetchFearGreedIndex = async () => {
            const response = await axios.get('https://api.alternative.me/fng/');
            setFearGreedIndex(response.data.data[0].value);
            setSentiment(response.data.data[0].value_classification);
        }

        fetchFearGreedIndex();
    }, []);

    return (
        <div className="fear-greed">
            <h2>Fear/Greed Index</h2>
            <p>{fearGreedIndex}</p>
            <p className="sentiment">{sentiment}</p>
            <p className="info">Provided by Alternative.me</p>
        </div>
    );
}

export default FearGreed;