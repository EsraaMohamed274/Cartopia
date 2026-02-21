export async function getCategoryDetails(id: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
    {
      method: "GET",
      headers: {},
      next: { revalidate: 60 },
    }
  );
  const { data } = await res.json();
  return data;
}
