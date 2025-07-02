import React, { forwardRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    style={{ borderBottom: "1px solid #e5e7eb" }} // Tailwind's border-b
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header style={{ display: "flex" }}>
    <AccordionPrimitive.Trigger
      ref={ref}
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 0", // py-4
        fontWeight: "500",
        transition: "all 0.2s",
        textDecoration: "none",
      }}
      onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
      onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
      {...props}
    >
      {children}
      <ChevronDown
        style={{
          height: "1rem",
          width: "1rem",
          flexShrink: 0,
          transition: "transform 0.2s",
        }}
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    style={{
      overflow: "hidden",
      fontSize: "0.875rem", // text-sm
      transition: "all 0.2s",
    }}
    {...props}
  >
    <div style={{ paddingBottom: "1rem", paddingTop: "0rem" }}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
