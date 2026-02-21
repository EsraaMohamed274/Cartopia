"use server";

import { CheckoutSchemaType } from "@/schema/checkout.schema";
import { GetMyToken } from "@/utilities/getMyToken";

/**
 * CheckPayment - Server Action
 * Creates a Stripe checkout session for Visa/Mastercard payments.
 * @param cartID - The unique ID of the user's active cart.
 * @param formValues - Shipping details from the checkout form.
 * @returns Stripe session payload including the redirect URL.
 */
export async function CheckPayment(
  cartID: string,
  formValues: CheckoutSchemaType,
) {
  try {
    const token = await GetMyToken();
    const url = process.env.NEXT_URL;

    if (!token) {
      throw new Error("Authentication required: Please log in to proceed with payment.");
    }

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}/?url=${url}`,
      {
        method: "POST",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippingAddress: formValues,
        }),
      },
    );

    const payload = await res.json();

    // If the session was created successfully, we return the Stripe URL
    if (payload.status === "success") {
      return payload;
    } else {
      throw new Error(payload.message || "Failed to initiate payment session.");
    }

} catch (error) {
    if (error instanceof Error) {
      return { status: "error", message: error.message };
    }
    
    return { status: "error", message: "An unexpected network error occurred" };
  }
}