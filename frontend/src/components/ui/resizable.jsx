import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import { GripVertical } from "lucide-react";

// Context for managing resizable panel group state
const ResizablePanelGroupContext = createContext({});

const ResizablePanelGroup = ({ 
  className = "", 
  style = {},
  direction = "horizontal",
  children,
  ...props 
}) => {
  const [panels, setPanels] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const registerPanel = (panelId, initialSize) => {
    setPanels(prev => {
      const existing = prev.find(p => p.id === panelId);
      if (existing) return prev;
      return [...prev, { id: panelId, size: initialSize || 50 }];
    });
  };

  const updatePanelSize = (panelId, newSize) => {
    setPanels(prev => prev.map(panel => 
      panel.id === panelId ? { ...panel, size: newSize } : panel
    ));
  };

  const containerStyles = {
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    ...style
  };

  return (
    <ResizablePanelGroupContext.Provider value={{
      direction,
      panels,
      registerPanel,
      updatePanelSize,
      isDragging,
      setIsDragging,
      containerRef
    }}>
      <div
        ref={containerRef}
        className={className}
        style={containerStyles}
        {...props}
      >
        {children}
      </div>
    </ResizablePanelGroupContext.Provider>
  );
};

const ResizablePanel = ({ 
  className = "", 
  style = {},
  defaultSize = 50,
  minSize = 10,
  maxSize = 90,
  id,
  children,
  ...props 
}) => {
  const context = useContext(ResizablePanelGroupContext);
  const panelId = id || Math.random().toString(36).substr(2, 9);
  
  useEffect(() => {
    context.registerPanel(panelId, defaultSize);
  }, [panelId, defaultSize, context]);

  const panel = context.panels.find(p => p.id === panelId);
  const size = panel?.size || defaultSize;

  const panelStyles = {
    flexBasis: `${size}%`,
    flexShrink: 0,
    flexGrow: 0,
    overflow: 'hidden',
    ...style
  };

  return (
    <div
      className={className}
      style={panelStyles}
      {...props}
    >
      {children}
    </div>
  );
};

const ResizableHandle = ({ 
  withHandle = false,
  className = "", 
  style = {},
  ...props 
}) => {
  const context = useContext(ResizablePanelGroupContext);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const handleRef = useRef(null);
  const isVertical = context.direction === 'vertical';

  const handleMouseDown = (e) => {
    e.preventDefault();
    context.setIsDragging(true);
    
    const startPos = isVertical ? e.clientY : e.clientX;
    const containerRect = context.containerRef.current.getBoundingClientRect();
    const containerSize = isVertical ? containerRect.height : containerRect.width;
    
    const handleMouseMove = (moveEvent) => {
      const currentPos = isVertical ? moveEvent.clientY : moveEvent.clientX;
      const delta = currentPos - startPos;
      const deltaPercent = (delta / containerSize) * 100;
      
      // This is a simplified resize logic - in a real implementation,
      // you'd need to calculate which panels to resize based on handle position
      const panels = context.panels;
      if (panels.length >= 2) {
        const newSize1 = Math.max(10, Math.min(90, panels[0].size + deltaPercent));
        const newSize2 = Math.max(10, Math.min(90, panels[1].size - deltaPercent));
        
        context.updatePanelSize(panels[0].id, newSize1);
        context.updatePanelSize(panels[1].id, newSize2);
      }
    };

    const handleMouseUp = () => {
      context.setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const baseStyles = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5e7eb', // bg-border
    cursor: isVertical ? 'row-resize' : 'col-resize',
    outline: 'none',
    transition: 'all 0.15s ease-in-out',
    ...(isVertical ? {
      height: '1px',
      width: '100%'
    } : {
      width: '1px',
      height: '100%'
    })
  };

  // Hover area (invisible but larger click target)
  const hoverAreaStyles = {
    position: 'absolute',
    ...(isVertical ? {
      left: 0,
      height: '4px',
      width: '100%',
      top: '50%',
      transform: 'translateY(-50%)'
    } : {
      top: 0,
      width: '4px',
      height: '100%',
      left: '50%',
      transform: 'translateX(-50%)'
    })
  };

  const focusRingStyles = isFocused ? {
    boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.5)',
    backgroundColor: '#3b82f6'
  } : {};

  const handleStyles = {
    ...baseStyles,
    ...focusRingStyles,
    ...style
  };

  return (
    <div
      ref={handleRef}
      className={className}
      style={handleStyles}
      onMouseDown={handleMouseDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="separator"
      aria-orientation={isVertical ? 'horizontal' : 'vertical'}
      {...props}
    >
      {/* Larger hover/click area */}
      <div style={hoverAreaStyles} />
      
      {withHandle && (
        <div style={{
          zIndex: 10,
          display: 'flex',
          height: '1rem',
          width: '0.75rem',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0.125rem',
          border: '1px solid #e5e7eb',
          backgroundColor: '#e5e7eb',
          transform: isVertical ? 'rotate(90deg)' : 'none'
        }}>
          <GripVertical style={{ height: '0.625rem', width: '0.625rem' }} />
        </div>
      )}
    </div>
  );
};

// Example usage component
const ResizableExample = () => {
  return (
    <div style={{ 
      padding: '2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '2rem',
      height: '100vh'
    }}>
      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          marginBottom: '1rem',
          color: '#111827'
        }}>
          Horizontal Resizable Panels
        </h3>
        <div style={{ height: '300px', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={30} style={{ 
              backgroundColor: '#f8fafc', 
              padding: '1rem',
              borderRight: '1px solid #e5e7eb'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Left Panel (30%)
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                This panel starts at 30% width. You can resize it by dragging the handle.
              </p>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={70} style={{ 
              backgroundColor: '#fefefe', 
              padding: '1rem'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Right Panel (70%)
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                This panel takes up the remaining space. Drag the handle on the left to resize both panels.
              </p>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          marginBottom: '1rem',
          color: '#111827'
        }}>
          Vertical Resizable Panels
        </h3>
        <div style={{ height: '400px', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={40} style={{ 
              backgroundColor: '#f0f9ff', 
              padding: '1rem',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Top Panel (40%)
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                This is the top panel. You can resize it vertically by dragging the handle below.
              </p>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={60} style={{ 
              backgroundColor: '#fffbeb', 
              padding: '1rem'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Bottom Panel (60%)
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                This is the bottom panel. It will automatically adjust its size when you resize the top panel.
              </p>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          marginBottom: '1rem',
          color: '#111827'
        }}>
          Three Panel Layout
        </h3>
        <div style={{ height: '300px', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={25} style={{ 
              backgroundColor: '#fef2f2', 
              padding: '1rem'
            }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Sidebar</h4>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                Navigation panel
              </p>
            </ResizablePanel>
            
            <ResizableHandle />
            
            <ResizablePanel defaultSize={50} style={{ 
              backgroundColor: '#f0fdf4', 
              padding: '1rem'
            }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Main Content</h4>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                Primary content area
              </p>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={25} style={{ 
              backgroundColor: '#f0f4ff', 
              padding: '1rem'
            }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Details</h4>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                Additional info panel
              </p>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default ResizableExample;

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };