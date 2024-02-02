import React from 'react';
import RealTimePrice from './components/realTimePrice/RealTimePrice';
import HistoricalData from './components/historicalData/HistoricalData';
import FearGreed from './components/fearGreed/FearGreed';
import './App.css';
import FurtherReading from './components/furtherReading/FurtherReading';

function App() {
  return (
    <div className="App">
      <main>
        <div className="price-index">
          <RealTimePrice />
          <FearGreed />
        </div>
        <HistoricalData />
        <FurtherReading />
      </main>
    </div>
  );
}

export default App;