import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3, "Task must contain at least 3 characters").max(200),

  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export type createTaskSchema = z.infer<typeof createTaskSchema>;
