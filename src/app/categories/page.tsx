import { getAllCategories } from "@/api/allCategories.api";
import { Category } from "@/types/category.type";
import SubCategory from "../_components/subCategory/subCategory";

export default async function Categories() {
  const data = await getAllCategories();

  return (
    <div className="container mx-auto w-[80%]">
      <div className="flex flex-wrap -mx-4">
        {data.map((category:Category ) => (
          <SubCategory key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
}
