import React, { createContext, useContext, forwardRef } from 'react';

// Toggle variants styles
const toggleVariants = {
  variant: {
    default: {
      base: {
        backgroundColor: 'transparent',
        border: '1px solid #e5e7eb',
        color: '#374151'
      },
      hover: {
        backgroundColor: '#f3f4f6',
        color: '#111827'
      },
      pressed: {
        backgroundColor: '#f3f4f6',
        color: '#111827'
      }
    },
    outline: {
      base: {
        backgroundColor: 'transparent',
        border: '1px solid #e5e7eb',
        color: '#374151'
      },
      hover: {
        backgroundColor: '#f9fafb'
      },
      pressed: {
        backgroundColor: '#f9fafb',
        borderColor: '#d1d5db'
      }
    }
  },
  size: {
    default: {
      height: '40px',
      padding: '0 12px',
      fontSize: '14px'
    },
    sm: {
      height: '32px',
      padding: '0 8px',
      fontSize: '12px'
    },
    lg: {
      height: '48px',
      padding: '0 16px',
      fontSize: '16px'
    }
  }
};

const ToggleGroupContext = createContext({
  size: 'default',
  variant: 'default'
});

const ToggleGroup = forwardRef(({ 
  style, 
  variant = 'default', 
  size = 'default', 
  children, 
  type = 'single',
  ...props 
}, ref) => {
  const groupStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    ...style
  };

  return (
    <div
      ref={ref}
      role="group"
      style={groupStyle}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </div>
  );
});

ToggleGroup.displayName = 'ToggleGroup';

const ToggleGroupItem = forwardRef(({ 
  style, 
  children, 
  variant, 
  size, 
  pressed = false,
  onPressedChange,
  disabled = false,
  ...props 
}, ref) => {
  const context = useContext(ToggleGroupContext);
  const [isPressed, setIsPressed] = React.useState(pressed);
  const [isHovered, setIsHovered] = React.useState(false);
  
  const finalVariant = context.variant || variant || 'default';
  const finalSize = context.size || size || 'default';
  
  const variantStyles = toggleVariants.variant[finalVariant];
  const sizeStyles = toggleVariants.size[finalSize];
  
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    fontWeight: '500',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease-in-out',
    outline: 'none',
    userSelect: 'none',
    opacity: disabled ? 0.5 : 1,
    ...variantStyles.base,
    ...sizeStyles
  };

  // Apply hover styles
  const hoverStyle = isHovered && !disabled ? variantStyles.hover : {};
  
  // Apply pressed styles
  const pressedStyle = isPressed ? variantStyles.pressed : {};

  const finalStyle = {
    ...baseStyle,
    ...hoverStyle,
    ...pressedStyle,
    ...style
  };

  const handleClick = () => {
    if (disabled) return;
    const newPressed = !isPressed;
    setIsPressed(newPressed);
    if (onPressedChange) {
      onPressedChange(newPressed);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      ref={ref}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={isPressed}
      data-state={isPressed ? 'on' : 'off'}
      style={finalStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

ToggleGroupItem.displayName = 'ToggleGroupItem';

// Example usage component
const ToggleGroupExample = () => {
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3>Default Toggle Group</h3>
      <ToggleGroup>
        <ToggleGroupItem>Option 1</ToggleGroupItem>
        <ToggleGroupItem>Option 2</ToggleGroupItem>
        <ToggleGroupItem>Option 3</ToggleGroupItem>
      </ToggleGroup>

      <h3>Small Size</h3>
      <ToggleGroup size="sm">
        <ToggleGroupItem>Small 1</ToggleGroupItem>
        <ToggleGroupItem>Small 2</ToggleGroupItem>
      </ToggleGroup>

      <h3>Large Size</h3>
      <ToggleGroup size="lg">
        <ToggleGroupItem>Large 1</ToggleGroupItem>
        <ToggleGroupItem>Large 2</ToggleGroupItem>
      </ToggleGroup>

      <h3>Outline Variant</h3>
      <ToggleGroup variant="outline">
        <ToggleGroupItem>Outline 1</ToggleGroupItem>
        <ToggleGroupItem>Outline 2</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default ToggleGroupExample;