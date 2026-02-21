"use client";
import { getUserCart } from "@/cartActions/getUserCart.action";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { removeCartItem } from "@/cartActions/removeCartItem.action";
import { updateCart } from "@/cartActions/updateCart.action";
import { toast } from "sonner";
import { clearCartItems } from "@/cartActions/clearCart.action";
import { useContext } from "react";
import { CartContext } from "@/context/cartContext";
import { ProductCartType } from "@/types/cart.type";
import Link from "next/link";
import { Trash2, Plus, Minus, CreditCard, ShoppingBag } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ShoppingCart() {
  const { numberOfItems, setNumberOfItems } = useContext(CartContext)!;
  const [isLoading, setIsLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [disabledFlag, setDisabledFlag] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [totalPrice, SetTotalPrice] = useState(0);
  const [cartID, setCartId] = useState("");

  async function getUserCartProducts() {
    setIsLoading(true);
    const res = await getUserCart();
    setCartId(res.cartId);
    if (res.status === "success") {
      setProducts(res.data.products);
      SetTotalPrice(res.data.totalCartPrice);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }

  async function updateCartProduct(id: string, count: string, sign: string) {
    setCurrentId(id);
    setUpdateLoading(true);
    const res = await updateCart(id, count);
    if (res.status === "success") {
      toast.success("Updated successfully");
      if (sign == "-") setNumberOfItems(numberOfItems - 1);
      else if (sign == "+") setNumberOfItems(numberOfItems + 1);
      setProducts(res.data.products);
      setUpdateLoading(false);
      getUserCartProducts();
    } else {
      toast.error("Error updating");
      setUpdateLoading(false);
    }
  }

  async function removeProductFromCart(id: string, count: number) {
    setDisabledFlag(true);
    const res = await removeCartItem(id);
    if (res.status === "success") {
      toast.success("Removed successfully");
      setNumberOfItems(numberOfItems - count);
      setProducts(res.data.products);
      setDisabledFlag(false);
      getUserCartProducts();
    } else {
      toast.error("Error removing");
      setDisabledFlag(false);
    }
  }

  async function clearProductFromCart() {
    const res = await clearCartItems();
    if (res.message === "success") {
      toast.success("Cart cleared");
      setProducts([]);
      setNumberOfItems(0);
    }
  }

  useEffect(() => {
    function flag() {
      getUserCartProducts();
    }
    flag();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          <p className="text-emerald-900 font-bold animate-pulse">
            Gathering your treasures...
          </p>
        </div>
      ) : products.length > 0 ? (
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-black text-emerald-900 tracking-tighter uppercase mb-2">
                My Shopping Cart
              </h1>
              <p className="text-gray-500 font-medium">
                You have{" "}
                <span className="text-emerald-600 font-bold">
                  {numberOfItems}
                </span>{" "}
                items in your bag
              </p>{" "}
            </div>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <h1 className="text-4xl font-black text-emerald-900 tracking-tighter uppercase mb-2">
                  My Shopping Cart
                </h1>
                <p className="text-gray-500 font-medium">
                  You have{" "}
                  <span className="text-emerald-600 font-bold">
                    {numberOfItems}
                  </span>{" "}
                  items in your bag
                </p>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-rose-400 hover:text-rose-600 hover:bg-rose-50/50 font-bold flex items-center gap-2 transition-colors rounded-xl"
                  >
                    <Trash2 size={18} strokeWidth={2.5} />
                    <span className="tracking-tight">Clear Bag</span>
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="rounded-[3rem] p-10 border-none bg-white shadow-[0_30px_70px_rgba(0,0,0,0.1)] max-w-md">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-4xl flex items-center justify-center mb-6 animate-bounce-short">
                      <ShoppingBag size={36} />
                    </div>

                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-3xl font-black text-emerald-950 uppercase tracking-tighter mb-2">
                        Wait a second!
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-500 font-medium leading-relaxed">
                        Your cart looks amazing. Are you sure you want to empty
                        it and lose these treasures?
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="mt-10 flex-col sm:flex-row gap-3 w-full">
                      <AlertDialogCancel className="flex-1 rounded-2xl font-black py-7 border-none bg-gray-50 text-emerald-900 hover:bg-gray-100 transition-all uppercase text-xs tracking-widest">
                        No, keep them
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={clearProductFromCart}
                        className="flex-1 bg-emerald-950 hover:bg-rose-600 text-white rounded-2xl font-black py-7 shadow-xl shadow-emerald-950/10 transition-all active:scale-95 uppercase text-xs tracking-widest"
                      >
                        Yes, clear all
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {products.map((prod: ProductCartType) => (
                <div
                  key={prod.product.id}
                  className="bg-white p-6 rounded-4xl shadow-sm border border-gray-100 flex items-center gap-6 group hover:shadow-md transition-all"
                >
                  <div className="relative w-24 h-24 overflow-hidden rounded-2xl shrink-0">
                    <Image
                      src={prod.product.imageCover}
                      alt={prod.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate">
                      {prod.product.title}
                    </h3>
                    <p className="text-emerald-600 font-black mt-1">
                      {prod.price} EGP
                    </p>

                    <div className="mt-4 flex items-center gap-4">
                      {/* Qty Controls */}
                      <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                        <button
                          onClick={() =>
                            updateCartProduct(
                              prod.product.id,
                              `${prod.count - 1}`,
                              "-",
                            )
                          }
                          className="p-1 hover:bg-white rounded-lg transition-colors text-gray-600"
                        >
                          <Minus size={16} />
                        </button>

                        <div className="w-10 text-center font-bold text-sm">
                          {currentId === prod.product.id && updateLoading
                            ? "..."
                            : prod.count}
                        </div>

                        <button
                          onClick={() =>
                            updateCartProduct(
                              prod.product.id,
                              `${prod.count + 1}`,
                              "+",
                            )
                          }
                          className="p-1 hover:bg-white rounded-lg transition-colors text-gray-600"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="text-[10px] font-black uppercase text-rose-400 hover:text-rose-600 tracking-[0.15em] transition-all hover:scale-105 active:scale-95">
                              Remove
                            </button>
                          </AlertDialogTrigger>

                          <AlertDialogContent className="rounded-[2.5rem] p-8 border-none bg-white/95 backdrop-blur-md shadow-2xl max-w-100">
                            <AlertDialogHeader className="flex flex-col items-center text-center">
                              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-4">
                                <Trash2 size={28} strokeWidth={1.5} />
                              </div>

                              <AlertDialogTitle className="text-2xl font-black text-emerald-950 uppercase tracking-tighter">
                                Remove Item?
                              </AlertDialogTitle>

                              <AlertDialogDescription className="text-gray-500 font-medium px-2">
                                Are you sure you want to remove{" "}
                                <span className="text-emerald-700 font-bold">
                                  {prod.product.title}
                                </span>
                                ? You can always add it back later!
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter className="mt-8 flex gap-3">
                              <AlertDialogCancel className="flex-1 rounded-2xl font-bold py-6 border-none bg-gray-50 text-emerald-900 hover:bg-gray-100 transition-all">
                                Keep it
                              </AlertDialogCancel>

                              <AlertDialogAction
                                disabled={disabledFlag}
                                onClick={() =>
                                  removeProductFromCart(
                                    prod.product.id,
                                    prod.count,
                                  )
                                }
                                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold py-6 shadow-lg shadow-rose-200 transition-all active:scale-95"
                              >
                                Remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                    </div>
                  </div>

                  <div className="text-right hidden sm:block">
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-tighter">
                      Total
                    </p>
                    <p className="text-lg font-black text-emerald-950">
                      {prod.price * prod.count} EGP
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-emerald-900 text-white p-8 rounded-[2.5rem] shadow-xl sticky top-24">
                <h3 className="text-xl font-black uppercase tracking-widest mb-6 pb-4 border-b border-emerald-800">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-emerald-200">
                    <span>Subtotal</span>
                    <span className="font-bold text-white">
                      {totalPrice} EGP
                    </span>
                  </div>
                  <div className="flex justify-between text-emerald-200">
                    <span>Shipping</span>
                    <span className="font-bold text-white uppercase text-xs">
                      Calculated at checkout
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-emerald-800 mb-8">
                  <span className="text-lg font-bold">Total Amount</span>
                  <span className="text-2xl font-black">{totalPrice} EGP</span>
                </div>

                <Button
                  asChild
                  className="w-full bg-white text-emerald-900 hover:bg-emerald-50 py-7 rounded-2xl font-black text-lg shadow-lg transition-all active:scale-95 group"
                >
                  <Link
                    href={`/checkout/${cartID}`}
                    className="flex items-center justify-center gap-2"
                  >
                    <CreditCard size={20} />
                    CHECKOUT NOW
                  </Link>
                </Button>

                <p className="text-[10px] text-center mt-6 text-emerald-400 font-medium uppercase tracking-[0.2em]">
                  Secure Checkout Powered by Cartopia
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto text-center py-32">
          <div className="bg-emerald-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
            <ShoppingBag size={48} />
          </div>
          <h1 className="text-3xl font-black text-emerald-900 mb-4 tracking-tight">
            Your bag is empty!
          </h1>
          <p className="text-gray-500 mb-8 font-medium">
            {"Looks like you haven't added anything to your cart yet."}{" "}
          </p>
          <Button
            asChild
            className="bg-emerald-900 text-white px-8 py-6 rounded-2xl font-bold"
          >
            <Link href="/products">CONTINUE SHOPPING</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
