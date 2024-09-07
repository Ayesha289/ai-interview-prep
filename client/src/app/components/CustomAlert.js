import React from 'react';

export default function CustomAlert({ message, isVisible, onClose }) {
    if (!isVisible) return null;

    return (
        <div style={alertStyle}>
            <p style={messageStyle}>{message}</p>
            <button onClick={onClose} style={closeButtonStyle}>OK</button>
        </div>
    );
}

const alertStyle = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#121212',
    color: 'white',
    padding: '20px',
    borderRadius: '10px', 
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)', 
    zIndex: 1500, 
    width: '320px', 
    textAlign: 'center',
    fontSize: '16px',
};

const messageStyle = {
    marginBottom: '20px',
    fontSize: '16px',
    lineHeight: '1.5',
};

const closeButtonStyle = {
    backgroundColor: '#00bcd4', 
    color: 'white',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '20px', 
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    float: 'right', 
};

closeButtonStyle['&:hover'] = {
    backgroundColor: '#0097a7', 
};
