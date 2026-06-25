import { z } from "zod";

export const createAdminTaskValidation = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    dueDate: z.string().optional(),
    assignedTo: z.string().min(1),
    lead: z.string().optional(),
  }),
});

export const updateAdminTaskValidation = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    dueDate: z.string().optional(),
    isDone: z.boolean().optional(),
    assignedTo: z.string().optional(),
    lead: z.string().optional(),
  }),
});
