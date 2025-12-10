import React from 'react';

interface StatusCardProps {
  tag: string;
  tagStyle?: React.CSSProperties;
  title: string;
  children: React.ReactNode;
}

const StatusCard: React.FC<StatusCardProps> = ({ tag, tagStyle, title, children }) => {
  return (
    <div className="status-card">
      <div className="tag" style={tagStyle}>
        {tag}
      </div>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default StatusCard;
