import CategoriesSwiper from "../CategoriesSwiper/CategoriesSwiper";


export default  async function CategoriesSlider() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories",
    {
      method: "GET",
      headers: {},
      next: { revalidate: 60 },
    }
  );
  const { data } = await res.json();
  return (
    <div className="categories-slider"> 
    <CategoriesSwiper categories={data}/>
    </div>
  );
}