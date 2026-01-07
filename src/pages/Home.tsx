import React from 'react';
import Hero from '../components/Hero';
import Schedule from '../components/Schedule';
import Channels from '../components/Channels';

import Referrals from '../components/Referrals';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Referrals />
      <Schedule />
      <Channels />
    </main>
  );
};

export default Home;
