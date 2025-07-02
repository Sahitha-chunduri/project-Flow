import React, { useState, useContext, createContext } from "react";
import { Circle } from "lucide-react";

// Context for managing radio group state
const RadioGroupContext = createContext({});

const RadioGroup = React.forwardRef(({ 
  className = "", 
  style = {},
  value,
  onValueChange,
  defaultValue,
  disabled = false,
  name,
  ...props 
}, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = (newValue) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const rootStyles = {
    display: 'grid',
    gap: '0.5rem',
    ...style
  };

  return (
    <RadioGroupContext.Provider value={{
      value: currentValue,
      onValueChange: handleValueChange,
      disabled,
      name: name || 'radio-group'
    }}>
      <div
        ref={ref}
        className={className}
        style={rootStyles}
        role="radiogroup"
        {...props}
      >
        {props.children}
      </div>
    </RadioGroupContext.Provider>
  );
});

const RadioGroupItem = React.forwardRef(({ 
  className = "", 
  style = {},
  value,
  disabled: itemDisabled = false,
  id,
  ...props 
}, ref) => {
  const context = useContext(RadioGroupContext);
  const isChecked = context.value === value;
  const isDisabled = context.disabled || itemDisabled;
  const [isFocused, setIsFocused] = useState(false);

  const handleClick = () => {
    if (!isDisabled && value !== undefined) {
      context.onValueChange(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  const itemStyles = {
    aspectRatio: '1',
    height: '1rem',
    width: '1rem',
    borderRadius: '50%',
    border: '1px solid #0f172a', // border-primary
    color: '#0f172a', // text-primary
    backgroundColor: 'white',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.5 : 1,
    outline: 'none',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease-in-out',
    boxShadow: isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : 'none',
    ...style
  };

  return (
    <button
      ref={ref}
      className={className}
      style={itemStyles}
      role="radio"
      aria-checked={isChecked}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      value={value}
      name={context.name}
      id={id}
      {...props}
    >
      {isChecked && (
        <Circle 
          style={{ 
            height: '0.625rem', 
            width: '0.625rem',
            fill: 'currentColor'
          }} 
        />
      )}
    </button>
  );
});

RadioGroup.displayName = "RadioGroup";
RadioGroupItem.displayName = "RadioGroupItem";

// Example usage component
const RadioGroupExample = () => {
  const [selectedValue, setSelectedValue] = useState("option1");
  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedColor, setSelectedColor] = useState("blue");

  return (
    <div style={{ 
      padding: '2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '2rem',
      maxWidth: '32rem',
      margin: '0 auto'
    }}>
      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          marginBottom: '1rem',
          color: '#111827'
        }}>
          Basic Radio Group
        </h3>
        <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RadioGroupItem value="option1" id="option1" />
            <label 
              htmlFor="option1"
              style={{ 
                fontSize: '0.875rem',
                cursor: 'pointer',
                color: '#374151'
              }}
            >
              Option 1
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RadioGroupItem value="option2" id="option2" />
            <label 
              htmlFor="option2"
              style={{ 
                fontSize: '0.875rem',
                cursor: 'pointer',
                color: '#374151'
              }}
            >
              Option 2
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RadioGroupItem value="option3" id="option3" />
            <label 
              htmlFor="option3"
              style={{ 
                fontSize: '0.875rem',
                cursor: 'pointer',
                color: '#374151'
              }}
            >
              Option 3
            </label>
          </div>
        </RadioGroup>
        <p style={{ 
          fontSize: '0.75rem', 
          color: '#6b7280', 
          marginTop: '0.5rem' 
        }}>
          Selected: {selectedValue}
        </p>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          marginBottom: '1rem',
          color: '#111827'
        }}>
          Size Selection
        </h3>
        <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RadioGroupItem value="small" id="small" />
            <label 
              htmlFor="small"
              style={{ 
                fontSize: '0.875rem',
                cursor: 'pointer',
                color: '#374151'
              }}
            >
              Small
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RadioGroupItem value="medium" id="medium" />
            <label 
              htmlFor="medium"
              style={{ 
                fontSize: '0.875rem',
                cursor: 'pointer',
                color: '#374151'
              }}
            >
              Medium
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RadioGroupItem value="large" id="large" />
            <label 
              htmlFor="large"
              style={{ 
                fontSize: '0.875rem',
                cursor: 'pointer',
                color: '#374151'
              }}
            >
              Large
            </label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          marginBottom: '1rem',
          color: '#111827'
        }}>
          Disabled State
        </h3>
        <RadioGroup defaultValue="blue" disabled>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RadioGroupItem value="red" id="red-disabled" />
            <label 
              htmlFor="red-disabled"
              style={{ 
                fontSize: '0.875rem',
                cursor: 'not-allowed',
                color: '#9ca3af',
                opacity: 0.5
              }}
            >
              Red (Disabled)
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RadioGroupItem value="blue" id="blue-disabled" />
            <label 
              htmlFor="blue-disabled"
              style={{ 
                fontSize: '0.875rem',
                cursor: 'not-allowed',
                color: '#9ca3af',
                opacity: 0.5
              }}
            >
              Blue (Selected & Disabled)
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RadioGroupItem value="green" id="green-disabled" />
            <label 
              htmlFor="green-disabled"
              style={{ 
                fontSize: '0.875rem',
                cursor: 'not-allowed',
                color: '#9ca3af',
                opacity: 0.5
              }}
            >
              Green (Disabled)
            </label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          marginBottom: '1rem',
          color: '#111827'
        }}>
          Custom Styled Radio Group
        </h3>
        <RadioGroup 
          value={selectedColor} 
          onValueChange={setSelectedColor}
          style={{ gap: '1rem' }}
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            padding: '0.75rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            backgroundColor: selectedColor === 'red' ? '#fef2f2' : 'white'
          }}>
            <RadioGroupItem 
              value="red" 
              id="custom-red"
              style={{ 
                borderColor: '#ef4444',
                color: '#ef4444'
              }}
            />
            <label 
              htmlFor="custom-red"
              style={{ 
                fontSize: '0.875rem',
                cursor: 'pointer',
                color: '#374151',
                fontWeight: '500'
              }}
            >
              Red Theme
            </label>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            padding: '0.75rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            backgroundColor: selectedColor === 'green' ? '#f0fdf4' : 'white'
          }}>
            <RadioGroupItem 
              value="green" 
              id="custom-green"
              style={{ 
                borderColor: '#22c55e',
                color: '#22c55e'
              }}
            />
            <label 
              htmlFor="custom-green"
              style={{ 
                fontSize: '0.875rem',
                cursor: 'pointer',
                color: '#374151',
                fontWeight: '500'
              }}
            >
              Green Theme
            </label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default RadioGroupExample;

export { RadioGroup, RadioGroupItem };