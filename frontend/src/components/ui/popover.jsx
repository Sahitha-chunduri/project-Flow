import React, { useState, useRef, useEffect } from "react";

// Custom Popover implementation without Radix UI
const Popover = ({ children, open, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(open || false);
  
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <PopoverContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </PopoverContext.Provider>
  );
};

const PopoverContext = React.createContext({});

const PopoverTrigger = ({ children, asChild, ...props }) => {
  const { isOpen, onOpenChange } = React.useContext(PopoverContext);
  
  const handleClick = (e) => {
    e.preventDefault();
    onOpenChange(!isOpen);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
      ...props
    });
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

const PopoverContent = React.forwardRef(({
  className = "",
  align = "center",
  sideOffset = 4,
  style = {},
  children,
  ...props
}, ref) => {
  const { isOpen, onOpenChange } = React.useContext(PopoverContext);
  const contentRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        onOpenChange(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      setAnimationClass('popover-enter');
    } else {
      setAnimationClass('popover-exit');
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const trigger = document.querySelector('[data-popover-trigger]');
      if (trigger) {
        const triggerRect = trigger.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        
        let top, left;
        
        // Calculate position based on align prop
        switch (align) {
          case 'start':
            left = triggerRect.left;
            break;
          case 'end':
            left = triggerRect.right - contentRect.width;
            break;
          default: // center
            left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
        }
        
        top = triggerRect.bottom + sideOffset;
        
        setPosition({ top, left });
      }
    }
  }, [isOpen, align, sideOffset]);

  if (!isOpen) return null;

  const contentStyles = {
    position: 'fixed',
    top: `${position.top}px`,
    left: `${position.left}px`,
    zIndex: 50,
    width: '18rem',
    borderRadius: '0.375rem',
    border: '1px solid #e5e7eb',
    backgroundColor: 'white',
    padding: '1rem',
    color: '#374151',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    outline: 'none',
    ...style
  };

  return (
    <>
      <style>
        {`
          .popover-enter {
            animation: popoverEnter 0.15s ease-out forwards;
          }
          
          .popover-exit {
            animation: popoverExit 0.15s ease-in forwards;
          }
          
          @keyframes popoverEnter {
            from {
              opacity: 0;
              transform: scale(0.95) translateY(-2px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          @keyframes popoverExit {
            from {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
            to {
              opacity: 0;
              transform: scale(0.95) translateY(-2px);
            }
          }
        `}
      </style>
      <div
        ref={(node) => {
          contentRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        style={contentStyles}
        className={`${className} ${animationClass}`}
        {...props}
      >
        {children}
      </div>
    </>
  );
});

// Example usage component
const PopoverExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            data-popover-trigger
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Open Popover
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: '600', 
              margin: 0,
              color: '#111827'
            }}>
              Popover Title
            </h3>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#6b7280',
              margin: 0,
              lineHeight: '1.5'
            }}>
              This is the popover content. You can put any content here including forms, buttons, or other components.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '0.25rem 0.75rem',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '0.25rem 0.75rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PopoverExample;

export { Popover, PopoverTrigger, PopoverContent };