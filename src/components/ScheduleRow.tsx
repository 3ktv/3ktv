import React from 'react';
import { Link } from 'react-router-dom';

interface ScheduleRowProps {
  date?: string;
  time: string;
  title: string;
  rating: string;
  id?: string;
  details?: string;
}

const ScheduleRow: React.FC<ScheduleRowProps> = ({ date, time, title, rating, id, details }) => {
  const content = (
    <>
      <span className="date">{date || 'TODAY'}</span>
      <span className="time">{time}</span>
      <span className="title">
        {title}
        {details && <span style={{ fontWeight: 'normal', marginLeft: '8px', fontSize: '0.9em', color: 'var(--text-secondary)' }}>({details})</span>}
      </span>
      <span className="rating">{rating}</span>
    </>
  );

  if (id) {
    return (
      <Link to={`/program/${id}`} className="row btn-link">
        {content}
      </Link>
    );
  }

  return (
    <div className="row" tabIndex={0}>
      {content}
    </div>
  );
};

export default ScheduleRow;
