import React from 'react';
import StatusCard from './StatusCard';

const Channels: React.FC = () => {
  return (
    <section id="features" className="panel" data-page="404">
      <h2 style={{ marginTop: 0, fontSize: '32px', color: 'var(--highlight)' }}>
        Programy
      </h2>
      <div className="split">
        <StatusCard tag="3K/NEWS" title="Looping Headlines">
          <p>Byte-sized stories refreshed every 20 minutes.</p>
          <p>Subtitle: EN/ES · Stream mode: Low latency</p>
        </StatusCard>
        <StatusCard
          tag="3K/STREAM"
          tagStyle={{ background: 'var(--accent)', color: '#000' }}
          title="Live Studio"
        >
          <p>Host-led marathons with viewer code polls.</p>
          <p>Signal quality: 4.8/5 · Audio: Stereo</p>
        </StatusCard>
        <StatusCard
          tag="3K/VAULT"
          tagStyle={{ background: 'var(--highlight)', color: '#000' }}
          title="Archive Dive"
        >
          <p>Remastered cult classics and behind-the-scenes extras.</p>
          <p>Interactive timeline overlays included.</p>
        </StatusCard>
        <StatusCard
          tag="3K/LIVE"
          tagStyle={{ background: 'var(--danger)', color: '#fff' }}
          title="Midnight Call-In"
        >
          <p>Audience-first talk shows with mod-controlled channels.</p>
          <p>Delay: 5s · Safety: Tier 2</p>
        </StatusCard>
      </div>
    </section>
  );
};

export default Channels;
