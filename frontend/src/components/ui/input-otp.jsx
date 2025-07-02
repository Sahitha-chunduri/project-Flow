import React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

const InputOTP = React.forwardRef(({ style, containerStyle, disabled, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName=""
    style={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "not-allowed" : "default",
      ...containerStyle,
      ...style,
    }}
    disabled={disabled}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef(({ style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      display: "flex",
      alignItems: "center",
      ...style,
    }}
    {...props}
  />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef(
  ({ index, style, isFirst = false, isLast = false, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext)
    const slot = inputOTPContext?.slots?.[index] || {}
    const { char, hasFakeCaret, isActive } = slot

    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          display: "flex",
          height: "2.5rem",
          width: "2.5rem",
          alignItems: "center",
          justifyContent: "center",
          borderTop: "1px solid #d1d5db",
          borderBottom: "1px solid #d1d5db",
          borderRight: "1px solid #d1d5db",
          fontSize: "0.875rem",
          transition: "all 0.15s ease-in-out",
          borderTopLeftRadius: isFirst ? "0.375rem" : "0",
          borderBottomLeftRadius: isFirst ? "0.375rem" : "0",
          borderLeft: isFirst ? "1px solid #d1d5db" : "none",
          borderTopRightRadius: isLast ? "0.375rem" : "0",
          borderBottomRightRadius: isLast ? "0.375rem" : "0",
          zIndex: isActive ? 10 : "auto",
          boxShadow: isActive ? "0 0 0 2px #3b82f6, 0 0 0 4px #ffffff" : "none",
          ...style,
        }}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div
            style={{
              pointerEvents: "none",
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: "1rem",
                width: "1px",
                backgroundColor: "#374151",
                animation: "caret-blink 1s infinite",
              }}
            />
            <style>
              {`
                @keyframes caret-blink {
                  0%, 50% { opacity: 1; }
                  51%, 100% { opacity: 0; }
                }
              `}
            </style>
          </div>
        )}
      </div>
    )
  }
)
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef(({ style, ...props }, ref) => (
  <div ref={ref} role="separator" style={style} {...props}>
    <Dot />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
