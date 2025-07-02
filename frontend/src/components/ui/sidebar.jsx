import React, { useState, useCallback, useEffect, useMemo, useContext, createContext, forwardRef } from 'react';
import { PanelLeft } from 'lucide-react';

// Constants
const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

// Hook to detect mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Context
const SidebarContext = createContext(null);

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

// Base components
const Button = forwardRef(({ children, variant = "default", size = "default", style, onClick, ...props }, ref) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    outline: 'none',
    ...style
  };

  const variants = {
    default: {
      backgroundColor: '#09090b',
      color: 'white',
      ':hover': { backgroundColor: '#18181b' }
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#71717a',
      ':hover': { backgroundColor: '#f4f4f5', color: '#09090b' }
    }
  };

  const sizes = {
    default: { height: '40px', padding: '0 16px' },
    sm: { height: '36px', padding: '0 12px' },
    lg: { height: '44px', padding: '0 20px' },
    icon: { height: '40px', width: '40px', padding: '0' }
  };

  return (
    <button
      ref={ref}
      style={{
        ...baseStyle,
        ...variants[variant],
        ...sizes[size]
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
});

const Input = forwardRef(({ style, ...props }, ref) => (
  <input
    ref={ref}
    style={{
      display: 'flex',
      height: '40px',
      width: '100%',
      borderRadius: '6px',
      border: '1px solid #e4e4e7',
      backgroundColor: 'white',
      padding: '0 12px',
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.2s',
      ...style
    }}
    {...props}
  />
));

const Separator = forwardRef(({ orientation = "horizontal", style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      backgroundColor: '#e4e4e7',
      ...(orientation === "horizontal" 
        ? { height: '1px', width: '100%' }
        : { width: '1px', height: '100%' }
      ),
      ...style
    }}
    {...props}
  />
));

const Skeleton = forwardRef(({ style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      backgroundColor: '#f4f4f5',
      borderRadius: '4px',
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      ...style
    }}
    {...props}
  />
));

// Sheet components for mobile
const Sheet = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      display: 'flex'
    }}>
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 50
        }}
        onClick={() => onOpenChange(false)}
      />
      {children}
    </div>
  );
};

const SheetContent = forwardRef(({ side = "left", style, children, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      position: 'fixed',
      zIndex: 50,
      height: '100%',
      backgroundColor: 'white',
      padding: 0,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      ...(side === "left" 
        ? { left: 0, top: 0 }
        : { right: 0, top: 0 }
      ),
      ...style
    }}
    {...props}
  >
    {children}
  </div>
));

// Tooltip components
const TooltipProvider = ({ children }) => children;
const Tooltip = ({ children }) => children;
const TooltipTrigger = ({ children }) => children;
const TooltipContent = ({ children, hidden }) => 
  hidden ? null : (
    <div style={{
      position: 'absolute',
      zIndex: 50,
      backgroundColor: '#09090b',
      color: 'white',
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      left: '100%',
      marginLeft: '8px',
      whiteSpace: 'nowrap'
    }}>
      {children}
    </div>
  );

// Main Sidebar Components
const SidebarProvider = forwardRef(({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  style,
  children,
  ...props
}, ref) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);
  const [_open, _setOpen] = useState(defaultOpen);
  const open = openProp ?? _open;

  const setOpen = useCallback((value) => {
    const openState = typeof value === "function" ? value(open) : value;
    if (setOpenProp) {
      setOpenProp(openState);
    } else {
      _setOpen(openState);
    }
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  }, [setOpenProp, open]);

  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile(open => !open) : setOpen(open => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? "expanded" : "collapsed";

  const contextValue = useMemo(() => ({
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  }), [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]);

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider>
        <div
          style={{
            '--sidebar-width': SIDEBAR_WIDTH,
            '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
            display: 'flex',
            minHeight: '100vh',
            width: '100%',
            ...style
          }}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
});

const Sidebar = forwardRef(({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  children,
  ...props
}, ref) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: 'var(--sidebar-width)',
          flexDirection: 'column',
          backgroundColor: '#f8f9fa',
          color: '#374151'
        }}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          side={side}
          style={{
            width: SIDEBAR_WIDTH_MOBILE,
            backgroundColor: '#f8f9fa',
            padding: 0,
            color: '#374151'
          }}
        >
          <div style={{ display: 'flex', height: '100%', width: '100%', flexDirection: 'column' }}>
            {children}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      ref={ref}
      style={{
        display: 'none',
        color: '#374151',
        '@media (min-width: 768px)': {
          display: 'block'
        }
      }}
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
    >
      <div style={{
        position: 'relative',
        height: '100vh',
        width: state === "collapsed" && collapsible === "offcanvas" ? 0 : 'var(--sidebar-width)',
        backgroundColor: 'transparent',
        transition: 'width 0.2s ease-linear'
      }} />
      <div style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        zIndex: 10,
        display: 'none',
        height: '100vh',
        width: state === "collapsed" && collapsible === "icon" ? 'var(--sidebar-width-icon)' : 'var(--sidebar-width)',
        transition: 'left 0.2s ease-linear, right 0.2s ease-linear, width 0.2s ease-linear',
        ...(side === "left" 
          ? { 
              left: state === "collapsed" && collapsible === "offcanvas" ? 'calc(var(--sidebar-width) * -1)' : 0,
              borderRight: variant !== "floating" && variant !== "inset" ? '1px solid #e5e7eb' : 'none'
            }
          : { 
              right: state === "collapsed" && collapsible === "offcanvas" ? 'calc(var(--sidebar-width) * -1)' : 0,
              borderLeft: variant !== "floating" && variant !== "inset" ? '1px solid #e5e7eb' : 'none'
            }
        ),
        padding: variant === "floating" || variant === "inset" ? '8px' : '0',
        '@media (min-width: 768px)': {
          display: 'flex'
        }
      }}>
        <div style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          backgroundColor: '#f8f9fa',
          borderRadius: variant === "floating" ? '8px' : '0',
          border: variant === "floating" ? '1px solid #e5e7eb' : 'none',
          boxShadow: variant === "floating" ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
        }}>
          {children}
        </div>
      </div>
    </div>
  );
});

