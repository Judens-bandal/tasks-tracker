// import z from "zod";

// export const CreateProject = z.object({
//   title: z.string().min(1, "Title required"),
//   description: z.string().min(1, "Description required"),
//   start_date: z.date(),
//   end_date: z.date(),
// });

import z from "zod";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD → 2027-03-15

export const CreateProjectSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title must be at most 100 characters"),

    description: z
      .string()
      .min(1, "Description is required")
      .max(500, "Description must be at most 500 characters"),

    start_date: z
      .string()
      .min(1, "Start date is required")
      .regex(dateRegex, "Must be YYYY-MM-DD format"),

    end_date: z
      .string()
      .min(1, "End date is required")
      .regex(dateRegex, "Must be YYYY-MM-DD format"),
  })
  .refine((data) => new Date(data.end_date) > new Date(data.start_date), {
    message: "End date must be after start date",
    path: ["end_date"],
  });

// export type TCreateProject = z.infer<typeof CreateProjectSchema>;
