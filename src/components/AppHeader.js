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
        justifyContent: 'space-between',
        zIndex: 1000,
      }}
    >
      <a 
        href="https://www.yourwebsite.com" 
        style={{ 
          textDecoration: 'none', 
          fontSize: '1.2rem', 
          fontWeight: 'bold', 
          color: '#333' 
        }}
      >
        Ethan Levy
      </a>
      
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

      {isMenuOpen && isMobile && (
        <div
          style={{
            position: 'fixed',
            top: '40px',
            right: 0,
            backgroundColor: 'white',
            width: '200px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            padding: '16px',
            zIndex: 1000,
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <a href="/about" style={{ textDecoration: 'none', color: '#007BFF', fontSize: '0.9rem' }}>About</a>
            <a href="/faq" style={{ textDecoration: 'none', color: '#007BFF', fontSize: '0.9rem' }}>FAQ</a>
            <a href="/contact" style={{ textDecoration: 'none', color: '#007BFF', fontSize: '0.9rem' }}>Contact</a>
          </nav>
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

