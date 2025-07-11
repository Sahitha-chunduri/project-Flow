import React from "react";

const buttonBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variantStyles = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 bg-white hover:bg-gray-100",
  secondary: "bg-gray-100 text-black hover:bg-gray-200",
  ghost: "bg-transparent hover:bg-gray-100",
  link: "text-blue-600 underline-offset-4 hover:underline",
};

const sizeStyles = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

function Button(
  { className = "", variant = "default", size = "default", asChild = false, ...props },
  ref
) {
  const classes = [
    buttonBase,
    variantStyles[variant] || "",
    sizeStyles[size] || "",
    className,
  ].join(" ");

  const Comp = asChild ? "span" : "button"; // fallback for Slot-like usage

  return <Comp ref={ref} className={classes} {...props} />;
}

const ForwardedButton = React.forwardRef(Button);
ForwardedButton.displayName = "Button";

export { ForwardedButton as Button };
