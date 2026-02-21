"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { AddToWishList } from "@/wishListActions/addToWishList.action";

export default function AddButtonToWishList({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  async function addToWishlist() {
    try {
      setIsLoading(true);

      const res = await AddToWishList(id);

      if (res.status === "success") {
        setIsAdded(true);

        toast.success(res.message, {
          duration: 2000,
          position: "top-center",
        });
      } else {
        toast.error("You can't add this product now", {
          duration: 2000,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Server error", {
        duration: 2000,
        position: "top-center",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={addToWishlist}
      disabled={isLoading || isAdded}
      variant="ghost"
      className="p-2"
    >
      <Heart
        className={`w-15 h-15 transition-all duration-200 ${
          isAdded
            ? "fill-red-500 text-red-500"
            : "text-gray-400 hover:scale-110"
        }`}
      />
    </Button>
  );
}
