import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Accueil from './pages/Accueil';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import './App.css'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;


