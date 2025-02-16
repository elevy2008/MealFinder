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
    paddingBottom: '80px', // Add padding for close button
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease-in-out',
    zIndex: 999,
    overflowY: 'auto' // Enable scrolling if content is too long
  };

  const menuItemStyle = {
    padding: '10px 0',
    borderBottom: '1px solid #eee',
    cursor: 'pointer'
  };

  return (
    <div style={style}>
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <img 
          src={`${process.env.PUBLIC_URL}/images/logo.svg`} 
          alt="MealFinder Logo" 
          style={{
            width: '80px',
            height: '80px',
            marginBottom: '10px'
          }}
        />
        <h2 style={{ margin: 0 }}>MealFinder</h2>
      </div>
      <div style={menuItemStyle}>About</div>
      <div style={menuItemStyle}>FAQs</div>
      <div style={menuItemStyle}>Contact</div>
      <button 
        onClick={onClose}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          width: 'calc(250px - 40px)', // Match menu width minus padding
          padding: '12px 20px',
          backgroundColor: '#4285F4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' // Add shadow for better visibility
        }}
      >
        Close Menu
      </button>
    </div>
  );
};

export default MenuContent;
