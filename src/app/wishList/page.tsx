"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getUserWishList } from "@/wishListActions/getUserWishList.action";
import { removeWishListItem } from "@/wishListActions/removeWishListItem.action";
import AddButton from "../_components/addButton/addButton";
import { Product } from "@/types/product.type";
import { Heart, Trash2, Sparkles } from "lucide-react";
import Link from "next/link";

export default function WishList() {
  const [isLoading, setIsLoading] = useState(false);
  const [disabledFlag, setDisabledFlag] = useState(false);
  const [products, setProducts] = useState([]);

  async function getUserWishListProducts() {
    setIsLoading(true);
    const res = await getUserWishList();
    if (res.status === "success") {
      setProducts(res.data);
    }
    setIsLoading(false);
  }

  async function removeProductFromWishList(id: string) {
    setDisabledFlag(true);
    const res = await removeWishListItem(id);

    if (res.status === "success") {
      toast.success("Removed from wishlist", {
        duration: 2000,
        position: "top-center",
      });

      setProducts((prevProducts) =>
        prevProducts.filter(
          (prod: Product) => prod.id !== id || prod._id !== id,
        ),
      );

      setDisabledFlag(false);
    } else {
      toast.error("Error removing product", {
        duration: 2000,
        position: "top-center",
      });
      setDisabledFlag(false);
    }
  }

  useEffect(() => {
    function flag() {
      getUserWishListProducts();
    }
    flag();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-6 antialiased">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
          <p className="text-emerald-900 font-bold tracking-tight">
            Loading your favorites...
          </p>
        </div>
      ) : products.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
              <Heart fill="currentColor" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-emerald-900 tracking-tighter uppercase">
                My Wishlist
              </h1>
              <p className="text-gray-500 font-medium">
                {"Items you've saved for later"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((prod: Product) => (
              <div
                key={prod.id}
                className="group relative bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Image Section */}
                <div className="relative aspect-4/5 overflow-hidden bg-gray-100">
                  <Image
                    src={prod.imageCover}
                    alt={prod.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Remove Button Overlay */}
                  <button
                    disabled={disabledFlag}
                    onClick={() => removeProductFromWishList(prod.id)}
                    className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md text-red-500 rounded-2xl shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300 z-10"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                      {prod.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xl font-black text-emerald-900">
                        {prod.price}{" "}
                        <span className="text-[10px] font-medium uppercase">
                          EGP
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <AddButton id={prod.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto text-center py-32">
          <div className="bg-emerald-50 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-emerald-600">
            <Sparkles size={48} />
          </div>
          <h1 className="text-3xl font-black text-emerald-900 mb-4 tracking-tighter uppercase">
            Your Wishlist is Empty
          </h1>
          <p className="text-gray-500 mb-8 font-medium">
            Start adding items that inspire you!
          </p>
          <Button
            asChild
            className="bg-emerald-900 text-white px-10 py-7 rounded-2xl font-black text-lg shadow-lg shadow-emerald-900/20 hover:bg-black transition-all"
          >
            <Link href="/products">EXPLORE PRODUCTS</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
