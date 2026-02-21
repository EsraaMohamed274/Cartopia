"use server"

export async function getReletedProducts(categID:string){
  const res =  await  fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categID}`)
  const payload = await res.json()
  return payload;
}