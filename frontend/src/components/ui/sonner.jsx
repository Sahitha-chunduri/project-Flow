import React, { useState, useEffect, createContext, useContext } from 'react';

// Toast context for managing toasts
const ToastContext = createContext();

// Custom hook to use toast
const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast provider component
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now() + Math.random();
    const newToast = { id, ...toast };
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 4000);
    
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};

// Individual toast component
const Toast = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(toast.id);
    }, 300);
  };

  const getToastClass = () => {
    let baseClass = 'toast';
    if (toast.type === 'success') baseClass += ' toast-success';
    if (toast.type === 'error') baseClass += ' toast-error';
    if (toast.type === 'warning') baseClass += ' toast-warning';
    if (isVisible) baseClass += ' toast-visible';
    if (isLeaving) baseClass += ' toast-leaving';
    return baseClass;
  };

  return (
    <div className={getToastClass()}>
      <div className="toast-content">
        {toast.title && <div className="toast-title">{toast.title}</div>}
        {toast.description && <div className="toast-description">{toast.description}</div>}
      </div>
      <div className="toast-actions">
        {toast.action && (
          <button 
            className="toast-action-button"
            onClick={toast.action.onClick}
          >
            {toast.action.label}
          </button>
        )}
        <button 
          className="toast-close-button"
          onClick={handleClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Main Toaster component
const Toaster = ({ className = '', ...props }) => {
  const { toasts, removeToast } = useToast();

  return (
    <>
      <style>
        {`
          .toaster {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 8px;
            max-width: 400px;
            width: 100%;
          }

          .toast {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            padding: 16px;
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease-in-out;
            max-width: 400px;
            word-wrap: break-word;
          }

          .toast-visible {
            transform: translateX(0);
            opacity: 1;
          }

          .toast-leaving {
            transform: translateX(100%);
            opacity: 0;
          }

          .toast-success {
            border-left: 4px solid #10b981;
          }

          .toast-error {
            border-left: 4px solid #ef4444;
          }

          .toast-warning {
            border-left: 4px solid #f59e0b;
          }

          .toast-content {
            flex: 1;
            margin-right: 12px;
          }

          .toast-title {
            font-weight: 600;
            font-size: 14px;
            color: #111827;
            margin-bottom: 4px;
          }

          .toast-description {
            font-size: 13px;
            color: #6b7280;
            line-height: 1.4;
          }

          .toast-actions {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .toast-action-button {
            background-color: #0f172a;
            color: #ffffff;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
          }

          .toast-action-button:hover {
            background-color: #1e293b;
          }

          .toast-close-button {
            background-color: #f1f5f9;
            color: #6b7280;
            border: none;
            width: 20px;
            height: 20px;
            border-radius: 4px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
          }

          .toast-close-button:hover {
            background-color: #e2e8f0;
            color: #374151;
          }

          /* Dark mode support */
          @media (prefers-color-scheme: dark) {
            .toast {
              background-color: #1f2937;
              border-color: #374151;
            }

            .toast-title {
              color: #f9fafb;
            }

            .toast-description {
              color: #d1d5db;
            }

            .toast-action-button {
              background-color: #f8fafc;
              color: #0f172a;
            }

            .toast-action-button:hover {
              background-color: #e2e8f0;
            }

            .toast-close-button {
              background-color: #374151;
              color: #d1d5db;
            }

            .toast-close-button:hover {
              background-color: #4b5563;
              color: #f9fafb;
            }
          }

          /* Mobile responsiveness */
          @media (max-width: 640px) {
            .toaster {
              left: 20px;
              right: 20px;
              top: 20px;
            }

            .toast {
              max-width: none;
            }
          }
        `}
      </style>
      <div className={`toaster ${className}`} {...props}>
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            toast={toast} 
            onClose={removeToast}
          />
        ))}
      </div>
    </>
  );
};

// Toast utility functions
const toast = {
  success: (title, description, options = {}) => {
    const { addToast } = useToast();
    return addToast({
      type: 'success',
      title,
      description,
      ...options
    });
  },
  
  error: (title, description, options = {}) => {
    const { addToast } = useToast();
    return addToast({
      type: 'error',
      title,
      description,
      ...options
    });
  },
  
  warning: (title, description, options = {}) => {
    const { addToast } = useToast();
    return addToast({
      type: 'warning',
      title,
      description,
      ...options
    });
  },
  
  message: (title, description, options = {}) => {
    const { addToast } = useToast();
    return addToast({
      type: 'default',
      title,
      description,
      ...options
    });
  }
};

// Hook to use toast outside of components
const useToastHook = () => {
  const { addToast } = useToast();
  
  return {
    toast: {
      success: (title, description, options = {}) => addToast({ type: 'success', title, description, ...options }),
      error: (title, description, options = {}) => addToast({ type: 'error', title, description, ...options }),
      warning: (title, description, options = {}) => addToast({ type: 'warning', title, description, ...options }),
      message: (title, description, options = {}) => addToast({ type: 'default', title, description, ...options })
    }
  };
};

// Demo component
function ToasterDemo() {
  return (
    <ToastProvider>
      <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
        <h3 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' }}>Toast Notification Examples</h3>
        
        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <ToastButton type="success" />
          <ToastButton type="error" />
          <ToastButton type="warning" />
          <ToastButton type="message" />
          <ToastButton type="action" />
        </div>
        
        <Toaster />
      </div>
    </ToastProvider>
  );
}

// Button component for demo
function ToastButton({ type }) {
  const { toast: toastFn } = useToastHook();
  
  const handleClick = () => {
    switch (type) {
      case 'success':
        toastFn.success('Success!', 'Your action was completed successfully.');
        break;
      case 'error':
        toastFn.error('Error occurred', 'Something went wrong. Please try again.');
        break;
      case 'warning':
        toastFn.warning('Warning', 'Please check your input and try again.');
        break;
      case 'message':
        toastFn.message('Info', 'This is a general information message.');
        break;
      case 'action':
        toastFn.message('Action Required', 'Click the button to continue.', {
          action: {
            label: 'Continue',
            onClick: () => alert('Action clicked!')
          }
        });
        break;
    }
  };
  
  const buttonStyles = {
    padding: '12px 24px',
    borderRadius: '6px',
    border: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textTransform: 'capitalize'
  };
  
  const getButtonStyle = () => {
    const styles = { ...buttonStyles };
    switch (type) {
      case 'success':
        return { ...styles, backgroundColor: '#10b981', color: 'white' };
      case 'error':
        return { ...styles, backgroundColor: '#ef4444', color: 'white' };
      case 'warning':
        return { ...styles, backgroundColor: '#f59e0b', color: 'white' };
      case 'action':
        return { ...styles, backgroundColor: '#0f172a', color: 'white' };
      default:
        return { ...styles, backgroundColor: '#6b7280', color: 'white' };
    }
  };
  
  return (
    <button 
      onClick={handleClick}
      style={getButtonStyle()}
    >
      Show {type} Toast
    </button>
  );
}

export default ToasterDemo;
export { Toaster, toast, ToastProvider, useToastHook };