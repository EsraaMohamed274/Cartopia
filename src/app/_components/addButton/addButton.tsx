"use client";
import { AddToCart } from "@/cartActions/addToCart.action";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CartContext } from "@/context/cartContext";
import { useContext } from "react";

export default function AddButton({ id }: { id: string }) {
  const { numberOfItems, setNumberOfItems } = useContext(CartContext)!;

  async function addProductToCart(id: string) {
    const res = await AddToCart(id);
    console.log(res);
    if (res.status == "success") {
      toast.success(res.message, {
        duration: 2000,
        position: "top-center",
      });
      setNumberOfItems(numberOfItems + 1);
    } else {
      toast.error(res.message, {
        duration: 2000,
        position: "top-center",
      });
    }
  }
  return (
    <>
      <Button
        onClick={() => addProductToCart(id)}
        className="w-full bg-emerald-900 hover:bg-emerald-800 text-white cursor-pointer"
      >
        Add to Cart
      </Button>
    </>
  );
}
