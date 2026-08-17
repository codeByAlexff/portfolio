import React from 'react';

export default function Popup ({ isOpen, message = 'Copied to clipboard', position ='bottom'}) {
    const isTop = position === 'top';
    return (
            <div style={{ ...styles.toast, ...(isTop ? styles.top : styles.bottom),...(isOpen ? (isTop ? styles.topVisible : styles.bottomVisible) : (isTop ? styles.top : styles.bottom)),

            }}>
                    {message}
                </div>
    );
}

const styles = {
  toast: {
    position: 'fixed',
    left: '50%',
    padding: '10px 18px',
    borderRadius: '8px',
    backgroundColor: 'var(--code-bg)',
    color: 'var(--text-h)',
    border: '1px solid var(--accent-border)',
    fontFamily: 'var(--mono)',
    fontSize: '15px',
    boxShadow: 'var(--shadow)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    pointerEvents: 'none',
    zIndex: 1000,
    whiteSpace: 'nowrap',
    opacity: 0,
  },
  bottom: {
    bottom: '24px',
    transform: 'translateX(-50%) translateY(20px)',
    opacity: 0,
  },
  bottomVisible: {
    opacity: 1,
    transform: 'translateX(-50%) translateY(0)',
  },
  top: {
    top: '24px',
    transform: 'translateX(-50%) translateY(-20px)',
    opacity: 0,
  },
  topVisible: {
    opacity: 1,
    transform: 'translateX(-50%) translateY(0)',
  },
};