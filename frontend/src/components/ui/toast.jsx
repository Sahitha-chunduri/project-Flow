import React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef(({ className = "", ...props }, ref) => (
  <>
    <style jsx>{`
      .toast-viewport {
        position: fixed;
        top: 0;
        z-index: 100;
        display: flex;
        max-height: 100vh;
        width: 100%;
        flex-direction: column-reverse;
        padding: 1rem;
      }
      
      @media (min-width: 640px) {
        .toast-viewport {
          bottom: 0;
          right: 0;
          top: auto;
          flex-direction: column;
        }
      }
      
      @media (min-width: 768px) {
        .toast-viewport {
          max-width: 420px;
        }
      }
    `}</style>
    <ToastPrimitives.Viewport
      ref={ref}
      className={`toast-viewport ${className}`}
      {...props}
    />
  </>
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const Toast = React.forwardRef(({ className = "", variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "toast-default",
    destructive: "toast-destructive"
  };
  
  return (
    <>
      <style jsx>{`
        .toast-base {
          pointer-events: auto;
          position: relative;
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          column-gap: 1rem;
          overflow: hidden;
          border-radius: 0.375rem;
          border: 1px solid;
          padding: 1.5rem;
          padding-right: 2rem;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .toast-default {
          border-color: hsl(214.3 31.8% 91.4%);
          background-color: hsl(0 0% 100%);
          color: hsl(222.2 84% 4.9%);
        }
        
        .toast-destructive {
          border-color: hsl(0 62.8% 30.6%);
          background-color: hsl(0 62.8% 30.6%);
          color: hsl(210 40% 98%);
        }
        
        /* Animation states */
        .toast-base[data-swipe="cancel"] {
          transform: translateX(0);
        }
        
        .toast-base[data-swipe="end"] {
          transform: translateX(var(--radix-toast-swipe-end-x));
        }
        
        .toast-base[data-swipe="move"] {
          transform: translateX(var(--radix-toast-swipe-move-x));
          transition: none;
        }
        
        .toast-base[data-state="open"] {
          animation: slideIn 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .toast-base[data-state="closed"] {
          animation: slideOut 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes slideIn {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @media (min-width: 640px) {
          @keyframes slideIn {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        }
        
        /* Dark mode */
        .dark .toast-default {
          border-color: hsl(217.2 32.6% 17.5%);
          background-color: hsl(222.2 84% 4.9%);
          color: hsl(210 40% 98%);
        }
        
        .dark .toast-destructive {
          border-color: hsl(0 62.8% 30.6%);
          background-color: hsl(0 62.8% 30.6%);
          color: hsl(210 40% 98%);
        }
      `}</style>
      <ToastPrimitives.Root
        ref={ref}
        className={`toast-base ${variantClasses[variant]} ${className}`}
        {...props}
      />
    </>
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef(({ className = "", ...props }, ref) => (
  <>
    <style jsx>{`
      .toast-action {
        display: inline-flex;
        height: 2rem;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        border-radius: 0.375rem;
        border: 1px solid hsl(214.3 31.8% 91.4%);
        background-color: transparent;
        padding: 0 0.75rem;
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1.25rem;
        ring-offset-color: hsl(0 0% 100%);
        transition: colors 150ms cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
      }
      
      .toast-action:hover {
        background-color: hsl(210 40% 96%);
      }
      
      .toast-action:focus {
        outline: none;
        box-shadow: 0 0 0 2px hsl(215.4 16.3% 46.9%), 0 0 0 4px hsl(0 0% 100%);
      }
      
      .toast-action:disabled {
        pointer-events: none;
        opacity: 0.5;
      }
      
      .toast-destructive .toast-action {
        border-color: hsl(0 0% 63% / 0.4);
      }
      
      .toast-destructive .toast-action:hover {
        border-color: hsl(0 62.8% 30.6% / 0.3);
        background-color: hsl(0 62.8% 30.6%);
        color: hsl(210 40% 98%);
      }
      
      .toast-destructive .toast-action:focus {
        box-shadow: 0 0 0 2px hsl(0 62.8% 30.6%), 0 0 0 4px hsl(0 62.8% 30.6%);
      }
      
      /* Dark mode */
      .dark .toast-action {
        border-color: hsl(217.2 32.6% 17.5%);
        ring-offset-color: hsl(222.2 84% 4.9%);
      }
      
      .dark .toast-action:hover {
        background-color: hsl(217.2 32.6% 17.5%);
      }
      
      .dark .toast-action:focus {
        box-shadow: 0 0 0 2px hsl(215.4 16.3% 56.9%), 0 0 0 4px hsl(222.2 84% 4.9%);
      }
    `}</style>
    <ToastPrimitives.Action
      ref={ref}
      className={`toast-action ${className}`}
      {...props}
    />
  </>
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef(({ className = "", ...props }, ref) => (
  <>
    <style jsx>{`
      .toast-close {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
        border-radius: 0.375rem;
        padding: 0.25rem;
        color: hsl(215.4 16.3% 46.9% / 0.5);
        opacity: 0;
        transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
        background: none;
        border: none;
        cursor: pointer;
      }
      
      .toast-close:hover {
        color: hsl(215.4 16.3% 46.9%);
      }
      
      .toast-close:focus {
        opacity: 1;
        outline: none;
        box-shadow: 0 0 0 2px hsl(215.4 16.3% 46.9%);
      }
      
      .toast-base:hover .toast-close {
        opacity: 1;
      }
      
      .toast-destructive .toast-close {
        color: rgb(252 165 165);
      }
      
      .toast-destructive .toast-close:hover {
        color: rgb(254 202 202);
      }
      
      .toast-destructive .toast-close:focus {
        box-shadow: 0 0 0 2px rgb(248 113 113);
        ring-offset-color: hsl(0 62.8% 30.6%);
      }
      
      /* Dark mode */
      .dark .toast-close {
        color: hsl(215.4 16.3% 56.9% / 0.5);
      }
      
      .dark .toast-close:hover {
        color: hsl(215.4 16.3% 56.9%);
      }
      
      .dark .toast-close:focus {
        box-shadow: 0 0 0 2px hsl(215.4 16.3% 56.9%);
      }
    `}</style>
    <ToastPrimitives.Close
      ref={ref}
      className={`toast-close ${className}`}
      toast-close=""
      {...props}
    >
      <X className="h-4 w-4" />
    </ToastPrimitives.Close>
  </>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef(({ className = "", ...props }, ref) => (
  <>
    <style jsx>{`
      .toast-title {
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1.25rem;
      }
    `}</style>
    <ToastPrimitives.Title
      ref={ref}
      className={`toast-title ${className}`}
      {...props}
    />
  </>
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef(({ className = "", ...props }, ref) => (
  <>
    <style jsx>{`
      .toast-description {
        font-size: 0.875rem;
        line-height: 1.25rem;
        opacity: 0.9;
      }
    `}</style>
    <ToastPrimitives.Description
      ref={ref}
      className={`toast-description ${className}`}
      {...props}
    />
  </>
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

// Example usage component
const ToastExample = () => {
  const [open, setOpen] = React.useState(false);
  const [openDestructive, setOpenDestructive] = React.useState(false);

  return (
    <ToastProvider>
      <div style={{ padding: '2rem', maxWidth: '400px' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
          Toast Examples
        </h3>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button 
            onClick={() => setOpen(true)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            Show Toast
          </button>
          
          <button 
            onClick={() => setOpenDestructive(true)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dc2626',
              color: '#fff',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            Show Error Toast
          </button>
        </div>

        <Toast open={open} onOpenChange={setOpen}>
          <div style={{ display: 'grid', gap: '0.25rem' }}>
            <ToastTitle>Scheduled: Catch up</ToastTitle>
            <ToastDescription>
              Friday, February 10, 2023 at 5:57 PM
            </ToastDescription>
          </div>
          <ToastAction altText="Goto schedule to undo">
            Undo
          </ToastAction>
          <ToastClose />
        </Toast>

        <Toast variant="destructive" open={openDestructive} onOpenChange={setOpenDestructive}>
          <div style={{ display: 'grid', gap: '0.25rem' }}>
            <ToastTitle>Uh oh! Something went wrong.</ToastTitle>
            <ToastDescription>
              There was a problem with your request.
            </ToastDescription>
          </div>
          <ToastAction altText="Try again">
            Try again
          </ToastAction>
          <ToastClose />
        </Toast>
      </div>
      
      <ToastViewport />
    </ToastProvider>
  );
};

export default ToastExample;
export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};