import React from "react";
import { X } from "lucide-react";

// Toast Hook Implementation
const useToast = () => {
  const [toasts, setToasts] = React.useState([]);

  const toast = React.useCallback(({ title, description, variant = "default", action, duration = 5000 }) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = {
      id,
      title,
      description,
      variant,
      action,
      duration,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const dismiss = React.useCallback((toastId) => {
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
  }, []);

  return {
    toast,
    dismiss,
    toasts,
  };
};

// Toast Components with inline styles
const ToastViewport = React.forwardRef(({ style = {}, ...props }, ref) => {
  const viewportStyle = {
    position: 'fixed',
    top: 0,
    zIndex: 100,
    display: 'flex',
    maxHeight: '100vh',
    width: '100%',
    flexDirection: 'column-reverse',
    padding: '1rem',
    pointerEvents: 'none',
    ...style
  };

  // For larger screens, position at bottom-right
  if (window.innerWidth >= 640) {
    viewportStyle.bottom = 0;
    viewportStyle.right = 0;
    viewportStyle.top = 'auto';
    viewportStyle.flexDirection = 'column';
  }

  if (window.innerWidth >= 768) {
    viewportStyle.maxWidth = '420px';
  }

  return (
    <div
      ref={ref}
      style={viewportStyle}
      {...props}
    />
  );
});

const Toast = React.forwardRef(({ style = {}, variant = "default", onClose, children, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const baseStyle = {
    pointerEvents: 'auto',
    position: 'relative',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: '1rem',
    overflow: 'hidden',
    borderRadius: '0.375rem',
    border: '1px solid',
    padding: '1.5rem',
    paddingRight: '2rem',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    marginBottom: '0.5rem',
    transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
    opacity: isVisible ? 1 : 0,
    transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const variantStyles = {
    default: {
      borderColor: '#e2e8f0',
      backgroundColor: '#ffffff',
      color: '#0f172a',
    },
    destructive: {
      borderColor: '#dc2626',
      backgroundColor: '#dc2626',
      color: '#f8fafc',
    }
  };

  const finalStyle = {
    ...baseStyle,
    ...variantStyles[variant],
    ...style
  };

  const handleClose = () => {
    setIsAnimating(true);
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      ref={ref}
      style={finalStyle}
      {...props}
    >
      {children}
      <button
        onClick={handleClose}
        style={{
          position: 'absolute',
          right: '0.5rem',
          top: '0.5rem',
          borderRadius: '0.375rem',
          padding: '0.25rem',
          color: variant === 'destructive' ? 'rgb(252 165 165)' : 'rgba(100, 116, 139, 0.5)',
          opacity: 0,
          transition: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = 1;
          e.target.style.color = variant === 'destructive' ? 'rgb(254 202 202)' : 'rgb(100, 116, 139)';
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = 0;
          e.target.style.color = variant === 'destructive' ? 'rgb(252 165 165)' : 'rgba(100, 116, 139, 0.5)';
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
});

const ToastTitle = React.forwardRef(({ style = {}, children, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      fontSize: '0.875rem',
      fontWeight: '600',
      lineHeight: '1.25rem',
      ...style
    }}
    {...props}
  >
    {children}
  </div>
));

const ToastDescription = React.forwardRef(({ style = {}, children, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      opacity: 0.9,
      ...style
    }}
    {...props}
  >
    {children}
  </div>
));

// Toaster Component
const Toaster = () => {
  const { toasts, dismiss } = useToast();

  return (
    <ToastViewport>
      {toasts.map(function ({ id, title, description, action, variant }) {
        return (
          <Toast 
            key={id} 
            variant={variant}
            onClose={() => dismiss(id)}
            onMouseEnter={(e) => {
              const closeBtn = e.currentTarget.querySelector('button');
              if (closeBtn) closeBtn.style.opacity = 1;
            }}
            onMouseLeave={(e) => {
              const closeBtn = e.currentTarget.querySelector('button');
              if (closeBtn) closeBtn.style.opacity = 0;
            }}
          >
            <div style={{ display: 'grid', gap: '0.25rem', flex: 1 }}>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action && <div style={{ marginLeft: '1rem' }}>{action}</div>}
          </Toast>
        );
      })}
    </ToastViewport>
  );
};

// Example usage component with toast functionality
const ToasterExample = () => {
  const { toast } = useToast();

  const buttonBaseStyle = {
    padding: '0.75rem 1rem',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s',
    color: '#fff'
  };

  const showDefaultToast = () => {
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
    });
  };

  const showSuccessToast = () => {
    toast({
      title: "Success!",
      description: "Your changes have been saved successfully.",
      variant: "default",
    });
  };

  const showErrorToast = () => {
    toast({
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
      variant: "destructive",
    });
  };

  const showToastWithAction = () => {
    toast({
      title: "Update available",
      description: "A new version is available. Would you like to update?",
      action: (
        <button
          style={{
            padding: '0.25rem 0.75rem',
            fontSize: '0.875rem',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onClick={() => alert('Update initiated!')}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#000'}
        >
          Update
        </button>
      ),
    });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <h2 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '700', 
        marginBottom: '1.5rem',
        color: '#1f2937'
      }}>
        Toast System Demo
      </h2>
      
      <div style={{ 
        display: 'grid', 
        gap: '1rem', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
      }}>
        <button 
          onClick={showDefaultToast}
          style={{
            ...buttonBaseStyle,
            backgroundColor: '#000'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#000'}
        >
          Show Default Toast
        </button>
        
        <button 
          onClick={showSuccessToast}
          style={{
            ...buttonBaseStyle,
            backgroundColor: '#16a34a'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}
        >
          Show Success Toast
        </button>
        
        <button 
          onClick={showErrorToast}
          style={{
            ...buttonBaseStyle,
            backgroundColor: '#dc2626'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
        >
          Show Error Toast
        </button>
        
        <button 
          onClick={showToastWithAction}
          style={{
            ...buttonBaseStyle,
            backgroundColor: '#7c3aed'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#6d28d9'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#7c3aed'}
        >
          Toast with Action
        </button>
      </div>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: '#f8fafc', 
        borderRadius: '0.5rem',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ 
          fontSize: '1rem', 
          fontWeight: '600', 
          marginBottom: '0.5rem',
          color: '#374151'
        }}>
          Usage Instructions:
        </h3>
        <ul style={{ 
          fontSize: '0.875rem', 
          color: '#64748b', 
          lineHeight: '1.5',
          margin: 0,
          paddingLeft: '1rem'
        }}>
          <li style={{ marginBottom: '0.25rem' }}>Click any button above to trigger a toast notification</li>
          <li style={{ marginBottom: '0.25rem' }}>Toasts appear in the top corner (bottom-right on larger screens)</li>
          <li style={{ marginBottom: '0.25rem' }}>Each toast auto-dismisses after 5 seconds</li>
          <li style={{ marginBottom: '0.25rem' }}>Click the X button to manually dismiss a toast</li>
          <li>Hover over toasts to see the close button</li>
        </ul>
      </div>
      
      {/* This is where toasts will appear */}
      <Toaster />
    </div>
  );
};

export { Toaster};