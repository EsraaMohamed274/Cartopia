import React from "react";
import SingleBrand from "../singleBrand/singleBrand";
import { getAllBrands } from "@/api/allBrands.api";
import { Brand } from "@/types/brands.type";

export default async function AllBrands() {
  const brands = await getAllBrands();

  return (
    <div className="container w-[90%] mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">All Brands</h1>
      <div className="container mx-auto w-full">
        <div className="flex flex-wrap -mx-4">
          {brands.map((brand:Brand) => {
            return <SingleBrand key={brand._id} brand={brand}/>;
          })}
        </div>
      </div>
    </div>
  );
}
