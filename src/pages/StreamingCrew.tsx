import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoredCrew, fetchKickChannelData, type CrewMember } from '../services/api';

const StreamingCrew: React.FC = () => {
  const navigate = useNavigate();
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [liveStatuses, setLiveStatuses] = useState<Record<string, string | null>>({});

  useEffect(() => {
    // Load initial data
    const loadedCrew = getStoredCrew();
    setCrew(loadedCrew);

    // Fetch live status for those with channels
    const checkLiveStatus = async () => {
      const statuses: Record<string, string | null> = {};
      
      // We can run these in parallel
      const checks = loadedCrew.map(async (member) => {
        if (member.channel) {
          try {
            const title = await fetchKickChannelData(member.channel);
            if (title) {
              statuses[member.id] = title;
            }
          } catch (e) {
            console.warn(`Failed to check status for ${member.name}`, e);
          }
        }
      });

      await Promise.all(checks);
      setLiveStatuses(statuses);
    };

    if (loadedCrew.length > 0) {
      checkLiveStatus();
    }

    // Listener for updates
    const handleUpdate = () => {
        const updatedCrew = getStoredCrew();
        setCrew(updatedCrew);
        // Re-check live status if crew changes? 
        // Maybe better to just re-run checkLiveStatus logic if needed.
        // For now, simple reload of data.
    };
    window.addEventListener('scheduleUpdated', handleUpdate);
    return () => window.removeEventListener('scheduleUpdated', handleUpdate);
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
          Ekipa Streamingowa
        </h2>
        {crew.length === 0 ? (
           <div style={{ padding: '20px' }}>Loading crew capability...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', marginTop: '24px' }}>
            {crew.map((member) => (
              <div key={member.id} className="crew-card" style={{ 
                background: 'var(--muted)', 
                border: '2px solid var(--accent-secondary)', 
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative'
              }}>
                <img 
                  src={member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`} 
                  alt={member.name}
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`;
                  }}
                  style={{ 
                    width: '150px', 
                    height: '150px', 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    marginBottom: '16px',
                    border: liveStatuses[member.id] ? '4px solid #00ff00' : '3px solid var(--accent)',
                    boxShadow: liveStatuses[member.id] ? '0 0 15px #00ff00' : 'none'
                  }} 
                />
                
                <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-primary)' }}>{member.name}</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{member.description}</p>
                
                {liveStatuses[member.id] && (
                  <div style={{ marginTop: '12px', padding: '8px', background: 'rgba(0, 255, 0, 0.1)', borderRadius: '4px', width: '100%' }}>
                     <span style={{ color: '#00ff00', fontWeight: 'bold' }}>🔴 LIVE NOW</span>
                     <div style={{ fontSize: '0.9em', color: '#fff', marginTop: '4px' }}>
                        "{liveStatuses[member.id]}"
                     </div>
                     <a 
                       href={`https://kick.com/${member.channel}`} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="btn"
                       style={{ marginTop: '8px', padding: '4px 12px', fontSize: '0.8em' }}
                     >
                       Watch
                     </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default StreamingCrew;
