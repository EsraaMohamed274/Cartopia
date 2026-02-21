"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { Category } from "@/types/category.type";


export default function CategoriesSwiper({ categories }: { categories: Category[] }) {
  return (
    <>
      <div className="container w-[90%] mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-5">Categories</h1>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={5}
          slidesPerView={5}
          autoplay={{ delay: 1000 }}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          <div className="flex items-center justify-start gap-5">
            {categories.map((category: Category) => {
              return (
                <SwiperSlide key={category._id}>
                  <div>
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={300}
                      height={150}
                      className="w-full h-60 object-cover"
                    />

                    <p className="mt-2 text-lg font-medium">{category.name}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      </div>
    </>
  );
}
