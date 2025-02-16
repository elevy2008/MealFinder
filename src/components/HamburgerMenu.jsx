import React, { useState } from 'react';
import ReactModal from 'react-modal';

const HamburgerMenu = ({ onLocationPermission }) => {
  const [showLocationModal, setShowLocationModal] = useState(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const handleLocationPermission = (granted) => {
    setShowLocationModal(false);
    setShowWelcomeModal(true);
    if (onLocationPermission) {
      onLocationPermission(granted);
    }
  };

  return (
    <>
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
        onRequestClose={() => setShowWelcomeModal(false)}
        contentLabel="Welcome"
        className="welcome-modal"
      >
        <div className="modal-content">
          <h2>Welcome to MealFinder</h2>
          <p>View and find food truck locations on the map.</p>
          <button 
            onClick={() => setShowWelcomeModal(false)}
            className="close-button"
          >
            Got It!
          </button>
        </div>
      </ReactModal>
    </>
  );
};

export default HamburgerMenu;
