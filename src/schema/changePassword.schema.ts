import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty("Current password is required"),

    password: z
      .string()
      .nonempty("New password is required")
      .min(8, "Minimum 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Must contain uppercase, lowercase, number and special character"
      ),

    rePassword: z
      .string()
      .nonempty("Please confirm your new password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"], 
  });

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;