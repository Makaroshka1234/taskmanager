import * as z from "zod";

export const createTaskListSchema = z.object({
  title: z.string().max(12, {
    message: "Max title length is 12",
  }),
});
export type createTaskListSchema = z.infer<typeof createTaskListSchema>;
