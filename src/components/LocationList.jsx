import React from 'react';
import LocationCard from './LocationCard';

const LocationList = ({ locations, userLocation, onViewMap }) => {
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return (d * 0.621371).toFixed(2); // Convert to miles and round to 2 decimal places
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const calculateDuration = (distance) => {
    // Assuming average walking speed of 3.1 miles per hour
    const hours = distance / 3.1;
    const minutes = Math.round(hours * 60);
    return `${minutes} minutes`;
  };

  // Sort locations by distance from user
  const sortedLocations = [...locations].map(location => {
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      location.lat,
      location.lng
    );
    return {
      ...location,
      distance: parseFloat(distance),
      duration: calculateDuration(parseFloat(distance)),
      isClose: false // Will be set after sorting
    };
  }).sort((a, b) => a.distance - b.distance)
    .map((location, index) => ({
      ...location,
      isClose: index < 5 // Mark top 5 as closest
    }));

  const containerStyle = {
    padding: '20px',
    maxHeight: 'calc(100vh - 40px)',
    overflowY: 'auto',
    boxSizing: 'border-box'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ margin: '0 0 20px 0' }}>Nearby Food Trucks</h2>
      {sortedLocations.map((location, index) => (
        <LocationCard
          key={index}
          location={location}
          distance={location.distance.toFixed(2)}
          duration={location.duration}
          isClose={location.isClose}
          onViewMap={onViewMap}
        />
      ))}
    </div>
  );
};

export default LocationList;
