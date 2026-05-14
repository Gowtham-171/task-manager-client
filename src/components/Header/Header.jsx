import React, { useState } from 'react';
import './Header.css';

function Header({ currentPage, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (page) => {
    navigate(page);
    setMenuOpen(false);
  };

  return (
    <header>
      <div className="header-container">
        <h2 className="logo">TM</h2>
        <h2 className="title">TaskManager</h2>
      </div>

      <div
        className={`hamburger ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <nav className={`nav-container ${menuOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <li>
            <a
              href="#dashboard"
              className={currentPage === 'dashboard' ? 'active-nav' : ''}
              onClick={() => handleNav('dashboard')}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#tasks"
              className={currentPage === 'tasks' ? 'active-nav' : ''}
              onClick={() => handleNav('tasks')}
            >
              Tasks
            </a>
          </li>
          <li>
            <a
              href="#profile"
              className={currentPage === 'profile' ? 'active-nav' : ''}
              onClick={() => handleNav('profile')}
            >
              Profile
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
