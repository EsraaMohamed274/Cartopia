"use client";

import img1 from "../../../../public/slider/images/slider-image-1.jpeg";
import img2 from "../../../../public/slider/images/slider-image-2.jpeg";
import img3 from "../../../../public/slider/images/slider-image-3.jpeg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
export default function MainSlider() {
  return (
    <>
      <div className="container w-[90%] mx-auto flex items-center justify-between">
        <div className="w-3/4">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules = {[Autoplay]}
            autoplay={{ delay: 600, disableOnInteraction: false }}
        >
          <SwiperSlide>
            <Image priority src={img1} className="w-full h-96 object-fit"  alt="Slider Image1" />
          </SwiperSlide>
          <SwiperSlide>
            <Image priority src={img2} className="w-full h-96 object-fit" alt="Slider Image2" />
          </SwiperSlide>
          <SwiperSlide>
            <Image priority src={img3} className="w-full h-96 object-fit" alt="Slider Image3" />
          </SwiperSlide>
        </Swiper>
        </div>
        <div className="w-1/4">
            <Image src={img2} className="w-full h-48 object-fit" alt="Slider Image2" />
            <Image src={img3} className="w-full h-48 object-fit" alt="Slider Image3" />
        </div>

      </div>
    </>
  );
}
