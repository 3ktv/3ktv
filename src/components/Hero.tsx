import React from 'react';
import StatusCard from './StatusCard';

const Hero: React.FC = () => {
  return (
    <section className="panel" data-page="100">
      <div className="hero">
        <div>
          <h1>3KTV Online</h1>
          <p>
           KKKtv to wspólny projekt paczki znajomych tworzących energiczne streamy w jednym miejscu: gry, rozmowy, kreatywne projekty i spontaniczne akcje. Każdy streamer wnosi swój styl, a razem robimy unikalny kanał. Czegoś brakuje? Napiszcie!
          </p>
          <div className="cta-row">
            <a className="btn" href="https://kick.com/kkktv" target="_blank" rel="noopener noreferrer">
              Oglądaj Live
            </a>
            <a className="btn secondary" href="#features">
              Programy
            </a>
          </div>
        </div>
        <div className="status-grid">
          <StatusCard tag="Live" title="Synthwave Sunrise">
            <p>Studio 3 · Hosted by Nova Rae</p>
            <p>Viewers: 128k</p>
          </StatusCard>
          <StatusCard
            tag="Next"
            tagStyle={{ background: 'var(--highlight)', color: '#000' }}
            title="Retro Classics"
          >
            <p>80s action reels · CC enabled</p>
            <p>Starts in 00:18:43</p>
          </StatusCard>
          <StatusCard
            tag="Alert"
            tagStyle={{ background: 'var(--danger)', color: '#fff' }}
            title="Signal Boost"
          >
            <p>New season of NeoNoir drops Fri 9p.</p>
            <p>Press 9-9-9 for trailer.</p>
          </StatusCard>
        </div>
      </div>
    </section>
  );
};

export default Hero;
