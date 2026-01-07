import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProgramById, type ProgramItem } from '../services/api';

const ProgramDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = React.useState<ProgramItem | undefined>();

  React.useEffect(() => {
    if (id) {
      setProgram(getProgramById(id));
    }

    const handleUpdate = () => {
      if (id) {
        setProgram(getProgramById(id));
      }
    };
    window.addEventListener('scheduleUpdated', handleUpdate);
    return () => window.removeEventListener('scheduleUpdated', handleUpdate);
  }, [id]);

  if (!program) {
     return (
        <main className="panel" style={{ margin: '40px auto', maxWidth: '800px' }}>
             <h1 style={{ color: 'var(--accent)', fontSize: '48px', marginBottom: '16px' }}>
                Program Info
            </h1>
           <div style={{ padding: '20px', background: 'var(--muted)', border: '2px solid var(--accent-secondary)' }}>
                {id ? 'Loading...' : 'Program not found'}
           </div>
           <div style={{ marginTop: '24px' }}>
            <Link to="/" className="btn">
              &lt; Return to Schedule
            </Link>
          </div>
        </main>
     );
  }

  return (
    <main className="panel" style={{ margin: '40px auto', maxWidth: '800px' }}>
      <h1 style={{ color: 'var(--accent)', fontSize: '48px', marginBottom: '16px' }}>
        Program Info
      </h1>
      <div style={{ border: '2px solid var(--accent-secondary)', padding: '20px', background: 'var(--muted)' }}>
        <h2 style={{ color: 'var(--highlight)', marginTop: 0 }}>{program.title}</h2>
        <div style={{ fontSize: '24px', lineHeight: '1.4' }}>
          <p><strong>Host:</strong> {program.host || 'Unknown'}</p>
          <p><strong>When:</strong> {program.date} at {program.time}</p>
          {program.description && (
            <p style={{ marginTop: '20px', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              {program.description}
            </p>
          )}
        </div>
        <div style={{ marginTop: '24px' }}>
          <p>Status: <span style={{ color: 'var(--accent)' }}>{program.extra === 'FALSE' ? 'RECORDED' : 'LIVE'}</span></p>
          <p>ID: <span style={{ color: 'var(--muted-text)' }}>{program.id}</span></p>
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
