import React from 'react';

const Ideas: React.FC = () => {
  return (
    <section className="panel" style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h2 style={{ fontSize: '28px', color: 'var(--highlight)', marginBottom: '16px' }}>
        Masz pomysł na program?
      </h2>
      <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
        Chcesz zobaczyć coś konkretnego w 3KTV? A może sam chcesz dołączyć do ekipy?
        Daj nam znać!
      </p>
      <a 
        href="https://forms.gle/YupstYQoJM6LBqsL7" 
        target="_blank" 
        rel="noopener noreferrer"
        className="btn"
        style={{ fontSize: '18px', padding: '12px 32px' }}
      >
        Zgłoś swoje pomysły
      </a>
    </section>
  );
};

export default Ideas;
