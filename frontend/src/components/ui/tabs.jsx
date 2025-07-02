import React from "react";

// Note: This component requires @radix-ui/react-tabs to be installed
// You can install it with: npm install @radix-ui/react-tabs
import * as TabsPrimitive from "@radix-ui/react-tabs";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef(({ className = "", ...props }, ref) => (
  <>
    <style jsx>{`
      .tabs-list {
        display: inline-flex;
        height: 2.5rem;
        align-items: center;
        justify-content: center;
        border-radius: 0.375rem;
        background-color: hsl(210 40% 98%);
        padding: 0.25rem;
        color: hsl(215.4 16.3% 46.9%);
      }
      
      .dark .tabs-list {
        background-color: hsl(210 40% 2%);
        color: hsl(215.4 16.3% 56.9%);
      }
    `}</style>
    <TabsPrimitive.List
      ref={ref}
      className={`tabs-list ${className}`}
      {...props}
    />
  </>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef(({ className = "", ...props }, ref) => (
  <>
    <style jsx>{`
      .tabs-trigger {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        border-radius: 0.125rem;
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1.25rem;
        ring-offset-color: hsl(0 0% 100%);
        transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        border: none;
        background: transparent;
      }
      
      .tabs-trigger:focus-visible {
        outline: 2px solid transparent;
        outline-offset: 2px;
        box-shadow: 0 0 0 2px hsl(215.4 16.3% 46.9%), 0 0 0 4px hsl(0 0% 100%);
      }
      
      .tabs-trigger:disabled {
        pointer-events: none;
        opacity: 0.5;
      }
      
      .tabs-trigger[data-state="active"] {
        background-color: hsl(0 0% 100%);
        color: hsl(222.2 84% 4.9%);
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      }
      
      .dark .tabs-trigger {
        ring-offset-color: hsl(222.2 84% 4.9%);
      }
      
      .dark .tabs-trigger:focus-visible {
        box-shadow: 0 0 0 2px hsl(215.4 16.3% 56.9%), 0 0 0 4px hsl(222.2 84% 4.9%);
      }
      
      .dark .tabs-trigger[data-state="active"] {
        background-color: hsl(222.2 84% 4.9%);
        color: hsl(210 40% 98%);
      }
    `}</style>
    <TabsPrimitive.Trigger
      ref={ref}
      className={`tabs-trigger ${className}`}
      {...props}
    />
  </>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef(({ className = "", ...props }, ref) => (
  <>
    <style jsx>{`
      .tabs-content {
        margin-top: 0.5rem;
        ring-offset-color: hsl(0 0% 100%);
      }
      
      .tabs-content:focus-visible {
        outline: 2px solid transparent;
        outline-offset: 2px;
        box-shadow: 0 0 0 2px hsl(215.4 16.3% 46.9%), 0 0 0 4px hsl(0 0% 100%);
      }
      
      .dark .tabs-content {
        ring-offset-color: hsl(222.2 84% 4.9%);
      }
      
      .dark .tabs-content:focus-visible {
        box-shadow: 0 0 0 2px hsl(215.4 16.3% 56.9%), 0 0 0 4px hsl(222.2 84% 4.9%);
      }
    `}</style>
    <TabsPrimitive.Content
      ref={ref}
      className={`tabs-content ${className}`}
      {...props}
    />
  </>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Example usage component
const TabsExample = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }}>
            Content for Tab 1
          </div>
        </TabsContent>
        <TabsContent value="tab2">
          <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }}>
            Content for Tab 2
          </div>
        </TabsContent>
        <TabsContent value="tab3">
          <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }}>
            Content for Tab 3
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsExample;
export { Tabs, TabsList, TabsTrigger, TabsContent };