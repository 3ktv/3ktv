import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProgramDetails from './pages/ProgramDetails';
import AllSchedule from './pages/AllSchedule';
import StreamingCrew from './pages/StreamingCrew';
import Webmail from './pages/Webmail';
import { fetchAndStoreSchedule } from './services/api';

import PikabooLucek from './components/PikabooLucek';

function App() {
  useEffect(() => {
    fetchAndStoreSchedule();
  }, []);

  return (
    <Router>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<AllSchedule />} />
          <Route path="/crew" element={<StreamingCrew />} />
          <Route path="/program/:id" element={<ProgramDetails />} />
          <Route path="/webmail" element={<Webmail />} />
        </Routes>
        <Footer />
        <PikabooLucek />
      </Layout>
    </Router>
  );
}

export default App;
