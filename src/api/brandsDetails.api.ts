export async function getBrandsDetails(id: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`,
    {
      method: "GET",
      headers: {},
      next: { revalidate: 60 },
    }
  );
  const { data } = await res.json();
  return data;
}
