import React from 'react';

const WelcomePopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out'
  };

  const contentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '90%',
    position: 'relative',
    transform: 'translateY(0)',
    transition: 'transform 0.3s ease-in-out'
  };

  const buttonStyle = {
    background: '#4285F4',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  };

  return (
    <div 
      style={overlayStyle}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to MealFinder"
    >
      <div 
        style={contentStyle}
        onClick={e => e.stopPropagation()}
      >
        <h2 style={{ marginTop: 0 }}>Welcome to MealFinder!</h2>
        <p>Here's how to use the app:</p>
        <ul>
          <li>The map shows all available food truck locations</li>
          <li>Your current location is used to find the nearest trucks</li>
          <li>Click the hamburger menu (☰) to access About, FAQs, and Contact info</li>
          <li>Use the location list on the right to see details about each truck</li>
          <li>Click "View on Map" to center the map on a specific location</li>
          <li>Use the "Center to My Location" button to return to your position</li>
        </ul>
        <button
          style={buttonStyle}
          onClick={onClose}
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup;
