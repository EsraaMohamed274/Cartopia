export async function getProductsByBrand(brandId: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
    {
      method: "GET",
      headers: {},
      next: { revalidate: 60 },
    }
  );
  const { data } = await res.json();
  return data;
}
