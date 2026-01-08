import React from 'react';
import Hero from '../components/Hero';
import Schedule from '../components/Schedule';
import Channels from '../components/Channels';

import Referrals from '../components/Referrals';
import Ideas from '../components/Ideas';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Referrals />
      <Schedule />
      <Channels />
      <Ideas />
    </main>
  );
};

export default Home;
