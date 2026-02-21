"use server";
import { GetMyToken } from "@/utilities/getMyToken";

export async function AddToCart(id: string) {
  try {
    const token = await GetMyToken();
    if (!token) {
      return {
      status: "fail",
      message: "Please login first to add products to your cart",
    };
    }
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
      }),
    });
    const payload = await res.json();
    return payload;
  } catch (error) {
    console.error("Cart Action Error:", error);
    return {
      status: "error",
      message: "Something went wrong. Please try again later.",
    };
  }
}
