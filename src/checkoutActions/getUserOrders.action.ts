"use server";
import { GetMyToken } from "@/utilities/getMyToken";

export async function getUserOrders(id: string) {
  try {
    const token = await GetMyToken();
    if (!token) {
      throw new Error("You must be logged in first");
    }

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      {
        method: "GET",
        headers: {
          token,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch orders");

    const payload = await res.json();
    return payload.data?.orders || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}