import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProgramDetails from './pages/ProgramDetails';
import AllSchedule from './pages/AllSchedule';
import { fetchAndStoreSchedule } from './services/api';

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
          <Route path="/program/:id" element={<ProgramDetails />} />
        </Routes>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
