import React from "react";

function Card({ className = "", ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`rounded-lg border bg-white text-black shadow-sm ${className}`}
      {...props}
    />
  );
}
const ForwardedCard = React.forwardRef(Card);

function CardHeader({ className = "", ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    />
  );
}
const ForwardedCardHeader = React.forwardRef(CardHeader);

function CardTitle({ className = "", ...props }, ref) {
  return (
    <h3
      ref={ref}
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  );
}
const ForwardedCardTitle = React.forwardRef(CardTitle);

function CardDescription({ className = "", ...props }, ref) {
  return (
    <p
      ref={ref}
      className={`text-sm text-gray-500 ${className}`}
      {...props}
    />
  );
}
const ForwardedCardDescription = React.forwardRef(CardDescription);

function CardContent({ className = "", ...props }, ref) {
  return (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
  );
}
const ForwardedCardContent = React.forwardRef(CardContent);

function CardFooter({ className = "", ...props }, ref) {
  return (
    <div ref={ref} className={`flex items-center p-6 pt-0 ${className}`} {...props} />
  );
}
const ForwardedCardFooter = React.forwardRef(CardFooter);

export {
  ForwardedCard as Card,
  ForwardedCardHeader as CardHeader,
  ForwardedCardFooter as CardFooter,
  ForwardedCardTitle as CardTitle,
  ForwardedCardDescription as CardDescription,
  ForwardedCardContent as CardContent,
};
