import React, { useEffect, useRef } from 'react';

const Dialog = ({ 
  isOpen, 
  onClose, 
  title,
  description,
  children 
}) => {
  const previousFocusRef = useRef();

  useEffect(() => {
    if (isOpen) {
      // Store the current focused element
      previousFocusRef.current = document.activeElement;
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      // Focus the dialog
      dialogRef.current?.focus();
    } else {
      // Restore body scroll
      document.body.style.overflow = 'unset';
      // Restore focus
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const dialogRef = useRef();

  if (!isOpen) return null;

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      role="dialog"
      ref={dialogRef}
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      tabIndex="-1"
      onKeyDown={handleKeyDown}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        opacity: 1,
        transition: 'opacity 0.3s ease-in-out'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '500px',
          width: '90%',
          position: 'relative',
          transform: 'translateY(0)',
          transition: 'transform 0.3s ease-in-out'
        }}
        onClick={e => e.stopPropagation()}
      >
        <h2 id="dialog-title" style={{ marginTop: 0 }}>{title}</h2>
        <div id="dialog-description">{description}</div>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
