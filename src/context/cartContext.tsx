"use client";

import { getUserCart } from "@/cartActions/getUserCart.action";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface CartContextType {
  numberOfItems: number;
  setNumberOfItems: Dispatch<SetStateAction<number>>;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartContextProvider({ children }: CartProviderProps) {
  const [numberOfItems, setNumberOfItems] = useState<number>(0);

  

  useEffect(() => {async function getLoggedUserCart() {
    const res = await getUserCart();
    if (res.status === "success") {
      const sum = res.data.products.reduce(
        (acc: number, product: { count: number }) => acc + product.count,
        0,
      );
      setNumberOfItems(sum);
    } else {
      console.log(res);
    }
  }
    getLoggedUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfItems, setNumberOfItems }}>
      {children}
    </CartContext.Provider>
  );
}
