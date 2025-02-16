import React from 'react';
import { calculateTimes, formatTime } from '../utils/timeCalculations';

const LocationCard = ({ location, distance, isClose, onViewMap }) => {
  const times = calculateTimes(distance);
  const leaveAtTime = formatTime(times.leaveAt);

  return (
    <div className={`location-card ${isClose ? 'closest-location' : ''}`}>
      <h3>{location.Location}</h3>
      <p>Time: {location.Time}</p>
      <p>Route: {location.Route}</p>
      <p>Distance: {times.distance} miles</p>
      <p>Walking time: ~{times.duration} minutes</p>
      <p>Buffer time: {times.buffer} minutes</p>
      <p className="leave-at">Leave at: {leaveAtTime} to arrive on time</p>
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
