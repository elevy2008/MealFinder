import React from 'react';

const ToggleSwitch = ({ mode, setMode }) => {
  const handleToggle = () => {
    setMode(mode === 'need-help' ? 'want-to-help' : 'need-help');
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      marginBottom: '10px'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: '5px'
      }}>
        <span style={{ 
          color: mode === 'need-help' ? '#4285F4' : '#666',
          fontWeight: mode === 'need-help' ? 'bold' : 'normal',
          marginRight: '10px',
          fontSize: '0.9rem'
        }}>
          I need help
        </span>

        <div 
          onClick={handleToggle}
          style={{
            position: 'relative',
            width: '50px',
            height: '24px',
            backgroundColor: mode === 'need-help' ? '#4285F4' : '#28a745',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            display: 'flex',
            alignItems: 'center',
            padding: '0 2px'
          }}
        >
          <div style={{
            position: 'absolute',
            left: mode === 'need-help' ? '2px' : 'calc(100% - 22px)',
            width: '20px',
            height: '20px',
            backgroundColor: 'white',
            borderRadius: '50%',
            transition: 'left 0.3s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
          }} />
        </div>

        <span style={{ 
          color: mode === 'want-to-help' ? '#28a745' : '#666',
          fontWeight: mode === 'want-to-help' ? 'bold' : 'normal',
          marginLeft: '10px',
          fontSize: '0.9rem'
        }}>
          I want to help
        </span>
      </div>
    </div>
  );
};

export default ToggleSwitch;