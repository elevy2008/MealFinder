import React, { useEffect } from 'react';
import LocationCard from './LocationCard';
import { verifyAccordionState } from '../utils/accordionVerification';

const AccordionList = ({ locations, isLoading, onViewMap }) => {
  useEffect(() => {
    // Verify the accordion state after it has rendered
    setTimeout(() => {
      const state = verifyAccordionState();
      console.log('Accordion verification results:', state);
    }, 500);
  }, []);

  const accordionStyle = {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'margin 0.3s ease',
    position: 'relative',
    zIndex: 1002,
  };

  const headerStyle = {
    padding: '15px',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #dee2e6',
    userSelect: 'none',
    transition: 'all 0.3s ease',
    position: 'relative',
    zIndex: 1002,
    ':hover': {
      backgroundColor: '#e9ecef',
    },
  };

  const contentStyle = {
    maxHeight: 'calc(100vh - 200px)',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    position: 'relative',
    zIndex: 1002,
    transform: 'translateY(0)',
    opacity: 1,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const arrowStyle = {
    transform: 'rotate(180deg)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '20px',
    color: '#495057',
  };

  const contentContainerStyle = {
    padding: '10px',
    transition: 'padding 0.3s ease',
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
        <span style={arrowStyle} aria-hidden="true">▼</span>
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
