import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  employer_id: z.string().optional(),
  location: z.string().optional(),
  job_type: z
    .enum(["full-time", "part-time", "contract", "temporary"])
    .optional(),
  status: z.enum(["open", "closed", "expired"]),
  category: z.string().optional(),
  urgency: z.enum(["low", "medium", "high", "urgent"]),
  needed_date: z.date({
    error: "La fecha de inicio es requerida",
  }),
});

export type CreateJobSchema = z.infer<typeof createJobSchema>;
