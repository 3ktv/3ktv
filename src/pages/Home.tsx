import React from 'react';
import Hero from '../components/Hero';
import Schedule from '../components/Schedule';
import Channels from '../components/Channels';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Schedule />
      <Channels />
    </main>
  );
};

export default Home;
