import React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef(({ style, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    style={{
      zIndex: 50,
      width: '16rem', // w-64
      borderRadius: '0.375rem', // rounded-md
      border: '1px solid #e5e7eb', // border (gray-200)
      backgroundColor: '#ffffff', // bg-popover (white)
      padding: '1rem', // p-4
      color: '#374151', // text-popover-foreground (gray-700)
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // shadow-md
      outline: 'none',
      // Animation styles would need to be handled by Radix UI's data attributes
      // or custom CSS animations if needed
      ...style
    }}
    {...props}
  />
))

HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }