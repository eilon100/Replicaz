import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

function CommunitySwiper({ items }: any) {
  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination]}
      >
        {items.map(({ name, image }: any) => {
          return (
            <SwiperSlide className="flex flex-col rounded-md border border-gray-50">
              <img src={image} className="contain h-20" />
              <p className="text-sm">{name}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default CommunitySwiper;
