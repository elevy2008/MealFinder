import React from 'react';

const LocationCard = ({ location, onViewMap }) => {
  const cardStyle = {
    padding: '15px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    backgroundColor: 'white',
  };

  return (
    <div style={cardStyle}>
      <h3>{location.Location}</h3>
      <p>Time: {location.Time}</p>
      <p>Route: {location.Route}</p>
      <button 
        onClick={() => onViewMap(location)}
        style={{
          background: '#4285F4',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        View on Map
      </button>
    </div>
  );
};

export default LocationCard;
