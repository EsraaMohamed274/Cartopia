import { z } from "zod";

export const checkoutSchema = z
  .object({
    details: z.string().nonempty("This field can't be empty"),

    phone: z
      .string()
      .regex(/^01[0125][0-9]{8}$/, "Phone number must be a valid Egyptian mobile number (010, 011, 012, 015)")
      .nonempty("Phone number is required"),
    city:z.string().nonempty("This field can't be empty")  
  })
  
export type CheckoutSchemaType = z.infer<typeof checkoutSchema>;
