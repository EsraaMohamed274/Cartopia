"use server";
import { GetMyToken } from "@/utilities/getMyToken";

export async function updateCart(id: string, count: string) {
  const token = await GetMyToken();
  if (!token) {
    throw new Error("You must logged in first");
  }
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "PUT",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      count
    }),
  });
  const payload = await res.json();
  return payload;
}
