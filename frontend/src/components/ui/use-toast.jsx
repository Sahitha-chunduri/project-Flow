import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Toast types
const TOAST_VARIANTS = {
  default: {
    backgroundColor: '#ffffff',
    color: '#374151',
    border: '1px solid #e5e7eb'
  },
  success: {
    backgroundColor: '#f0fdf4',
    color: '#166534',
    border: '1px solid #bbf7d0'
  },
  error: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fecaca'
  },
  warning: {
    backgroundColor: '#fffbeb',
    color: '#d97706',
    border: '1px solid #fed7aa'
  },
  info: {
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    border: '1px solid #bfdbfe'
  }
};

// Toast Context
const ToastContext = createContext({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
  dismissToast: () => {}
});

// Toast Provider Component
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      title: '',
      description: '',
      variant: 'default',
      duration: 5000,
      ...toast
    };

    setToasts(prev => [...prev, newToast]);

    // Auto remove toast after duration
    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const dismissToast = useCallback((id) => {
    removeToast(id);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, dismissToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Toast Container Component
const ToastContainer = () => {
  const { toasts } = useContext(ToastContext);

  const containerStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    maxWidth: '400px',
    width: '100%'
  };

  return (
    <div style={containerStyle}>
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

// Individual Toast Component
const Toast = ({ toast }) => {
  const { dismissToast } = useContext(ToastContext);
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleDismiss = () => {
    setIsLeaving(true);
    setTimeout(() => {
      dismissToast(toast.id);
    }, 200);
  };

  const variantStyles = TOAST_VARIANTS[toast.variant] || TOAST_VARIANTS.default;

  const toastStyle = {
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '12px',
    transform: isVisible && !isLeaving ? 'translateX(0)' : 'translateX(100%)',
    opacity: isVisible && !isLeaving ? 1 : 0,
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
    ...variantStyles
  };

  const contentStyle = {
    flex: 1,
    minWidth: 0
  };

  const titleStyle = {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: toast.description ? '4px' : 0,
    lineHeight: '1.4'
  };

  const descriptionStyle = {
    fontSize: '13px',
    opacity: 0.8,
    lineHeight: '1.4'
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    lineHeight: 1,
    opacity: 0.6,
    padding: '0',
    color: 'inherit',
    flexShrink: 0
  };

  return (
    <div style={toastStyle} onClick={handleDismiss}>
      <div style={contentStyle}>
        {toast.title && <div style={titleStyle}>{toast.title}</div>}
        {toast.description && <div style={descriptionStyle}>{toast.description}</div>}
      </div>
      <button 
        style={closeButtonStyle} 
        onClick={(e) => {
          e.stopPropagation();
          handleDismiss();
        }}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

// Custom hook for using toasts
const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  const { addToast, removeToast, dismissToast } = context;

  const toast = useCallback((options) => {
    if (typeof options === 'string') {
      return addToast({ description: options });
    }
    return addToast(options);
  }, [addToast]);

  // Convenience methods
  toast.success = useCallback((options) => {
    const toastOptions = typeof options === 'string' 
      ? { description: options, variant: 'success' }
      : { ...options, variant: 'success' };
    return addToast(toastOptions);
  }, [addToast]);

  toast.error = useCallback((options) => {
    const toastOptions = typeof options === 'string' 
      ? { description: options, variant: 'error' }
      : { ...options, variant: 'error' };
    return addToast(toastOptions);
  }, [addToast]);

  toast.warning = useCallback((options) => {
    const toastOptions = typeof options === 'string' 
      ? { description: options, variant: 'warning' }
      : { ...options, variant: 'warning' };
    return addToast(toastOptions);
  }, [addToast]);

  toast.info = useCallback((options) => {
    const toastOptions = typeof options === 'string' 
      ? { description: options, variant: 'info' }
      : { ...options, variant: 'info' };
    return addToast(toastOptions);
  }, [addToast]);

  toast.dismiss = useCallback((id) => {
    dismissToast(id);
  }, [dismissToast]);

  return { toast };
};

// Example usage component
const ToastExample = () => {
  const { toast } = useToast();

  const buttonStyle = {
    padding: '8px 16px',
    margin: '4px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  };

  const showDefaultToast = () => {
    toast({
      title: 'Default Toast',
      description: 'This is a default toast message.'
    });
  };

  const showSuccessToast = () => {
    toast.success({
      title: 'Success!',
      description: 'Your action was completed successfully.'
    });
  };

  const showErrorToast = () => {
    toast.error({
      title: 'Error',
      description: 'Something went wrong. Please try again.'
    });
  };

  const showWarningToast = () => {
    toast.warning({
      title: 'Warning',
      description: 'Please check your input before proceeding.'
    });
  };

  const showInfoToast = () => {
    toast.info({
      title: 'Information',
      description: 'Here is some useful information for you.'
    });
  };

  const showSimpleToast = () => {
    toast('This is a simple toast message!');
  };

  const showLongToast = () => {
    toast({
      title: 'Long Duration Toast',
      description: 'This toast will stay for 10 seconds.',
      duration: 10000
    });
  };

  const showPersistentToast = () => {
    toast({
      title: 'Persistent Toast',
      description: 'This toast will not auto-dismiss. Click to close.',
      duration: 0
    });
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2>Toast Examples</h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <button 
          style={{ ...buttonStyle, backgroundColor: '#f3f4f6', color: '#374151' }}
          onClick={showDefaultToast}
        >
          Default Toast
        </button>
        
        <button 
          style={{ ...buttonStyle, backgroundColor: '#22c55e', color: 'white' }}
          onClick={showSuccessToast}
        >
          Success Toast
        </button>
        
        <button 
          style={{ ...buttonStyle, backgroundColor: '#ef4444', color: 'white' }}
          onClick={showErrorToast}
        >
          Error Toast
        </button>
        
        <button 
          style={{ ...buttonStyle, backgroundColor: '#f59e0b', color: 'white' }}
          onClick={showWarningToast}
        >
          Warning Toast
        </button>
        
        <button 
          style={{ ...buttonStyle, backgroundColor: '#3b82f6', color: 'white' }}
          onClick={showInfoToast}
        >
          Info Toast
        </button>
        
        <button 
          style={{ ...buttonStyle, backgroundColor: '#6b7280', color: 'white' }}
          onClick={showSimpleToast}
        >
          Simple Toast
        </button>
        
        <button 
          style={{ ...buttonStyle, backgroundColor: '#8b5cf6', color: 'white' }}
          onClick={showLongToast}
        >
          Long Duration
        </button>
        
        <button 
          style={{ ...buttonStyle, backgroundColor: '#ec4899', color: 'white' }}
          onClick={showPersistentToast}
        >
          Persistent Toast
        </button>
      </div>

      <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <h3>Usage Examples:</h3>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>
{`// Simple toast
toast('Hello world!');

// Toast with title and description
toast({
  title: 'Success!',
  description: 'Your changes have been saved.'
});

// Variant toasts
toast.success('Operation completed!');
toast.error('Something went wrong!');
toast.warning('Please check your input.');
toast.info('Here is some information.');

// Custom duration (0 = no auto-dismiss)
toast({
  title: 'Custom Duration',
  description: 'This will last 10 seconds',
  duration: 10000
});`}
        </pre>
      </div>
    </div>
  );
};

// Main App Component (wrap your app with ToastProvider)
const App = () => {
  return (
    <ToastProvider>
      <ToastExample />
    </ToastProvider>
  );
};

export { useToast, ToastProvider };
export default App;