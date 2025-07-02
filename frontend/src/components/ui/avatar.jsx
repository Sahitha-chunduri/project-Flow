import React, { forwardRef } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

const Avatar = forwardRef(({ style, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    style={{
      position: "relative",
      display: "flex",
      height: "2.5rem",
      width: "2.5rem",
      flexShrink: 0,
      overflow: "hidden",
      borderRadius: "9999px",
      ...style,
    }}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = forwardRef(({ style, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    style={{
      aspectRatio: 1,
      height: "100%",
      width: "100%",
      objectFit: "cover",
      ...style,
    }}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = forwardRef(({ style, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    style={{
      display: "flex",
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "9999px",
      backgroundColor: "#e5e7eb", // muted tone
      ...style,
    }}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
