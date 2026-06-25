"use client";

import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  // Controller props
  control: Control<TFieldValues>;
  name: TName;
  rules?: RegisterOptions<TFieldValues, TName>;

  // Input props
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  description?: string;

  // Transform props
  lowercase?: boolean;
  uppercase?: boolean;
  noSpaces?: boolean;
  alphanumericOnly?: boolean;
  autoFocus?: boolean;
}

const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  rules,
  label,
  type = "text",
  placeholder,
  disabled,
  required,
  className,
  inputClassName,
  description,
  lowercase,
  uppercase,
  noSpaces,
  alphanumericOnly,
  autoFocus = false,
}: FormInputProps<TFieldValues, TName>) => {
  const applyTransforms = (value: string): string => {
    let v = value;
    if (lowercase) v = v.toLowerCase();
    if (uppercase) v = v.toUpperCase();
    if (noSpaces) v = v.replace(/\s/g, "");
    if (alphanumericOnly) v = v.replace(/[^a-zA-Z0-9]/g, "");
    return v;
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (autoFocus) {
      e.target.select();
    } else {
      e.target.setSelectionRange(e.target.value.length, e.target.value.length);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error, invalid } }) => (
        <div className={cn("flex flex-col gap-1.5", className)}>
          {label && (
            <label
              htmlFor={name}
              className={cn(
                "text-sm font-medium leading-none",
                invalid ? "text-destructive" : "text-foreground",
                disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              {label}
              {required && (
                <span className="text-destructive ml-0.5" aria-hidden="true">
                  *
                </span>
              )}
            </label>
          )}

          <Input
            {...field}
            value={field.value ?? ""}
            onChange={(e) => field.onChange(applyTransforms(e.target.value))}
            id={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={invalid}
            onFocus={handleFocus}
            aria-describedby={
              error ? `${name}-error` : description ? `${name}-desc` : undefined
            }
            className={cn(
              "focus-visible:ring-1",
              invalid
                ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive"
                : "focus-visible:border-primary focus-visible:ring-primary",
              inputClassName,
            )}
          />

          {description && !error && (
            <p id={`${name}-desc`} className="text-xs text-muted-foreground">
              {description}
            </p>
          )}

          {error?.message && (
            <p
              id={`${name}-error`}
              role="alert"
              className="text-xs text-destructive flex items-center gap-1"
            >
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

FormInput.displayName = "FormInput";

export { FormInput };
export type { FormInputProps };
