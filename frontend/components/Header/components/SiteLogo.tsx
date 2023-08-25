import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ReplicazLogo from "../../../public/ReplicazLogo.png";
import ReplicazIcon from "../../../public/ReplicazIcon.png";
const SiteLogo = () => {
  const router = useRouter();

  return (
    <>
      <div
        className="hidden sm:flex absolute left-[10px] h-10 w-20 cursor-pointer mr-3 mt-[1px] "
        onClick={() => router.push("/")}
      >
        <Image objectFit="contain" src={ReplicazLogo} layout="fill" />
      </div>
      <div
        className="flex absolute left-[10px] h-10 w-10 cursor-pointer mr-3 mt-[1px] sm:hidden"
        onClick={() => router.push("/")}
      >
        <Image objectFit="contain" src={ReplicazIcon} layout="fill" />
      </div>
    </>
  );
};

export default SiteLogo;
