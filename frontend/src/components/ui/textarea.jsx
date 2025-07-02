import React from "react";

const Textarea = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <>
      <style jsx>{`
        .textarea {
          display: flex;
          min-height: 80px;
          width: 100%;
          border-radius: 0.375rem;
          border: 1px solid hsl(214.3 31.8% 91.4%);
          background-color: hsl(0 0% 100%);
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
          ring-offset-color: hsl(0 0% 100%);
          transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
          resize: vertical;
          font-family: inherit;
        }
        
        .textarea::placeholder {
          color: hsl(215.4 16.3% 46.9%);
        }
        
        .textarea:focus-visible {
          outline: 2px solid transparent;
          outline-offset: 2px;
          box-shadow: 0 0 0 2px hsl(215.4 16.3% 46.9%), 0 0 0 4px hsl(0 0% 100%);
        }
        
        .textarea:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        
        /* Dark mode styles */
        .dark .textarea {
          border-color: hsl(217.2 32.6% 17.5%);
          background-color: hsl(222.2 84% 4.9%);
          color: hsl(210 40% 98%);
          ring-offset-color: hsl(222.2 84% 4.9%);
        }
        
        .dark .textarea::placeholder {
          color: hsl(215.4 16.3% 56.9%);
        }
        
        .dark .textarea:focus-visible {
          box-shadow: 0 0 0 2px hsl(215.4 16.3% 56.9%), 0 0 0 4px hsl(222.2 84% 4.9%);
        }
      `}</style>
      <textarea
        className={`textarea ${className}`}
        ref={ref}
        {...props}
      />
    </>
  );
});

Textarea.displayName = "Textarea";

// Example usage component
const TextareaExample = () => {
  const [value, setValue] = React.useState("");

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
        Textarea Examples
      </h3>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
          Basic Textarea
        </label>
        <Textarea 
          placeholder="Type your message here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
          Larger Textarea
        </label>
        <Textarea 
          placeholder="Write a longer message..."
          style={{ minHeight: '120px' }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
          Disabled Textarea
        </label>
        <Textarea 
          placeholder="This textarea is disabled"
          disabled
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
          Required Textarea
        </label>
        <Textarea 
          placeholder="This field is required"
          required
        />
      </div>
    </div>
  );
};

export default TextareaExample;
export { Textarea };