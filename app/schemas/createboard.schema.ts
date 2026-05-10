import * as z from "zod";

export const createBoardSchema = z.object({
  title: z.string().max(12, {
    message: "Max title length is 12",
  }),
});
export type createBoardSchema = z.infer<typeof createBoardSchema>;
