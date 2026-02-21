import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(2, "Minimum 2 characters")
      .max(20, "Maximum 20 characters")
      .regex(/^[A-Za-z\s]+$/, "Name must contain only letters"),

    email: z.email("Invalid email format").nonempty("Email is required"),

    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Minimum 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain uppercase, lowercase, number and special character"
      ),

    rePassword: z
      .string()
      .nonempty("Confirm Password is required"),

    phone: z
      .string()
      .regex(/^01[0125][0-9]{8}$/, "Phone number must be a valid Egyptian mobile number (010, 011, 012, 015)")
      .nonempty("Phone number is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
