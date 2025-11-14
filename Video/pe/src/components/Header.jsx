import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    // Giao diện Bootstrap cho thanh điều hướng [cite: 22]
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Logo</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/videos">Videos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/comment">Comment Form</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;