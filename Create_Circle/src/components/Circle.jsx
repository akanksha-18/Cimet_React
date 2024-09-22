import React, { useState, useRef } from 'react';

const Circle = () => {
  const [circles, setCircles] = useState([]);
  const [undoneCircles, setUndoneCircles] = useState([]);
  const buttonAreaRef = useRef(null);

  const handleClick = (event) => {
    if (!isClickNearButtons(event)) {
      const newCircle = {
        id: Date.now(),
        x: event.clientX,
        y: event.clientY,
        color: getRandomColor(),
      };
      setCircles([...circles, newCircle]);
      setUndoneCircles([]);
    }
  };

  const isClickNearButtons = (event) => {
    if (buttonAreaRef.current) {
      const rect = buttonAreaRef.current.getBoundingClientRect();
      const margin = 10; // Extra margin around buttons
      return (
        event.clientX >= rect.left - margin &&
        event.clientX <= rect.right + margin &&
        event.clientY >= rect.top - margin &&
        event.clientY <= rect.bottom + margin
      );
    }
    return false;
  };

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };

  const handleUndo = () => {
    if (circles.length > 0) {
      const lastCircle = circles[circles.length - 1];
      setCircles(circles.slice(0, -1));
      setUndoneCircles([...undoneCircles, lastCircle]);
    }
  };

  const handleRedo = () => {
    if (undoneCircles.length > 0) {
      const lastUndoneCircle = undoneCircles[undoneCircles.length - 1];
      setUndoneCircles(undoneCircles.slice(0, -1));
      setCircles([...circles, lastUndoneCircle]);
    }
  };

  const handleReset = () => {
    setCircles([]);
    setUndoneCircles([]);
  };

  return (
    <div 
      onClick={handleClick} 
      style={{ width: '100vw', height: '100vh', position: 'relative' }}
    >
      <div ref={buttonAreaRef} style={{ position: 'absolute', top: '10px', left: '10px', padding: '5px' }}>
        <button onClick={handleUndo} disabled={circles.length === 0}>
          Undo
        </button>
        <button onClick={handleRedo} disabled={undoneCircles.length === 0}>
          Redo
        </button>
        <button onClick={handleReset} disabled={circles.length === 0}>
          Reset
        </button>
      </div>
      {circles.map(circle => (
        <div
          key={circle.id}
          style={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            backgroundColor: circle.color,
            borderRadius: '50%',
            left: `${circle.x - 10}px`,
            top: `${circle.y - 10}px`,
          }}
        />
      ))}
    </div>
  );
};

export default Circle;