import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Brand } from "@/types/brands.type";

export default function SingleBrand({ brand }: { brand: Brand }) {
  return (
    <>
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 p-6 mb-2" key={brand._id}>
      <Card className="p-2 flex flex-col border-2 border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <Link href={`/products?brandProducts=${brand._id}`}>
          <CardHeader>
          <CardTitle className="text-center">
            <Image
              src={brand.image}
              alt={brand.name}
              width={500}
              height={500}
              className="object-cover rounded-t-md"
            />
          </CardTitle>
        </CardHeader>
          </Link>
      </Card>
    </div>
    </>
  );
}
