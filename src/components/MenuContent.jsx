import React from 'react';

const MenuContent = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const style = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '250px',
    height: '100vh',
    backgroundColor: 'white',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease-in-out',
    zIndex: 999
  };

  const menuItemStyle = {
    padding: '10px 0',
    borderBottom: '1px solid #eee',
    cursor: 'pointer'
  };

  return (
    <div style={style}>
      <h2 style={{ marginBottom: '20px' }}>MealFinder</h2>
      <div style={menuItemStyle}>About</div>
      <div style={menuItemStyle}>FAQs</div>
      <div style={menuItemStyle}>Contact</div>
      <button 
        onClick={onClose}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          padding: '10px 20px',
          backgroundColor: '#4285F4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Close Menu
      </button>
    </div>
  );
};

export default MenuContent;
