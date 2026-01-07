import React from 'react';
import ScheduleRow from './ScheduleRow';
import { getStoredSchedule, type ProgramItem } from '../services/api';

const Schedule: React.FC = () => {
  const [schedule, setSchedule] = React.useState<ProgramItem[]>([]);

  React.useEffect(() => {
    // Initial load
    setSchedule(getStoredSchedule());

    // Listen for updates
    const handleUpdate = () => setSchedule(getStoredSchedule());
    window.addEventListener('scheduleUpdated', handleUpdate);
    return () => window.removeEventListener('scheduleUpdated', handleUpdate);
  }, []);

  return (
    <section id="schedule" className="panel" data-page="320">
      <h2 style={{ marginTop: 0, fontSize: '32px', color: 'var(--highlight)' }}>
        Rozkład programów
      </h2>
      <div className="split">
        <div className="list" aria-label="Program schedule" style={{ width: '100%' }}>
          {schedule.length === 0 ? (
            <div style={{ padding: '20px' }}>Loading or no schedule available...</div>
          ) : (
            schedule.map((item) => (
              <ScheduleRow
                key={item.id}
                date={item.date}
                time={item.time}
                title={item.title}
                rating={item.extra === 'FALSE' ? 'REC' : 'LIVE'} 
                id={item.id}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
