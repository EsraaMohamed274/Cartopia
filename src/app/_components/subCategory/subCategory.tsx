"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types/category.type";

export default function SubCategory({ category }: { category: Category }) {
  return (
    <div
      className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 p-4"
      key={category._id}
    >
      <Link href={`/categories/${category._id}`} className="group block">
        <Card className="relative overflow-hidden border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 rounded-[2.5rem] bg-white">
          <CardHeader className="p-0">
            <CardTitle className="m-0">
              <div className="relative h-72 overflow-hidden bg-gray-50">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 text-center">
            <div className="space-y-1">
              <h3 className="text-emerald-950 font-black text-xl tracking-tighter antialiased group-hover:text-emerald-700 transition-colors duration-300">
                {category.name}
              </h3>

              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] antialiased">
                {category.slug}
              </p>
            </div>

            <div className="mt-4 flex justify-center">
              <div className="w-0 h-1 bg-emerald-500 rounded-full group-hover:w-12 transition-all duration-500 ease-out" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
