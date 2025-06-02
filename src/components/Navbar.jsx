import React from "react";
import './Navbar.css';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={Logo} alt="Logo PornQuiz" className="logo" />
        <span className="nav-title">PornQuiz</span>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/profile">Profil</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
