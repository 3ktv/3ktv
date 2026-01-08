import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleRow from '../components/ScheduleRow';
import { getStoredSchedule, type ProgramItem } from '../services/api';

const AllSchedule: React.FC = () => {
  const [schedule, setSchedule] = useState<ProgramItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allItems = getStoredSchedule();
    // Sort chronologically
    const sorted = allItems.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`).getTime();
      const dateB = new Date(`${b.date}T${b.time}`).getTime();
      return dateA - dateB;
    });
    setSchedule(sorted);
  }, []);

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <button 
        className="btn" 
        onClick={() => navigate('/')} 
        style={{ marginBottom: '20px', cursor: 'pointer' }}
      >
        &larr; Powrót
      </button>

      <section className="panel">
        <h2 style={{ marginTop: 0, fontSize: '32px', color: 'var(--highlight)' }}>
          Pełny rozkład programów
        </h2>
        <div className="split">
          <div className="list" aria-label="Full program schedule" style={{ width: '100%' }}>
            {schedule.length === 0 ? (
              <div style={{ padding: '20px' }}>Brak dostępnego harmonogramu...</div>
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
      </section>
    </div>
  );
};

export default AllSchedule;
