import React from 'react';

const AppTitle = () => {
  const titleContainerStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '8px 15px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const titleStyle = {
    margin: 0,
    fontSize: '40px',
    color: '#2196F3',
    fontWeight: 'bold',
  };

  const subtitleStyle = {
    margin: '2px 0 0 0',
    fontSize: '10px',
    color: '#666',
    textAlign: 'right',
  };

  return (
    <div style={titleContainerStyle}>
      <h1 style={titleStyle}>MealFinder –– Find Food Near You</h1>
      <p style={subtitleStyle}>by Ethan Levy</p>
    </div>
  );
};

export default AppTitle;
