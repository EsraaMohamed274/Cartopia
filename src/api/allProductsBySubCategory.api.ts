export async function getProductsBySubcategory(subcategoryId: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?subcategory=${subcategoryId}`,
    {
      method: "GET",
      headers: {},
      next: { revalidate: 60 },
    }
  );
  const { data } = await res.json();
  return data;
}
