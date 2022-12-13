import React from "react";
import Image from "next/image";
import sneaker from "../../public/sneaker.png";

const SiteLogo = () => {
  return (
    <>
      <div className="hidden sm:flex absolute left-[10px] h-10 w-20 cursor-pointer mr-3 mt-[1px] ">
        <Image
          objectFit="contain"
          src="https://upload.wikimedia.org/wikipedia/he/b/b2/Reddit_logo.svg.png"
          layout="fill"
        />
      </div>
      <div className="flex absolute left-[10px] h-10 w-10 cursor-pointer mr-3 mt-[1px] sm:hidden">
        <Image objectFit="contain" src={sneaker} layout="fill" />
      </div>
    </>
  );
};

export default SiteLogo;
