import React, { useState, useEffect } from 'react';
import { getStoredReferrals, type ReferralItem } from '../services/api';

const Referrals: React.FC = () => {
  const [referrals, setReferrals] = useState<ReferralItem[]>([]);

  useEffect(() => {
    const loadReferrals = () => {
      setReferrals(getStoredReferrals());
    };

    loadReferrals();
    // Listen for updates in case they load later
    window.addEventListener('scheduleUpdated', loadReferrals);
    return () => window.removeEventListener('scheduleUpdated', loadReferrals);
  }, []);

  if (referrals.length === 0) {
    return null;
  }

  // Get domain from url for favicon service
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return '';
    }
  };

  return (
    <section className="panel" style={{ padding: '20px' }} data-page="222">
      <h3 style={{ marginTop: 0, color: 'var(--highlight)', fontSize: '24px', marginBottom: '16px' }}>
        Polecane
      </h3>
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-around', 
          alignItems: 'center', 
          width: '100%',
          flexWrap: 'wrap',
          gap: '24px' 
        }}
      >
        {referrals.map((item) => (
          <a 
            key={item.id} 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            title={item.name}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textDecoration: 'none',
              color: 'var(--text)',
              transition: 'transform 0.2s',
              gap: '8px'
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div 
              style={{
                width: '64px',
                height: '64px',
                background: 'var(--background)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              <img 
                src={`https://www.google.com/s2/favicons?domain=${getDomain(item.url)}&sz=64`} 
                alt={item.name} 
                style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Referrals;
