import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ItemSwiper = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#888888",
          "--swiper-pagination-color": "#888888",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="swiperItems"
      >
        {images.map((url, i) => {
          return (
            <SwiperSlide key={i}>
              <a href={url} target="new">
                <img
                  src={url}
                  className={`max-h-96 px-10 ${
                    images.length === 1 ? "mb-10" : ""
                  } `}
                />
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {images.length > 1 ? (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={images.length}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="myItemSwiper"
        >
          {images.map((url, i) => {
            return (
              <SwiperSlide key={i} className="opacity-50 mt-0 md:mt-8">
                <img src={url} className="rounded-sm object-contain max-h-16" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        ""
      )}
    </>
  );
};
export default ItemSwiper;
