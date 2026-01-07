import React, { useState, useEffect } from 'react';
import { fetchKickChannelData } from '../services/api';

const Header: React.FC = () => {
  const defaultTicker = 'OFFLINE';
  const [tickerText, setTickerText] = useState(defaultTicker);

  useEffect(() => {
    const fetchTitle = async () => {
      const title = await fetchKickChannelData('kkktv');
      if (title) {
        setTickerText(`Live Now: "${title}" — 3KTV Channel · Interactive: Press ▶ to stream instantly`);
      }
    };

    fetchTitle();
    // Optional: Poll every few minutes
    const interval = setInterval(fetchTitle, 60000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <header>
      <div className="ticker" role="presentation">
        <span>{tickerText}</span>
        <span>{tickerText}</span>
      </div>
    </header>
  );
};

export default Header;
