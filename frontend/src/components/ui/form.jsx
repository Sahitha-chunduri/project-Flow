import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

const Form = FormProvider;

const FormFieldContext = React.createContext({});

const FormField = (props) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormItemContext = React.createContext({});

const FormItem = React.forwardRef((props, ref) => {
  const { style, ...otherProps } = props;
  const id = React.useId();

  const itemStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    ...style
  };

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} style={itemStyle} {...otherProps} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef((props, ref) => {
  const { style, ...otherProps } = props;
  const { error, formItemId } = useFormField();

  const labelStyle = {
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1,
    color: error ? "#dc2626" : "inherit",
    ...style
  };

  return (
    <LabelPrimitive.Root
      ref={ref}
      style={labelStyle}
      htmlFor={formItemId}
      {...otherProps}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef((props, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef((props, ref) => {
  const { style, ...otherProps } = props;
  const { formDescriptionId } = useFormField();

  const descriptionStyle = {
    fontSize: "0.875rem",
    color: "#6b7280",
    ...style
  };

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      style={descriptionStyle}
      {...otherProps}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef((props, ref) => {
  const { style, children, ...otherProps } = props;
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  const messageStyle = {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "#dc2626",
    ...style
  };

  return (
    <p
      ref={ref}
      id={formMessageId}
      style={messageStyle}
      {...otherProps}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};