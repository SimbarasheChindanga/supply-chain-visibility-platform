import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar" style={{
      display: 'flex',
      gap: '1rem',
      padding: '0.5rem 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      marginBottom: '1rem'
    }}>
      <Link to="/" style={{
        color: location.pathname === '/' ? 'white' : 'rgba(255, 255, 255, 0.7)',
        textDecoration: 'none',
        padding: '0.5rem 1.2rem',
        borderRadius: '8px',
        background: location.pathname === '/' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
        fontSize: '0.95rem'
      }}>
        📦 Dashboard
      </Link>
      <Link to="/analytics" style={{
        color: location.pathname === '/analytics' ? 'white' : 'rgba(255, 255, 255, 0.7)',
        textDecoration: 'none',
        padding: '0.5rem 1.2rem',
        borderRadius: '8px',
        background: location.pathname === '/analytics' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
        fontSize: '0.95rem'
      }}>
        📊 Analytics
      </Link>
    </nav>
  );
}

export default Navbar;