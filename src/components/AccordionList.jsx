import React, { useState } from 'react';
import LocationCard from './LocationCard';

const AccordionList = ({ locations, isLoading, onViewMap }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const accordionStyle = {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'margin 0.3s ease',
  };

  const contentStyle = {
    maxHeight: isExpanded ? '80vh' : '0',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    overflowY: isExpanded ? 'auto' : 'hidden',
  };

  return (
    <div style={accordionStyle}>
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          padding: '15px',
          backgroundColor: '#f8f9fa',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ margin: 0 }}>Food Truck Locations</h2>
        <span>{isExpanded ? '▼' : '▲'}</span>
      </div>
      <div style={contentStyle}>
        {isLoading ? (
          <p style={{ textAlign: 'center', padding: '20px' }}>Loading locations...</p>
        ) : (
          locations.map((location, index) => (
            <LocationCard
              key={index}
              location={location}
              onViewMap={onViewMap}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AccordionList;
