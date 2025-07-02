import React from "react";

const Progress = React.forwardRef(({ 
  className = "", 
  value = 0, 
  style = {},
  max = 100,
  ...props 
}, ref) => {
  // Ensure value is between 0 and max
  const normalizedValue = Math.min(Math.max(value || 0, 0), max);
  const percentage = (normalizedValue / max) * 100;

  const rootStyles = {
    position: 'relative',
    height: '1rem',
    width: '100%',
    overflow: 'hidden',
    borderRadius: '9999px',
    backgroundColor: '#f1f5f9', // bg-secondary equivalent
    ...style
  };

  const indicatorStyles = {
    height: '100%',
    width: '100%',
    flex: '1 1 0%',
    backgroundColor: '#0f172a', // bg-primary equivalent
    transition: 'all 0.3s ease-in-out',
    transform: `translateX(-${100 - percentage}%)`
  };

  return (
    <div
      ref={ref}
      className={className}
      style={rootStyles}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={normalizedValue}
      {...props}
    >
      <div style={indicatorStyles} />
    </div>
  );
});

Progress.displayName = "Progress";

// Example usage component with different progress states
const ProgressExample = () => {
  const [progress1, setProgress1] = React.useState(0);
  const [progress2, setProgress2] = React.useState(25);
  const [progress3, setProgress3] = React.useState(75);

  // Animated progress example
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress1((prev) => {
        const next = prev + 1;
        return next > 100 ? 0 : next;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ 
      padding: '2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '2rem',
      maxWidth: '32rem',
      margin: '0 auto'
    }}>
      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          marginBottom: '0.5rem',
          color: '#111827'
        }}>
          Animated Progress
        </h3>
        <Progress value={progress1} />
        <p style={{ 
          fontSize: '0.875rem', 
          color: '#6b7280', 
          marginTop: '0.25rem' 
        }}>
          {progress1}% complete
        </p>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          marginBottom: '0.5rem',
          color: '#111827'
        }}>
          Static Progress - 25%
        </h3>
        <Progress value={progress2} />
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          marginTop: '0.5rem' 
        }}>
          <button
            onClick={() => setProgress2(Math.max(0, progress2 - 10))}
            style={{
              padding: '0.25rem 0.75rem',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            -10%
          </button>
          <button
            onClick={() => setProgress2(Math.min(100, progress2 + 10))}
            style={{
              padding: '0.25rem 0.75rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            +10%
          </button>
        </div>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          marginBottom: '0.5rem',
          color: '#111827'
        }}>
          Custom Styled Progress
        </h3>
        <Progress 
          value={progress3}
          style={{
            height: '0.5rem',
            backgroundColor: '#fecaca' // Custom background color
          }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={progress3}
          onChange={(e) => setProgress3(Number(e.target.value))}
          style={{
            width: '100%',
            marginTop: '0.5rem'
          }}
        />
        <p style={{ 
          fontSize: '0.875rem', 
          color: '#6b7280', 
          marginTop: '0.25rem' 
        }}>
          {progress3}% complete
        </p>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          marginBottom: '0.5rem',
          color: '#111827'
        }}>
          Different Sizes
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Small (8px)</p>
            <Progress value={60} style={{ height: '0.5rem' }} />
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Medium (16px)</p>
            <Progress value={60} />
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Large (24px)</p>
            <Progress value={60} style={{ height: '1.5rem' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressExample;

export { Progress };