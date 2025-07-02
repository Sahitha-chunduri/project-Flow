import React from "react";

function CommandDialog({ children }) {
  return (
    <div style={styles.dialogOverlay}>
      <div style={styles.dialogContent}>
        <div style={styles.command}>{children}</div>
      </div>
    </div>
  );
}

const CommandInput = React.forwardRef(({ ...props }, ref) => (
  <div style={styles.inputWrapper}>
    <span style={styles.icon}>🔍</span>
    <input ref={ref} style={styles.input} placeholder="Search..." {...props} />
  </div>
));

const CommandList = React.forwardRef(({ children, ...props }, ref) => (
  <div ref={ref} style={styles.list} {...props}>
    {children}
  </div>
));

const CommandEmpty = React.forwardRef(({ children, ...props }, ref) => (
  <div ref={ref} style={styles.empty} {...props}>
    {children}
  </div>
));

const CommandGroup = React.forwardRef(({ children, ...props }, ref) => (
  <div ref={ref} style={styles.group} {...props}>
    {children}
  </div>
));

const CommandItem = React.forwardRef(({ children, ...props }, ref) => (
  <div ref={ref} style={styles.item} {...props}>
    {children}
  </div>
));

function CommandShortcut({ children }) {
  return <span style={styles.shortcut}>{children}</span>;
}

const CommandSeparator = React.forwardRef((props, ref) => (
  <div ref={ref} style={styles.separator} {...props} />
));

const styles = {
  dialogOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dialogContent: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
    width: "400px",
    maxHeight: "80vh",
  },
  command: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
    padding: "0.5rem",
  },
  icon: {
    marginRight: "0.5rem",
    fontSize: "16px",
    opacity: 0.5,
  },
  input: {
    flex: 1,
    height: "2.5rem",
    border: "none",
    background: "transparent",
    fontSize: "14px",
    outline: "none",
  },
  list: {
    maxHeight: "300px",
    overflowY: "auto",
  },
  empty: {
    padding: "1rem",
    textAlign: "center",
    fontSize: "14px",
    color: "#999",
  },
  group: {
    padding: "0.5rem",
    fontSize: "14px",
    color: "#333",
  },
  item: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  shortcut: {
    marginLeft: "auto",
    fontSize: "12px",
    letterSpacing: "1px",
    color: "#aaa",
  },
  separator: {
    height: "1px",
    backgroundColor: "#ccc",
    margin: "0.5rem 0",
  },
};

export {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
