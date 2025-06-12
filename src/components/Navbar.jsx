import './Navbar.css';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import ThemeSelector from './ThemeSelector';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={Logo} alt="Logo PornQuiz" className="logo" />
        <span className="nav-title">PornQuiz</span>
      </div>

      <div className="navbar-center">
        <ul className="navbar-links">
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/leaderboard">Classement</Link></li>
        </ul>
      </div>

      <div className="navbar-right">
        <ThemeSelector />
      </div>
    </nav>
  );
}

export default Navbar;
