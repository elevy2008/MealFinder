import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

const HamburgerMenu = ({ onLocationPermission }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLocationPermission = (granted) => {
    setShowLocationModal(false);
    setShowWelcomeModal(true);
    if (onLocationPermission) {
      onLocationPermission(granted);
    }
  };

  const closeWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  const menuStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    zIndex: 1000,
    background: 'white',
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
    <>
      <button 
        style={menuStyle} 
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        ☰
      </button>

      <ReactModal 
        isOpen={showLocationModal}
        onRequestClose={() => handleLocationPermission(false)}
        contentLabel="Location Permission"
        className="permission-modal"
      >
        <div className="modal-content">
          <h2>Enable Location Services</h2>
          <p>MealFinder needs your location to show nearby food trucks.</p>
          <div className="button-group">
            <button 
              onClick={() => handleLocationPermission(true)}
              className="primary-button"
            >
              Allow Location
            </button>
            <button 
              onClick={() => handleLocationPermission(false)}
              className="secondary-button"
            >
              Use Default Location
            </button>
          </div>
        </div>
      </ReactModal>

      <ReactModal 
        isOpen={showWelcomeModal}
        onRequestClose={closeWelcomeModal}
        contentLabel="Welcome"
        className="welcome-modal"
      >
        <div className="modal-content">
          <h2>Welcome to MealFinder</h2>
          <div className="instructions">
            <h3>How to use:</h3>
            <ul>
              <li>View food truck locations sorted by distance</li>
              <li>Click "View on Map" to locate trucks</li>
              <li>Check "Leave at" times to plan your walk</li>
              <li>Use menu (☰) for more information</li>
            </ul>
            <p className="tip">Tip: Plan ahead using the "Leave at" times which include a buffer for unexpected delays.</p>
          </div>
          <button className="close-button" onClick={closeWelcomeModal}>Got It!</button>
        </div>
      </ReactModal>

      <ReactModal 
        isOpen={isOpen}
        onRequestClose={toggleMenu}
        contentLabel="Menu"
        className="menu-modal"
      >
        <div className="menu-content" role="dialog" aria-label="Main Menu">
          <h2>MealFinder</h2>
          <nav aria-label="Menu Navigation">
            <ul>
              <li>
                <button onClick={toggleMenu} className="menu-button">
                  Home
                </button>
              </li>
              <li>
                <button onClick={toggleMenu} className="menu-button">
                  About
                </button>
              </li>
              <li>
                <button onClick={toggleMenu} className="menu-button">
                  FAQs
                </button>
              </li>
              <li>
                <button onClick={toggleMenu} className="menu-button">
                  Contact
                </button>
              </li>
            </ul>
          </nav>
          <button 
            onClick={toggleMenu}
            className="close-menu-button"
            aria-label="Close Menu"
          >
            Close
          </button>
        </div>
      </ReactModal>
    </>
  );
};

export default HamburgerMenu;
