import React, { useState } from "react";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
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

      <div
        className={`hamburger${menuOpen ? " active" : ""}`}
        onClick={toggleMenu}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <nav className={`nav-container${menuOpen ? " active" : ""}`}>
        <ul className="nav-links">
          <li>
            <a href="#" className="active-nav" onClick={closeMenu}>
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" onClick={closeMenu}>
              Tasks
            </a>
          </li>
          <li>
            <a href="#" onClick={closeMenu}>
              Profile
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
