import React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

const Drawer = (props) => {
  const { shouldScaleBackground = true, ...otherProps } = props;
  
  return (
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldScaleBackground}
      {...otherProps}
    />
  );
};
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef((props, ref) => {
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
    <DrawerPrimitive.Overlay
      ref={ref}
      style={overlayStyle}
      {...otherProps}
    />
  );
});
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef((props, ref) => {
  const { style, children, ...otherProps } = props;
  
  const contentStyle = {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    marginTop: "6rem",
    display: "flex",
    height: "auto",
    flexDirection: "column",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    ...style
  };

  const handleStyle = {
    margin: "0 auto",
    marginTop: "1rem",
    height: "0.5rem",
    width: "100px",
    borderRadius: "9999px",
    backgroundColor: "#f1f5f9"
  };

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        style={contentStyle}
        {...otherProps}
      >
        <div style={handleStyle} />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = (props) => {
  const { style, ...otherProps } = props;
  
  const headerStyle = {
    display: "grid",
    gap: "0.375rem",
    padding: "1rem",
    textAlign: window.innerWidth >= 640 ? "left" : "center",
    ...style
  };

  return (
    <div
      style={headerStyle}
      {...otherProps}
    />
  );
};
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = (props) => {
  const { style, ...otherProps } = props;
  
  const footerStyle = {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "1rem",
    ...style
  };

  return (
    <div
      style={footerStyle}
      {...otherProps}
    />
  );
};
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef((props, ref) => {
  const { style, ...otherProps } = props;
  
  const titleStyle = {
    fontSize: "1.125rem",
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: "-0.025em",
    ...style
  };

  return (
    <DrawerPrimitive.Title
      ref={ref}
      style={titleStyle}
      {...otherProps}
    />
  );
});
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef((props, ref) => {
  const { style, ...otherProps } = props;
  
  const descriptionStyle = {
    fontSize: "0.875rem",
    color: "#6b7280",
    ...style
  };

  return (
    <DrawerPrimitive.Description
      ref={ref}
      style={descriptionStyle}
      {...otherProps}
    />
  );
});
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};