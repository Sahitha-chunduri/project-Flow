import React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

const Separator = React.forwardRef(
  (
    { style, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      style={{
        flexShrink: 0, // shrink-0
        backgroundColor: 'hsl(214.3 31.8% 91.4%)', // bg-border
        ...(orientation === "horizontal" ? {
          height: '1px', // h-[1px]
          width: '100%' // w-full
        } : {
          height: '100%', // h-full
          width: '1px' // w-[1px]
        }),
        ...style
      }}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }