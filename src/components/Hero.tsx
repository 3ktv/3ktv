import React, { useState, useEffect } from 'react';
import StatusCard from './StatusCard';
import { getStoredSchedule, type ProgramItem } from '../services/api';

const Hero: React.FC = () => {
  const [upcoming, setUpcoming] = useState<ProgramItem[]>([]);

  useEffect(() => {
    const loadSchedule = () => {
      const schedule = getStoredSchedule();
      const now = new Date();

      const futureEvents = schedule
        .map(item => {
          // Parse date and time: 2026-01-14 and 20:55:00
          const dateTimeStr = `${item.date}T${item.time}`;
          const itemDate = new Date(dateTimeStr);
          return { item, itemDate };
        })
        .filter(({ itemDate }) => !isNaN(itemDate.getTime()) && itemDate > now)
        .sort((a, b) => a.itemDate.getTime() - b.itemDate.getTime())
        .slice(0, 3)
        .map(({ item }) => item);

      setUpcoming(futureEvents);
    };

    loadSchedule();
    window.addEventListener('scheduleUpdated', loadSchedule);
    return () => window.removeEventListener('scheduleUpdated', loadSchedule);
  }, []);

  const getRelativeTime = (dateStr: string, timeStr: string) => {
    const start = new Date(`${dateStr}T${timeStr}`);
    const now = new Date();
    const diffMs = start.getTime() - now.getTime();
    
    // Convert to readable format
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `Starts in ${diffMins} min`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Starts in ${diffHours}h ${diffMins % 60}m`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `Starts in ${diffDays} days`;
  };

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
            <a className="btn secondary" href="https://discord.com/invite/XcMgRVpBs2" target="_blank" rel="noopener noreferrer">
              Discord
            </a>
          </div>
        </div>
        <div className="status-grid">
          {upcoming.length > 0 ? (
            upcoming.map((program, index) => (
              <StatusCard 
                key={program.id}
                tag={index === 0 ? "Next" : "Upcoming"}
                tagStyle={index === 0 ? { background: 'var(--highlight)', color: '#000' } : undefined}
                title={program.title}
              >
                <p>{program.host ? `Hosted by ${program.host}` : '3KTV Special'}</p>
                <p>{getRelativeTime(program.date, program.time)}</p>
              </StatusCard>
            ))
          ) : (
            <>
              {/* Fallback/Placeholder if no data or no future events */}
              <StatusCard tag="Live" title="Studio 3KTV">
                <p>Check schedule for updates</p>
                <p>Status: OFFLINE</p>
              </StatusCard>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
