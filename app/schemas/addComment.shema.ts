import * as z from "zod";

export const addCommentSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, {
      message: "Коментар не може бути порожнім",
    })
    .max(1000, "Занадто довгий коментар"),
});

export type addCommentSchema = z.infer<typeof addCommentSchema>;
