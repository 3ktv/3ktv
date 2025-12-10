import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProgramDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="panel" style={{ margin: '40px auto', maxWidth: '800px' }}>
      <h1 style={{ color: 'var(--accent)', fontSize: '48px', marginBottom: '16px' }}>
        Program Info
      </h1>
      <div style={{ border: '2px solid var(--accent-secondary)', padding: '20px', background: 'var(--muted)' }}>
        <h2 style={{ color: 'var(--highlight)', marginTop: 0 }}>ID: {id?.toUpperCase()}</h2>
        <p style={{ fontSize: '24px', lineHeight: '1.4' }}>
          This is a placeholder for program details. In a real application, you would fetch data for ID: <strong>{id}</strong>.
        </p>
        <div style={{ marginTop: '24px' }}>
          <p>Status: <span style={{ color: 'var(--accent)' }}>SCHEDULED</span></p>
          <p>Rating: <span style={{ color: 'var(--danger)' }}>PG-13</span></p>
        </div>
      </div>
      <div style={{ marginTop: '24px' }}>
        <Link to="/" className="btn">
          &lt; Return to Schedule
        </Link>
      </div>
    </main>
  );
};

export default ProgramDetails;
