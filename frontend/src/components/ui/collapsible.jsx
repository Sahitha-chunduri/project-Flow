import React, { useState } from "react";
import "./Collapsible.css"; // Create this CSS file separately

function Collapsible({ children }) {
  return <div className="collapsible">{children}</div>;
}

function CollapsibleTrigger({ children, onClick, ...props }) {
  return (
    <button className="collapsible-trigger" onClick={onClick} {...props}>
      {children}
    </button>
  );
}

function CollapsibleContent({ isOpen, children }) {
  return (
    <div className={`collapsible-content ${isOpen ? "open" : "closed"}`}>
      {isOpen && children}
    </div>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
