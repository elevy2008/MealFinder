import React from 'react';

const HamburgerMenu = ({ onClick, isOpen }) => {
  const style = {
    position: 'fixed',
    top: '20px',
    left: '20px',
    zIndex: 1006, // Highest z-index to stay above all components including dialogs
    background: 'white',
    borderColor: 'black',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px'
  };

  
  
  return (
    <button 
      style={style} 
      onClick={onClick} 
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      ☰
    </button>
  );
};


export default HamburgerMenu;