const SidebarTrigger = forwardRef(({ onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      style={{ height: '28px', width: '28px' }}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft size={16} />
      <span style={{ 
        position: 'absolute', 
        width: '1px', 
        height: '1px', 
        padding: 0, 
        margin: '-1px', 
        overflow: 'hidden', 
        clip: 'rect(0, 0, 0, 0)', 
        whiteSpace: 'nowrap', 
        border: 0 
      }}>
        Toggle Sidebar
      </span>
    </Button>
  );
});

const SidebarRail = forwardRef(({ ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      onClick={toggleSidebar}
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 20,
        display: 'none',
        width: '16px',
        transform: 'translateX(-50%)',
        transition: 'all 0.2s ease-linear',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        right: '-16px',
        '@media (min-width: 640px)': {
          display: 'flex'
        }
      }}
      {...props}
    />
  );
});

const SidebarInset = forwardRef(({ style, ...props }, ref) => (
  <main
    ref={ref}
    style={{
      position: 'relative',
      display: 'flex',
      minHeight: '100vh',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'white',
      ...style
    }}
    {...props}
  />
));

const SidebarInput = forwardRef(({ style, ...props }, ref) => (
  <Input
    ref={ref}
    style={{
      height: '32px',
      width: '100%',
      backgroundColor: 'white',
      boxShadow: 'none',
      ...style
    }}
    {...props}
  />
));

const SidebarHeader = forwardRef(({ style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: '8px',
      ...style
    }}
    {...props}
  />
));

const SidebarFooter = forwardRef(({ style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: '8px',
      ...style
    }}
    {...props}
  />
));

const SidebarSeparator = forwardRef(({ style, ...props }, ref) => (
  <Separator
    ref={ref}
    style={{
      marginLeft: '8px',
      marginRight: '8px',
      width: 'auto',
      backgroundColor: '#e5e7eb',
      ...style
    }}
    {...props}
  />
));

const SidebarContent = forwardRef(({ style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      display: 'flex',
      minHeight: 0,
      flex: 1,
      flexDirection: 'column',
      gap: '8px',
      overflow: 'auto',
      ...style
    }}
    {...props}
  />
));

const SidebarGroup = forwardRef(({ style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      position: 'relative',
      display: 'flex',
      width: '100%',
      minWidth: 0,
      flexDirection: 'column',
      padding: '8px',
      ...style
    }}
    {...props}
  />
));

const SidebarGroupLabel = forwardRef(({ style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      display: 'flex',
      height: '32px',
      flexShrink: 0,
      alignItems: 'center',
      borderRadius: '6px',
      paddingLeft: '8px',
      paddingRight: '8px',
      fontSize: '12px',
      fontWeight: '500',
      color: 'rgba(55, 65, 81, 0.7)',
      outline: 'none',
      transition: 'margin 0.2s ease-linear, opacity 0.2s ease-linear',
      ...style
    }}
    {...props}
  />
));

const SidebarGroupAction = forwardRef(({ style, ...props }, ref) => (
  <button
    ref={ref}
    style={{
      position: 'absolute',
      right: '12px',
      top: '14px',
      display: 'flex',
      aspectRatio: '1',
      width: '20px',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '6px',
      padding: 0,
      color: '#374151',
      outline: 'none',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      ...style
    }}
    {...props}
  />
));

const SidebarGroupContent = forwardRef(({ style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      width: '100%',
      fontSize: '14px',
      ...style
    }}
    {...props}
  />
));

const SidebarMenu = forwardRef(({ style, ...props }, ref) => (
  <ul
    ref={ref}
    style={{
      display: 'flex',
      width: '100%',
      minWidth: 0,
      flexDirection: 'column',
      gap: '4px',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      ...style
    }}
    {...props}
  />
));

const SidebarMenuItem = forwardRef(({ style, ...props }, ref) => (
  <li
    ref={ref}
    style={{
      position: 'relative',
      ...style
    }}
    {...props}
  />
));

