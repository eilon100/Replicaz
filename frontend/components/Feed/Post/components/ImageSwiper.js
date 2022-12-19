import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ImageSwiper = (images) => {
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
        className="mySwiper2"
      >
        {images.arr.map((url, i) => {
          return (
            <SwiperSlide key={i}>
              <a href={url} target="new">
                <img src={url} />
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {images.arr.length > 1 ? (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={images.arr.length > 3 ? 3 : images.arr.length}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {images.arr.map((url, i) => {
            return (
              <SwiperSlide key={i}>
                <img src={url} />
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
export default ImageSwiper;
