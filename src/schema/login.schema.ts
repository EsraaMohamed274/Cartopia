import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.email("Invalid email format").nonempty("Email is required"),

    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Minimum 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain uppercase, lowercase, number and special character"
      ),
  })
  
export type LoginSchemaType = z.infer<typeof loginSchema>;
