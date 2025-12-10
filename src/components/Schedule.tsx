import React from 'react';
import ScheduleRow from './ScheduleRow';

const Schedule: React.FC = () => {
  return (
    <section id="schedule" className="panel" data-page="320">
      <h2 style={{ marginTop: 0, fontSize: '32px', color: 'var(--highlight)' }}>
        Rozkład programów
      </h2>
      <div className="split">
        <div className="list" aria-label="Evening schedule">
          <ScheduleRow
            date="DZIŚ"
            time="18:00"
            title="Circuit Newsfeed"
            rating="LIVE"
            id="newsfeed"
          />
          <ScheduleRow
            date="DZIŚ"
            time="19:00"
            title="Arcade Legends"
            rating="CC"
            id="arcade"
          />
          <ScheduleRow
            date="DZIŚ"
            time="20:00"
            title="Retro Classics"
            rating="HD"
            id="retro"
          />
          <ScheduleRow
            date="FRI"
            time="21:30"
            title="NeoNoir Premiere"
            rating="NEW"
            id="neonoir"
          />
          <ScheduleRow
            date="TOM"
            time="23:00"
            title="Synthwave Sunrise"
            rating="LIVE"
            id="sun"
          />
        </div>
        <div className="list" aria-label="Interactive codes">
          <ScheduleRow time="14:30" title="Home & Headlines" rating="OK" id="100"  date="TBA"/>
          <ScheduleRow date="TBA"
            time="16:30"
            title="Channel Schedules"
            rating="OK"
            id="320"
          />
          <ScheduleRow date="TBA"
            time="19:30"
            title="Off-Air Archives"
            rating="NEW"
            id="404"
          />
          <ScheduleRow date="TBA"
            time="20:30"
            title="Live Chat Access"
            rating="HOT"
            id="505"
          />
          <ScheduleRow date="TBA"
            time="21:30"
            title="Parental Locks"
            rating="SEC"
            id="900"
          />
        </div>
      </div>
    </section>
  );
};

export default Schedule;
