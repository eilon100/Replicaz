import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Modal from "@mui/material/Modal";
import { Fade } from "@mui/material";

const ImageSwiper = (images) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [imageUrl, setImageUrl] = React.useState("");
  const handleOpen = (url) => setImageUrl(url);
  const handleClose = () => setImageUrl(null);
  return (
    <>
      {open && (
        <Modal
          open={!!imageUrl}
          onClose={handleClose}
          className="flex justify-center items-center"
        >
          <Fade in={imageUrl}>
            <img
              src={imageUrl}
              className={` px-3 w-[100vw] max-h-[90vh] lg:w-auto lg:h-[90vh] lg:max-w-[80vw] object-contain outline-none  `}
            />
          </Fade>
        </Modal>
      )}

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
              <img src={url} onClick={() => handleOpen(url)} />
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
