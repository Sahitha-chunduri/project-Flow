import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

// cn utility simplified to join class strings ignoring falsy values
function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

const ContextMenu = ContextMenuPrimitive.Root
const ContextMenuTrigger = ContextMenuPrimitive.Trigger
const ContextMenuGroup = ContextMenuPrimitive.Group
const ContextMenuPortal = ContextMenuPrimitive.Portal
const ContextMenuSub = ContextMenuPrimitive.Sub
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "context-menu-subtrigger",
      inset && "inset",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="icon-chevron-right" />
  </ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn("context-menu-subcontent", className)}
    {...props}
  />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn("context-menu-content", className)}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn("context-menu-item", inset && "inset", className)}
    {...props}
  />
))
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn("context-menu-checkbox-item", className)}
    checked={checked}
    {...props}
  >
    <span className="checkbox-indicator">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="icon-check" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn("context-menu-radio-item", className)}
    {...props}
  >
    <span className="radio-indicator">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="icon-circle" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn("context-menu-label", inset && "inset", className)}
    {...props}
  />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("context-menu-separator", className)}
    {...props}
  />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({ className, ...props }) => {
  return (
    <span className={cn("context-menu-shortcut", className)} {...props} />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}

<style>{`
/* Common focus style */
.context-menu-item,
.context-menu-subtrigger,
.context-menu-checkbox-item,
.context-menu-radio-item {
  cursor: default;
  user-select: none;
  border-radius: 0.125rem; /* rounded-sm */
  padding: 0.375rem 0.5rem; /* py-1.5 px-2 */
  font-size: 0.875rem; /* text-sm */
  outline: none;
  display: flex;
  align-items: center;
  position: relative;
}

.context-menu-item.inset,
.context-menu-subtrigger.inset,
.context-menu-label.inset {
  padding-left: 2rem; /* pl-8 */
}

/* Focus and open states */
.context-menu-item:focus,
.context-menu-subtrigger:focus,
.context-menu-checkbox-item:focus,
.context-menu-radio-item:focus {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

[data-state="open"].context-menu-subtrigger,
[data-state="open"].context-menu-item {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

.context-menu-item[data-disabled],
.context-menu-checkbox-item[data-disabled],
.context-menu-radio-item[data-disabled] {
  pointer-events: none;
  opacity: 0.5;
}

/* Context Menu Content */
.context-menu-content,
.context-menu-subcontent {
  z-index: 50;
  min-width: 8rem; /* min-w-[8rem] */
  overflow: hidden;
  border-radius: 0.375rem; /* rounded-md */
  border: 1px solid var(--border);
  background-color: var(--popover);
  color: var(--popover-foreground);
  padding: 0.25rem; /* p-1 */
  box-shadow: 0 4px 6px rgb(0 0 0 / 0.1);
  animation-duration: 0.15s;
  animation-fill-mode: forwards;
}

/* Animations */
/* These can be customized or replaced */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
@keyframes zoom-in {
  from { transform: scale(0.95); }
  to { transform: scale(1); }
}
@keyframes zoom-out {
  from { transform: scale(1); }
  to { transform: scale(0.95); }
}
@keyframes slide-in-from-top {
  from { transform: translateY(-0.5rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes slide-in-from-right {
  from { transform: translateX(0.5rem); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes slide-in-from-left {
  from { transform: translateX(-0.5rem); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes slide-in-from-bottom {
  from { transform: translateY(0.5rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.context-menu-content[data-state="open"],
.context-menu-subcontent[data-state="open"] {
  animation-name: fade-in, zoom-in, slide-in-from-top;
  animation-timing-function: ease-out;
}

.context-menu-content[data-state="closed"],
.context-menu-subcontent[data-state="closed"] {
  animation-name: fade-out, zoom-out;
  animation-timing-function: ease-in;
}

/* Specific slide direction by data-side */
.context-menu-content[data-side="bottom"],
.context-menu-subcontent[data-side="bottom"] {
  animation-name: fade-in, zoom-in, slide-in-from-top;
}
.context-menu-content[data-side="top"],
.context-menu-subcontent[data-side="top"] {
  animation-name: fade-in, zoom-in, slide-in-from-bottom;
}
.context-menu-content[data-side="left"],
.context-menu-subcontent[data-side="left"] {
  animation-name: fade-in, zoom-in, slide-in-from-right;
}
.context-menu-content[data-side="right"],
.context-menu-subcontent[data-side="right"] {
  animation-name: fade-in, zoom-in, slide-in-from-left;
}

/* Icon styling */
.icon-chevron-right {
  margin-left: auto;
  height: 1rem; /* h-4 */
  width: 1rem;  /* w-4 */
  flex-shrink: 0;
}

.icon-check {
  height: 1rem;
  width: 1rem;
}

.icon-circle {
  height: 0.5rem; /* h-2 */
  width: 0.5rem;  /* w-2 */
  fill: currentColor;
}

/* Checkbox Item */
.context-menu-checkbox-item {
  padding-left: 2rem; /* pl-8 */
  padding-right: 0.5rem; /* pr-2 */
  position: relative;
  align-items: center;
}

.checkbox-indicator {
  position: absolute;
  left: 0.5rem; /* left-2 */
  display: flex;
  height: 0.875rem; /* h-3.5 */
  width: 0.875rem; /* w-3.5 */
  align-items: center;
  justify-content: center;
}

/* Radio Item */
.context-menu-radio-item {
  padding-left: 2rem; /* pl-8 */
  padding-right: 0.5rem; /* pr-2 */
  position: relative;
  align-items: center;
}

.radio-indicator {
  position: absolute;
  left: 0.5rem; /* left-2 */
  display: flex;
  height: 0.875rem; /* h-3.5 */
  width: 0.875rem; /* w-3.5 */
  align-items: center;
  justify-content: center;
}

/* Label */
.context-menu-label {
  padding: 0.375rem 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--foreground);
}
.context-menu-label.inset {
  padding-left: 2rem;
}

/* Separator */
.context-menu-separator {
  margin: 0.25rem 0; /* my-1 */
  height: 1px; /* h-px */
  background-color: var(--border);
  margin-left: -0.25rem; /* -mx-1 */
  margin-right: -0.25rem; /* -mx-1 */
}

/* Shortcut */
.context-menu-shortcut {
  margin-left: auto;
  font-size: 0.75rem; /* text-xs */
  letter-spacing: 0.1em; /* tracking-widest */
  color: var(--muted-foreground);
}
`}</style>
