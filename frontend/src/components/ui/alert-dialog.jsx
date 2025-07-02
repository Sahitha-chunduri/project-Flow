import React, { forwardRef } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = forwardRef(({ ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 50,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    }}
    {...props}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = forwardRef(({ ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 50,
        width: "100%",
        maxWidth: "32rem",
        backgroundColor: "white",
        padding: "1.5rem",
        boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
        borderRadius: "0.5rem",
      }}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ ...props }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      textAlign: "center",
    }}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ ...props }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column-reverse",
      justifyContent: "flex-end",
      gap: "0.5rem",
    }}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = forwardRef(({ ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    style={{
      fontSize: "1.125rem",
      fontWeight: "600",
    }}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = forwardRef(({ ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    style={{
      fontSize: "0.875rem",
      color: "#6b7280", // Muted foreground
    }}
    {...props}
  />
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

const baseButtonStyle = {
  padding: "0.5rem 1rem",
  border: "1px solid transparent",
  borderRadius: "0.375rem",
  fontSize: "0.875rem",
  fontWeight: "500",
  cursor: "pointer",
};

const AlertDialogAction = forwardRef(({ ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    style={{
      ...baseButtonStyle,
      backgroundColor: "#2563eb",
      color: "white",
    }}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = forwardRef(({ ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    style={{
      ...baseButtonStyle,
      backgroundColor: "white",
      color: "#374151",
      border: "1px solid #d1d5db",
      marginTop: "0.5rem",
    }}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
