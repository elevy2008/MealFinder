import React, { useState, useEffect } from 'react';

const AppHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '8px 24px',
        boxShadow: '0 1.6px 3.2px rgba(0, 0, 0, 0.1)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '40px',
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <button
        onClick={toggleMenu}
        style={{
          position: 'absolute',
          left: '12px',
          background: 'transparent',
          border: 'none',
          padding: '8px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <span style={{ width: '20px', height: '2px', backgroundColor: '#333', display: 'block' }}></span>
        <span style={{ width: '20px', height: '2px', backgroundColor: '#333', display: 'block' }}></span>
        <span style={{ width: '20px', height: '2px', backgroundColor: '#333', display: 'block' }}></span>
      </button>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: 'blue' }}>MealFinder</h1>
        <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#666' }}>Find your next meal with ease</p>
      </div>
      
      {isMobile && (
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
          }}
        >
          <span style={{ width: '20px', height: '2px', backgroundColor: '#333', display: 'block' }}></span>
          <span style={{ width: '20px', height: '2px', backgroundColor: '#333', display: 'block' }}></span>
          <span style={{ width: '20px', height: '2px', backgroundColor: '#333', display: 'block' }}></span>
        </button>
      )}

      {isMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: 'white',
            width: '250px',
            height: '100vh',
            boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',
            padding: '16px',
            zIndex: 1001,
            transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <button
            onClick={toggleMenu}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
          <div style={{ marginTop: '40px' }}>
            <a
              href="https://www.yourwebsite.com"
              style={{
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#333',
                display: 'block',
                marginBottom: '20px',
              }}
            >
              Ethan Levy
            </a>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <a href="/about" style={{ textDecoration: 'none', color: '#007BFF', fontSize: '0.9rem' }}>About</a>
              <a href="/faq" style={{ textDecoration: 'none', color: '#007BFF', fontSize: '0.9rem' }}>FAQ</a>
              <a href="/contact" style={{ textDecoration: 'none', color: '#007BFF', fontSize: '0.9rem' }}>Contact</a>
            </nav>
          </div>
        </div>
      )}

      {!isMobile && (
        <nav style={{ display: 'flex', gap: '20px' }}>
          <a href="/about" style={{ textDecoration: 'none', color: '#007BFF', fontSize: '0.9rem' }}>About</a>
          <a href="/faq" style={{ textDecoration: 'none', color: '#007BFF', fontSize: '0.9rem' }}>FAQ</a>
          <a href="/contact" style={{ textDecoration: 'none', color: '#007BFF', fontSize: '0.9rem' }}>Contact</a>
        </nav>
      )}
    </div>
  );
};

export default AppHeader;

