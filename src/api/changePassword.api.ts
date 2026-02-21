"use server";

import { GetMyToken } from "@/utilities/getMyToken";
import { ChangePasswordType } from "@/schema/changePassword.schema";

/**
 * @param formData - Object containing currentPassword, password, and rePassword.
 */
export async function changePasswordAction(formData: ChangePasswordType) {
  try {
    const token = await GetMyToken();

    if (!token) {
      throw new Error("Authentication required: Please log in to change your password.");
    }

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
      {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(formData),
      }
    );

    const payload = await res.json();

    if (payload.statusMsg === "success" || payload.message === "success") {
      return { 
        status: "success", 
        message: "Your password has been updated successfully." 
      };
    } else {
      throw new Error(payload.message || "Failed to update password. Please try again.");
    }
    
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : "An unexpected network error occurred.";

    return {
      status: "error",
      message: errorMessage,
    };
  }
}