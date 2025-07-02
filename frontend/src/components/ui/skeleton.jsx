import React from 'react';

function Skeleton({ className = '', ...props }) {
  return (
    <>
      <style>
        {`
          .skeleton {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            border-radius: 0.375rem;
            background-color: #f1f5f9;
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
          
          /* Dark mode support */
          @media (prefers-color-scheme: dark) {
            .skeleton {
              background-color: #334155;
            }
          }
        `}
      </style>
      <div
        className={`skeleton ${className}`}
        {...props}
      />
    </>
  );
}

export default Skeleton;

// Example usage:
function SkeletonDemo() {
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h3>Skeleton Loading Examples:</h3>
      <Skeleton style={{ height: '20px', width: '100%' }} />
      <Skeleton style={{ height: '20px', width: '80%' }} />
      <Skeleton style={{ height: '20px', width: '60%' }} />
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Skeleton style={{ height: '100px', width: '100px', borderRadius: '50%' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Skeleton style={{ height: '16px', width: '60%' }} />
          <Skeleton style={{ height: '16px', width: '80%' }} />
          <Skeleton style={{ height: '16px', width: '40%' }} />
        </div>
      </div>
    </div>
  );
}