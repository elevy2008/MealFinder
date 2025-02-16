import React from 'react';

const MenuContent = ({ onClose }) => {
  return (
    <div className="menu-content" role="dialog" aria-label="Main Menu">
      <h2>MealFinder</h2>
      <nav aria-label="Menu Navigation">
        <ul>
          <li>
            <button 
              onClick={() => onClose()}
              aria-label="Home"
              className="menu-button"
            >
              Home
            </button>
          </li>
          <li>
            <button 
              onClick={() => onClose()}
              aria-label="About MealFinder"
              className="menu-button"
            >
              About
            </button>
          </li>
          <li>
            <button 
              onClick={() => onClose()}
              aria-label="Frequently Asked Questions"
              className="menu-button"
            >
              FAQs
            </button>
          </li>
          <li>
            <button 
              onClick={() => onClose()}
              aria-label="Contact Information"
              className="menu-button"
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>
      <button 
        onClick={onClose}
        className="close-menu-button"
        aria-label="Close Menu"
      >
        Close
      </button>
    </div>
  );
};

export default MenuContent;
