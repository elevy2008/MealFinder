import React, { useState } from 'react';
import { calculateDepartureTime } from '../utils/timeCalculations';


const LocationCard = ({ location, distance, duration, isClose, onViewMap }) => {
  const [isVisible, setIsVisible] = useState(true);
  const departureTime = calculateDepartureTime(location.Time, duration);
  const durationMinutes = parseInt(duration);
  const isTooFar = durationMinutes > 120;

  return (
    <div className="location-card" style={{
      border: '1px solid #ccc',
      padding: '15px',
      margin: '10px 0',
      borderRadius: '8px'
    }}>
      <h3>{location.Location}</h3>
      <p>Route: {location.Route}</p>
      <p>Time: {location.Time}</p>
      <p>Distance: {distance} miles</p>
      <p>Walking Duration: {duration+7} minutes</p>

      {/* Add the new departure time information */}
      <p style={{
        color: isTooFar ? 'red' :
               (departureTime.includes('Leave in') && parseInt(departureTime.split(' ')[2]) < 10) ? 'red' : 'inherit',
        fontWeight: 'bold'
      }}>
        {isTooFar ? "Too Far" : departureTime}
      </p>
      <button
        style={buttonStyle}
        onClick={() => onViewMap(location)}
      >
        View on Map
      </button>
    </div>
  );


  if (!isVisible) return null;

  const cardStyle = {
    position: 'relative',
    border: isClose ? '3px solid #39FF14' : '1px solid #ccc', // More neon green color and thicker border
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: isClose ? 'rgba(57, 255, 20, 0.05)' : 'white', // Subtle background for closest locations
    boxShadow: isClose ? '0 2px 8px rgba(57, 255, 20, 0.2)' : '0 2px 4px rgba(0,0,0,0.1)', // Enhanced shadow for closest locations
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    color: '#666',
    padding: '5px',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
      backgroundColor: '#f0f0f0',
    }
  };

  const titleStyle = {
    margin: '0 0 10px 0',
    fontSize: '16px',
    fontWeight: 'bold',
    paddingRight: '20px', // Make room for close button
  };

  const detailStyle = {
    margin: '5px 0',
    fontSize: '14px',
  };

  const buttonStyle = {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const distanceStyle = {
    color: '#666',
    fontSize: '14px',
    fontStyle: 'italic',
    marginBottom: '5px'
  };

  const durationStyle = {
    color: '#2196F3',  // Blue color to make it stand out
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '10px'
  };

  return (
    <div style={cardStyle}>
      <button
        style={closeButtonStyle}
        onClick={() => setIsVisible(false)}
        aria-label="Close"
      >
        ×
      </button>
      <h3 style={titleStyle}>{location.Location}</h3>
      <p style={detailStyle}>Time: {location.Time}</p>
      <p style={detailStyle}>Route: {location.Route}</p>
      {distance && <p style={distanceStyle}>Distance: {distance} miles</p>}
      {duration && <p style={durationStyle}>Walking time: {duration + 7} minutes</p>}

      <button
        style={buttonStyle}
        onClick={() => onViewMap(location)}
      >
        View on Map
      </button>
    </div>
  );
};

export default LocationCard;
