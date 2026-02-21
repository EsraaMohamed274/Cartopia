"use server"
import { GetMyToken } from "@/utilities/getMyToken";

export async function getUserCart() {
  try{
    const token = await GetMyToken();
  if (!token) {
    throw new Error("You must logged in first");
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  const payload = await res.json();
  return payload;
  }
  catch(error){
    return error;
  }
  
}
