import { getAllProducts } from "@/api/allProducts.api";
import SingleProduct from "../_components/singleProduct/SingleProduct";
import { Product } from "@/types/product.type";

export default async function Products() {
  const data = await getAllProducts();

  return (
    <div className="container mx-auto w-[80%]">
      <div className="flex flex-wrap -mx-4">
        {data.map((prod: Product) => (
          <SingleProduct key={prod._id} product={prod} />
        ))}
      </div>
    </div>
  );
}
