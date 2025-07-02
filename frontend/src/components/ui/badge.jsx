import React from "react";

const getBadgeStyle = (variant) => {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "9999px",
    padding: "0.125rem 0.625rem",
    fontSize: "0.75rem",
    fontWeight: "600",
    transition: "all 0.2s ease",
    outline: "none",
  };

  const variants = {
    default: {
      backgroundColor: "#3b82f6", // primary
      color: "#fff",              // primary-foreground
      border: "1px solid transparent",
    },
    secondary: {
      backgroundColor: "#e5e7eb", // secondary
      color: "#111827",           // secondary-foreground
      border: "1px solid transparent",
    },
    destructive: {
      backgroundColor: "#ef4444", // destructive
      color: "#fff",              // destructive-foreground
      border: "1px solid transparent",
    },
    outline: {
      color: "#111827",           // foreground
      border: "1px solid #d1d5db",
    },
  };

  return { ...base, ...(variants[variant] || variants.default) };
};

function Badge({ style, variant = "default", ...props }) {
  return <div style={getBadgeStyle(variant)} {...props} />;
}

export { Badge };
