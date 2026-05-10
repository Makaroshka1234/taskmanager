import * as z from "zod";

export const registerSchema = z.object({
  email: z.string().email({
    message: "Enter correct email",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(32, {
      message: "Maximum 32 characters",
    }),
});

export type TypeRegisterSchema = z.infer<typeof registerSchema>;

