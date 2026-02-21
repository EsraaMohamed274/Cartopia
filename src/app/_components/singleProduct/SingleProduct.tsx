"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product.type";
import AddButton from "../addButton/addButton";
import AddButtonToWishList from "../addButtonToWishlist/addButtonToWishList";

export default function SingleProduct({ product }: { product: Product }) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 p-4 mb-2" key={product._id}>
      <Card className="h-full flex flex-col border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl bg-white overflow-hidden group">
        <Link href={`/products/${product._id}`}>
          <CardHeader className="p-0">
            <CardTitle>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <h6 className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest">{product.category.name}</h6>
              <p className="text-gray-800 font-bold mt-1 line-clamp-1 text-base">{product.title}</p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-lg font-black text-emerald-900">{product.price} EGP</p>
              <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
                <span className="text-amber-500 mr-1 text-sm">★</span>
                <span className="text-sm font-bold text-gray-600">{product.ratingsAverage.toFixed(1)}</span>
              </div>
            </div>
          </CardContent>
        </Link>

        <CardFooter className="p-5 pt-0 flex items-center justify-center gap-2">
          <div className="flex-1">
            <AddButton id={product._id}/>
          </div>
          <div className="shrink-0">
            <AddButtonToWishList id={product._id}/>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}