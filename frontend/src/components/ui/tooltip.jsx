import React, { createContext, useContext, useState, useRef, useEffect, forwardRef } from 'react';

// Tooltip Context
const TooltipContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
  delayDuration: 700,
  skipDelayDuration: 300,
});

// TooltipProvider Component
const TooltipProvider = ({ children, delayDuration = 700, skipDelayDuration = 300 }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <TooltipContext.Provider value={{ isOpen, setIsOpen, delayDuration, skipDelayDuration }}>
      {children}
    </TooltipContext.Provider>
  );
};

// Tooltip Root Component
const Tooltip = ({ children, defaultOpen = false, open, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  
  const setIsOpen = (newOpen) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  return (
    <TooltipContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </TooltipContext.Provider>
  );
};

// TooltipTrigger Component
const TooltipTrigger = forwardRef(({ children, asChild = false, ...props }, ref) => {
  const { setIsOpen } = useContext(TooltipContext);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      ...props
    });
  }

  return (
    <button
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        outline: 'none'
      }}
      {...props}
    >
      {children}
    </button>
  );
});

TooltipTrigger.displayName = 'TooltipTrigger';

// TooltipContent Component
const TooltipContent = forwardRef(({ 
  children, 
  side = 'top', 
  sideOffset = 4, 
  align = 'center',
  style,
  ...props 
}, ref) => {
  const { isOpen } = useContext(TooltipContext);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const contentRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const updatePosition = () => {
        const trigger = document.querySelector('[data-tooltip-trigger]');
        if (trigger) {
          const triggerRect = trigger.getBoundingClientRect();
          const contentRect = contentRef.current.getBoundingClientRect();
          
          let x = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
          let y = triggerRect.top - contentRect.height - sideOffset;

          // Adjust based on side
          switch (side) {
            case 'bottom':
              y = triggerRect.bottom + sideOffset;
              break;
            case 'left':
              x = triggerRect.left - contentRect.width - sideOffset;
              y = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
              break;
            case 'right':
              x = triggerRect.right + sideOffset;
              y = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
              break;
            case 'top':
            default:
              y = triggerRect.top - contentRect.height - sideOffset;
              break;
          }

          // Keep tooltip within viewport
          const padding = 8;
          x = Math.max(padding, Math.min(x, window.innerWidth - contentRect.width - padding));
          y = Math.max(padding, Math.min(y, window.innerHeight - contentRect.height - padding));

          setPosition({ x, y });
        }
      };

      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);

      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      };
    }
  }, [isOpen, side, sideOffset]);

  if (!isOpen) return null;

  const baseStyle = {
    position: 'fixed',
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: 50,
    overflow: 'hidden',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingTop: '6px',
    paddingBottom: '6px',
    fontSize: '14px',
    color: '#374151',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scale(1)' : 'scale(0.95)',
    transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
    pointerEvents: 'none',
    maxWidth: '300px',
    wordWrap: 'break-word',
    ...style
  };

  return (
    <div
      ref={(node) => {
        contentRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      role="tooltip"
      style={baseStyle}
      {...props}
    >
      {children}
    </div>
  );
});

TooltipContent.displayName = 'TooltipContent';

// Example usage component
const TooltipExample = () => {
  return (
    <TooltipProvider>
      <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center' }}>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Tooltip>
            <TooltipTrigger data-tooltip-trigger>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Hover me (Top)
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              This tooltip appears on top
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger data-tooltip-trigger>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Hover me (Bottom)
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              This tooltip appears on bottom
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger data-tooltip-trigger>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Hover me (Left)
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              This tooltip appears on left
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger data-tooltip-trigger>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Hover me (Right)
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              This tooltip appears on right
            </TooltipContent>
          </Tooltip>
        </div>

        <div>
          <Tooltip>
            <TooltipTrigger data-tooltip-trigger>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#f3f4f6',
                borderRadius: '4px',
                cursor: 'help',
                borderBottom: '1px dotted #6b7280'
              }}>
                Hover for help
              </span>
            </TooltipTrigger>
            <TooltipContent>
              This is a longer tooltip text that demonstrates how the tooltip handles longer content. It will wrap properly and stay within the viewport bounds.
            </TooltipContent>
          </Tooltip>
        </div>

        <div>
          <Tooltip>
            <TooltipTrigger data-tooltip-trigger>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#8b5cf6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                fontSize: '18px'
              }}>
                ?
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              Click me for more information
            </TooltipContent>
          </Tooltip>
        </div>

      </div>
    </TooltipProvider>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
export default TooltipExample;