import React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

const MenubarMenu = MenubarPrimitive.Menu

const MenubarGroup = MenubarPrimitive.Group

const MenubarPortal = MenubarPrimitive.Portal

const MenubarSub = MenubarPrimitive.Sub

const MenubarRadioGroup = MenubarPrimitive.RadioGroup

const Menubar = React.forwardRef(({ style, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    style={{
      display: 'flex',
      height: '2.5rem', // h-10
      alignItems: 'center',
      gap: '0.25rem', // space-x-1
      borderRadius: '0.375rem', // rounded-md
      border: '1px solid #d1d5db', // border
      backgroundColor: '#ffffff', // bg-background
      padding: '0.25rem', // p-1
      ...style
    }}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef(({ style, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    style={{
      display: 'flex',
      cursor: 'default',
      userSelect: 'none', // select-none
      alignItems: 'center',
      borderRadius: '0.125rem', // rounded-sm
      paddingLeft: '0.75rem', // px-3
      paddingRight: '0.75rem',
      paddingTop: '0.375rem', // py-1.5
      paddingBottom: '0.375rem',
      fontSize: '0.875rem', // text-sm
      fontWeight: '500', // font-medium
      outline: 'none',
      transition: 'all 0.15s ease-in-out',
      // Focus and state styles would be handled by Radix UI data attributes
      // You might need to add CSS for data-[state=open] and focus states
      ...style
    }}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef(({ style, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    style={{
      display: 'flex',
      cursor: 'default',
      userSelect: 'none',
      alignItems: 'center',
      borderRadius: '0.125rem', // rounded-sm
      paddingLeft: inset ? '2rem' : '0.5rem', // px-2, inset && "pl-8"
      paddingRight: '0.5rem',
      paddingTop: '0.375rem', // py-1.5
      paddingBottom: '0.375rem',
      fontSize: '0.875rem', // text-sm
      outline: 'none',
      transition: 'all 0.15s ease-in-out',
      ...style
    }}
    {...props}
  >
    {children}
    <ChevronRight 
      style={{
        marginLeft: 'auto', // ml-auto
        height: '1rem', // h-4
        width: '1rem' // w-4
      }} 
    />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef(({ style, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    style={{
      zIndex: 50, // z-50
      minWidth: '8rem', // min-w-[8rem]
      overflow: 'hidden',
      borderRadius: '0.375rem', // rounded-md
      border: '1px solid #d1d5db', // border
      backgroundColor: '#ffffff', // bg-popover
      padding: '0.25rem', // p-1
      color: '#374151', // text-popover-foreground
      // Animation styles handled by Radix UI data attributes
      ...style
    }}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef(({ style, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      style={{
        zIndex: 50, // z-50
        minWidth: '12rem', // min-w-[12rem]
        overflow: 'hidden',
        borderRadius: '0.375rem', // rounded-md
        border: '1px solid #d1d5db', // border
        backgroundColor: '#ffffff', // bg-popover
        padding: '0.25rem', // p-1
        color: '#374151', // text-popover-foreground
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // shadow-md
        // Animation styles handled by Radix UI data attributes
        ...style
      }}
      {...props}
    />
  </MenubarPrimitive.Portal>
))
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef(({ style, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    style={{
      position: 'relative',
      display: 'flex',
      cursor: 'default',
      userSelect: 'none',
      alignItems: 'center',
      borderRadius: '0.125rem', // rounded-sm
      paddingLeft: inset ? '2rem' : '0.5rem', // px-2, inset && "pl-8"
      paddingRight: '0.5rem',
      paddingTop: '0.375rem', // py-1.5
      paddingBottom: '0.375rem',
      fontSize: '0.875rem', // text-sm
      outline: 'none',
      transition: 'all 0.15s ease-in-out',
      // Focus and disabled styles handled by Radix UI data attributes
      ...style
    }}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef(({ style, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    style={{
      position: 'relative',
      display: 'flex',
      cursor: 'default',
      userSelect: 'none',
      alignItems: 'center',
      borderRadius: '0.125rem', // rounded-sm
      paddingTop: '0.375rem', // py-1.5
      paddingBottom: '0.375rem',
      paddingLeft: '2rem', // pl-8
      paddingRight: '0.5rem', // pr-2
      fontSize: '0.875rem', // text-sm
      outline: 'none',
      transition: 'all 0.15s ease-in-out',
      ...style
    }}
    checked={checked}
    {...props}
  >
    <span 
      style={{
        position: 'absolute',
        left: '0.5rem', // left-2
        display: 'flex',
        height: '0.875rem', // h-3.5
        width: '0.875rem', // w-3.5
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <MenubarPrimitive.ItemIndicator>
        <Check 
          style={{
            height: '1rem', // h-4
            width: '1rem' // w-4
          }} 
        />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef(({ style, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    style={{
      position: 'relative',
      display: 'flex',
      cursor: 'default',
      userSelect: 'none',
      alignItems: 'center',
      borderRadius: '0.125rem', // rounded-sm
      paddingTop: '0.375rem', // py-1.5
      paddingBottom: '0.375rem',
      paddingLeft: '2rem', // pl-8
      paddingRight: '0.5rem', // pr-2
      fontSize: '0.875rem', // text-sm
      outline: 'none',
      transition: 'all 0.15s ease-in-out',
      ...style
    }}
    {...props}
  >
    <span 
      style={{
        position: 'absolute',
        left: '0.5rem', // left-2
        display: 'flex',
        height: '0.875rem', // h-3.5
        width: '0.875rem', // w-3.5
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <MenubarPrimitive.ItemIndicator>
        <Circle 
          style={{
            height: '0.5rem', // h-2
            width: '0.5rem', // w-2
            fill: 'currentColor' // fill-current
          }} 
        />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef(({ style, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    style={{
      paddingLeft: inset ? '2rem' : '0.5rem', // px-2, inset && "pl-8"
      paddingRight: '0.5rem',
      paddingTop: '0.375rem', // py-1.5
      paddingBottom: '0.375rem',
      fontSize: '0.875rem', // text-sm
      fontWeight: '600', // font-semibold
      ...style
    }}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef(({ style, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    style={{
      marginLeft: '-0.25rem', // -mx-1
      marginRight: '-0.25rem',
      marginTop: '0.25rem', // my-1
      marginBottom: '0.25rem',
      height: '1px', // h-px
      backgroundColor: '#f3f4f6', // bg-muted
      ...style
    }}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({ style, ...props }) => {
  return (
    <span
      style={{
        marginLeft: 'auto', // ml-auto
        fontSize: '0.75rem', // text-xs
        letterSpacing: '0.1em', // tracking-widest
        color: '#9ca3af', // text-muted-foreground
        ...style
      }}
      {...props}
    />
  )
}
MenubarShortcut.displayName = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}