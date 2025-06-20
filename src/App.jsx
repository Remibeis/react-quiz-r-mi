import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Accueil from './pages/Accueil';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Quiz1 from './pages/Quiz1';
import Quiz2 from './pages/Quiz2.jsx';
import Leaderboard from './pages/leaderboard.jsx';
import LevelSelect from './pages/LevelSelect';


function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <Routes>
        <Route path="/quiz1" element={<Quiz1 />} />
        <Route path="/quiz2" element={<Quiz2 />} />
        <Route path="/" element={<Accueil />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/choix-niveau" element={<LevelSelect />} />
      </Routes>
    </div>
  );
}

export default App;
