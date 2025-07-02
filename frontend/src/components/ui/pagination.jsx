import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

// Button variant styles
const buttonBaseStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
  borderRadius: '0.375rem',
  fontSize: '0.875rem',
  fontWeight: '500',
  transition: 'all 0.15s ease-in-out',
  outline: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
  border: '1px solid transparent'
};

const buttonVariants = {
  ghost: {
    ...buttonBaseStyles,
    backgroundColor: 'transparent',
    color: 'inherit',
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      color: 'rgba(0, 0, 0, 0.9)'
    }
  },
  outline: {
    ...buttonBaseStyles,
    border: '1px solid #e5e7eb',
    backgroundColor: 'white',
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      color: 'rgba(0, 0, 0, 0.9)'
    }
  }
};

const buttonSizes = {
  default: {
    height: '2.5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem'
  },
  icon: {
    height: '2.25rem',
    width: '2.25rem'
  }
};

const Pagination = ({ className = "", style = {}, ...props }) => (
  <nav
    role="navigation"
    aria-label="pagination"
    style={{
      margin: '0 auto',
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      ...style
    }}
    className={className}
    {...props}
  />
);

const PaginationContent = React.forwardRef(({ className = "", style = {}, ...props }, ref) => (
  <ul
    ref={ref}
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '0.25rem',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      ...style
    }}
    className={className}
    {...props}
  />
));

const PaginationItem = React.forwardRef(({ className = "", style = {}, ...props }, ref) => (
  <li 
    ref={ref} 
    style={style}
    className={className} 
    {...props} 
  />
));

const PaginationLink = ({
  className = "",
  isActive = false,
  size = "icon",
  style = {},
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  const variant = isActive ? 'outline' : 'ghost';
  const variantStyles = buttonVariants[variant];
  const sizeStyles = buttonSizes[size];
  
  const combinedStyles = {
    ...variantStyles,
    ...sizeStyles,
    ...(isHovered && variantStyles[':hover']),
    ...style
  };

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      style={combinedStyles}
      className={className}
      onMouseEnter={(e) => {
        setIsHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        onMouseLeave?.(e);
      }}
      {...props}
    />
  );
};

const PaginationPrevious = ({
  className = "",
  style = {},
  ...props
}) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    style={{
      gap: '0.25rem',
      paddingLeft: '0.625rem',
      ...style
    }}
    className={className}
    {...props}
  >
    <ChevronLeft style={{ height: '1rem', width: '1rem' }} />
    <span>Previous</span>
  </PaginationLink>
);

const PaginationNext = ({
  className = "",
  style = {},
  ...props
}) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    style={{
      gap: '0.25rem',
      paddingRight: '0.625rem',
      ...style
    }}
    className={className}
    {...props}
  >
    <span>Next</span>
    <ChevronRight style={{ height: '1rem', width: '1rem' }} />
  </PaginationLink>
);

const PaginationEllipsis = ({
  className = "",
  style = {},
  ...props
}) => (
  <span
    aria-hidden
    style={{
      display: 'flex',
      height: '2.25rem',
      width: '2.25rem',
      alignItems: 'center',
      justifyContent: 'center',
      ...style
    }}
    className={className}
    {...props}
  >
    <MoreHorizontal style={{ height: '1rem', width: '1rem' }} />
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
      More pages
    </span>
  </span>
);

// Example usage component
const PaginationExample = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationExample;

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};