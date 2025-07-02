import React, { useState } from 'react';

const Switch = React.forwardRef(({ 
  className = '', 
  checked = false, 
  onCheckedChange, 
  disabled = false,
  defaultChecked = false,
  ...props 
}, ref) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = checked !== undefined ? checked : internalChecked;
  
  const handleChange = (e) => {
    const newChecked = e.target.checked;
    if (checked === undefined) {
      setInternalChecked(newChecked);
    }
    if (onCheckedChange) {
      onCheckedChange(newChecked);
    }
  };

  return (
    <>
      <style>
        {`
          .switch-root {
            position: relative;
            display: inline-flex;
            height: 24px;
            width: 44px;
            flex-shrink: 0;
            cursor: pointer;
            align-items: center;
            border-radius: 9999px;
            border: 2px solid transparent;
            transition: all 0.2s ease-in-out;
            background-color: #f1f5f9;
          }
          
          .switch-root:focus-within {
            outline: none;
            box-shadow: 0 0 0 2px #0f172a, 0 0 0 4px rgba(15, 23, 42, 0.2);
          }
          
          .switch-root.checked {
            background-color: #0f172a;
          }
          
          .switch-root.disabled {
            cursor: not-allowed;
            opacity: 0.5;
          }
          
          .switch-thumb {
            pointer-events: none;
            display: block;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background-color: #ffffff;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            transition: transform 0.2s ease-in-out;
            transform: translateX(0px);
          }
          
          .switch-thumb.checked {
            transform: translateX(20px);
          }
          
          .switch-input {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
            margin: 0;
          }
          
          .switch-input:disabled {
            cursor: not-allowed;
          }
          
          /* Hover effects */
          .switch-root:hover:not(.disabled) {
            opacity: 0.9;
          }
          
          .switch-root:active:not(.disabled) .switch-thumb {
            transform: scale(0.95) translateX(0px);
          }
          
          .switch-root.checked:active:not(.disabled) .switch-thumb {
            transform: scale(0.95) translateX(20px);
          }
          
          /* Dark mode support */
          @media (prefers-color-scheme: dark) {
            .switch-root {
              background-color: #374151;
            }
            
            .switch-root.checked {
              background-color: #f8fafc;
            }
            
            .switch-thumb {
              background-color: #1f2937;
            }
            
            .switch-root.checked .switch-thumb {
              background-color: #0f172a;
            }
            
            .switch-root:focus-within {
              box-shadow: 0 0 0 2px #f8fafc, 0 0 0 4px rgba(248, 250, 252, 0.2);
            }
          }
          
          /* Size variants */
          .switch-small {
            height: 20px;
            width: 36px;
          }
          
          .switch-small .switch-thumb {
            height: 16px;
            width: 16px;
          }
          
          .switch-small .switch-thumb.checked {
            transform: translateX(16px);
          }
          
          .switch-large {
            height: 28px;
            width: 52px;
          }
          
          .switch-large .switch-thumb {
            height: 24px;
            width: 24px;
          }
          
          .switch-large .switch-thumb.checked {
            transform: translateX(24px);
          }
        `}
      </style>
      <div
        ref={ref}
        className={`switch-root ${isChecked ? 'checked' : ''} ${disabled ? 'disabled' : ''} ${className}`}
        {...props}
      >
        <div className={`switch-thumb ${isChecked ? 'checked' : ''}`} />
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className="switch-input"
          aria-label="Toggle switch"
        />
      </div>
    </>
  );
});

Switch.displayName = 'Switch';

export default Switch;

// Demo component
function SwitchDemo() {
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);
  const [switch3, setSwitch3] = useState(false);
  const [switch4, setSwitch4] = useState(true);

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h3 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' }}>Switch Examples</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Basic Switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Switch 
            checked={switch1}
            onCheckedChange={setSwitch1}
          />
          <label style={{ fontSize: '16px', fontWeight: '500' }}>
            Basic Switch {switch1 ? '(On)' : '(Off)'}
          </label>
        </div>

        {/* Pre-checked Switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Switch 
            checked={switch2}
            onCheckedChange={setSwitch2}
          />
          <label style={{ fontSize: '16px', fontWeight: '500' }}>
            Pre-checked Switch {switch2 ? '(On)' : '(Off)'}
          </label>
        </div>

        {/* Disabled Switches */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Switch 
            checked={false}
            disabled={true}
          />
          <label style={{ fontSize: '16px', fontWeight: '500', opacity: 0.6 }}>
            Disabled Switch (Off)
          </label>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Switch 
            checked={true}
            disabled={true}
          />
          <label style={{ fontSize: '16px', fontWeight: '500', opacity: 0.6 }}>
            Disabled Switch (On)
          </label>
        </div>

        {/* Size Variants */}
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>Size Variants</h4>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <Switch 
              className="switch-small"
              checked={switch3}
              onCheckedChange={setSwitch3}
            />
            <label style={{ fontSize: '14px' }}>Small Switch</label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <Switch 
              checked={switch4}
              onCheckedChange={setSwitch4}
            />
            <label style={{ fontSize: '16px' }}>Default Switch</label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Switch 
              className="switch-large"
              checked={switch1}
              onCheckedChange={setSwitch1}
            />
            <label style={{ fontSize: '18px' }}>Large Switch</label>
          </div>
        </div>

        {/* Settings Example */}
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          backgroundColor: '#f8fafc', 
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>Settings Panel</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>Enable Notifications</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Get notified about important updates</div>
              </div>
              <Switch checked={switch1} onCheckedChange={setSwitch1} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>Dark Mode</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Toggle dark theme</div>
              </div>
              <Switch checked={switch2} onCheckedChange={setSwitch2} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>Auto-save</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Automatically save your work</div>
              </div>
              <Switch checked={switch3} onCheckedChange={setSwitch3} />
            </div>
          </div>
        </div>

        {/* Current States */}
        <div style={{ 
          marginTop: '20px', 
          padding: '16px', 
          backgroundColor: '#f1f5f9', 
          borderRadius: '6px' 
        }}>
          <h4 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: '600' }}>Current States:</h4>
          <p style={{ fontSize: '14px', margin: '4px 0' }}>Switch 1: {switch1 ? 'ON' : 'OFF'}</p>
          <p style={{ fontSize: '14px', margin: '4px 0' }}>Switch 2: {switch2 ? 'ON' : 'OFF'}</p>
          <p style={{ fontSize: '14px', margin: '4px 0' }}>Switch 3: {switch3 ? 'ON' : 'OFF'}</p>
          <p style={{ fontSize: '14px', margin: '4px 0' }}>Switch 4: {switch4 ? 'ON' : 'OFF'}</p>
        </div>
      </div>
    </div>
  );
}