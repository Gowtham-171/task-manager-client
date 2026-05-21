import React, { useState } from "react";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((previous) => !previous);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header>
      <div className="header-container">
        <h2 className="logo">TM</h2>
        <h2 className="title">TaskManager</h2>
      </div>

      <div className={`hamburger${menuOpen ? " active" : ""}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <nav className={`nav-container${menuOpen ? " active" : ""}`}>
        <ul className="nav-links">
          <li>
            <p className="active-nav" onClick={closeMenu}>Dashboard</p>
          </li>
          <li>
            <p onClick={closeMenu}>Tasks</p>
          </li>
          <li>
            <p onClick={closeMenu}>Profile</p>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
