import React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef(({ style, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    style={{
      display: 'flex',
      height: '40px', // h-10
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: '6px', // rounded-md
      border: '1px solid hsl(214.3 31.8% 91.4%)', // border-input
      backgroundColor: 'hsl(0 0% 100%)', // bg-background
      paddingLeft: '12px', // px-3
      paddingRight: '12px',
      paddingTop: '8px', // py-2
      paddingBottom: '8px',
      fontSize: '14px', // text-sm
      outline: 'none',
      transition: 'box-shadow 150ms ease',
      ...style
    }}
    onFocus={(e) => {
      e.target.style.boxShadow = '0 0 0 2px hsl(222.2 84% 4.9%), 0 0 0 4px hsl(222.2 84% 4.9%)';
    }}
    onBlur={(e) => {
      e.target.style.boxShadow = 'none';
    }}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown style={{ height: '16px', width: '16px', opacity: 0.5 }} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef(({ style, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    style={{
      display: 'flex',
      cursor: 'default',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '4px', // py-1
      paddingBottom: '4px',
      ...style
    }}
    {...props}
  >
    <ChevronUp style={{ height: '16px', width: '16px' }} />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef(({ style, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    style={{
      display: 'flex',
      cursor: 'default',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '4px', // py-1
      paddingBottom: '4px',
      ...style
    }}
    {...props}
  >
    <ChevronDown style={{ height: '16px', width: '16px' }} />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef(({ style, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 50,
        maxHeight: '384px', // max-h-96
        minWidth: '128px', // min-w-[8rem]
        overflow: 'hidden',
        borderRadius: '6px', // rounded-md
        border: '1px solid hsl(214.3 31.8% 91.4%)',
        backgroundColor: 'hsl(0 0% 100%)', // bg-popover
        color: 'hsl(222.2 84% 4.9%)', // text-popover-foreground
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', // shadow-md
        animation: 'fadeIn 150ms ease-out',
        transformOrigin: 'var(--radix-select-content-transform-origin)',
        ...(position === "popper" && {
          transform: 'translateY(4px)'
        }),
        ...style
      }}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        style={{
          padding: '4px', // p-1
          ...(position === "popper" && {
            height: 'var(--radix-select-trigger-height)',
            width: '100%',
            minWidth: 'var(--radix-select-trigger-width)'
          })
        }}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef(({ style, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    style={{
      paddingTop: '6px', // py-1.5
      paddingBottom: '6px',
      paddingLeft: '32px', // pl-8
      paddingRight: '8px', // pr-2
      fontSize: '14px', // text-sm
      fontWeight: '600', // font-semibold
      ...style
    }}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef(({ style, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    style={{
      position: 'relative',
      display: 'flex',
      width: '100%',
      cursor: 'default',
      userSelect: 'none',
      alignItems: 'center',
      borderRadius: '2px', // rounded-sm
      paddingTop: '6px', // py-1.5
      paddingBottom: '6px',
      paddingLeft: '32px', // pl-8
      paddingRight: '8px', // pr-2
      fontSize: '14px', // text-sm
      outline: 'none',
      transition: 'background-color 150ms ease, color 150ms ease',
      ...style
    }}
    onFocus={(e) => {
      e.target.style.backgroundColor = 'hsl(210 40% 98%)'; // focus:bg-accent
      e.target.style.color = 'hsl(222.2 84% 4.9%)'; // focus:text-accent-foreground
    }}
    onBlur={(e) => {
      e.target.style.backgroundColor = 'transparent';
      e.target.style.color = 'inherit';
    }}
    {...props}
  >
    <span style={{
      position: 'absolute',
      left: '8px', // left-2
      display: 'flex',
      height: '14px', // h-3.5
      width: '14px', // w-3.5
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <SelectPrimitive.ItemIndicator>
        <Check style={{ height: '16px', width: '16px' }} />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef(({ style, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    style={{
      marginLeft: '-4px', // -mx-1
      marginRight: '-4px',
      marginTop: '4px', // my-1
      marginBottom: '4px',
      height: '1px', // h-px
      backgroundColor: 'hsl(210 40% 98%)', // bg-muted
      ...style
    }}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}