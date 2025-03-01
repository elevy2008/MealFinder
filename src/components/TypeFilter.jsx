import React from 'react';

const TypeFilter = ({ selectedTypes = mode === 'need-help' ? ['food_truck'] : [], onTypeSelect, mode }) => {
  // Render different filters based on mode
  const renderNeedHelpFilters = () => (
    <>
      <label style={{ display: 'block', marginBottom: '5px' }}>
        <input 
          type="checkbox"
          checked={selectedTypes.includes('food_truck')}
          onChange={() => onTypeSelect('food_truck')}
        /> Food Trucks 🟦
      </label>
      <label style={{ display: 'block', marginBottom: '5px' }}>
        <input 
          type="checkbox"
          checked={selectedTypes.includes('pantry')}
          onChange={() => onTypeSelect('pantry')}
        /> Food Pantries 🔴
      </label>
      <label style={{ display: 'block' }}>
        <input 
          type="checkbox"
          checked={selectedTypes.includes('shelter')}
          onChange={() => onTypeSelect('shelter')}
        /> Shelters 🔶
      </label>
    </>
  );

  const renderWantToHelpFilters = () => (
    <>
      <div style={{ marginBottom: '10px' }}>
        <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>Ways to Help</h4>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          <input 
            type="checkbox"
            checked={selectedTypes.includes('volunteer')}
            onChange={() => onTypeSelect('volunteer')}
          /> Volunteer Opportunities 🟢
        </label>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          <input 
            type="checkbox"
            checked={selectedTypes.includes('donation')}
            onChange={() => onTypeSelect('donation')}
          /> Donation Centers 🟣
        </label>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          <input 
            type="checkbox"
            checked={selectedTypes.includes('advocacy')}
            onChange={() => onTypeSelect('advocacy')}
          /> Advocacy Organizations 🟡
        </label>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          <input 
            type="checkbox"
            checked={selectedTypes.includes('support')}
            onChange={() => onTypeSelect('support')}
          /> Support Services (Long-Term Shelters) ⚪
        </label>
        <label style={{ display: 'block' }}>
          <input 
            type="checkbox"
            checked={selectedTypes.includes('community')}
            onChange={() => onTypeSelect('community')}
          /> Community Resources (Short-Term Shelters) 🟠
        </label>
      </div>
    </>
  );

  // Set initial selected types based on mode
  React.useEffect(() => {
    if (mode === 'need-help') {
      onTypeSelect('food_truck');
    }
  }, [mode]);

  return (
    <div style={{ 
        position: 'fixed',
        top: '80px',
        left: '20px',
        zIndex: 998,
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '4px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
      }}>
      {mode === 'need-help' ? renderNeedHelpFilters() : renderWantToHelpFilters()}
    </div>
  );
};

export default TypeFilter;