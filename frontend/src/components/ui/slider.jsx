import React, { useState } from 'react';

const Slider = React.forwardRef(({ className = '', value = [50], onValueChange, min = 0, max = 100, step = 1, disabled = false, ...props }, ref) => {
  const [internalValue, setInternalValue] = useState(value);
  const currentValue = value || internalValue;
  
  const handleChange = (e) => {
    const newValue = [parseInt(e.target.value)];
    setInternalValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const percentage = ((currentValue[0] - min) / (max - min)) * 100;

  return (
    <>
      <style>
        {`
          .slider-root {
            position: relative;
            display: flex;
            width: 100%;
            touch-action: none;
            user-select: none;
            align-items: center;
          }
          
          .slider-track {
            position: relative;
            height: 8px;
            width: 100%;
            flex-grow: 1;
            overflow: hidden;
            border-radius: 9999px;
            background-color: #f1f5f9;
          }
          
          .slider-range {
            position: absolute;
            height: 100%;
            background-color: #0f172a;
            border-radius: 9999px;
          }
          
          .slider-thumb {
            position: absolute;
            display: block;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            border: 2px solid #0f172a;
            background-color: #ffffff;
            box-shadow: 0 0 0 0 #0f172a;
            transition: all 0.2s ease-in-out;
            cursor: pointer;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
          }
          
          .slider-thumb:hover {
            transform: translate(-50%, -50%) scale(1.1);
          }
          
          .slider-thumb:focus {
            outline: none;
            box-shadow: 0 0 0 2px #0f172a, 0 0 0 4px rgba(15, 23, 42, 0.2);
          }
          
          .slider-thumb:active {
            transform: translate(-50%, -50%) scale(0.95);
          }
          
          .slider-thumb:disabled {
            pointer-events: none;
            opacity: 0.5;
            cursor: not-allowed;
          }
          
          .slider-input {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
            margin: 0;
          }
          
          .slider-input:disabled {
            cursor: not-allowed;
          }
          
          /* Dark mode support */
          @media (prefers-color-scheme: dark) {
            .slider-track {
              background-color: #334155;
            }
            
            .slider-range {
              background-color: #f8fafc;
            }
            
            .slider-thumb {
              border-color: #f8fafc;
              background-color: #0f172a;
            }
            
            .slider-thumb:focus {
              box-shadow: 0 0 0 2px #f8fafc, 0 0 0 4px rgba(248, 250, 252, 0.2);
            }
          }
        `}
      </style>
      <div
        ref={ref}
        className={`slider-root ${className}`}
        {...props}
      >
        <div className="slider-track">
          <div 
            className="slider-range"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div 
          className="slider-thumb"
          style={{ left: `${percentage}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue[0]}
          onChange={handleChange}
          disabled={disabled}
          className="slider-input"
        />
      </div>
    </>
  );
});

Slider.displayName = 'Slider';

export default Slider;

// Example usage component
function SliderDemo() {
  const [value1, setValue1] = useState([25]);
  const [value2, setValue2] = useState([75]);
  const [value3, setValue3] = useState([50]);

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h3 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' }}>Slider Examples</h3>
      
      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>
          Basic Slider (Value: {value1[0]})
        </label>
        <Slider
          value={value1}
          onValueChange={setValue1}
          min={0}
          max={100}
          step={1}
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>
          Custom Range Slider (Value: {value2[0]})
        </label>
        <Slider
          value={value2}
          onValueChange={setValue2}
          min={0}
          max={200}
          step={5}
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>
          Disabled Slider (Value: {value3[0]})
        </label>
        <Slider
          value={value3}
          onValueChange={setValue3}
          min={0}
          max={100}
          step={1}
          disabled={true}
        />
      </div>

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: '600' }}>Current Values:</h4>
        <p>Slider 1: {value1[0]}</p>
        <p>Slider 2: {value2[0]}</p>
        <p>Slider 3: {value3[0]}</p>
      </div>
    </div>
  );
}