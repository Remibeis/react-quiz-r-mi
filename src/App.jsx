import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Accueil from './pages/Accueil';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Quiz1 from './pages/Quiz1';
import Quiz2 from './pages/Quiz2.jsx';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/quiz1" element={<Quiz1 />} />
        <Route path="/quiz2" element={<Quiz2 />} />
        <Route path="/" element={<Accueil />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;


