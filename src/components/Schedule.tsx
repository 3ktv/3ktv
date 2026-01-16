import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleRow from './ScheduleRow';
import { getStoredSchedule, type ProgramItem } from '../services/api';

const Schedule: React.FC = () => {
  const [schedule, setSchedule] = React.useState<ProgramItem[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Helper to get only upcoming/current items
    const getFilteredSchedule = () => {
      const allItems = getStoredSchedule();
      const now = new Date();
      // Allow items that started up to 4 hours ago (current)
      const threshold = new Date(now.getTime() - 4 * 60 * 60 * 1000);

      return allItems
        .filter(item => {
           const dateTimeStr = `${item.date}T${item.time}`;
           const itemDate = new Date(dateTimeStr);
           return !isNaN(itemDate.getTime()) && itemDate >= threshold;
        })
        .sort((a, b) => {
           const dateA = new Date(`${a.date}T${a.time}`).getTime();
           const dateB = new Date(`${b.date}T${b.time}`).getTime();
           return dateA - dateB;
        });
    };

    // Initial load
    setSchedule(getFilteredSchedule());

    // Listen for updates
    const handleUpdate = () => setSchedule(getFilteredSchedule());
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
                rating={item.status || 'INFO'} 
                id={item.id}
                details={item.details}
              />
            ))
          )}
        </div>
      </div>
      <div style={{ marginTop: '20px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <a 
          className="btn" 
          onClick={() => navigate('/schedule')} 
          style={{ cursor: 'pointer' }}
        >
          Pokaż wszystkie
        </a>
        <a 
          href="https://forms.gle/ibrm7UCnp2eum9AL6" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn"
          style={{ textDecoration: 'none', display: 'inline-block' }}
        >
          Zapisz się
        </a>
      </div>
    </section>
  );
};

export default Schedule;
