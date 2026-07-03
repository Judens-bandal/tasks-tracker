"use client";

import { FormInput } from "@/components/shared/form-input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateProject } from "@/hooks/use-project";
import { CreateProjectSchema } from "@/schemas/project.schema";
import { toYYYYMMDD } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar1Icon, CalendarIcon } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface ICreateDialogProject {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const CreateDialogProject = ({
  open,
  onOpenChange,
  onSuccess,
}: ICreateDialogProject) => {
  const form = useForm({
    resolver: zodResolver(CreateProjectSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      start_date: "",
      end_date: "",
    },
  });

  const { mutate, isPending } = useCreateProject({
    onSuccess: () => {
      form.reset();
      onOpenChange(false);
      if (onSuccess) onSuccess();
    },
  });

  const [starDateOpen, setStarDateOpen] = React.useState(false);
  const [endDateOpen, setEndDateOpen] = React.useState(false);
  const [dateStart, setDateStart] = React.useState<Date | undefined>(undefined);
  const [dateEnd, setDateEnd] = React.useState<Date | undefined>(undefined);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={form.handleSubmit((data) => mutate(data))}>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>Select Date Range</DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <FormInput
                control={form.control}
                name="title"
                label="Title"
                placeholder="Project title"
              />
            </Field>
            <Field>
              <FormInput
                control={form.control}
                name="description"
                label="Description"
                placeholder="Description"
              />
            </Field>
          </FieldGroup>

          <FieldGroup className="grid grid-cols-2 gap-4 py-2">
            <Controller
              name="start_date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="start_date">Start Date</FieldLabel>
                  <Popover open={starDateOpen} onOpenChange={setStarDateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        id="start_date"
                        className="w-full justify-start font-normal"
                      >
                        <Calendar1Icon className="size-4 mr-2" />
                        {dateStart ? toYYYYMMDD(dateStart) : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={dateStart}
                        defaultMonth={dateStart}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setDateStart(date);
                          field.onChange(date ? toYYYYMMDD(date) : "");
                          setStarDateOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="end_date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="end_date">End Date</FieldLabel>
                  <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        id="end_date"
                        className="w-full justify-start font-normal"
                      >
                        <CalendarIcon className="size-4 mr-2" />
                        {dateEnd ? toYYYYMMDD(dateEnd) : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={dateEnd}
                        defaultMonth={dateEnd}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setDateEnd(date);
                          field.onChange(date ? toYYYYMMDD(date) : "");
                          setEndDateOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              disabled={isPending}
              onClick={form.handleSubmit((data) => mutate(data))}
            >
              {isPending ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
