import React, { forwardRef } from "react";

const getAlertStyles = (variant) => {
  const baseStyles = {
    position: "relative",
    width: "100%",
    borderRadius: "0.5rem",
    border: "1px solid #e5e7eb", // Light gray border
    padding: "1rem",
    display: "flex",
    alignItems: "start",
  };

  const variantStyles = {
    default: {
      backgroundColor: "#fff",
      color: "#111827", // foreground
    },
    destructive: {
      backgroundColor: "#fff0f0",
      color: "#dc2626",
      border: "1px solid rgba(220,38,38,0.5)",
    },
  };

  return {
    ...baseStyles,
    ...(variantStyles[variant] || variantStyles.default),
  };
};

const Alert = forwardRef(({ className, variant = "default", ...props }, ref) => (
  <div ref={ref} role="alert" style={getAlertStyles(variant)} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    style={{
      marginBottom: "0.25rem",
      fontWeight: "500",
      lineHeight: "1.25",
      letterSpacing: "-0.015em",
    }}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      fontSize: "0.875rem",
      lineHeight: "1.5",
    }}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
