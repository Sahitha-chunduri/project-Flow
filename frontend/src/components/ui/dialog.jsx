import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef((props, ref) => {
  const { style, ...otherProps } = props;
  
  const overlayStyle = {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 50,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    ...style
  };

  return (
    <DialogPrimitive.Overlay
      ref={ref}
      style={overlayStyle}
      {...otherProps}
    />
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef((props, ref) => {
  const { style, children, ...otherProps } = props;
  
  const contentStyle = {
    position: "fixed",
    left: "50%",
    top: "50%",
    zIndex: 50,
    display: "grid",
    width: "100%",
    maxWidth: "32rem",
    transform: "translate(-50%, -50%)",
    gap: "1rem",
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    padding: "1.5rem",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transitionDuration: "200ms",
    borderRadius: "0.5rem",
    ...style
  };

  const closeButtonStyle = {
    position: "absolute",
    right: "1rem",
    top: "1rem",
    borderRadius: "0.125rem",
    opacity: 0.7,
    transition: "opacity 0.2s",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0.25rem",
    outline: "none"
  };

  const closeButtonHoverStyle = {
    opacity: 1
  };

  const srOnlyStyle = {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: 0
  };

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        style={contentStyle}
        {...otherProps}
      >
        {children}
        <DialogPrimitive.Close 
          style={closeButtonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, closeButtonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, { opacity: 0.7 })}
        >
          <X style={{ height: "1rem", width: "1rem" }} />
          <span style={srOnlyStyle}>Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = (props) => {
  const { style, ...otherProps } = props;
  
  const headerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.375rem",
    textAlign: "center",
    "@media (min-width: 640px)": {
      textAlign: "left"
    },
    ...style
  };

  // For responsive text alignment, we'll use a media query approach
  const responsiveHeaderStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.375rem",
    textAlign: window.innerWidth >= 640 ? "left" : "center",
    ...style
  };

  return (
    <div
      style={responsiveHeaderStyle}
      {...otherProps}
    />
  );
};
DialogHeader.displayName = "DialogHeader";

const DialogFooter = (props) => {
  const { style, ...otherProps } = props;
  
  const footerStyle = {
    display: "flex",
    flexDirection: window.innerWidth >= 640 ? "row" : "column-reverse",
    justifyContent: window.innerWidth >= 640 ? "flex-end" : "stretch",
    gap: window.innerWidth >= 640 ? "0.5rem" : "0.5rem",
    ...style
  };

  return (
    <div
      style={footerStyle}
      {...otherProps}
    />
  );
};
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef((props, ref) => {
  const { style, ...otherProps } = props;
  
  const titleStyle = {
    fontSize: "1.125rem",
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: "-0.025em",
    ...style
  };

  return (
    <DialogPrimitive.Title
      ref={ref}
      style={titleStyle}
      {...otherProps}
    />
  );
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef((props, ref) => {
  const { style, ...otherProps } = props;
  
  const descriptionStyle = {
    fontSize: "0.875rem",
    color: "#6b7280",
    ...style
  };

  return (
    <DialogPrimitive.Description
      ref={ref}
      style={descriptionStyle}
      {...otherProps}
    />
  );
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};