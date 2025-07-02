import React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

const Label = React.forwardRef(({ style, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    style={{
      fontSize: '0.875rem', // text-sm
      fontWeight: '500', // font-medium
      lineHeight: '1', // leading-none
      // peer-disabled styles would apply when a peer element is disabled
      // This is typically handled by CSS selectors, but for inline styles
      // you'd need to manage this state in your component logic
      ...style
    }}
    {...props}
  />
))

Label.displayName = LabelPrimitive.Root.displayName

export { Label }