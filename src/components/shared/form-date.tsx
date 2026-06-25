// // components/ui/form-date.tsx
// "use client";

// import * as React from "react";
// import {
//   Controller,
//   type Control,
//   type FieldPath,
//   type FieldValues,
//   type RegisterOptions,
// } from "react-hook-form";
// import { CalendarIcon } from "lucide-react";
// import { cn }           from "@/lib/utils";
// import { Button }       from "@/components/ui/button";
// import { Calendar }     from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// function toYYYYMMDD(date: Date): string {
//   return date.toISOString().split("T")[0];
// }

// interface FormDateProps
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
// > {
//   control:      Control<TFieldValues>;
//   name:         TName;
//   rules?:       RegisterOptions<TFieldValues, TName>;
//   label?:       string;
//   placeholder?: string;
//   disabled?:    boolean;
//   required?:    boolean;
//   className?:   string;
//   minDate?:     Date;
//   maxDate?:     Date;
// }

// const FormDate =
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
// >({
//   control,
//   name,
//   rules,
//   label,
//   placeholder = "Select date",
//   disabled,
//   required,
//   className,
//   minDate,
//   maxDate,
// }: FormDateProps<TFieldValues, TName>) => {
//   const [open, setOpen] = React.useState(false);

//   return (
//     <Controller
//       control={control}
//       name={name}
//       rules={rules}
//       render={({ field, fieldState: { error, invalid } }) => {
//         const selectedDate = field.value ? new Date(field.value) : undefined;

//         return (
//           <div className={cn("flex flex-col gap-1.5", className)}>
//             {label && (
//               <label
//                 htmlFor={name}
//                 className={cn(
//                   "text-sm font-medium leading-none",
//                   invalid  ? "text-destructive" : "text-foreground",
//                   disabled && "opacity-50 cursor-not-allowed",
//                 )}
//               >
//                 {label}
//                 {required && (
//                   <span className="text-destructive ml-0.5" aria-hidden="true">
//                     *
//                   </span>
//                 )}
//               </label>
//             )}

//             <Popover open={open} onOpenChange={setOpen}>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   id={name}
//                   disabled={disabled}
//                   aria-invalid={invalid}
//                   className={cn(
//                     "w-full justify-start font-normal",
//                     !field.value && "text-muted-foreground",
//                     invalid && "border-destructive focus-visible:ring-destructive",
//                   )}
//                 >
//                   <CalendarIcon className="size-4 mr-2 shrink-0" />
//                   {field.value ? field.value : placeholder}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto overflow-hidden p-0" align="start">
//                 <Calendar
//                   mode="single"
//                   selected={selectedDate}
//                   defaultMonth={selectedDate}
//                   captionLayout="dropdown"
//                   disabled={(date) => {
//                     if (minDate && date < minDate) return true;
//                     if (maxDate && date > maxDate) return true;
//                     return false;
//                   }}
//                   onSelect={(date) => {
//                     field.onChange(date ? toYYYYMMDD(date) : "");
//                     setOpen(false);
//                   }}
//                 />
//               </PopoverContent>
//             </Popover>

//             {error?.message && (
//               <p
//                 id={`${name}-error`}
//                 role="alert"
//                 className="text-xs text-destructive flex items-center gap-1"
//               >
//                 {error.message}
//               </p>
//             )}
//           </div>
//         );
//       }}
//     />
//   );
// };

// FormDate.displayName = "FormDate";

// export { FormDate };
// export type { FormDateProps };
