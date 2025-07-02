import React from "react";

function Breadcrumb({ children, ...props }, ref) {
  return (
    <nav ref={ref} aria-label="breadcrumb" {...props}>
      {children}
    </nav>
  );
}

function BreadcrumbList({ style, ...props }, ref) {
  return (
    <ol
      ref={ref}
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "6px",
        wordBreak: "break-word",
        fontSize: "14px",
        color: "#6b7280", // muted color
        ...style,
      }}
      {...props}
    />
  );
}

function BreadcrumbItem({ style, ...props }, ref) {
  return (
    <li
      ref={ref}
      style={{ display: "inline-flex", alignItems: "center", gap: "6px", ...style }}
      {...props}
    />
  );
}

function BreadcrumbLink({ asChild, style, ...props }, ref) {
  const Comp = asChild ? React.Fragment : "a";
  return (
    <Comp
      ref={ref}
      style={{ transition: "color 0.2s", color: "inherit", textDecoration: "none", ...style }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#111827")} // darken
      onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
      {...props}
    />
  );
}

function BreadcrumbPage({ style, ...props }, ref) {
  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      style={{ fontWeight: "400", color: "#111827", ...style }}
      {...props}
    />
  );
}

function BreadcrumbSeparator({ children, style, ...props }) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      style={{ fontSize: "12px", ...style }}
      {...props}
    >
      {children || ">"}
    </li>
  );
}

function BreadcrumbEllipsis({ style, ...props }) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      style={{
        display: "flex",
        height: "36px",
        width: "36px",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
      {...props}
    >
      ...
      <span style={{ position: "absolute", left: "-9999px" }}>More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
