import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import './FearGreed.css'
import 'react-loading-skeleton/dist/skeleton.css';

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
            { fearGreedIndex ? <p>{fearGreedIndex}</p> : <Skeleton count={1} height={25} width={100} baseColor="#333" highlightColor="#444" /> }
            { sentiment ? <p className="sentiment">{sentiment}</p> : <Skeleton count={1} height={20} width={60} baseColor="#333" highlightColor="#444" /> }
            <p className="info">Provided by Alternative.me</p>
        </div>
    );
}

export default FearGreed;