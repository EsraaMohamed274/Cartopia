import { getProductsBySubcategory } from "@/api/allProductsBySubCategory.api";
import { Product } from "@/types/product.type";
import Image from "next/image";

export default async function SubcategoryProducts({
  params,
}: {
  params: { id: string };
}) {
  const subcategoryId = params.id;

  const products = await getProductsBySubcategory(subcategoryId);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <div
            key={product._id}
            className="border p-4 rounded hover:shadow-lg transition"
          >
            <Image
              src={product.imageCover}
              alt={product.title}
              width={300}
              height={300}
              className="rounded"
            />
            <h3 className="mt-2 font-semibold">{product.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
