import React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

const ScrollArea = React.forwardRef(({ style, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    style={{
      position: 'relative',
      overflow: 'hidden',
      ...style
    }}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport 
      style={{
        height: '100%',
        width: '100%',
        borderRadius: 'inherit'
      }}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef(({ style, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    style={{
      display: 'flex',
      touchAction: 'none',
      userSelect: 'none',
      transition: 'colors 150ms ease',
      ...(orientation === "vertical" && {
        height: '100%',
        width: '10px', // w-2.5 = 10px
        borderLeft: '1px solid transparent',
        padding: '1px'
      }),
      ...(orientation === "horizontal" && {
        height: '10px', // h-2.5 = 10px
        flexDirection: 'column',
        borderTop: '1px solid transparent',
        padding: '1px'
      }),
      ...style
    }}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb 
      style={{
        position: 'relative',
        flex: 1,
        borderRadius: '9999px',
        backgroundColor: 'hsl(214.3 31.8% 91.4%)' // bg-border equivalent
      }}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }