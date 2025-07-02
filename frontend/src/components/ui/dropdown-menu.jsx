import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef((props, ref) => {
  const { style, inset, children, ...otherProps } = props;
  
  const subTriggerStyle = {
    display: "flex",
    cursor: "default",
    userSelect: "none",
    alignItems: "center",
    borderRadius: "0.125rem",
    paddingLeft: inset ? "2rem" : "0.5rem",
    paddingRight: "0.5rem",
    paddingTop: "0.375rem",
    paddingBottom: "0.375rem",
    fontSize: "0.875rem",
    outline: "none",
    transition: "background-color 0.2s",
    ...style
  };

  const chevronStyle = {
    marginLeft: "auto",
    height: "1rem",
    width: "1rem"
  };

  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      style={subTriggerStyle}
      {...otherProps}
    >
      {children}
      <ChevronRight style={chevronStyle} />
    </DropdownMenuPrimitive.SubTrigger>
  );
});
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef((props, ref) => {
  const { style, ...otherProps } = props;
  
  const subContentStyle = {
    zIndex: 50,
    minWidth: "8rem",
    overflow: "hidden",
    borderRadius: "0.375rem",
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    padding: "0.25rem",
    color: "#0f172a",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    ...style
  };

  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      style={subContentStyle}
      {...otherProps}
    />
  );
});
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef((props, ref) => {
  const { style, sideOffset = 4, ...otherProps } = props;
  
  const contentStyle = {
    zIndex: 50,
    minWidth: "8rem",
    overflow: "hidden",
    borderRadius: "0.375rem",
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    padding: "0.25rem",
    color: "#0f172a",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    ...style
  };

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        style={contentStyle}
        {...otherProps}
      />
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef((props, ref) => {
  const { style, inset, ...otherProps } = props;
  
  const [isHovered, setIsHovered] = React.useState(false);
  
  const itemStyle = {
    position: "relative",
    display: "flex",
    cursor: "default",
    userSelect: "none",
    alignItems: "center",
    borderRadius: "0.125rem",
    paddingLeft: inset ? "2rem" : "0.5rem",
    paddingRight: "0.5rem",
    paddingTop: "0.375rem",
    paddingBottom: "0.375rem",
    fontSize: "0.875rem",
    outline: "none",
    transition: "colors 0.2s",
    backgroundColor: isHovered ? "#f1f5f9" : "transparent",
    color: isHovered ? "#0f172a" : "inherit",
    ...style
  };

  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      style={itemStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...otherProps}
    />
  );
});
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef((props, ref) => {
  const { style, children, checked, ...otherProps } = props;
  
  const [isHovered, setIsHovered] = React.useState(false);
  
  const checkboxItemStyle = {
    position: "relative",
    display: "flex",
    cursor: "default",
    userSelect: "none",
    alignItems: "center",
    borderRadius: "0.125rem",
    paddingTop: "0.375rem",
    paddingBottom: "0.375rem",
    paddingLeft: "2rem",
    paddingRight: "0.5rem",
    fontSize: "0.875rem",
    outline: "none",
    transition: "colors 0.2s",
    backgroundColor: isHovered ? "#f1f5f9" : "transparent",
    color: isHovered ? "#0f172a" : "inherit",
    ...style
  };

  const indicatorStyle = {
    position: "absolute",
    left: "0.5rem",
    display: "flex",
    height: "0.875rem",
    width: "0.875rem",
    alignItems: "center",
    justifyContent: "center"
  };

  const checkIconStyle = {
    height: "1rem",
    width: "1rem"
  };

  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      style={checkboxItemStyle}
      checked={checked}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...otherProps}
    >
      <span style={indicatorStyle}>
        <DropdownMenuPrimitive.ItemIndicator>
          <Check style={checkIconStyle} />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef((props, ref) => {
  const { style, children, ...otherProps } = props;
  
  const [isHovered, setIsHovered] = React.useState(false);
  
  const radioItemStyle = {
    position: "relative",
    display: "flex",
    cursor: "default",
    userSelect: "none",
    alignItems: "center",
    borderRadius: "0.125rem",
    paddingTop: "0.375rem",
    paddingBottom: "0.375rem",
    paddingLeft: "2rem",
    paddingRight: "0.5rem",
    fontSize: "0.875rem",
    outline: "none",
    transition: "colors 0.2s",
    backgroundColor: isHovered ? "#f1f5f9" : "transparent",
    color: isHovered ? "#0f172a" : "inherit",
    ...style
  };

  const indicatorStyle = {
    position: "absolute",
    left: "0.5rem",
    display: "flex",
    height: "0.875rem",
    width: "0.875rem",
    alignItems: "center",
    justifyContent: "center"
  };

  const circleIconStyle = {
    height: "0.5rem",
    width: "0.5rem",
    fill: "currentColor"
  };

  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      style={radioItemStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...otherProps}
    >
      <span style={indicatorStyle}>
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle style={circleIconStyle} />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
});
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef((props, ref) => {
  const { style, inset, ...otherProps } = props;
  
  const labelStyle = {
    paddingLeft: inset ? "2rem" : "0.5rem",
    paddingRight: "0.5rem",
    paddingTop: "0.375rem",
    paddingBottom: "0.375rem",
    fontSize: "0.875rem",
    fontWeight: 600,
    ...style
  };

  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      style={labelStyle}
      {...otherProps}
    />
  );
});
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef((props, ref) => {
  const { style, ...otherProps } = props;
  
  const separatorStyle = {
    marginLeft: "-0.25rem",
    marginRight: "-0.25rem",
    marginTop: "0.25rem",
    marginBottom: "0.25rem",
    height: "1px",
    backgroundColor: "#f1f5f9",
    ...style
  };

  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      style={separatorStyle}
      {...otherProps}
    />
  );
});
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = (props) => {
  const { style, ...otherProps } = props;
  
  const shortcutStyle = {
    marginLeft: "auto",
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    opacity: 0.6,
    ...style
  };

  return (
    <span
      style={shortcutStyle}
      {...otherProps}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};