"use server"
import { GetMyToken } from "@/utilities/getMyToken";

export async function AddToWishList(id: string) {
  const token = await GetMyToken();
  if (!token) {
    throw new Error("You should logged in first");
  }
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
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
}
