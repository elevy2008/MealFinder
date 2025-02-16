import React from 'react';

const LocationCard = ({ location, distance, duration, isClose, onViewMap }) => {
  return (
    <div className="location-card">
      <h3>{location.Location}</h3>
      <p>Time: {location.Time}</p>
      <p>Route: {location.Route}</p>
      <p>Distance: {distance} miles</p>
      <p>Walking time: ~{duration} minutes</p>
      <button 
        className="view-map-btn"
        onClick={() => onViewMap(location)}
      >
        View on Map
      </button>
    </div>
  );
};

export default LocationCard;
