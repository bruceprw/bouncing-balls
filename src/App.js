// App.js
import React, { useState, useEffect } from 'react';
import Ball from './components/Ball';
import './App.css';

const App = () => {
  const GRAVITY_LEVELS = {
    low: 0.01,
    normal: 0.1,
    high: 0.5,
  };

  const [balls, setBalls] = useState([]);
  const [gravity, setGravity] = useState(GRAVITY_LEVELS.normal);

  
  const addBall = (event) => {
    const size = Math.random() * 20 + 10; // Random size between 10px and 30px
    const shouldGlow = Math.random() > 0.5;
    const newBall = {
      id: Math.random(),
      x: event.clientX,
      y: event.clientY,
      vx: (Math.random() - 0.3) * 10, // Random horizontal velocity
      vy: (Math.random() - 0.3) * 10, // Random vertical velocity
      color: `hsl(${Math.random() * 360}, 100%, 40%)`,
      size,
      shouldGlow
    };
    setBalls([...balls, newBall]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBalls((currentBalls) =>
        currentBalls.map((ball) => {
          let { x, y, vx, vy, size } = ball;
  
          // Update position based on velocity
          x += vx;
          y += vy;
  
          // Apply gravity effect
          vy += gravity; // Acceleration due to gravity

          // Bounce off the bottom, accounting for size
          if (y >= window.innerHeight - size) {
            y = window.innerHeight - size;
            vy *= -0.7; // Reverse and reduce the vertical velocity (simulate damping)
          }

  
          // Bounce off the sides, accounting for size
          if (x <= 0 || x >= window.innerWidth - size) {
            vx *= -1; // Reverse the horizontal velocity
          }
  
          // Prevent ball from sticking to the sides, accounting for size
          x = Math.max(0, Math.min(x, window.innerWidth - size));
  
          return { ...ball, x, y, vx, vy };
        })
      );
    }, 20);
  
    return () => clearInterval(interval);
  }, [balls, gravity]);
  

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 0, zIndex: 10 }}>
        <button className='button' onClick={() => setGravity(GRAVITY_LEVELS.low)}>Low Gravity</button>
        <button className='button' onClick={() => setGravity(GRAVITY_LEVELS.normal)}>Normal Gravity</button>
        <button className='button' onClick={() => setGravity(GRAVITY_LEVELS.high)}>High Gravity</button>
      </div>
      <div onClick={addBall} style={{ width: '100%', height: '100%', position: 'absolute', top: 0 }}>
        {balls.map((ball) => (
          <Ball
            key={ball.id}
            left={ball.x}
            top={ball.y}
            color={ball.color}
            size={ball.size}
            shouldGlow={ball.shouldGlow}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
