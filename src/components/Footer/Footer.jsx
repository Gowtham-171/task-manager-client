import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <h4>TaskManager</h4>
          <p className="footer-p">Organize your work and life, finally.</p>
        </div>
        <div className="footer-content">
          <h4>Features</h4>
          <ul>
            <li><p>Task Management</p></li>
            <li><p>Team Collaboration</p></li>
            <li><p>Analytics</p></li>
            <li><p>Integrations</p></li>
          </ul>
        </div>
        <div className="footer-content">
          <h4>Resources</h4>
          <ul>
            <li><p>Documentation</p></li>
            <li><p>Tutorials</p></li>
            <li><p>API Reference</p></li>
            <li><p>Support</p></li>
          </ul>
        </div>
        <div className="footer-content">
          <h4>Company</h4>
          <ul>
            <li><p>About Us</p></li>
            <li><p>Careers</p></li>
            <li><p>Privacy Policy</p></li>
            <li><p>Terms of Service</p></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyrights">
          <p>© {currentYear} TaskManager. All rights reserved. Built with ❤️ for productivity.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
