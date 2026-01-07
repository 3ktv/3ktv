import React, { useState, useEffect } from 'react';
import StatusCard from './StatusCard';
import { getStoredChannels, type ChannelItem } from '../services/api';

const Channels: React.FC = () => {
  const [channels, setChannels] = useState<ChannelItem[]>([]);

  useEffect(() => {
    const loadChannels = () => {
      setChannels(getStoredChannels());
    };

    loadChannels();
    window.addEventListener('scheduleUpdated', loadChannels);
    return () => window.removeEventListener('scheduleUpdated', loadChannels);
  }, []);

  // Styles map for cycling or mapping categories to colors if needed
  const getTagStyle = (index: number) => {
    const styles = [
      undefined, // Default
      { background: 'var(--accent)', color: '#000' },
      { background: 'var(--highlight)', color: '#000' },
      { background: 'var(--danger)', color: '#fff' }
    ];
    return styles[index % styles.length];
  };

  return (
    <section id="features" className="panel" data-page="404">
      <h2 style={{ marginTop: 0, fontSize: '32px', color: 'var(--highlight)' }}>
        Programy
      </h2>
      <div className="split">
         {channels.length > 0 ? (
            channels.map((channel, index) => (
              <StatusCard
                key={`${channel.title}-${index}`}
                tag={channel.category || 'INFO'}
                tagStyle={getTagStyle(index)}
                title={channel.title}
              >
                <p>{channel.description}</p>
              </StatusCard>
            ))
         ) : (
           <div style={{ padding: '20px' }}>Loading or no programs description available...</div>
         )}
      </div>
    </section>
  );
};

export default Channels;