const SidebarMenuButton = forwardRef(({
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  style,
  children,
  ...props
}, ref) => {
  const { isMobile, state } = useSidebar();

  const baseStyle = {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    gap: '8px',
    overflow: 'hidden',
    borderRadius: '6px',
    padding: '8px',
    textAlign: 'left',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s',
    backgroundColor: isActive ? '#f3f4f6' : 'transparent',
    color: isActive ? '#374151' : '#6b7280',
    border: 'none',
    cursor: 'pointer',
    fontWeight: isActive ? '500' : '400',
    ...style
  };

  const sizeStyles = {
    default: { height: '32px', fontSize: '14px' },
    sm: { height: '28px', fontSize: '12px' },
    lg: { height: '48px', fontSize: '14px' }
  };

  const button = (
    <button
      ref={ref}
      data-active={isActive}
      style={{
        ...baseStyle,
        ...sizeStyles[size],
        ':hover': {
          backgroundColor: '#f3f4f6',
          color: '#374151'
        }
      }}
      {...props}
    >
      {children}
    </button>
  );

  if (!tooltip || state !== "collapsed" || isMobile) {
    return button;
  }

  return (
    <Tooltip>
      <TooltipTrigger>{button}</TooltipTrigger>
      <TooltipContent side="right">
        {typeof tooltip === "string" ? tooltip : tooltip.children}
      </TooltipContent>
    </Tooltip>
  );
});

const SidebarMenuAction = forwardRef(({ showOnHover = false, style, ...props }, ref) => (
  <button
    ref={ref}
    style={{
      position: 'absolute',
      right: '4px',
      top: '6px',
      display: 'flex',
      aspectRatio: '1',
      width: '20px',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '6px',
      padding: 0,
      color: '#374151',
      outline: 'none',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      opacity: showOnHover ? 0 : 1,
      ...style
    }}
    {...props}
  />
));

const SidebarMenuBadge = forwardRef(({ style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      position: 'absolute',
      right: '4px',
      display: 'flex',
      height: '20px',
      minWidth: '20px',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '6px',
      paddingLeft: '4px',
      paddingRight: '4px',
      fontSize: '12px',
      fontWeight: '500',
      color: '#374151',
      userSelect: 'none',
      pointerEvents: 'none',
      ...style
    }}
    {...props}
  />
));

const SidebarMenuSkeleton = forwardRef(({ showIcon = false, style, ...props }, ref) => {
  const width = useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);

  return (
    <div
      ref={ref}
      style={{
        borderRadius: '6px',
        height: '32px',
        display: 'flex',
        gap: '8px',
        paddingLeft: '8px',
        paddingRight: '8px',
        alignItems: 'center',
        ...style
      }}
      {...props}
    >
      {showIcon && (
        <Skeleton style={{ width: '16px', height: '16px', borderRadius: '6px' }} />
      )}
      <Skeleton style={{ height: '16px', flex: 1, maxWidth: width }} />
    </div>
  );
});

const SidebarMenuSub = forwardRef(({ style, ...props }, ref) => (
  <ul
    ref={ref}
    style={{
      marginLeft: '14px',
      marginRight: '14px',
      display: 'flex',
      minWidth: 0,
      transform: 'translateX(1px)',
      flexDirection: 'column',
      gap: '4px',
      borderLeft: '1px solid #e5e7eb',
      paddingLeft: '10px',
      paddingRight: '10px',
      paddingTop: '2px',
      paddingBottom: '2px',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      ...style
    }}
    {...props}
  />
));

const SidebarMenuSubItem = forwardRef((props, ref) => (
  <li ref={ref} {...props} />
));

const SidebarMenuSubButton = forwardRef(({
  size = "md",
  isActive,
  style,
  ...props
}, ref) => (
  <a
    ref={ref}
    data-active={isActive}
    style={{
      display: 'flex',
      height: '28px',
      minWidth: 0,
      transform: 'translateX(-1px)',
      alignItems: 'center',
      gap: '8px',
      overflow: 'hidden',
      borderRadius: '6px',
      paddingLeft: '8px',
      paddingRight: '8px',
      color: '#374151',
      outline: 'none',
      transition: 'all 0.2s',
      textDecoration: 'none',
      fontSize: size === "sm" ? '12px' : '14px',
      backgroundColor: isActive ? '#f3f4f6' : 'transparent',
      cursor: 'pointer',
      ...style,
      ':hover': {
        backgroundColor: '#f3f4f6',
        color: '#374151'
      }
    }}
    {...props}
  />
));

// Export all components
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};

// Demo usage
export default function SidebarDemo() {
  return (
    <SidebarProvider>
      <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
        <Sidebar>
          <SidebarHeader>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Navigation</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={true}>
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <span>Analytics</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenuButton>
              <span>Help & Support</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '16px',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <SidebarTrigger />
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>Main Content</h1>
          </header>
          <div style={{ flex: 1, padding: '24px' }}>
            <p>This is the main content area. The sidebar can be toggled using the button in the header or with Ctrl+B keyboard shortcut.</p>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}