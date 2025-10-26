import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Squad from './pages/Squad';
import PlayerDetail from './pages/PlayerDetail';
import Matches from './pages/Matches';
import IconicMoments from './pages/IconicMoments';
import Statistics from './pages/Statistics';
import Comparison from './pages/Comparison';
import News from './pages/News';
import FanZone from './pages/FanZone';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/squad" element={<Squad />} />
            <Route path="/player/:id" element={<PlayerDetail />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/iconic-moments" element={<IconicMoments />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/news" element={<News />} />
            <Route path="/fan-zone" element={<FanZone />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
