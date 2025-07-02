import * as SheetPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import React from "react"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef(({ style, ...props }, ref) => (
  <SheetPrimitive.Overlay
    style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 50,
      backgroundColor: 'rgba(0, 0, 0, 0.8)', // bg-black/80
      animation: 'fadeIn 150ms ease-out',
      ...style
    }}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

// Helper function to get sheet styles based on side
const getSheetStyles = (side = "right") => {
  const baseStyles = {
    position: 'fixed',
    zIndex: 50,
    gap: '16px', // gap-4
    backgroundColor: 'hsl(0 0% 100%)', // bg-background
    padding: '24px', // p-6
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', // shadow-lg
    transition: 'transform 300ms ease-in-out, opacity 300ms ease-in-out',
    animation: 'slideIn 500ms ease-in-out'
  }

  const sideStyles = {
    top: {
      top: 0,
      left: 0,
      right: 0,
      borderBottom: '1px solid hsl(214.3 31.8% 91.4%)', // border-b
      transform: 'translateY(0)'
    },
    bottom: {
      bottom: 0,
      left: 0,
      right: 0,
      borderTop: '1px solid hsl(214.3 31.8% 91.4%)', // border-t
      transform: 'translateY(0)'
    },
    left: {
      top: 0,
      bottom: 0,
      left: 0,
      height: '100%',
      width: '75%', // w-3/4
      maxWidth: '384px', // sm:max-w-sm
      borderRight: '1px solid hsl(214.3 31.8% 91.4%)', // border-r
      transform: 'translateX(0)'
    },
    right: {
      top: 0,
      bottom: 0,
      right: 0,
      height: '100%',
      width: '75%', // w-3/4
      maxWidth: '384px', // sm:max-w-sm
      borderLeft: '1px solid hsl(214.3 31.8% 91.4%)', // border-l
      transform: 'translateX(0)'
    }
  }

  return { ...baseStyles, ...sideStyles[side] }
}

const SheetContent = React.forwardRef(({ side = "right", style, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      style={{
        ...getSheetStyles(side),
        ...style
      }}
      {...props}
    >
      {children}
      <SheetPrimitive.Close 
        style={{
          position: 'absolute',
          right: '16px', // right-4
          top: '16px', // top-4
          borderRadius: '2px', // rounded-sm
          opacity: 0.7, // opacity-70
          transition: 'opacity 150ms ease',
          outline: 'none',
          cursor: 'pointer',
          padding: '4px',
          backgroundColor: 'transparent',
          border: 'none'
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = '1'; // hover:opacity-100
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = '0.7';
        }}
        onFocus={(e) => {
          e.target.style.boxShadow = '0 0 0 2px hsl(222.2 84% 4.9%)'; // focus:ring-2
        }}
        onBlur={(e) => {
          e.target.style.boxShadow = 'none';
        }}
      >
        <X style={{ height: '16px', width: '16px' }} />
        <span style={{ 
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0
        }}>Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({ style, ...props }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px', // space-y-2
      textAlign: 'center',
      '@media (min-width: 640px)': {
        textAlign: 'left' // sm:text-left
      },
      ...style
    }}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({ style, ...props }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column-reverse',
      gap: '8px',
      '@media (min-width: 640px)': {
        flexDirection: 'row', // sm:flex-row
        justifyContent: 'flex-end', // sm:justify-end
        gap: '8px' // sm:space-x-2
      },
      ...style
    }}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef(({ style, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    style={{
      fontSize: '18px', // text-lg
      fontWeight: '600', // font-semibold
      color: 'hsl(222.2 84% 4.9%)', // text-foreground
      ...style
    }}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef(({ style, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    style={{
      fontSize: '14px', // text-sm
      color: 'hsl(215.4 16.3% 46.9%)', // text-muted-foreground
      ...style
    }}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet, 
  SheetClose,
  SheetContent, 
  SheetDescription, 
  SheetFooter, 
  SheetHeader, 
  SheetOverlay, 
  SheetPortal, 
  SheetTitle, 
  SheetTrigger
}