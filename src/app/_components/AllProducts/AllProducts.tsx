import { getAllProducts } from "@/api/allProducts.api";
import SingleProduct from "../singleProduct/SingleProduct";
import { Product } from "@/types/product.type";

export default async function AllProducts() {
  const products = await getAllProducts();

  return (
    <div className="container w-[90%] mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">All Products</h1>
      <div className="container mx-auto w-full">
        <div className="flex flex-wrap -mx-4">
          {products.map((product:Product) => {
            return <SingleProduct key={product._id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}
