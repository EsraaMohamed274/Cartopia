"use server";
import { CheckoutSchemaType } from "@/schema/checkout.schema";
import { GetMyToken } from "@/utilities/getMyToken";

export async function CreateCashOrder(
  cartId: string,
  formValues: CheckoutSchemaType,
) {
  try {
    const token = await GetMyToken();
    if (!token) return { status: "error", message: "Token missing" };

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          shippingAddress: formValues,
        }),
      },
    );

    const payload = await res.json();

    if (payload.status === "success") {
      return { status: "success", orderId: payload.data._id };
    }
    return { status: "fail", message: payload.message };
  } catch (error) {
    console.error("Checkout Action Error:", error);
    return { status: "error", message: "Network Error" };
  }
}
