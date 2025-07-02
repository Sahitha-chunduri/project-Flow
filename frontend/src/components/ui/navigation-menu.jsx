import React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { ChevronDown } from "lucide-react"

const NavigationMenu = React.forwardRef(({ style, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    style={{
      position: 'relative',
      zIndex: 10, // z-10
      display: 'flex',
      maxWidth: 'max-content', // max-w-max
      flex: '1', // flex-1
      alignItems: 'center',
      justifyContent: 'center',
      ...style
    }}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef(({ style, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    style={{
      display: 'flex',
      flex: '1', // flex-1
      listStyle: 'none', // list-none
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.25rem', // space-x-1
      ...style
    }}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

// Navigation Menu Trigger base styles
const navigationMenuTriggerBaseStyle = {
  display: 'inline-flex',
  height: '2.5rem', // h-10
  width: 'max-content', // w-max
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0.375rem', // rounded-md
  backgroundColor: '#ffffff', // bg-background
  paddingLeft: '1rem', // px-4
  paddingRight: '1rem',
  paddingTop: '0.5rem', // py-2
  paddingBottom: '0.5rem',
  fontSize: '0.875rem', // text-sm
  fontWeight: '500', // font-medium
  transition: 'colors 0.15s ease-in-out', // transition-colors
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  // Hover and focus states would need to be handled programmatically
  // or with CSS-in-JS for full functionality
}

const NavigationMenuTrigger = React.forwardRef(({ style, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    style={{
      ...navigationMenuTriggerBaseStyle,
      ...style
    }}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      style={{
        position: 'relative',
        top: '1px', // top-[1px]
        marginLeft: '0.25rem', // ml-1
        height: '0.75rem', // h-3
        width: '0.75rem', // w-3
        transition: 'transform 0.2s ease-in-out', // transition duration-200
        // group-data-[state=open]:rotate-180 would need to be handled programmatically
      }}
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef(({ style, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    style={{
      left: '0', // left-0
      top: '0', // top-0
      width: '100%', // w-full
      // Animation styles handled by Radix UI data attributes
      // md:absolute md:w-auto - responsive styles would need media queries
      '@media (min-width: 768px)': {
        position: 'absolute',
        width: 'auto'
      },
      ...style
    }}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef(({ style, ...props }, ref) => (
  <div 
    style={{
      position: 'absolute',
      left: '0', // left-0
      top: '100%', // top-full
      display: 'flex',
      justifyContent: 'center'
    }}
  >
    <NavigationMenuPrimitive.Viewport
      style={{
        transformOrigin: 'top center', // origin-top-center
        position: 'relative',
        marginTop: '0.375rem', // mt-1.5
        height: 'var(--radix-navigation-menu-viewport-height)', // h-[var(--radix-navigation-menu-viewport-height)]
        width: '100%', // w-full
        overflow: 'hidden',
        borderRadius: '0.375rem', // rounded-md
        border: '1px solid #d1d5db', // border
        backgroundColor: '#ffffff', // bg-popover
        color: '#374151', // text-popover-foreground
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg
        // Animation styles handled by Radix UI data attributes
        // md:w-[var(--radix-navigation-menu-viewport-width)] - responsive styles
        '@media (min-width: 768px)': {
          width: 'var(--radix-navigation-menu-viewport-width)'
        },
        ...style
      }}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef(({ style, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    style={{
      top: '100%', // top-full
      zIndex: 1, // z-[1]
      display: 'flex',
      height: '0.375rem', // h-1.5
      alignItems: 'flex-end', // items-end
      justifyContent: 'center',
      overflow: 'hidden',
      // Animation styles handled by Radix UI data attributes
      ...style
    }}
    {...props}
  >
    <div 
      style={{
        position: 'relative',
        top: '60%', // top-[60%]
        height: '0.5rem', // h-2
        width: '0.5rem', // w-2
        transform: 'rotate(45deg)', // rotate-45
        borderTopLeftRadius: '0.125rem', // rounded-tl-sm
        backgroundColor: '#d1d5db', // bg-border
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' // shadow-md
      }} 
    />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName

// Export the base trigger style for external use
const navigationMenuTriggerStyle = () => navigationMenuTriggerBaseStyle

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}