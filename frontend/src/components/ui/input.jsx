import React from "react"

const Input = React.forwardRef(({ style, type, ...props }, ref) => {
  return (
    <input
      type={type}
      style={{
        display: 'flex',
        height: '2.5rem', // h-10
        width: '100%', // w-full
        borderRadius: '0.375rem', // rounded-md
        border: '1px solid #d1d5db', // border border-input (gray-300)
        backgroundColor: '#ffffff', // bg-background (white)
        paddingLeft: '0.75rem', // px-3
        paddingRight: '0.75rem',
        paddingTop: '0.5rem', // py-2
        paddingBottom: '0.5rem',
        fontSize: '1rem', // text-base
        color: '#374151', // text color (gray-700)
        outline: 'none',
        transition: 'all 0.15s ease-in-out',
        // File input styles
        '::file-selector-button': {
          border: '0',
          backgroundColor: 'transparent',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: '#374151'
        },
        // Placeholder styles
        '::placeholder': {
          color: '#9ca3af' // placeholder:text-muted-foreground (gray-400)
        },
        // Focus styles
        ':focus': {
          outline: 'none',
          boxShadow: '0 0 0 2px #ffffff, 0 0 0 4px #3b82f6' // focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        },
        // Disabled styles
        ':disabled': {
          cursor: 'not-allowed',
          opacity: 0.5
        },
        // Responsive text size
        '@media (min-width: 768px)': {
          fontSize: '0.875rem' // md:text-sm
        },
        ...style
      }}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = "Input"

export { Input }