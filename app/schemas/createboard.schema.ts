import * as z from "zod";

export const createBoardSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Cant be empty",
    })
    .max(15, {
      message: "Max title length is 12",
    }),
});
export type createBoardSchema = z.infer<typeof createBoardSchema>;
