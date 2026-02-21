import { Button } from "@/components/ui/button";
import { getCategoryDetails } from "@/api/categoryDetails.api";
import { Subcategory } from "@/types/product.type";
import Link from "next/link";
import { ChevronRight, Layers } from "lucide-react";

export default async function CategoryDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const subcategories = await getCategoryDetails(id);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-12 flex items-center gap-4">
        <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-900">
          <Layers size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-emerald-900 tracking-tighter uppercase">Subcategories</h1>
          <p className="text-gray-400 font-medium text-sm">Explore our specialized collections</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {subcategories.map((item: Subcategory) => (
          <div
            key={item._id}
            className="group relative bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full group-hover:bg-emerald-100 transition-colors duration-500" />

            <div className="relative z-10">
              <span className="text-[10px] font-black text-emerald-600/50 uppercase tracking-[0.3em] mb-2 block">
                Collection
              </span>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-800 transition-colors duration-300">
                {item.name}
              </h3>
              <p className="text-xs font-medium text-gray-400 mt-1 mb-6 italic">
                @{item.slug}
              </p>

              <Button asChild className="w-full bg-emerald-900 hover:bg-black text-white py-6 rounded-2xl shadow-lg shadow-emerald-900/20 transition-all duration-300 group-hover:scale-[1.02]">
                <Link href={`/products?subcategory=${item._id}`} className="flex items-center justify-center gap-2">
                  View Products
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {subcategories.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 font-bold italic">No subcategories found for this section.</p>
        </div>
      )}
    </div>
  );
}