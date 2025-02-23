import React from 'react';

const TypeFilter = ({ selectedTypes, onTypeSelect }) => {
  return (
    <div style={{ 
      position: 'fixed', 
      top: '80px', // Moved below hamburger menu
      left: '20px', 
      zIndex: 998, // Below menu but above map
      backgroundColor: 'white',
      padding: '10px',
      borderRadius: '4px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
    }}>
      <label style={{ display: 'block', marginBottom: '5px' }}>
        <input 
          type="checkbox"
          checked={selectedTypes.includes('food_truck')}
          onChange={() => onTypeSelect('food_truck')}
        /> Food Trucks
      </label>
      <label style={{ display: 'block', marginBottom: '5px' }}>
        <input 
          type="checkbox"
          checked={selectedTypes.includes('pantry')}
          onChange={() => onTypeSelect('pantry')}
        /> Food Pantries
      </label>
      <label style={{ display: 'block' }}>
        <input 
          type="checkbox"
          checked={selectedTypes.includes('shelter')}
          onChange={() => onTypeSelect('shelter')}
        /> Shelters
      </label>
    </div>
  );
};

export default TypeFilter;
