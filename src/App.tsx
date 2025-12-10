import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProgramDetails from './pages/ProgramDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/program/:id" element={<ProgramDetails />} />
        </Routes>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
