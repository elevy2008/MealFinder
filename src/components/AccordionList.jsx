import React from 'react';
import LocationCard from './LocationCard';

const AccordionList = ({ locations, isLoading, onViewMap }) => {
  const accordionStyle = {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'relative',
    zIndex: 1002, // Ensure it's above map
  };

  const headerStyle = {
    padding: '15px',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #dee2e6',
    position: 'relative',
    zIndex: 1002,
  };

  const contentStyle = {
    maxHeight: 'calc(100vh - 200px)',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    position: 'relative',
    zIndex: 1002,
    background: 'white',
  };

  const contentContainerStyle = {
    padding: '10px',
  };

  return (
    <div
      style={accordionStyle}
      data-testid="accordion-container"
      role="region"
      aria-label="Food truck locations list"
    >
      <div
        style={headerStyle}
        role="heading"
        aria-level={2}
      >
        <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#212529' }}>Food Truck Locations</h2>
      </div>
      <div style={contentStyle}>
        <div style={contentContainerStyle}>
          {isLoading ? (
            <p style={{ textAlign: 'center', padding: '20px' }}>Loading locations...</p>
          ) : (
            locations.map((location, index) => (
              <LocationCard
                key={index}
                location={location}
                distance={location.distance.toFixed(2)+2}
                duration={Math.round(location.distance / 3.1 * 60)+5}
                isClose={location.isClose}
                onViewMap={onViewMap}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AccordionList;
