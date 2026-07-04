import * as z from "zod";

export const inviteUserSchema = z.object({
  email: z.string().email({
    message: "Enter correct email",
  }),
  role: z.enum(["member", "admin"]),
});
export type inviteUserSchema = z.infer<typeof inviteUserSchema>;
