import React from "react";
import { getProductDetails } from "@/api/productDetails.api";
import Image from "next/image";
import AddButton from "@/app/_components/addButton/addButton";
import AddButtonToWishList from "@/app/_components/addButtonToWishlist/addButtonToWishList";
import { getReletedProducts } from "@/productCategoryAction/relatedProducts.action";
import SingleProduct from "@/app/_components/singleProduct/SingleProduct";
import { Product } from "@/types/product.type";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductDetails(id);
  const res = await getReletedProducts(product.category._id)

  if (!product)return <h1>No product details here</h1>


  return (
    <>
    <div className="max-w-7xl mx-auto px-6 py-5 ">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <div className="flex flex-col md:flex-row gap-2 justify-around items-center">
        <div className="md:w-1/4">
          <Image
            src={product.imageCover}
            alt={product.title}
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="md:w-3/4 px-6">
          <h2 className="text-xl font-semibold mb-4">
            {product.category.name}
          </h2>
          <h3 className="text-lg font-medium mb-2">
            {product.subcategory?.name || ""}
          </h3>
          <h4 className="text-md font-medium mb-2">
            {product.brand?.name || ""}
          </h4>
          <span className="text-md font-medium mb-2 me-5">
            {product.color || "One Color"}
          </span>
          <span className="text-md font-medium mb-2">
            {product.size || "One Size"}
          </span>
          <p className="text-lg font-bold text-emerald-900 mb-4">
            {product.price} EGP
          </p>
          <p className="text-md font-medium text-amber-500 mb-4">
            Rating: ★ {product.ratingsAverage.toFixed(1)}{" "}
          </p>
          <p className="text-gray-700">{product.description}</p>
          <h4 className="text-md font-medium mb-2">
            {product.quantity || 0} in stock
          </h4>
          <div className="flex justify-between">
            <AddButton id={product.id} />
            <AddButtonToWishList id={product._id} />
          </div>
        </div>
      </div>
    </div>
    <div className="container w-[90%] mx-auto">
          <h1 className="text-2xl font-bold">Related Products</h1>
          <div className="container mx-auto w-full">
            <div className="flex flex-wrap -mx-4">
              {res.data.map((product:Product) => {
                return <SingleProduct key={product._id} product={product} />;
              })}
            </div>
          </div>
        </div>
    </>
  );
}
