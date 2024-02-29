import React from 'react';

const Ball = ({ left, top, color, size, shouldGlow }) => {
    const style = {
      position: 'absolute',
      borderRadius: '50%',
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      left: `${left}px`,
      top: `${top}px`,
      boxShadow: shouldGlow ? `0 0 5px ${color}` : 'none'
    };
  
    return <div style={style} />;
  };
  

export default Ball;
