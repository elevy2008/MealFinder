import React, { useState } from 'react';
import useWindowSize from '../utils/useWindowSize';

const MobileHeader = ({ isMenuOpen, toggleMenu }) => (
  <>
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={toggleMenu}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            outline: 'none',
          }}
          aria-label="Toggle menu"
        >
          <span style={{ width: '20px', height: '2px', backgroundColor: '#333', display: 'block', transition: 'transform 0.3s ease' }}></span>
          <span style={{ width: '20px', height: '2px', backgroundColor: '#333', display: 'block', opacity: isMenuOpen ? 0 : 1, transition: 'opacity 0.3s ease' }}></span>
          <span style={{ width: '20px', height: '2px', backgroundColor: '#333', display: 'block', transition: 'transform 0.3s ease' }}></span>
        </button>
        <h1 style={{ margin: '0 0 0 12px', fontSize: '1.2rem', color: 'blue' }}>MealFinder</h1>
      </div>
    </div>

    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'white',
        width: '280px',
        height: '100vh',
        boxShadow: isMenuOpen ? '2px 0 8px rgba(0, 0, 0, 0.2)' : 'none',
        padding: '20px',
        zIndex: 1000,
        transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: isMenuOpen ? 1 : 0.95,
      }}
    >
      <button
        onClick={toggleMenu}
        style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          background: 'transparent',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none',
        }}
        aria-label="Close menu"
      >
        ×
      </button>
      <nav style={{ marginTop: '60px' }}>
        <a
          href="https://www.yourwebsite.com"
          style={{
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: '#333',
            display: 'block',
            marginBottom: '25px',
            transition: 'color 0.2s ease',
          }}
        >
          Ethan Levy
        </a>
        <a
          href="/about"
          style={{
            textDecoration: 'none',
            color: '#007BFF',
            fontSize: '1rem',
            display: 'block',
            marginBottom: '20px',
            transition: 'color 0.2s ease',
            padding: '8px 0',
          }}
        >
          About
        </a>
        <a
          href="/faq"
          style={{
            textDecoration: 'none',
            color: '#007BFF',
            fontSize: '1rem',
            display: 'block',
            marginBottom: '20px',
            transition: 'color 0.2s ease',
            padding: '8px 0',
          }}
        >
          FAQ
        </a>
        <a
          href="/contact"
          style={{
            textDecoration: 'none',
            color: '#007BFF',
            fontSize: '1rem',
            display: 'block',
            marginBottom: '20px',
            transition: 'color 0.2s ease',
            padding: '8px 0',
          }}
        >
          Contact
        </a>
      </nav>
    </div>
    {isMenuOpen && (
      <div
        onClick={toggleMenu}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 999,
          transition: 'opacity 0.3s ease',
        }}
      />
    )}
  </>
);

const DesktopHeader = () => (
  <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <a href="https://www.yourwebsite.com" style={{ textDecoration: 'none', fontSize: '1rem', fontWeight: 'bold', color: '#333' }}>
        Ethan Levy
      </a>
      <nav style={{ display: 'flex', gap: '20px' }}>
        <a href="/about" style={{ textDecoration: 'none', color: '#007BFF', fontSize: '0.9rem' }}>About</a>
        <a href="/faq" style={{ textDecoration: 'none', color: '#007BFF', fontSize: '0.9rem' }}>FAQ</a>
        <a href="/contact" style={{ textDecoration: 'none', color: '#007BFF', fontSize: '0.9rem' }}>Contact</a>
      </nav>
    </div>
    <h1 style={{ margin: 0, fontSize: '1.5rem', color: 'blue' }}>MealFinder</h1>
    <div style={{ width: '200px' }} />
  </div>
);

const AppHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const width = useWindowSize();
  const isMobile = width <= 768;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: isMobile ? '0 12px' : '8px 24px',
        boxShadow: '0 1.6px 3.2px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        height: isMobile ? '50px' : '80px',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 1001,
      }}
    >
      {isMobile ? (
        <MobileHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      ) : (
        <DesktopHeader />
      )}
    </div>
  );
};

export default AppHeader;
